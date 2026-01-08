import { useState, useEffect } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useNavigate } from "react-router-dom";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const { products, loading } = useProducts({
    search: debouncedQuery,
    limit: 10,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50 animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-x-0 top-0 z-50 p-4 md:p-8 animate-slide-up">
        <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for products, brands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm sm:text-base"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                Start typing to search products...
              </div>
            ) : loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No products found for "{query}"
              </div>
            ) : (
              <div className="divide-y divide-border">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      onClose();
                      // Could navigate to product detail page
                    }}
                    className="w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors text-left"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      <p className="text-secondary font-bold">
                        ₹{Number(product.price).toLocaleString()}
                      </p>
                    </div>
                    {product.discount_percent > 0 && (
                      <span className="bg-success text-success-foreground text-xs font-bold px-2 py-1 rounded">
                        {product.discount_percent}% OFF
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
