import { useState, useEffect } from "react";
import {
  DialogContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import { BookingsSchema } from "../../backend/schemas/booking.schema";
import { FirebaseRepository } from "../../backend/repositories/firebaseRepository";
import { AppService } from "../../backend/services/appService";
import { BookedDates, getDatesBetweenForCalendar } from "../../utils/calendarUtils";
const AvailabilityContent: React.FC = ({}) => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Instantiate the repository and service
  const repository = new FirebaseRepository();
  const appService = new AppService(repository);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await appService.getBookings();
        const validBookings = BookingsSchema.parse(result);
        setBookings(validBookings);
        let dates: BookedDates = {};
        for (const booking of validBookings) {
          const startDate = new Date(booking.start);
          const endDate = new Date(booking.end);
          dates = {
            ...dates,
            ...getDatesBetweenForCalendar(startDate, endDate),
          };
        }
        setBookedDates(dates);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DialogContent>
      <CalendarPicker bookedDates={bookedDates} reservedDates={{}} />
      <Box display="flex" justifyContent="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          {t("availability.calendar.info")}
        </Typography>
      </Box>
    </DialogContent>
  );
};

export default AvailabilityContent;
