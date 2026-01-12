import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  ChevronLeft,
  Truck,
  Shield,
  Phone,
  Mail
} from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category: string;
  brand: string | null;
  price: number | null;
  original_price: number | null;
  discount_percent: number;
  rating: number;
  reviews_count: number;
  stock: number;
  is_featured: boolean;
  is_trending: boolean;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
      navigate("/products");
    } else {
      setProduct(data);
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product.id, quantity);
    toast.success(`Added ${quantity} item(s) to cart`);
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    if (!user) {
      toast.error("Please sign in to add to wishlist");
      navigate("/auth");
      return;
    }
    toggleWishlist(product.id);
    toast.success(isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist");
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

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button 
            onClick={() => navigate("/products")}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg"
          >
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const hasPrice = product.price !== null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-auto object-contain max-h-[500px]"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Category */}
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                {product.category.split("-").map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(" ")}
                {product.brand && ` • ${product.brand}`}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-primary fill-primary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews_count} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-border py-6">
              {hasPrice ? (
                <>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-foreground">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <>
                        <span className="text-xl text-muted-foreground line-through">
                          ₹{product.original_price.toLocaleString()}
                        </span>
                        <span className="text-lg text-success font-semibold">
                          {product.discount_percent}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
                </>
              ) : (
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    Price on Request
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Contact us: <a href="mailto:unitechindia@gmail.com" className="text-primary hover:underline">unitechindia@gmail.com</a>
                  </p>
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? "bg-success" : "bg-destructive"}`} />
              <span className="text-sm font-medium">
                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
              </span>
            </div>

            {/* Quantity and Actions */}
            {hasPrice && product.stock > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-muted"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x border-border">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              {hasPrice && product.stock > 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              ) : (
                <a
                  href="mailto:unitechindia@gmail.com?subject=Product Inquiry"
                  className="flex-1 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Request Quote
                </a>
              )}

              <button
                onClick={handleToggleWishlist}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  inWishlist
                    ? "border-destructive text-destructive bg-destructive/10"
                    : "border-border hover:border-destructive hover:text-destructive"
                }`}
              >
                <Heart className={`w-6 h-6 ${inWishlist ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">Free Delivery</div>
                  <div className="text-xs text-muted-foreground">On orders over ₹500</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">Warranty</div>
                  <div className="text-xs text-muted-foreground">1 Year Manufacturer</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">Support</div>
                  <div className="text-xs text-muted-foreground">24/7 Customer Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
