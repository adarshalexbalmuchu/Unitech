import { Search, ShoppingCart, Heart, Menu, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import CartSidebar from "./CartSidebar";
import SearchModal from "./SearchModal";
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
      <header className="sticky top-0 z-40 border-b border-border/40 backdrop-blur-md bg-background/90">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img src={`${import.meta.env.BASE_URL}new-logo.png`} alt="Unitech" className="h-9 w-auto" />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="flex-1 max-w-xl hidden md:block">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full bg-card/30 border border-border/40 rounded-full py-2 px-5 text-left text-muted-foreground hover:bg-card/50 hover:border-border/60 transition-all flex items-center justify-between group"
              >
                <span className="text-sm">Search products...</span>
                <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground/80 transition-colors" strokeWidth={1.5} />
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search - Mobile */}
              <button 
                className="md:hidden p-2 text-foreground/60 hover:text-foreground hover:bg-card/30 rounded-full transition-all"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              
              {/* User */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-2 text-foreground/60 hover:text-foreground hover:bg-card/30 rounded-full transition-all">
                    <User className="w-5 h-5" strokeWidth={1.5} />
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
                  className="p-2 text-foreground/60 hover:text-foreground hover:bg-card/30 rounded-full transition-all"
                  aria-label="Sign in"
                >
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </Link>
              )}

              {/* Wishlist */}
              <Link 
                to="/wishlist" 
                className="p-2 text-foreground/60 hover:text-foreground hover:bg-card/30 rounded-full transition-all relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-semibold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              {/* Cart */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-foreground/60 hover:text-foreground hover:bg-card/30 rounded-full transition-all relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-semibold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu */}
              <button 
                className="md:hidden p-2 text-foreground/60 hover:text-foreground hover:bg-card/30 rounded-full transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 border-t border-border/30 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-3 space-y-1">
              <Link to="/categories" className="block py-2 px-3 text-foreground hover:bg-card/50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                All Categories
              </Link>
              <Link to="/products/hot-selling-products" className="block py-2 px-3 text-foreground hover:bg-card/50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Hot Deals
              </Link>
              <Link to="/products" className="block py-2 px-3 text-foreground hover:bg-card/50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                All Products
              </Link>
              <Link to="/products?featured=true" className="block py-2 px-3 text-foreground hover:bg-card/50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                Featured
              </Link>
              <Link to="/products?trending=true" className="block py-2 px-3 text-foreground hover:bg-card/50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
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
