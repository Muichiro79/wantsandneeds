// src/firebase/seedFirebase.ts
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './config.js';
import { seedProducts } from '../pages/Shop/seedData.js';

const seedFirebase = async () => {
  try {
    console.log('🚀 Starting Firebase seed...');
    
    const productsCollection = collection(db, 'products');
    
    for (const product of seedProducts) {
      const productData = {
        ...product,
        createdAt: product.createdAt
      };
      
      await setDoc(doc(productsCollection, product.id), productData);
      console.log(`✅ Added: ${product.name}`);
    }
    
    console.log('🎉 Database seeded successfully!');
    console.log('📊 Summary:');
    console.log('   - 2 Sweatpants');
    console.log('   - 2 Hoodies');
    console.log('   - 2 Sweatsuits');
    console.log('   - Total: 6 products');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Run the seed
seedFirebase().catch(console.error);