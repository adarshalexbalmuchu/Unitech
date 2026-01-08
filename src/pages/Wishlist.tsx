import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { user } = useAuth();
  const { wishlistItems, loading, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Sign in to view your Wishlist
          </h1>
          <p className="text-muted-foreground mb-8">
            Save your favorite products and access them anytime
          </p>
          <Button 
            onClick={() => navigate("/auth")}
            className="gradient-gold text-secondary-foreground"
          >
            Sign In
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          My Wishlist ({wishlistItems.length})
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Start adding products you love!
            </p>
            <Button 
              onClick={() => navigate("/")}
              className="gradient-gold text-secondary-foreground"
            >
              Explore Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl overflow-hidden shadow-card group"
              >
                <div className="relative bg-white p-4 aspect-square">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                  {item.product.discount_percent > 0 && (
                    <span className="absolute top-3 left-3 bg-success text-success-foreground text-xs font-bold px-2 py-1 rounded-md">
                      {item.product.discount_percent}% OFF
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-medium text-foreground line-clamp-2 text-sm min-h-[2.5rem]">
                    {item.product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-foreground">
                      ₹{Number(item.product.price).toLocaleString()}
                    </span>
                    {Number(item.product.original_price) > Number(item.product.price) && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{Number(item.product.original_price).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => addToCart(item.product_id)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(item.product_id)}
                      className="p-2 bg-muted hover:bg-destructive hover:text-destructive-foreground rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Wishlist;
