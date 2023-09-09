import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {z} from "zod";
import * as nodemailer from "nodemailer";

admin.initializeApp();

export const onNewReservation = functions
    .region("europe-west1")
    .firestore.document("reservations/{reservationId}")
    .onWrite(async (change, context) => {
    // To get the data of the created document, use `change.after.data()`
      const newData = change.after.data();

      if (!newData) {
        return {success: false, message: "No data found"};
      }

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
      const reservation = reservationSchema.safeParse(newData);
      if (!reservation.success) {
        return {success: false, message: "Invalid reservation data."};
      }

      try {
        await admin.firestore()
            .collection("reservations")
            .add(reservation.data);

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: functions.config().gmail.email.user,
            pass: functions.config().gmail.email.password,
          },
        });

        const mailOptions = {
          from: functions.config().gmail.email.user,
          to: functions.config().gmail.email.test,
          subject: "New reservation from " + reservation.data.name,
          text:
          // "Name: " +
          // reservation.data.name +
          // "\n" +
          // "Email: " +
          // reservation.data.email +
          // "\n" +
          // "Phone: " +
          // reservation.data.phone +
          // "\n" +
          // "Start: " +
          // reservation.data.start +
          // "\n" +
          // "End: " +
          // reservation.data.end +
          // "\n" +
          // "Guests: " +
          // reservation.data.guests +
          // "\n" +
          // "Message: " +
          // reservation.data.message,
          "test email works maybe?",
        };

        await transporter.sendMail(mailOptions);

        return {success: true};
      } catch (error) {
        return {success: false, message: "Error handling reservation"};
      }
    });
