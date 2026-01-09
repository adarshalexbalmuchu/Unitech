import { Star, Heart, ShoppingCart, GitCompare } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number | null;
  originalPrice: number | null;
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
    <div className="bg-card rounded-lg overflow-hidden border border-border/40 hover:border-border transition-all duration-300 group">
      {/* Image Container */}
      <div className="relative bg-muted/20 p-4 aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
        />
        
        {/* Discount Badge - minimal */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-success/10 text-success border border-success/20 text-xs font-medium px-2 py-1 rounded">
            -{discount}%
          </span>
        )}

        {/* Quick Actions - subtle */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-md backdrop-blur-sm transition-colors ${
              liked 
                ? "bg-destructive/90 text-destructive-foreground border border-destructive" 
                : "bg-card/90 text-foreground border border-border hover:border-destructive hover:text-destructive"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} strokeWidth={1.5} />
          </button>
          <button className="p-2 bg-card/90 backdrop-blur-sm rounded-md text-foreground border border-border hover:border-primary hover:text-primary transition-colors">
            <GitCompare className="w-3.5 h-3.5" strokeWidth={1.5} />
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

        {/* Name */}
        <h3 className="font-medium text-foreground line-clamp-2 text-sm leading-snug min-h-[2.5rem]">
          {name}
        </h3>

        {/* Price */}
        <div className="space-y-1">
          {price === null ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-semibold text-primary">
                  Price on Request
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                unitechindia@gmail.com
              </p>
            </>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold text-foreground">
                  ₹{price.toLocaleString()}
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Actions - outline style */}
        <div className="flex items-center gap-2 pt-2">
          {price === null ? (
            <a 
              href="mailto:unitechindia@gmail.com?subject=Price Inquiry"
              className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-all"
            >
              Request Quote
            </a>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
