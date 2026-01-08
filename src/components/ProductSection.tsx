import { useState } from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState<"new" | "trending">("new");

  const { products: newProducts, loading: loadingNew } = useProducts({ featured: true, limit: 4 });
  const { products: trendingProducts, loading: loadingTrending } = useProducts({ trending: true, limit: 4 });

  const products = activeTab === "new" ? newProducts : trendingProducts;
  const loading = activeTab === "new" ? loadingNew : loadingTrending;

  return (
    <section className="py-10 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8 sm:mb-12">
          <button
            onClick={() => setActiveTab("new")}
            className={`text-lg sm:text-xl font-display font-bold transition-all duration-300 pb-2 border-b-2 ${
              activeTab === "new"
                ? "text-foreground border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            New Arrivals
          </button>
          <button
            onClick={() => setActiveTab("trending")}
            className={`text-lg sm:text-xl font-display font-bold transition-all duration-300 pb-2 border-b-2 ${
              activeTab === "trending"
                ? "text-secondary border-secondary"
                : "text-muted-foreground border-transparent hover:text-secondary"
            }`}
          >
            Trending
          </button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, index) => (
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
                  price={Number(product.price)}
                  originalPrice={Number(product.original_price)}
                  discount={product.discount_percent}
                />
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-3 rounded-full transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
