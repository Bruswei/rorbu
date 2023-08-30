import { z } from "zod";

const reservationSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(8).max(30),
  start: z.string(),
  end: z.string(),
  guests: z.number(),
  message: z.string(),
});

const exportSchema = z.array(reservationSchema);
