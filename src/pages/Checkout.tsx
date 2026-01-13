import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Truck, ShoppingBag, MapPin, Phone, Mail, User, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

interface ShippingInfo {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart, loading: cartLoading } = useCart();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [orderId, setOrderId] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<'razorpay' | 'cod'>('razorpay');

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    full_name: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to checkout");
      navigate("/auth");
      return;
    }

    // Don't redirect if cart is still loading
    if (!cartLoading && cartItems.length === 0 && step === 1) {
      toast.error("Your cart is empty. Add some products first!");
      navigate("/products");
      return;
    }

    // Fetch user profile data
    if (user) {
      fetchProfile();
    }
    
    // Load Razorpay script
    loadRazorpayScript();
  }, [user, cartItems, cartLoading, step]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setShippingInfo({
        full_name: data.full_name || "",
        email: data.email || user.email || "",
        phone: data.phone || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        pincode: data.pincode || "",
      });
    }
  };

  const validateShipping = () => {
    if (!shippingInfo.full_name || !shippingInfo.phone || !shippingInfo.address || 
        !shippingInfo.city || !shippingInfo.state || !shippingInfo.pincode) {
      toast.error("Please fill in all shipping details");
      return false;
    }
    if (shippingInfo.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const createOrder = async () => {
    if (!user) return null;

    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: finalTotal,
          status: "pending",
          shipping_address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`,
          shipping_name: shippingInfo.full_name,
          shipping_phone: shippingInfo.phone,
          shipping_email: shippingInfo.email,
          payment_method: selectedPayment,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return order;
    } catch (error) {
      console.error("Order creation error:", error);
      throw error;
    }
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);

    try {
      // Create order in database first
      const order = await createOrder();
      if (!order) {
        throw new Error("Failed to create order");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_xxxxxxxxxxxxxx", // Replace with your key
        amount: finalTotal * 100, // Amount in paise
        currency: "INR",
        name: "TechCart",
        description: `Order #${order.id.substring(0, 8)}`,
        image: "/new-logo.png",
        order_id: "", // Generate from backend if using Razorpay Orders API
        handler: async function (response: any) {
          try {
            // Update order status to paid
            await supabase
              .from("orders")
              .update({ 
                status: "confirmed",
                payment_id: response.razorpay_payment_id,
              })
              .eq("id", order.id);

            // Update profile
            await supabase.from("profiles").upsert({
              id: user!.id,
              full_name: shippingInfo.full_name,
              phone: shippingInfo.phone,
              address: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              pincode: shippingInfo.pincode,
              email: shippingInfo.email,
            });

            // Clear cart
            await clearCart();

            setOrderId(order.id);
            setStep(3);
            toast.success("Payment successful! Order placed.");
          } catch (error) {
            console.error("Post-payment error:", error);
            toast.error("Payment successful but order update failed. Contact support.");
          }
        },
        prefill: {
          name: shippingInfo.full_name,
          email: shippingInfo.email,
          contact: shippingInfo.phone,
        },
        notes: {
          address: shippingInfo.address,
        },
        theme: {
          color: "#D4AF37",
        },
        modal: {
          ondismiss: function() {
            // Update order status to cancelled
            supabase
              .from("orders")
              .update({ status: "cancelled" })
              .eq("id", order.id);
            
            toast.error("Payment cancelled");
            setLoading(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', async function (response: any) {
        console.error("Payment failed:", response.error);
        
        // Update order status to failed
        await supabase
          .from("orders")
          .update({ status: "failed" })
          .eq("id", order.id);
        
        toast.error(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      
      rzp.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      toast.error("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  const handleCODOrder = async () => {
    setLoading(true);

    try {
      const order = await createOrder();
      if (!order) {
        throw new Error("Failed to create order");
      }

      // Update profile
      await supabase.from("profiles").upsert({
        id: user!.id,
        full_name: shippingInfo.full_name,
        phone: shippingInfo.phone,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        pincode: shippingInfo.pincode,
        email: shippingInfo.email,
      });

      // Clear cart
      await clearCart();

      setOrderId(order.id);
      setStep(3);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("COD order error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    if (selectedPayment === 'razorpay') {
      handleRazorpayPayment();
    } else {
      handleCODOrder();
    }
  };

  const shippingCost = cartTotal >= 500 ? 0 : 50;
  const tax = Math.round(cartTotal * 0.18); // 18% GST
  const finalTotal = cartTotal + shippingCost + tax;

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mb-4"></div>
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Show empty cart message if no items
  if (cartItems.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col justify-center items-center py-20 px-4">
          <ShoppingBag className="w-24 h-24 text-muted-foreground/50 mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-3">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            Add some amazing products to your cart before checking out!
          </p>
          <Button 
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-primary to-primary/80"
          >
            Browse Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <button
          onClick={() => step === 1 ? navigate("/") : setStep(step - 1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {step === 1 ? "Back to Shopping" : "Back"}
        </button>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "Shipping", icon: Truck },
              { num: 2, label: "Payment", icon: CreditCard },
              { num: 3, label: "Confirmation", icon: CheckCircle },
            ].map((item, idx) => (
              <div key={item.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step >= item.num 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : "bg-muted border-muted-foreground/20 text-muted-foreground"
                  }`}>
                    {step > item.num ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <item.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${step >= item.num ? "text-foreground" : "text-muted-foreground"}`}>
                    {item.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`h-0.5 flex-1 mx-2 transition-colors ${
                    step > item.num ? "bg-primary" : "bg-muted-foreground/20"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="bg-card rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Shipping Information</h2>
                
                <form onSubmit={(e) => { e.preventDefault(); if (validateShipping()) setStep(2); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          required
                          value={shippingInfo.full_name}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, full_name: e.target.value })}
                          className="pl-10"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          required
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className="pl-10"
                          placeholder="+91 9876543210"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        value={shippingInfo.email}
                        disabled
                        className="pl-10 bg-muted"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Textarea
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className="pl-10 min-h-[80px]"
                        placeholder="Street address, building, apartment"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City *
                      </label>
                      <Input
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        placeholder="Mumbai"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        State *
                      </label>
                      <Input
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        placeholder="Maharashtra"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Pincode *
                      </label>
                      <Input
                        required
                        value={shippingInfo.pincode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                        placeholder="400001"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-6">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-card rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  {/* Razorpay Payment */}
                  <button
                    onClick={() => setSelectedPayment('razorpay')}
                    className={`w-full border-2 rounded-lg p-4 transition-all ${
                      selectedPayment === 'razorpay' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === 'razorpay' ? 'border-primary' : 'border-muted-foreground'
                      }`}>
                        {selectedPayment === 'razorpay' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-foreground">Online Payment (Razorpay)</h3>
                        <p className="text-sm text-muted-foreground">Credit/Debit Card, UPI, Net Banking, Wallets</p>
                      </div>
                      <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="w-8 h-8" />
                    </div>
                  </button>

                  {/* COD Payment */}
                  <button
                    onClick={() => setSelectedPayment('cod')}
                    className={`w-full border-2 rounded-lg p-4 transition-all ${
                      selectedPayment === 'cod' 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === 'cod' ? 'border-primary' : 'border-muted-foreground'
                      }`}>
                        {selectedPayment === 'cod' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-foreground">Cash on Delivery (COD)</h3>
                        <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                      </div>
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                  </button>

                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      <strong>Secure Payment:</strong> All transactions are encrypted and secure. Your card details are never stored on our servers.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full mt-6"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : selectedPayment === 'razorpay' ? (
                    `Pay ₹${finalTotal.toLocaleString()}`
                  ) : (
                    'Place Order'
                  )}
                </Button>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && orderId && (
              <div className="bg-card rounded-lg shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-3">Order Placed Successfully!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your order. We'll send you a confirmation email shortly.
                </p>
                
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="text-lg font-mono font-semibold text-foreground">{orderId.substring(0, 8).toUpperCase()}</p>
                </div>

                <div className="flex gap-3 justify-center flex-wrap">
                  <Button onClick={() => navigate("/orders")} variant="outline">
                    View Orders
                  </Button>
                  <Button onClick={() => navigate("/")}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order Summary
              </h3>

              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-border last:border-0">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain bg-muted rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-foreground">
                        ₹{(Number(item.product.price) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 py-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">
                    {shippingCost === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `₹${shippingCost}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (GST 18%)</span>
                  <span className="font-medium text-foreground">₹{tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t-2 border-border">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">₹{finalTotal.toLocaleString()}</span>
              </div>

              {cartTotal < 500 && (
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Add ₹{(500 - cartTotal).toLocaleString()} more for FREE shipping
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
