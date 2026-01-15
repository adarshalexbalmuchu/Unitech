import { Star, Heart, ShoppingCart, GitCompare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useCompare } from "@/hooks/useCompare";
import { toast } from "sonner";
import LazyImage from "./LazyImage";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number | null;
  originalPrice: number | null;
  discount: number;
  category?: string;
}

const ProductCard = ({
  id,
  name,
  image,
  rating,
  reviews,
  price,
  originalPrice,
  discount,
  category,
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare, compareProducts } = useCompare();
  const navigate = useNavigate();
  
  const liked = isInWishlist(id);
  const inCompare = isInCompare(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // If already in compare, remove it
    if (inCompare) {
      removeFromCompare(id);
      toast.success("Removed from compare");
      return;
    }
    
    // Check if we can add more
    if (compareProducts.length >= 4) {
      toast.error("Maximum 4 products can be compared");
      return;
    }
    
    // Add to compare
    addToCompare({
      id,
      name,
      image_url: image,
      price,
      original_price: originalPrice,
      rating,
      category: "",
      brand: null,
      description: null,
      discount_percent: discount,
    });
    
    toast.success("Added to compare");
  };

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-gradient-to-br from-card to-card/50 rounded-2xl overflow-hidden border border-border/40 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group cursor-pointer backdrop-blur-sm"
    >
      {/* Image Container */}
      <div className="relative bg-gradient-to-br from-background to-muted/20 p-6 aspect-square overflow-hidden">
        <LazyImage
          src={image}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
          wrapperClassName="w-full h-full"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-destructive to-destructive/80 text-white font-bold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm animate-pulse">
            <span className="text-sm">-{discount}%</span>
          </div>
        )}

        {/* Quick Actions - Modern glass morphism style */}
        <div className="absolute top-4 right-4 flex flex-col gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleToggleWishlist}
            className={`p-2.5 rounded-xl backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-125 active:scale-95 ${
              liked 
                ? "bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-red-500/50" 
                : "bg-white/95 text-gray-700 hover:bg-gradient-to-br hover:from-red-500 hover:to-pink-500 hover:text-white hover:shadow-red-500/50"
            }`}
            title={liked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} strokeWidth={2.5} />
          </button>
          <button
            onClick={handleToggleCompare}
            className={`p-2.5 rounded-xl backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-125 active:scale-95 ${
              inCompare
                ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-blue-500/50"
                : "bg-white/95 text-gray-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 hover:text-white hover:shadow-blue-500/50"
            }`}
            title={inCompare ? "Remove from compare" : "Add to compare"}
          >
            <GitCompare className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Rating - subtle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(rating)
                    ? "text-primary/70 fill-primary/70"
                    : "text-muted-foreground/30"
                }`}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({reviews})
          </span>
        </div>

        {/* Category Badge */}
        {category && (
          <div className="mb-2">
            <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
              {category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
        )}

        {/* Name */}
        <h3 className="font-semibold text-foreground line-clamp-2 text-base leading-tight min-h-[2.8rem] group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Price */}
        <div className="space-y-1.5">
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              ₹{(price || 0).toLocaleString()}
            </span>
            {originalPrice && originalPrice > (price || 0) && (
              <span className="text-sm text-muted-foreground/60 line-through font-medium">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Actions - Modern gradient style */}
        <div className="flex items-center gap-2 pt-3">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground font-semibold py-3 px-5 rounded-xl text-sm flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-xl hover:shadow-primary/50 hover:scale-105 active:scale-95 group/btn"
          >
            <ShoppingCart className="w-5 h-5 group-hover/btn:animate-bounce" strokeWidth={2} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
