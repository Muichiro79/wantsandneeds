import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShopByCategory = () => {
  const collections = [
    { 
      name: "New Arrivals", 
      count: "24 items", 
      link: "/shop",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop"
    },
    { 
      name: "Best Sellers", 
      count: "18 items", 
      link: "/shop",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop"
    },
    { 
      name: "Limited Edition", 
      count: "8 items", 
      link: "/shop", 
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop"
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 dark:text-white">Shop by Category</h2>
        <p className="text-gray-600 dark:text-gray-400">Curated collections for every style</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {collections.map((collection, index) => (
          <Link 
            key={index} 
            to={collection.link}
            className="group relative h-80 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 block"
          >
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
              <p className="text-white/80 mb-4">{collection.count}</p>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-sm font-medium">Explore</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;