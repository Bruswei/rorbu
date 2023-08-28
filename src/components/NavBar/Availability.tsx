import { useState, useEffect } from "react";
import { DialogContent, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import {
  getBookings,
  getDatesBetween,
  BookedDates,
} from "../../backend/services/firebaseService";
import { BookingsSchema } from "../../backend/schemas/booking.schema";

interface AvailabilityContentProps {
  bookedDates: { [key: string]: boolean };
  reservedDates: { [key: string]: boolean };
}

const AvailabilityContent: React.FC<AvailabilityContentProps> = ({
  reservedDates,
}) => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState<{ [key: string]: boolean }>(
    {}
  );
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await getBookings();
        const validBookings = BookingsSchema.parse(result);
        setBookings(validBookings);
        let dates: BookedDates = {};
        for (const booking of validBookings) {
          const startDate = new Date(booking.start);
          const endDate = new Date(booking.end);
          dates = { ...dates, ...getDatesBetween(startDate, endDate) };
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
    return <p>Loading...</p>;
  }

  return (
    <DialogContent>
      <CalendarPicker bookedDates={bookedDates} reservedDates={reservedDates} />
      <Box display="flex" justifyContent="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          {t("availability.calendar.info")}
        </Typography>
      </Box>
    </DialogContent>
  );
};

export default AvailabilityContent;
