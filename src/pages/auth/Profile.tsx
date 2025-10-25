import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut,
  Package,
  Menu,
  X,
  Trash2
} from "lucide-react";

interface Order {
  id: string;
  userEmail: string;
  items: any[];
  total: number;
  status: string;
  createdAt: any;
}

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  addedAt: any;
}

interface UserData {
  uid: string;
  email: string;
  fullName?: string;
  username?: string;
  displayName?: string;
  photoURL?: string;
  createdAt?: any;
}

export default function Profile() {
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist' | 'settings'>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistError, setWishlistError] = useState<string | null>(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
      
      if (currentUser) {
        fetchUserData(currentUser);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (currentUser: any) => {
    if (!currentUser?.uid) {
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching user data for UID:", currentUser.uid);
      
      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        console.log("User data found:", userDoc.data());
        setUserData(userDoc.data() as UserData);
      } else {
        console.log("No user data found in Firestore");
      }

      // Fetch user orders
      const ordersRef = collection(db, "orders");
      const ordersQuery = query(ordersRef, where("userEmail", "==", currentUser.email));
      const ordersSnapshot = await getDocs(ordersQuery);
      
      const ordersData: Order[] = [];
      ordersSnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() } as Order);
      });

      console.log("Orders found:", ordersData.length);

      // Sort by date (newest first)
      ordersData.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

      setOrders(ordersData);

      // Fetch user wishlist - WITH ERROR HANDLING
      try {
        console.log("Attempting to fetch wishlist for user:", currentUser.uid);
        const wishlistRef = collection(db, "wishlists");
        const wishlistQuery = query(wishlistRef, where("userId", "==", currentUser.uid));
        const wishlistSnapshot = await getDocs(wishlistQuery);
        
        console.log("Wishlist query completed, docs:", wishlistSnapshot.size);
        
        const wishlistData: WishlistItem[] = [];
        wishlistSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Wishlist doc:", doc.id, data);
          wishlistData.push({ 
            id: doc.id, 
            ...data 
          } as WishlistItem);
        });

        console.log("Wishlist items found:", wishlistData.length);

        // Sort wishlist by date added (newest first)
        wishlistData.sort((a, b) => {
          const dateA = a.addedAt?.toDate?.() || new Date(0);
          const dateB = b.addedAt?.toDate?.() || new Date(0);
          return dateB.getTime() - dateA.getTime();
        });

        setWishlist(wishlistData);
        setWishlistError(null);
      } catch (wishlistError) {
        console.error("Error fetching wishlist:", wishlistError);
        setWishlistError("Failed to load wishlist. Please check console for details.");
        setWishlist([]);
      }

    } catch (error) {
      console.error("Error fetching user data:", error);
      setWishlistError("Error loading profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error: any) {
      alert("Error logging out: " + error.message);
    }
  };

  const handleRemoveFromWishlist = async (wishlistItemId: string) => {
    try {
      await deleteDoc(doc(db, "wishlists", wishlistItemId));
      // Remove from local state
      setWishlist(wishlist.filter(item => item.id !== wishlistItemId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Error removing item from wishlist");
    }
  };

  // Format date for display
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown date";
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "Invalid date";
    }
  };

  // Get display name - prioritize username, then fullName, then displayName, then email
  const getDisplayName = () => {
    if (userData?.username) return `@${userData.username}`;
    if (userData?.fullName) return userData.fullName;
    if (userData?.displayName) return userData.displayName;
    if (user?.displayName) return user.displayName;
    return "User";
  };

  // Get the main name for the profile header
  const getMainName = () => {
    if (userData?.fullName) return userData.fullName;
    if (userData?.displayName) return userData.displayName;
    if (user?.displayName) return user.displayName;
    return "User";
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Show loading while checking auth state
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 dark:border-neutral-700 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-neutral-400 text-lg font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center border border-gray-200 dark:border-neutral-800">
          <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2 dark:text-white">Not Logged In</h2>
          <p className="text-gray-600 dark:text-neutral-400 mb-6">
            Please sign in to access your profile.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Real stats based on database
  const stats = [
    { label: "Orders", value: orders.length.toString(), icon: ShoppingBag },
    { label: "Wishlist", value: wishlist.length.toString(), icon: Heart },
  ];

  // Get recent orders (last 5)
  const recentOrders = orders.slice(0, 5).map(order => ({
    id: `#${order.id.slice(-6).toUpperCase()}`,
    date: formatDate(order.createdAt),
    status: order.status || "Processing",
    total: `$${order.total?.toFixed(2) || "0.00"}`
  }));

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 dark:border-neutral-700 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-neutral-400 text-lg font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleMobileMenu}
            className="w-full flex items-center justify-between bg-white dark:bg-neutral-900 rounded-xl p-4 border border-gray-200 dark:border-neutral-800"
          >
            <span className="font-semibold dark:text-white">Profile Menu</span>
            {mobileMenuOpen ? (
              <X className="w-5 h-5 dark:text-white" />
            ) : (
              <Menu className="w-5 h-5 dark:text-white" />
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          
          {/* Sidebar Tabs - Mobile & Desktop */}
          <div className={`lg:w-1/4 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-4 border border-gray-200 dark:border-neutral-800">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-black dark:bg-white text-white dark:text-black font-semibold'
                        : 'text-gray-600 dark:text-neutral-400 hover:bg-gray-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="text-sm sm:text-base">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-4 sm:space-y-6">
            
            {/* Profile Header */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-neutral-800">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={user.photoURL || userData?.photoURL || `https://ui-avatars.com/api/?name=${user.email}&size=200&background=000&color=fff`}
                  alt="Profile"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 border-gray-200 dark:border-neutral-700"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-xl sm:text-2xl font-bold dark:text-white mb-1">
                    {getMainName()}
                  </h1>
                  {userData?.username && (
                    <p className="text-gray-500 dark:text-neutral-400 text-sm sm:text-base mb-1">
                      @{userData.username}
                    </p>
                  )}
                  <p className="text-gray-600 dark:text-neutral-400 mb-3 text-sm sm:text-base">{user.email}</p>
                  
                  <div className="flex justify-center sm:justify-start gap-4 sm:gap-6">
                    {stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="flex items-center gap-2 mb-1">
                          <stat.icon className="w-4 h-4 text-gray-400" />
                          <span className="text-base sm:text-lg font-bold dark:text-white">{stat.value}</span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto px-4 py-2 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 mt-4 sm:mt-0"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Logout</span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-4 sm:space-y-6">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-neutral-800">
                    <h2 className="text-lg sm:text-xl font-bold dark:text-white mb-4">Recent Orders</h2>
                    <div className="space-y-3 sm:space-y-4">
                      {recentOrders.length > 0 ? (
                        recentOrders.map((order, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg gap-3"
                          >
                            <div className="flex items-center gap-3">
                              <Package className="w-5 h-5 text-gray-400 shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="font-medium dark:text-white text-sm sm:text-base truncate">{order.id}</p>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">{order.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-2">
                              <p className="font-bold dark:text-white text-sm sm:text-base">{order.total}</p>
                              <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                                order.status === 'Delivered'
                                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'
                                  : order.status === 'Shipped'
                                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 sm:py-8">
                          <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                          <p className="text-gray-600 dark:text-neutral-400 text-sm sm:text-base">No orders yet</p>
                          <button 
                            onClick={() => navigate('/shop')}
                            className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium text-sm sm:text-base"
                          >
                            Start Shopping
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-neutral-800">
                    <h2 className="text-lg sm:text-xl font-bold dark:text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <button 
                        onClick={() => setActiveTab('orders')}
                        className="p-3 sm:p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <Package className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-gray-600 dark:text-neutral-400" />
                        <span className="text-xs sm:text-sm font-medium dark:text-white block">My Orders ({orders.length})</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('wishlist')}
                        className="p-3 sm:p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <Heart className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-gray-600 dark:text-neutral-400" />
                        <span className="text-xs sm:text-sm font-medium dark:text-white block">Wishlist ({wishlist.length})</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-neutral-800">
                  <h2 className="text-lg sm:text-xl font-bold dark:text-white mb-4 sm:mb-6">My Orders ({orders.length})</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-gray-400 shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium dark:text-white text-sm sm:text-base">#{order.id.slice(-6).toUpperCase()}</p>
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400">
                                {formatDate(order.createdAt)} • {order.items?.length || 0} items
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-2">
                            <p className="font-bold dark:text-white text-sm sm:text-base">${order.total?.toFixed(2) || "0.00"}</p>
                            <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300'
                                : order.status === 'Shipped'
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300'
                            }`}>
                              {order.status || "Processing"}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 sm:py-8">
                        <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                        <p className="text-gray-600 dark:text-neutral-400 text-sm sm:text-base">No orders yet</p>
                        <button 
                          onClick={() => navigate('/shop')}
                          className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium text-sm sm:text-base"
                        >
                          Start Shopping
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-neutral-800">
                  <h2 className="text-lg sm:text-xl font-bold dark:text-white mb-4 sm:mb-6">
                    My Wishlist ({wishlist.length})
                  </h2>
                  
                  {wishlistError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                      <p className="text-red-600 dark:text-red-400 text-sm">{wishlistError}</p>
                      <p className="text-red-500 dark:text-red-300 text-xs mt-1">
                        Check browser console for details
                      </p>
                    </div>
                  )}
                  
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4 border border-gray-200 dark:border-neutral-700 hover:shadow-md transition-shadow"
                        >
                          <img
                            src={item.image || "/api/placeholder/200/200"}
                            alt={item.name}
                            className="w-full h-32 object-cover rounded-md mb-3"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/api/placeholder/200/200";
                            }}
                          />
                          <h3 className="font-medium dark:text-white text-sm mb-1 truncate">
                            {item.name || "Unnamed Product"}
                          </h3>
                          <p className="text-green-600 dark:text-green-400 font-bold text-sm mb-2">
                            ${item.price?.toFixed(2) || "0.00"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-neutral-400 mb-3">
                            Added {formatDate(item.addedAt)}
                          </p>
                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => navigate(`/product/${item.productId}`)}
                              className="text-xs bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded hover:scale-105 transition-transform"
                            >
                              View Product
                            </button>
                            <button
                              onClick={() => handleRemoveFromWishlist(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-1"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 sm:py-8">
                      <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                      <p className="text-gray-600 dark:text-neutral-400 text-sm sm:text-base">
                        {wishlistError ? "Error loading wishlist" : "Your wishlist is empty"}
                      </p>
                      <button 
                        onClick={() => navigate('/shop')}
                        className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium text-sm sm:text-base"
                      >
                        Browse Products
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-neutral-800">
                  <h2 className="text-lg sm:text-xl font-bold dark:text-white mb-4 sm:mb-6">Settings</h2>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="p-3 sm:p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                      <h3 className="font-medium dark:text-white mb-2 text-sm sm:text-base">Account Information</h3>
                      <div className="space-y-2">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
                          <strong>Email:</strong> {user.email}
                        </p>
                        {userData?.fullName && (
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
                            <strong>Full Name:</strong> {userData.fullName}
                          </p>
                        )}
                        {userData?.username && (
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
                            <strong>Username:</strong> @{userData.username}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                      <h3 className="font-medium dark:text-white mb-2 text-sm sm:text-base">Order History</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
                        {orders.length} order{orders.length !== 1 ? 's' : ''} placed
                      </p>
                    </div>
                    <div className="p-3 sm:p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                      <h3 className="font-medium dark:text-white mb-2 text-sm sm:text-base">Wishlist</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
                        {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in wishlist
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}