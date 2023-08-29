import { z } from "zod";

const bookingSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(8).max(20),
  start: z.string(),
  end: z.string(),
  guests: z.number(),
  message: z.string(),
});

export const BookingsSchema = z.array(bookingSchema);
