import { Search, ShoppingCart, Heart, User, Phone, MapPin, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="flex items-center gap-1 text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              <MapPin className="w-4 h-4" />
              Store Locator
            </a>
            <a href="#" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              Track Your Order
            </a>
          </div>
          <div className="flex items-center gap-4 md:gap-6 ml-auto">
            <a href="#" className="flex items-center gap-1 text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Contact Us</span>
            </a>
            <a href="#" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              Register / Sign in
            </a>
            <a href="#" className="flex items-center gap-1 text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card py-4 px-4 border-b border-border">
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-primary rounded-lg p-2">
              <span className="text-primary-foreground font-display font-bold text-xl">KE</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-xl text-foreground leading-tight">KOHINOOR</h1>
              <p className="text-xs text-secondary">Electronics Store</p>
            </div>
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands & more"
                className="w-full bg-muted border border-border rounded-full py-3 px-5 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="md:hidden p-2 text-foreground hover:text-primary transition-colors">
              <Search className="w-6 h-6" />
            </button>
            
            <a href="#" className="hidden sm:flex flex-col items-center gap-1 text-foreground hover:text-primary transition-colors">
              <Phone className="w-5 h-5" />
              <span className="text-xs">Support</span>
            </a>
            
            <a href="#" className="flex flex-col items-center gap-1 text-foreground hover:text-primary transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs hidden sm:block">Cart</span>
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </a>

            <button 
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center gap-8 py-3">
            <button className="flex items-center gap-2 text-secondary font-semibold hover:text-secondary/80 transition-colors">
              All Categories
              <ChevronDown className="w-4 h-4" />
            </button>
            <a href="#" className="text-secondary font-medium hover:text-secondary/80 transition-colors">
              Hot Deals
            </a>
            <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">
              Brands Store
            </a>
            <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">
              New Arrivals
            </a>
            <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">
              Best Sellers
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-muted border border-border rounded-full py-2 px-4 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            <a href="#" className="block py-2 text-secondary font-medium">All Categories</a>
            <a href="#" className="block py-2 text-secondary font-medium">Hot Deals</a>
            <a href="#" className="block py-2 text-foreground font-medium">Brands Store</a>
            <a href="#" className="block py-2 text-foreground font-medium">New Arrivals</a>
            <a href="#" className="block py-2 text-foreground font-medium">Best Sellers</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
