import React from "react";
import { Calendar } from "react-multi-date-picker";
import { addMonths, isSameDay } from "date-fns";
import "./CalendarPicker.css";

function CalendarPicker({ unavailableDates }) {
  const today = new Date();
  const defaultStartDate = today.toISOString();
  const defaultEndDate = addMonths(today, 1).toISOString();

  const isDateUnavailable = (date) =>
    unavailableDates.some((unavailableDate) =>
      isSameDay(date, unavailableDate)
    );

  const mapDays = ({ date }) => {
    let props = {};
    unavailableDates.some((unavailableDate) => {
      const d = new Date(date);
      if (
        d.toLocaleString(`default`, { month: "long" }) ===
          unavailableDate.toLocaleString(`default`, { month: "long" }) &&
        d.getDate() === unavailableDate.getDate()
      ) {
        props.style = {
          ...props.style,
          color: "#0074d9",
          backgroundColor: "#f06b24",
        };
      }
    });

    return props;
  };

  return (
    <div className="calendar-container">
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
