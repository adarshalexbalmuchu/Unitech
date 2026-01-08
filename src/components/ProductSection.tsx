import { useState } from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra 5G (256GB, Titanium Black)",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 2341,
    price: 124999,
    originalPrice: 149999,
    discount: 17,
    category: "new",
  },
  {
    id: 2,
    name: "LG 1.5 Ton 5 Star AI Dual Inverter Split AC",
    image: "https://images.unsplash.com/photo-1631083215283-b1e676a64e83?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 1856,
    price: 45990,
    originalPrice: 72990,
    discount: 37,
    category: "trending",
  },
  {
    id: 3,
    name: 'Sony 65" Bravia XR OLED 4K Smart TV',
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 892,
    price: 189990,
    originalPrice: 249990,
    discount: 24,
    category: "new",
  },
  {
    id: 4,
    name: "Apple MacBook Air M3 15-inch (8GB, 256GB)",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 3421,
    price: 134900,
    originalPrice: 149900,
    discount: 10,
    category: "trending",
  },
  {
    id: 5,
    name: "boAt Rockerz 551 ANC Wireless Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 8765,
    price: 1999,
    originalPrice: 4999,
    discount: 60,
    category: "trending",
  },
  {
    id: 6,
    name: "Samsung 653L Side by Side Refrigerator",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 567,
    price: 89990,
    originalPrice: 129990,
    discount: 31,
    category: "new",
  },
  {
    id: 7,
    name: "Apple Watch Series 9 GPS 45mm",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 2134,
    price: 44900,
    originalPrice: 49900,
    discount: 10,
    category: "new",
  },
  {
    id: 8,
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 4532,
    price: 26990,
    originalPrice: 34990,
    discount: 23,
    category: "trending",
  },
];

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState<"new" | "trending">("new");

  const filteredProducts = products.filter((p) => p.category === activeTab);

  return (
    <section className="py-10 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8 sm:mb-12">
          <button
            onClick={() => setActiveTab("new")}
            className={`text-xl sm:text-2xl font-display font-bold transition-all duration-300 pb-2 border-b-2 ${
              activeTab === "new"
                ? "text-foreground border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            New Arrivals
          </button>
          <button
            onClick={() => setActiveTab("trending")}
            className={`text-xl sm:text-2xl font-display font-bold transition-all duration-300 pb-2 border-b-2 ${
              activeTab === "trending"
                ? "text-secondary border-secondary"
                : "text-muted-foreground border-transparent hover:text-secondary"
            }`}
          >
            Trending
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard
                name={product.name}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
              />
            </div>
          ))}
        </div>

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
