import { Search, ShoppingCart, Heart, Phone, MapPin, ChevronDown, Menu, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import CartSidebar from "./CartSidebar";
import SearchModal from "./SearchModal";
import unitechLogo from "/unitech-india-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-40">
        {/* Top Bar */}
        <div className="bg-primary py-1.5 px-4">
          <div className="container mx-auto flex items-center justify-between text-xs sm:text-sm">
            <div className="hidden md:flex items-center gap-6">
              <Link to="/categories" className="flex items-center gap-1 text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                <MapPin className="w-4 h-4" />
                Browse Categories
              </Link>
              <Link to="/products" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                All Products
              </Link>
            </div>
            <div className="flex items-center gap-4 md:gap-6 ml-auto">
              <a 
                href="mailto:unitechindia@gmail.com" 
                className="flex items-center gap-1 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Contact Us</span>
              </a>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.email?.split("@")[0]}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border">
                    <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/orders")} className="cursor-pointer">
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/wishlist")} className="cursor-pointer">
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  to="/auth" 
                  className="text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                >
                  Register / Sign in
                </Link>
              )}

              <Link 
                to="/wishlist" 
                className="flex items-center gap-1 text-primary-foreground/90 hover:text-primary-foreground transition-colors relative"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-card py-4 px-4 border-b border-border">
          <div className="container mx-auto flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img src={unitechLogo} alt="Unitech" className="h-10 sm:h-12 w-auto" />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full bg-muted border border-border rounded-full py-3 px-5 text-left text-muted-foreground hover:border-primary transition-all flex items-center justify-between"
              >
                <span>Search for products, brands & more</span>
                <div className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-full transition-colors">
                  <Search className="w-5 h-5" />
                </div>
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-6 h-6" />
              </button>
              
              <a 
                href="mailto:unitechindia@gmail.com" 
                className="hidden sm:flex flex-col items-center gap-1 text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="text-xs">Support</span>
              </a>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="flex flex-col items-center gap-1 text-foreground hover:text-primary transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-xs hidden sm:block">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

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
              <Link to="/categories" className="flex items-center gap-2 text-secondary font-semibold hover:text-secondary/80 transition-colors">
                All Categories
                <ChevronDown className="w-4 h-4" />
              </Link>
              <Link to="/products/hot-selling-products" className="text-secondary font-medium hover:text-secondary/80 transition-colors">
                Hot Deals
              </Link>
              <Link to="/products" className="text-foreground font-medium hover:text-primary transition-colors">
                All Products
              </Link>
              <Link to="/products?featured=true" className="text-foreground font-medium hover:text-primary transition-colors">
                Featured
              </Link>
              <Link to="/products?trending=true" className="text-foreground font-medium hover:text-primary transition-colors">
                Trending
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-b border-border animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link to="/categories" className="block py-2 text-secondary font-medium" onClick={() => setIsMenuOpen(false)}>
                All Categories
              </Link>
              <Link to="/products/hot-selling-products" className="block py-2 text-secondary font-medium" onClick={() => setIsMenuOpen(false)}>
                Hot Deals
              </Link>
              <Link to="/products" className="block py-2 text-foreground font-medium" onClick={() => setIsMenuOpen(false)}>
                All Products
              </Link>
              <Link to="/products?featured=true" className="block py-2 text-foreground font-medium" onClick={() => setIsMenuOpen(false)}>
                Featured
              </Link>
              <Link to="/products?trending=true" className="block py-2 text-foreground font-medium" onClick={() => setIsMenuOpen(false)}>
                Trending
              </Link>
            </div>
          </div>
        )}
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
