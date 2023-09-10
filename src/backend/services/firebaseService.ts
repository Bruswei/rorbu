import {
  addReservationToFirebase,
  getBookingsFromFirestore,
} from "../repositories/firebaseRepository";
import reservationSchema, { Reservation } from "../schemas/reservation.schema";

// a function that returns bookings from the firebase repository getBookingsFromFirestore method
export const getBookings = async () => {
  return await getBookingsFromFirestore();
};

export const getDatesBetweenForCalendar = (
  start: Date,
  end: Date
): BookedDates => {
  // This was added due to calendarpicker showing incorrect dates
  // but if we are using the same datepicker, we might be enable to remove this.
  let startDate = new Date(start.setDate(start.getDate() - 1));
  let endDate = new Date(end.setDate(end.getDate() - 1));
  const result: BookedDates = {};

  while (startDate <= endDate) {
    result[startDate.toISOString().split("T")[0]] = true;
    startDate = new Date(startDate.setDate(startDate.getDate() + 1));
  }

  return result;
};

export const addReservation = async (reservation: Reservation) => {
  const parsedReservation = reservationSchema.safeParse(reservation);

  if (!parsedReservation.success) {
    throw new Error("Invalid reservation");
  }

  return await addReservationToFirebase(reservation);
};

export interface BookedDates {
  [key: string]: boolean;
}
