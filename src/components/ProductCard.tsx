import { Star, Heart, ShoppingCart, GitCompare } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  discount: number;
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
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const liked = isInWishlist(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(id);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(id);
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden card-hover shadow-card group">
      {/* Image Container */}
      <div className="relative bg-white p-4 aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-success text-success-foreground text-xs font-bold px-2 py-1 rounded-md">
            {discount}% OFF
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              liked 
                ? "bg-destructive text-destructive-foreground" 
                : "bg-card text-foreground hover:bg-destructive hover:text-destructive-foreground"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          </button>
          <button className="p-2 bg-card rounded-full shadow-lg text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            <GitCompare className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? "text-secondary fill-secondary"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviews})
          </span>
        </div>

        {/* Name */}
        <h3 className="font-medium text-foreground line-clamp-2 text-xs sm:text-sm leading-snug min-h-[2.5rem]">
          {name}
        </h3>

        {/* Price */}
        <div className="space-y-1">
          <p className="text-xs text-secondary font-medium">Special Price</p>
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-foreground">
              ₹{price.toLocaleString()}
            </span>
            {originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
