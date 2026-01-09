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
      <header className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-sm bg-background/95">
        {/* Top Bar */}
        <div className="bg-primary/95 py-2 px-4">
          <div className="container mx-auto flex items-center justify-between text-xs">
            <div className="hidden md:flex items-center gap-8">
              <Link to="/categories" className="flex items-center gap-1.5 text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                Browse Categories
              </Link>
              <Link to="/products" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                All Products
              </Link>
            </div>
            <div className="flex items-center gap-6 ml-auto">
              <a 
                href="mailto:unitechindia@gmail.com" 
                className="flex items-center gap-1.5 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="hidden sm:inline">Contact Us</span>
              </a>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                    <User className="w-3.5 h-3.5" strokeWidth={1.5} />
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
                      <LogOut className="w-4 h-4 mr-2" strokeWidth={1.5} />
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
                className="flex items-center gap-1.5 text-primary-foreground/90 hover:text-primary-foreground transition-colors relative"
              >
                <Heart className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="hidden sm:inline">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-background text-foreground text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center border border-primary">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-background/95 py-3 px-4">
          <div className="container mx-auto flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img src={unitechLogo} alt="Unitech" className="h-10 sm:h-11 w-auto" />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full bg-card/50 border border-border/50 rounded-lg py-2.5 px-4 text-left text-muted-foreground hover:border-border transition-all flex items-center justify-between"
              >
                <span className="text-sm">Search for products, brands & more</span>
                <Search className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              <button 
                className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              
              <a 
                href="mailto:unitechindia@gmail.com" 
                className="hidden sm:flex flex-col items-center gap-0.5 text-foreground/70 hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-[10px]">Support</span>
              </a>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="flex flex-col items-center gap-0.5 text-foreground/70 hover:text-foreground transition-colors relative"
              >
                <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-[10px] hidden sm:block">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-background/95 border-t border-border/30">
          <div className="container mx-auto px-4">
            <div className="hidden md:flex items-center gap-10 py-2.5">
              <Link to="/categories" className="flex items-center gap-1.5 text-primary font-medium text-sm hover:text-primary/80 transition-colors">
                All Categories
                <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
              <Link to="/products/hot-selling-products" className="text-primary/90 font-medium text-sm hover:text-primary transition-colors">
                Hot Deals
              </Link>
              <Link to="/products" className="text-foreground/70 font-medium text-sm hover:text-foreground transition-colors">
                All Products
              </Link>
              <Link to="/products?featured=true" className="text-foreground/70 font-medium text-sm hover:text-foreground transition-colors">
                Featured
              </Link>
              <Link to="/products?trending=true" className="text-foreground/70 font-medium text-sm hover:text-foreground transition-colors">
                Trending
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card/95 border-t border-border/30 animate-fade-in backdrop-blur-sm">
            <div className="container mx-auto px-4 py-3 space-y-1">
              <Link to="/categories" className="block py-2.5 text-primary font-medium text-sm" onClick={() => setIsMenuOpen(false)}>
                All Categories
              </Link>
              <Link to="/products/hot-selling-products" className="block py-2.5 text-primary/90 font-medium text-sm" onClick={() => setIsMenuOpen(false)}>
                Hot Deals
              </Link>
              <Link to="/products" className="block py-2.5 text-foreground font-medium text-sm" onClick={() => setIsMenuOpen(false)}>
                All Products
              </Link>
              <Link to="/products?featured=true" className="block py-2.5 text-foreground font-medium text-sm" onClick={() => setIsMenuOpen(false)}>
                Featured
              </Link>
              <Link to="/products?trending=true" className="block py-2.5 text-foreground font-medium text-sm" onClick={() => setIsMenuOpen(false)}>
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
