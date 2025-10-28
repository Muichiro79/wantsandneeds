import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LogIn,
  // Search,
  Heart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import { auth } from "../firebase/config";

// Import your logo - make sure to add logo.png to your assets
// import logo from "../assets/logo.png";

interface DropdownItem {
  name: string;
  href: string;
  tag?: string;
}

interface NavLink {
  name: string;
  href: string;
  items?: DropdownItem[];
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(2);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    {
      name: "Shop",
      href: "/shop",
      items: [
        { name: "Hoodies", href: "/shop" },
        { name: "Sweatpants", href: "/shop" },
        { name: "All", href: "/shop", tag: "Sale" },
      ],
    },
    {
      name: "About",
      href: "/about",
      items: [
        { name: "Our Story", href: "/about" },
        { name: "Lookbook", href: "/about" },
        { name: "Sustainability", href: "/about" },
      ],
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSearch(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleWishlistClick = () => {
    if (user) {
      navigate("/profile", { state: { activeTab: 'wishlist' } });
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header
        className={`border-b-2 border-b-gray-800 fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
          isScrolled
            ? "bg-white/95 dark:bg-black/95 shadow-lg py-2"
            : "bg-white/90 dark:bg-black/90 py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="shrink-0">
              <Link
                to="/"
                className="block hover:scale-105 transition-transform duration-300"
              >
                {/* <img 
                  src={logo} 
                  alt="W&N Streetwear" 
                  className="h-6 sm:h-7 md:h-8 w-auto dark:invert"
                /> */}
                <span className="text-2xl font-bold text-black dark:text-white">W&N</span>
              </Link>
            </div>

            {/* Desktop Navigation - Show only on large screens */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center gap-1 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg px-3 py-2">
                {navLinks.map((link) => (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => link.items && setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={link.href}
                      className="px-6 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all rounded-full hover:bg-white/60 dark:hover:bg-gray-800/60 flex items-center gap-2 group"
                    >
                      {link.name}
                      {link.items && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === link.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {link.items && activeDropdown === link.name && (
                      <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-xl py-2 z-50 animate-in fade-in-0 zoom-in-95">
                        {link.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors group"
                          >
                            <span>{item.name}</span>
                            {item.tag && (
                              <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                item.tag === "Sale" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                              }`}>
                                {item.tag}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Desktop Search Bar */}
              {showSearch && (
                <div className="hidden lg:flex items-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg px-4 py-2">
                  <form onSubmit={handleSearch} className="flex items-center gap-2">
                    {/* <Search className="w-4 h-4 text-gray-500" /> */}
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 w-48"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowSearch(false)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* Desktop Icons Container - Show only on desktop */}
              <div className="hidden lg:flex items-center gap-1 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg px-3 py-2">
                {/* Search */}
                <button 
                  onClick={() => setShowSearch(!showSearch)}
                  className="p-2 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-full transition-all duration-300 group"
                >
                  {/* <Search className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" /> */}
                </button>

                {/* Wishlist - Goes to profile with wishlist tab active */}
                <button
                  onClick={handleWishlistClick}
                  className="relative p-2 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-full transition-all group"
                >
                  <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative p-2 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-full transition-all group"
                >
                  <ShoppingBag className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Auth Buttons */}
                {user ? (
                  <div className="flex items-center gap-1">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 p-2 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-full transition-all group"
                    >
                      <User className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        {user.email?.split("@")[0]}
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-2 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-full transition-all group"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-90 transition-all hover:scale-105 shadow-sm text-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

              {/* Mobile & Tablet Icons Container - Show on mobile AND tablet */}
              <div className="lg:hidden flex items-center gap-1 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg px-3 py-2">
                {/* Search */}
                <button 
                  onClick={() => setShowSearch(!showSearch)}
                  className="p-2 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-full transition-all group"
                >
                  {/* <Search className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" /> */}
                </button>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative p-2 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-full transition-all group"
                >
                  <ShoppingBag className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Profile - Show for logged in users */}
                {user && (
                  <Link
                    to="/profile"
                    className="p-2 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-full transition-all group"
                  >
                    <User className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  </Link>
                )}

                {/* Logout - Only show if user is logged in */}
                {user && (
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-full transition-all group"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  </button>
                )}

                {/* Sign In - Only show if user is NOT logged in */}
                {!user && (
                  <Link
                    to="/login"
                    className="p-2 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-full transition-all group"
                  >
                    <LogIn className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  </Link>
                )}

                {/* Menu Button - For both mobile and tablet */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-full transition-all group"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showSearch && (
            <div className="lg:hidden mt-3 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg px-4 py-3">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                {/* <Search className="w-4 h-4 text-gray-500" /> */}
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile & Tablet Menu - Show on mobile AND tablet */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-xl animate-in slide-in-from-top-5">
            <div className="px-4 py-6 space-y-6">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-3">
                  <Link
                    to={link.href}
                    className="block text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.items && (
                    <div className="pl-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-700">
                      {link.items.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.name}</span>
                            {item.tag && (
                              <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                item.tag === "Sale" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                              }`}>
                                {item.tag}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile & Tablet Only Actions */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {/* Profile Link - Mobile */}
                {user && (
                  <div className="mb-4">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>My Profile</span>
                    </Link>
                  </div>
                )}

                {/* Wishlist - Goes to profile with wishlist tab */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => {
                      handleWishlistClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                </div>

                {user && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Signed in as {user.email?.split("@")[0]}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Add top padding to account for fixed header */}
      <div className="pt-16 sm:pt-20" />
    </>
  );
};

export default Header;