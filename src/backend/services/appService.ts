import { Booking, IAppService, IRepository } from "../interfaces/interfaces";
import {FirebaseRepository} from "../repositories/firebaseRepository";

export class AppService implements IAppService {
  private repository: IRepository;

  constructor(repository: IRepository) {
    this.repository = repository;
  }

  // a function that returns bookings from the firebase repository getBookingsFromFirestore method
  async getBookings(): Promise<Booking[]> {
    return await this.repository.getBookings();
  };
}

