import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { ChevronLeft, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ProductsListing = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { products, loading } = useProducts({ 
    category: category || undefined,
    search: searchQuery || undefined,
    featured: searchParams.get("featured") === "true" ? true : undefined,
    trending: searchParams.get("trending") === "true" ? true : undefined,
  });

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
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header with Mobile Filter */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {category ? category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "All Products"}
            </h1>
            <p className="text-muted-foreground">
              {loading ? "Loading..." : `${filteredProducts.length} products found`}
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

        {/* Search Bar and Active Filters */}
        <div className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Desktop Layout with Sidebar */}
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-card rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </h2>
              <FilterContent />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">No products found</p>
                {activeFiltersCount > 0 ? (
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                ) : (
                  <button 
                    onClick={() => navigate("/")}
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90"
                  >
                    Back to Home
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image_url}
                    rating={Number(product.rating)}
                    reviews={product.reviews_count}
                    price={product.price ? Number(product.price) : null}
                    originalPrice={product.original_price ? Number(product.original_price) : null}
                    discount={product.discount_percent}
                    category={product.category}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductsListing;
