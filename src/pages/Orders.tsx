import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Package, Calendar, CreditCard } from "lucide-react";

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  order_items: {
    quantity: number;
  }[];
}

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          quantity
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <div className="bg-card rounded-lg shadow-lg p-12 text-center">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">
                Start shopping to see your orders here
              </p>
              <button 
                onClick={() => navigate("/")}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const itemsCount = order.order_items.reduce((sum, item) => sum + item.quantity, 0);
                
                return (
                  <div key={order.id} className="bg-card rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Package className="w-5 h-5 text-primary" />
                          <span className="font-semibold text-foreground">{order.id.substring(0, 13)}...</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "delivered" ? "bg-success/20 text-success" :
                            order.status === "pending" ? "bg-warning/20 text-warning" :
                            order.status === "processing" ? "bg-primary/20 text-primary" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {itemsCount} items
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="w-4 h-4" />
                            ₹{order.total_amount.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-muted/50 rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">Order Management</h3>
            <p className="text-sm text-muted-foreground">
              For price inquiries and order placement, please contact us at{" "}
              <a href="mailto:unitechindia@gmail.com" className="text-primary hover:underline">
                unitechindia@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
