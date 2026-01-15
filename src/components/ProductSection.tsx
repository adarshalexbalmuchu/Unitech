import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { SlidersHorizontal, X, Speaker, Radio, Car, Zap, Settings, Flame, Grid3x3 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const ProductSection = () => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { products, loading } = useProducts({});

  // Category links
  const categories = [
    { name: "All Products", path: "/products", icon: Grid3x3 },
    { name: "Tower Speakers", path: "/products/tower-speakers", icon: Speaker },
    { name: "Home Theatre", path: "/products/home-theatre-systems", icon: Speaker },
    { name: "DTH Receivers", path: "/products/dth-receivers", icon: Radio },
    { name: "Car Audio", path: "/products/car-stereo-systems", icon: Car },
    { name: "Power Strips", path: "/products/power-strips", icon: Zap },
    { name: "Audio Parts", path: "/products/speakers", icon: Settings },
    { name: "Amplifiers", path: "/products/audio-amplifiers", icon: Speaker },
    { name: "Hot Deals", path: "/products/hot-selling-products", icon: Flame },
  ];

  // Get unique brands from products
  const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean))) as string[];

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Brand filter
    if (selectedBrand && product.brand !== selectedBrand) return false;

    // Price range filter
    if (priceRange !== "all") {
      const price = product.price || 0;
      if (priceRange === "under-5000" && price >= 5000) return false;
      if (priceRange === "5000-10000" && (price < 5000 || price >= 10000)) return false;
      if (priceRange === "10000-25000" && (price < 10000 || price >= 25000)) return false;
      if (priceRange === "25000-plus" && price < 25000) return false;
    }

    return true;
  });

  const activeFiltersCount = (selectedBrand ? 1 : 0) + (priceRange !== "all" ? 1 : 0);

  const clearFilters = () => {
    setSelectedBrand("");
    setPriceRange("all");
  };

  // FilterContent component
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Brand Filter */}
      {brands.length > 0 && (
        <div>
          <h3 className="font-semibold text-foreground mb-3">Brand</h3>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedBrand("")}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                !selectedBrand 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              }`}
            >
              All Brands
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedBrand === brand 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Prices" },
            { value: "under-5000", label: "Under ₹5,000" },
            { value: "5000-10000", label: "₹5,000 - ₹10,000" },
            { value: "10000-25000", label: "₹10,000 - ₹25,000" },
            { value: "25000-plus", label: "₹25,000 & Above" },
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setPriceRange(range.value)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                priceRange === range.value 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button 
          onClick={clearFilters} 
          variant="outline" 
          className="w-full"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Category Navigation Bar */}
        <div className="mb-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="group whitespace-nowrap px-5 py-3 text-sm font-semibold text-foreground/70 hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-primary/80 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 flex-shrink-0 flex items-center gap-2"
              >
                <category.icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                {category.name}
              </Link>
            ))}
            <Link
              to="/products?featured=true"
              className="whitespace-nowrap px-5 py-3 text-sm font-semibold text-foreground/70 hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-primary/80 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 flex-shrink-0"
            >
              Featured
            </Link>
            <Link
              to="/products?trending=true"
              className="whitespace-nowrap px-5 py-3 text-sm font-semibold text-foreground/70 hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-primary/80 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 flex-shrink-0"
            >
              Trending
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">All Products</h2>
            <p className="text-muted-foreground">
              {loading ? "Loading..." : `${filteredProducts.length} products available`}
            </p>
          </div>

          {/* Mobile Filter Button */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedBrand && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                Brand: {selectedBrand}
                <button onClick={() => setSelectedBrand("")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {priceRange !== "all" && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {priceRange === "under-5000" && "Under ₹5,000"}
                {priceRange === "5000-10000" && "₹5,000 - ₹10,000"}
                {priceRange === "10000-25000" && "₹10,000 - ₹25,000"}
                {priceRange === "25000-plus" && "₹25,000+"}
                <button onClick={() => setPriceRange("all")}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Desktop Layout with Sidebar */}
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar - Always visible */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-card rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </h3>
              <FilterContent />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-24">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/10"></div>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">No products found</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
