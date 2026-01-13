import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState<"new" | "trending">("new");
  const navigate = useNavigate();

  const { products: newProducts, loading: loadingNew } = useProducts({ featured: true, limit: 4 });
  const { products: trendingProducts, loading: loadingTrending } = useProducts({ trending: true, limit: 4 });

  const products = activeTab === "new" ? newProducts : trendingProducts;
  const loading = activeTab === "new" ? loadingNew : loadingTrending;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header - More modern */}
        <div className="flex flex-col items-center mb-12 sm:mb-16">
          <div className="flex items-center gap-8 sm:gap-12 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-2 shadow-xl">
            <button
              onClick={() => setActiveTab("new")}
              className={`relative px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold transition-all duration-300 rounded-xl ${
                activeTab === "new"
                  ? "text-white bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab("trending")}
              className={`relative px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold transition-all duration-300 rounded-xl ${
                activeTab === "trending"
                  ? "text-white bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Trending
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/10"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">{products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  image={product.image_url}
                  rating={Number(product.rating)}
                  reviews={product.reviews_count}
                  price={product.price ? Number(product.price) : null}
                  originalPrice={product.original_price ? Number(product.original_price) : null}
                  discount={product.discount_percent}
                />
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <button 
            onClick={() => navigate("/products")}
            className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-3 rounded-full transition-all duration-300"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
