// src/components/SeedDatabase.tsx
import { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { seedProducts } from '../pages/Shop/seedData';

const SeedDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    setIsLoading(true);
    setMessage('Seeding database...');
    
    try {
      const productsCollection = collection(db, 'products');
      
      for (const product of seedProducts) {
        const productData = {
          ...product,
          createdAt: product.createdAt
        };
        
        await setDoc(doc(productsCollection, product.id), productData);
        console.log(`✅ Added: ${product.name}`);
      }
      
      setMessage('✅ Database seeded successfully! 6 products added.');
      
    } catch (error) {
      console.error('Error seeding database:', error);
      setMessage('❌ Error seeding database. Check console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full mx-4 p-6">
        <h2 className="text-xl font-bold mb-4">Seed Database</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Click the button below to add sample products to your Firebase database.
        </p>
        
        <button
          onClick={handleSeed}
          disabled={isLoading}
          className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Seeding...' : 'Seed Database'}
        </button>
        
        {message && (
          <p className={`mt-4 text-sm font-medium ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        
        <div className="mt-4 text-xs text-gray-500">
          <p>Products to be added:</p>
          <ul className="list-disc list-inside mt-1">
            <li>2 Sweatpants</li>
            <li>2 Hoodies</li>
            <li>2 Sweatsuits</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SeedDatabase;