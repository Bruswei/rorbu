import db from "../firebaseConfig.js";

// Modular imports for Firestore
import { collection, addDoc, getDoc, doc, getDocs } from "firebase/firestore";
import { Reservation } from "../schemas/reservation.schema.js";

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

export const addReservationToFirebase = async (reservation: Reservation) => {
  try {
    const response = await fetch(
      "https://europe-west1-filipson-rorbu.cloudfunctions.net/createReservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    return { success: true, id: result.id };
  } catch (e) {
    console.error("Error adding reservation: ", e);
    return { success: false, error: e };
  }
};
