import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import { addMonths, isSameDay } from "date-fns";
import { Backdrop, CircularProgress } from "@mui/material";
import "./CalendarPicker.css";

function CalendarPicker({ unavailableDates }) {
  const today = new Date();
  const defaultStartDate = today.toISOString();
  const defaultEndDate = addMonths(today, 1).toISOString();
  const [loading, setLoading] = useState(true);

  const mapDays = ({ date }) => {
    let props = {};
    unavailableDates.some((unavailableDate) => {
      const d = new Date(date);
      if (
        d.toLocaleString("default", { month: "long" }) ===
          unavailableDate.toLocaleString("default", { month: "long" }) &&
        d.getDate() === unavailableDate.getDate()
      ) {
        props.style = {
          ...props.style,
          color: "#ffffff",
          backgroundColor: "#f06b24",
        };
      }
    });

    return props;
  };

  // Simulating data loading delay
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <div className="calendar-container">
      <Backdrop open={loading} sx={{ zIndex: 999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Calendar
        multiple
        fullYear
        readOnly
        mapDays={mapDays}
        defaultValue={[defaultStartDate, defaultEndDate]}
        weekStartDayIndex={1}
        format="MM/dd/yyyy"
        weekNumber="WN"
      />
    </div>
  );
}

export default CalendarPicker;
