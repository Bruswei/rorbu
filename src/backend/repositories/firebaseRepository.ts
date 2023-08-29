import db from "../firebaseConfig.js";

// Modular imports for Firestore
import { collection, addDoc, getDoc, doc, getDocs } from "firebase/firestore";

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

export const getBookingsFromFirestore = async () => {
  const bookingsCollection = collection(db, "bookings");
  const bookingsSnapshot = await getDocs(bookingsCollection);
  const bookings = bookingsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return bookings;
};
