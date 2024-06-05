// User model interface
export interface User {
  id?: string;
  name: string;
  email: string;
  // add other user properties as needed
}

// Booking model interface
export interface Booking {
  id?: string;
  name: string;
  email: string;
  phone: string;
  start: string;
  end: string;
  guests: number;
  message: string;
}

export interface IRepository {
    getBookings(): Promise<Booking[]>;
    addUser(user: User): Promise<void>;
    getUser(userId: string): Promise<User>;
}

export interface IAppService{
  getBookings(): Promise<Booking[]>
}
