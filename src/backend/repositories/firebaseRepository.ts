import db from "../firebaseConfig.js";

// Modular imports for Firestore
import { collection, addDoc, getDoc, doc } from "firebase/firestore";

export const addUserToFirestore = async (user) => {
  const usersCollection = collection(db, "users");
  await addDoc(usersCollection, user);
};

export const getUserFromFirestore = async (userId) => {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("User does not exist");
  }
};
