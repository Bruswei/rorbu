import { getBookingsFromFirestore } from "../repositories/firebaseRepository";

// a function that returns bookings from the firebase repository getBookingsFromFirestore method
export const getBookings = async () => {
  return await getBookingsFromFirestore();
};
