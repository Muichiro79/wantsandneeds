import { useState, useEffect } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
}

const TrendingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-2 dark:text-white">Trending Now</h2>
          <p className="text-gray-600 dark:text-gray-400">The hottest drops this week</p>
        </div>
        <a
          href="/collections/trending"
          className="hidden md:flex items-center gap-2 text-black dark:text-white font-medium hover:gap-3 transition-all"
        >
          View All
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-center text-gray-500 dark:text-gray-400">Loading trending products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                
                {/* New Badge */}
                {product.isNew && (
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1.5 bg-white dark:bg-black text-black dark:text-white text-xs font-bold rounded-full border border-neutral-300 dark:border-neutral-700">
                      NEW
                    </span>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <button className="p-2.5 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform duration-300 border border-neutral-300 dark:border-neutral-700">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="mb-3">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide font-medium mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-bold text-lg dark:text-white line-clamp-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                    {product.title}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black dark:text-white">
                    ${product.price.toLocaleString()}
                  </span>
                  <button className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 group/btn">
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;