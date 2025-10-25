import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import app from "./config";
import { createUserDocument } from "./db";

export const auth = getAuth(app);

// ✅ Sign up new user with additional fields
export const signupUser = async (email: string, password: string, fullName: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with display name
    await updateProfile(user, {
      displayName: fullName
    });

    // Save user to Firestore with all fields
    await createUserDocument(user, { fullName, username });

    return user;
  } catch (error: any) {
    console.error("Signup error:", error.message);
    throw error;
  }
};

// ✅ Log in existing user
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error("Login error:", error.message);
    throw error;
  }
};

// ✅ Log out user
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Logout error:", error.message);
    throw error;
  }
};

// ✅ Listen to auth state changes
export const onAuthChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};