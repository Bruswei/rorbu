import { useState, useEffect } from "react";
import {
  DialogContent,
  Typography,
  Box,
  CircularProgress,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CalendarPicker from "../CalendarPicker/CalendarPicker";
import {
  getBookings,
  BookedDates,
  getDatesBetweenForCalendar,
} from "../../backend/services/firebaseService";
import { BookingsSchema } from "../../backend/schemas/booking.schema";

const AvailabilityContent: React.FC = ({}) => {
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

      <Box
        component="form"
        mt={5}
        sx={{
          padding: 2,
          borderRadius: 1,
          backgroundColor: "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("name")}
              placeholder="Enter your full name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("email")}
              type="email"
              placeholder="you@example.com"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("telephone")}
              type="tel"
              placeholder="+1 234 567 890"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("number_of_guests")}
              type="number"
              placeholder="Number of guests"
              variant="outlined"
              InputProps={{
                inputProps: {
                  min: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("message")}
              placeholder="Any special requests or message"
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {t("confirm_booking")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </DialogContent>
  );
};

export default AvailabilityContent;
