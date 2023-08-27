import { useState, useEffect } from "react";
import { DialogContent, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import { getBookings } from "../../backend/services/firebaseService";

interface AvailabilityContentProps {
  bookedDates: { [key: string]: boolean };
  reservedDates: { [key: string]: boolean };
}

const AvailabilityContent: React.FC<AvailabilityContentProps> = ({
  bookedDates,
  reservedDates,
}) => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await getBookings();
        setBookings(result);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    fetchBookings();
  }, []);

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
