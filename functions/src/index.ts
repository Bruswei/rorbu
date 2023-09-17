import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {z} from "zod";
import * as cors from "cors";

admin.initializeApp();

const corsHandler = cors({origin: true});

/**
 * Formats a date to the Oslo time zone.
 * @param {Date} date - The date to format.
 * @return {string} The formatted date in the Oslo time zone (YYYY-MM-DD).
 */
function formatDateToOsloTimezone(date: Date): string {
  const osloTimeZone = "Europe/Oslo";
  return date.toLocaleString("en-US", {
    timeZone: osloTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export const createReservation = functions
    .region("europe-west1")
    .https.onRequest(async (req, res) => {
      corsHandler(req, res, async () => {
      // Function to format dates to Oslo time zone
        if (req.method !== "POST") {
          res.status(405).send("Method Not Allowed");
          return;
        }

        const reservationSchema = z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string().min(8).max(30),
          start: z.string(),
          end: z.string(),
          guests: z.number(),
          message: z.string(),
        });

        const reservation = reservationSchema.safeParse(req.body);

        if (!reservation.success) {
          res.status(400).send("Invalid reservation data.");
          return;
        }

        const startDate = formatDateToOsloTimezone(
            new Date(reservation.data.start)
        );
        const endDate =
        formatDateToOsloTimezone(new Date(reservation.data.end));

        try {
          await admin
              .firestore()
              .collection("reservations")
              .add(reservation.data);

          const mailText = `
          <h1>New Reservation Details:</h1>
          <p><strong>Name:</strong> ${reservation.data.name}</p>
          <p><strong>Email:</strong> ${reservation.data.email}</p>
          <p><strong>Phone:</strong> ${reservation.data.phone}</p>
          <p><strong>Start Date:</strong> ${startDate}</p>
          <p><strong>End Date:</strong> ${endDate}</p>
          <p><strong>Number of Guests:</strong> ${reservation.data.guests}</p>
          <p><strong>Message:</strong> ${reservation.data.message}</p>
        `;

          // Add a new document to the "mail" collection
          await admin
              .firestore()
              .collection("mail")
              .add({
                to: functions.config().email.test,
                message: {
                  subject: "Ny Reservation",
                  text: "Nå er det komment en ny reservasjon!",
                  html: mailText,
                },
              });

          res.status(200).send({success: true});
        } catch (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
        }
      });
    });
