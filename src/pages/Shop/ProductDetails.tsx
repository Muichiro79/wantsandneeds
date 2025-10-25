// src/pages/shop/ProductDetails.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { useCart } from "../../context/CartContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { addToWishlist, removeFromWishlist, isInWishlist } from "../../firebase/db";
import { Heart, ShoppingBag } from "lucide-react";

export default function ProductDetails() {
  const { productId } = useParams();
  const [user] = useAuthState(auth);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", productId as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const productData = { id: docSnap.id, ...docSnap.data() };
        setProduct(productData);
        
        // Check if product is in wishlist
        if (user) {
          const inWishlist = await isInWishlist(user.uid, productData.id);
          setIsInWishlistState(inWishlist);
        }
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId, user]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Validate selections
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }

    addToCart({
      id: product.id,
      name: product.title || product.name,
      price: product.price,
      image: product.images ? product.images[0] : product.image,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
    
    alert(`${product.title || product.name} added to cart 🛒`);
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      alert("Please log in to add items to your wishlist");
      return;
    }

    setWishlistLoading(true);
    try {
      if (isInWishlistState) {
        // Remove from wishlist
        await removeFromWishlist(user.uid, product.id);
        setIsInWishlistState(false);
      } else {
        // Add to wishlist
        const success = await addToWishlist(
          user.uid,
          user.email || "",
          user.displayName || user.email?.split("@")[0] || "User",
          product
        );
        if (success) {
          setIsInWishlistState(true);
        }
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      alert("Error updating wishlist. Please try again.");
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 dark:border-neutral-700 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-neutral-400 text-lg font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black">
        <p className="text-center text-gray-600 dark:text-neutral-400 text-lg">Product not found</p>
      </div>
    );
  }

  const images = product.images || [product.image];
  const colors = product.colors || [];
  const sizes = product.sizes || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image Gallery Section */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-gray-200 dark:border-neutral-800">
              <div className="flex items-center justify-center min-h-[500px] bg-gray-100 dark:bg-neutral-800 rounded-xl overflow-hidden relative">
                <img
                  src={images[selectedImageIndex]}
                  alt={product.title || product.name}
                  className="max-w-full max-h-[500px] w-auto h-auto object-scale-down"
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  disabled={wishlistLoading}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isInWishlistState 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 dark:bg-black/90 text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white'
                  } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                >
                  <Heart 
                    className={`w-6 h-6 ${isInWishlistState ? 'fill-current' : ''}`} 
                  />
                </button>
              </div>
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-200 dark:border-neutral-800">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">More Views</h3>
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square bg-gray-100 dark:bg-neutral-800 rounded-lg overflow-hidden border-2 transition-all duration-300 flex items-center justify-center ${
                        selectedImageIndex === index
                          ? "border-black dark:border-white scale-105"
                          : "border-transparent hover:border-gray-300 dark:hover:border-neutral-600"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title || product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info & Form Section */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-gray-200 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                  {product.isNew && (
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                      New Arrival
                    </span>
                  )}
                </div>
                
                {/* Wishlist Button for Mobile */}
                <button
                  onClick={handleWishlistToggle}
                  disabled={wishlistLoading}
                  className={`lg:hidden p-2 rounded-lg transition-all ${
                    isInWishlistState 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400'
                  } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Heart 
                    className={`w-5 h-5 ${isInWishlistState ? 'fill-current' : ''}`} 
                  />
                </button>
              </div>
              
              <h1 className="text-4xl font-black text-black dark:text-white mb-4">
                {product.title || product.name}
              </h1>
              
              <p className="text-3xl font-black text-black dark:text-white mb-6">
                ${product.price}
              </p>

              <p className="text-gray-600 dark:text-neutral-400 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Selection Form */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-gray-200 dark:border-neutral-800 space-y-8">
              
              {/* Color Selection */}
              {colors.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                    <span>🎨</span>
                    Color: {selectedColor && <span className="text-gray-600 dark:text-neutral-400 font-normal">({selectedColor})</span>}
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {colors.map((color: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                          selectedColor === color
                            ? "border-black dark:border-white bg-black/5 dark:bg-white/10 scale-105"
                            : "border-gray-300 dark:border-neutral-600 hover:border-gray-400 dark:hover:border-neutral-500"
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                        <span className="text-sm font-medium text-black dark:text-white">
                          {color}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                    <span>📏</span>
                    Size: {selectedSize && <span className="text-gray-600 dark:text-neutral-400 font-normal">({selectedSize})</span>}
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {sizes.map((size: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSize(size)}
                        className={`py-4 rounded-xl border-2 text-center transition-all duration-300 font-semibold ${
                          selectedSize === size
                            ? "border-black dark:border-white bg-black text-white dark:bg-white dark:text-black scale-105"
                            : "border-gray-300 dark:border-neutral-600 text-black dark:text-white hover:border-gray-400 dark:hover:border-neutral-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                  <span>🔢</span>
                  Quantity
                </h3>
                <div className="flex items-center gap-4 max-w-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-12 bg-gray-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center text-xl font-bold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-black text-black dark:text-white min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-12 bg-gray-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center text-xl font-bold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize && sizes.length > 0 || !selectedColor && colors.length > 0}
                  className="bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 border-2 border-black dark:border-white"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>

                <button
                  onClick={handleWishlistToggle}
                  disabled={wishlistLoading}
                  className={`py-4 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                    isInWishlistState
                      ? 'bg-red-500 border-red-500 text-white hover:bg-red-600'
                      : 'bg-transparent border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 hover:border-red-500 hover:text-red-500 dark:hover:text-red-400'
                  } ${wishlistLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlistState ? 'fill-current' : ''}`} />
                  {isInWishlistState ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-neutral-800">
                <div className="text-center">
                  <div className="text-2xl mb-2">🚚</div>
                  <p className="text-xs text-gray-600 dark:text-neutral-400">Free Shipping</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">↩️</div>
                  <p className="text-xs text-gray-600 dark:text-neutral-400">30-Day Returns</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">⭐</div>
                  <p className="text-xs text-gray-600 dark:text-neutral-400">Premium Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}