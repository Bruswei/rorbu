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
  addReservation,
} from "../../backend/services/firebaseService";
import { BookingsSchema } from "../../backend/schemas/booking.schema";
import reservationSchema from "../../backend/schemas/reservation.schema";
import { add } from "date-fns";

const AvailabilityContent: React.FC = ({}) => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [reservationRespons, setReservationRespons] = useState<string | null>(
    null
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const [formValues, setFormValues] = useState<{
    name: string;
    email: string;
    telephone: string;
    guests: number | "";
    message: string;
  }>({
    name: "",
    email: "",
    telephone: "",
    guests: 1,
    message: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let parsedValue: string | number = value;

    if (name === "guests") {
      parsedValue = value !== "" ? parseInt(value, 10) : "";
    }
    setFormValues((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSetSlectedDates = (dates: [Date | null]) => {
    setSelectedDates(dates);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedDates !== null) {
      setLoading(true);

      const reservation = {
        ...formValues,
        start: selectedDates[0]?.toISOString(),
        end: selectedDates[1]?.toISOString(),
      };
      const result = reservationSchema.safeParse(reservation);

      if (result.success) {
        try {
          const response = await addReservation(result.data);

          if (response.success) {
            setReservationRespons("success");
          } else {
            setReservationRespons("failed");
          }
        } catch (error) {
          console.error("Failed to add reservation:", error);
          setReservationRespons("error");
        }
      } else {
        setReservationRespons("invalid");
      }

      setLoading(false);
    }
  };

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

  function loadingDoneAndNoResponseFromFirebase() {
    return (
      !loading && (!reservationRespons || reservationRespons === "invalid")
    );
  }

  function loadingDoneAndResponseFromFirebase() {
    return !loading && reservationRespons !== null;
  }

  return (
    <DialogContent>
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {loadingDoneAndResponseFromFirebase() && (
        <Box
          mt={2}
          p={1}
          bgcolor={
            reservationRespons && reservationRespons.includes("success")
              ? "success.main"
              : "error.main"
          }
          color="white"
          borderRadius={4}
          textAlign={"center"}
          fontSize={36}
        >
          <Typography variant="body2">
            {t(`availability.reservation.${reservationRespons}`)}
          </Typography>
        </Box>
      )}
      {loadingDoneAndNoResponseFromFirebase() && (
        <>
          <CalendarPicker
            bookedDates={bookedDates}
            reservedDates={{}}
            onSelect={handleSetSlectedDates}
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("availability.calendar.info")}
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleFormSubmit}
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
                  name="name"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("email")}
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("telephone")}
                  type="tel"
                  placeholder="+1 234 567 890"
                  name="phone"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("number_of_guests")}
                  type="number"
                  name="guests"
                  placeholder={t("number_of_guests")}
                  variant="outlined"
                  onChange={handleInputChange}
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
                  name="message"
                  placeholder="Any special requests or message"
                  variant="outlined"
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {t("confirm_booking")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </DialogContent>
  );
};

// Todo: Update logic to show the form if the response was "invalid"

export default AvailabilityContent;
