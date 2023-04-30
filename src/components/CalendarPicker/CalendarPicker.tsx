import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { isSameDay } from "date-fns";
import "react-calendar/dist/Calendar.css";
import { Alert } from "@mui/material";
import "./calendarPicker.css";

function CalendarPicker({ unavailableDates }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const tileDisabled = ({ date }) => {
    return unavailableDates.some((unavailableDate) =>
      isSameDay(date, unavailableDate)
    );
  };

  const handleDayClick = (date) => {
    if (
      unavailableDates.some((unavailableDate) =>
        isSameDay(date, unavailableDate)
      )
    ) {
      return; // Disable clicking on unavailable dates
    }
    setSelectedDate(date);
    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const renderAlert = () => {
    if (selectedDate && showAlert) {
      return (
        <Alert
          severity="success"
          sx={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "64px",
            maxWidth: "90%",
            borderRadius: "4px",
            fontSize: "14px",
            animation: "slide-in 0.3s ease-in-out",
            animationFillMode: "forwards",
            opacity: 0,
          }}
        >
          The date you picked is available for booking.
        </Alert>
      );
    }
    return null;
  };

  return (
    <>
      <style>
        {`
          @keyframes slide-in {
            from {
              transform: translateX(-50%) translateY(50px);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <Calendar onClickDay={handleDayClick} tileDisabled={tileDisabled} minDate={new Date()}/>
      {renderAlert()}
    </>
  );
}

export default CalendarPicker;
