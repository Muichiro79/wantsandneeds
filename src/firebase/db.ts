import { doc, setDoc, getDoc, collection, getDocs, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./config";

// Interfaces for type safety
interface UserData {
  uid: string;
  email: string;
  fullName?: string;
  username?: string;
  displayName?: string;
  photoURL?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WishlistItem {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productCategory: string;
  addedAt: Date;
}

interface Product {
  id: string;
  title?: string;
  name?: string;
  price: number;
  images?: string[];
  image?: string;
  category: string;
  [key: string]: any; // Allow other product properties
}

// ✅ Create user document in Firestore
export const createUserDocument = async (user: any, additionalData?: { fullName: string; username: string }) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { email, displayName, photoURL } = user;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        uid: user.uid,
        email,
        fullName: additionalData?.fullName || displayName || email.split("@")[0],
        username: additionalData?.username || email.split("@")[0],
        displayName: additionalData?.fullName || displayName || email.split("@")[0],
        photoURL: photoURL || null,
        createdAt,
        updatedAt: createdAt,
      } as UserData);
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  }

  return userRef;
};

// ✅ Get user data
export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// ✅ Add product to wishlist
export const addToWishlist = async (userId: string, userEmail: string, userName: string, product: Product): Promise<boolean> => {
  try {
    const wishlistRef = doc(db, "wishlists", `${userId}_${product.id}`);
    await setDoc(wishlistRef, {
      userId,
      userEmail,
      userName,
      productId: product.id,
      productName: product.title || product.name || "",
      productPrice: product.price,
      productImage: product.images ? product.images[0] : product.image || "",
      productCategory: product.category,
      addedAt: new Date(),
    } as Omit<WishlistItem, 'id'>);
    return true;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return false;
  }
};

// ✅ Remove product from wishlist
export const removeFromWishlist = async (userId: string, productId: string): Promise<boolean> => {
  try {
    const wishlistRef = doc(db, "wishlists", `${userId}_${productId}`);
    await deleteDoc(wishlistRef);
    return true;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return false;
  }
};

// ✅ Check if product is in wishlist
export const isInWishlist = async (userId: string, productId: string): Promise<boolean> => {
  try {
    const wishlistRef = doc(db, "wishlists", `${userId}_${productId}`);
    const wishlistSnapshot = await getDoc(wishlistRef);
    return wishlistSnapshot.exists();
  } catch (error) {
    console.error("Error checking wishlist:", error);
    return false;
  }
};

// ✅ Get user's wishlist
export const getWishlist = async (userId: string): Promise<WishlistItem[]> => {
  try {
    const wishlistsRef = collection(db, "wishlists");
    const q = query(wishlistsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const wishlistItems: WishlistItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      wishlistItems.push({ 
        id: doc.id, 
        userId: data.userId,
        userEmail: data.userEmail,
        userName: data.userName,
        productId: data.productId,
        productName: data.productName,
        productPrice: data.productPrice,
        productImage: data.productImage,
        productCategory: data.productCategory,
        addedAt: data.addedAt?.toDate?.() || new Date(data.addedAt)
      } as WishlistItem);
    });

    // Sort by added date (newest first)
    wishlistItems.sort((a, b) => {
      const dateA = a.addedAt instanceof Date ? a.addedAt : new Date(a.addedAt);
      const dateB = b.addedAt instanceof Date ? b.addedAt : new Date(b.addedAt);
      return dateB.getTime() - dateA.getTime();
    });

    return wishlistItems;
  } catch (error) {
    console.error("Error getting wishlist:", error);
    return [];
  }
};

// ✅ Get all products from Firestore
export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
};