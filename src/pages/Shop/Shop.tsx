import  { useEffect, useState } from "react";
import { getProducts } from "../../firebase/db";
import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";
// import SortDropdown from "./SortDropdown";


interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  colors: string[];
  images: string[];
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([45, 100]); // Changed to 45-100

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      const productsData = data as Product[];
      setProducts(productsData);
      setFilteredProducts(productsData);
      
      // Set fixed price range from 45 to 100
      setPriceRange([45, 100]);
      
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }

    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortBy, priceRange]);

  const categories = [
    { id: "all", label: "All Products", count: products.length },
    { id: "sweatpants", label: "Sweatpants", count: products.filter(p => p.category === 'sweatpants').length },
    { id: "hoodies", label: "Hoodies", count: products.filter(p => p.category === 'hoodies').length }
  ];

  const sortOptions = [
    { id: "newest", label: "Newest First" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "name", label: "Name: A-Z" }
  ];

  // CSS styles for the slider
  const sliderStyles = `
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: black;
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .slider::-moz-range-thumb {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: black;
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .dark .slider::-webkit-slider-thumb {
      background: white;
      border: 2px solid black;
    }
    .dark .slider::-moz-range-thumb {
      background: white;
      border: 2px solid black;
    }
  `;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 dark:border-neutral-700 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-neutral-400 text-lg font-medium">Loading premium collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12">
      {/* Inject CSS styles */}
      <style>{sliderStyles}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🔥 ENHANCED HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>✨</span>
            <span>Premium Collection</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-black dark:text-white mb-6 tracking-tight">
            ELEVATE YOUR<br className="hidden md:block"/> STYLE
          </h1>
          <p className="text-xl text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Discover luxury comfort with our curated essentials. Where premium meets everyday wear.
          </p>
        </div>

        {/* 🎛️ ENHANCED FILTER SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Categories */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-200 dark:border-neutral-800">
              <h3 className="font-bold text-black dark:text-white text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex justify-between items-center p-3 rounded-xl text-left transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-black dark:bg-white text-white dark:text-black font-semibold"
                        : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
                    }`}
                  >
                    <span>{category.label}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      selectedCategory === category.id 
                        ? "bg-white/20 dark:bg-black/20" 
                        : "bg-black/10 dark:bg-white/10"
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-200 dark:border-neutral-800">
              <h3 className="font-bold text-black dark:text-white text-lg mb-4">Price Range</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="45" // Changed to 45
                  max="100" // Changed to 100
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([45, parseInt(e.target.value)])} // Always start from 45
                  className="w-full h-2 bg-gray-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-neutral-400">
                  <span>${priceRange[0]}</span>
                  <span className="font-semibold text-black dark:text-white">Up to ${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <p className="text-gray-600 dark:text-neutral-400">
                  Showing <span className="font-bold text-black dark:text-white">{filteredProducts.length}</span> products
                </p>
              </div>
              
              {/* Sort Dropdown
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-black dark:text-white">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-xl text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div> */}

              {/* Sort Dropdown - REPLACE THIS SECTION */}
<div className="flex items-center gap-3">
  <span className="text-sm font-semibold text-black dark:text-white">Sort by:</span>
  <SortDropdown
    value={sortBy}
    onChange={setSortBy}
    options={sortOptions}
  />
</div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800">
                <div className="text-6xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4">No products match your filters</h3>
                <p className="text-gray-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
                  Try adjusting your filters to see more products
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([45, 100]); // Reset to 45-100
                  }}
                  className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold hover:scale-105 transition-transform"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    images={product.images}
                    colors={product.colors}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 🚀 PREMIUM FEATURES */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black dark:text-white mb-4">
              WHY CHOOSE US
            </h2>
            <p className="text-gray-600 dark:text-neutral-400 text-lg">
              Experience the difference of premium craftsmanship
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🎯", title: "Premium Materials", desc: "Luxury fabrics that last" },
              { icon: "⚡", title: "Fast Shipping", desc: "Free delivery on all orders" },
              { icon: "💎", title: "Elite Quality", desc: "Crafted to perfection" }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-gray-200 dark:border-neutral-800 text-center hover:scale-105 transition-transform">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-black dark:text-white text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-neutral-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}