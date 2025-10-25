import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Profile from "./pages/auth/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./pages/Shop/Shop";
import ProductDetails from "./pages/Shop/ProductDetails";
import Cart from "./pages/Shop/Cart";
import WantsAndNeedsLoader from "./components/WantsAndNeedsLoader";
// import WantsAndNeedsLoader from "./components/Loader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // Match this with your loader animation duration

    return () => clearTimeout(timer);
  }, []);

  // Show loader on route changes
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => {
      setTimeout(() => setIsLoading(false), 1000);
    };

    // You can add route change listeners here if using React Router navigation events

    return () => {
      // Cleanup listeners
    };
  }, []);

  if (isLoading) {
    return <WantsAndNeedsLoader />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}