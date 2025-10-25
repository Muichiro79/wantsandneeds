// src/pages/shop/Cart.tsx
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Package,
  CreditCard,
  Loader2
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

export default function Cart() {
  const [user] = useAuthState(auth);
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const totalPrice = cart.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cart]);

  const handleCheckout = async () => {
    console.log("🔵 Checkout started...");
    
    if (!user) {
      alert("Please log in to complete checkout.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      console.log("🔵 Creating order...");
      console.log("User:", user.email);
      console.log("Cart:", cart);

      // Clean cart items to remove any undefined values
      const cleanCartItems = cart.map(item => ({
        id: item.id || '',
        name: item.name || '',
        price: item.price || 0,
        image: item.image || '',
        quantity: item.quantity || 1,
        size: item.size || '',
        color: item.color || ''
      }));

      // Simple order object with cleaned data
      const orderData = {
        userEmail: user.email || '',
        items: cleanCartItems,
        total: total,
        subtotal: total,
        shipping: total > 100 ? 0 : 15,
        tax: total * 0.075,
        status: "processing",
        createdAt: serverTimestamp(), // Use serverTimestamp instead of client date
        updatedAt: serverTimestamp()
      };

      console.log("🔵 Order data:", orderData);

      // Add to orders collection
      const docRef = await addDoc(collection(db, "orders"), orderData);
      
      console.log("✅ Order saved with ID:", docRef.id);
      
      alert("✅ Order placed successfully!");
      clearCart();
      navigate("/profile");
    } catch (error: any) {
      console.error("❌ Error details:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      alert(`Checkout failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    if (updateQuantity) {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ash dark:bg-black px-4">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-neutral-200 dark:border-neutral-800">
            <ShoppingBag className="w-16 h-16 text-neutral-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3 dark:text-white">Your Cart is Empty</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:scale-105 transition-transform inline-flex items-center gap-2 border-2 border-black dark:border-white"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const subtotal = total;
  const shipping = total > 100 ? 0 : 15;
  const tax = total * 0.075;
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-ash dark:bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 dark:text-white">Shopping Cart</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item: CartItem) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-800 group hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover bg-neutral-100 dark:bg-neutral-800"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex gap-3 mt-1">
                          {item.size && (
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              Size: {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                              Color: {item.color}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group/btn"
                      >
                        <Trash2 className="w-5 h-5 text-neutral-400 group-hover/btn:text-red-500 transition-colors" />
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-white dark:hover:bg-black rounded-md transition-colors"
                        >
                          <Minus className="w-4 h-4 dark:text-white" />
                        </button>
                        <span className="w-8 text-center font-semibold dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-white dark:hover:bg-black rounded-md transition-colors"
                        >
                          <Plus className="w-4 h-4 dark:text-white" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-800 sticky top-8">
              <h2 className="text-xl font-bold mb-6 dark:text-white">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600 dark:text-green-400">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Tax (7.5%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                {total < 100 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Add ${(100 - total).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold dark:text-white">Total</span>
                    <span className="text-2xl font-black dark:text-white">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  <span className="font-medium dark:text-white">Payment Method</span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Cash on Delivery</p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-2 border-black dark:border-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>

              <p className="text-xs text-center text-neutral-500 dark:text-neutral-400 mt-4">
                By placing your order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}