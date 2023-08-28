import { getBookingsFromFirestore } from "../repositories/firebaseRepository";

// a function that returns bookings from the firebase repository getBookingsFromFirestore method
export const getBookings = async () => {
  return await getBookingsFromFirestore();
};

export const getDatesBetween = (start: Date, end: Date): BookedDates => {
  let currentDate = start;
  const result: BookedDates = {};

  while (currentDate <= end) {
    result[currentDate.toISOString().split("T")[0]] = true;
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }

  return result;
};

export interface BookedDates {
  [key: string]: boolean;
}
