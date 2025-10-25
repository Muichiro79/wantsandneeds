import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./config";
// import { app } from "./config";

export const storage = getStorage(app);

export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};
