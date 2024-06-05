import db from "../firebaseConfig.js";

// Modular imports for Firestore
import { collection, addDoc, getDoc, doc, getDocs } from "firebase/firestore";
import { Booking, IRepository, User } from "../interfaces/interfaces.js";
import { BookingsSchema } from "../schemas/booking.schema.js";

export class FirebaseRepository implements IRepository {
  async addUser(user: User): Promise<void> {
    const usersCollection = collection(db, "users");
    await addDoc(usersCollection, user);
  }

  async getUser(userId: string): Promise<User> {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      throw new Error("User does not exist");
    } 
    return docSnap.data() as User;
  }

  async getBookings(): Promise<Booking[]> {
    const bookingsCollection = collection(db, "bookings");
    const bookingsSnapshot = await getDocs(bookingsCollection);
    const bookings = bookingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];

    // Validate the bookings data
    const validatedBookings = BookingsSchema.parse(bookings);
    return validatedBookings;
  }
}