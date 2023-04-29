import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import { isSameDay } from "date-fns";
import "react-calendar/dist/Calendar.css";
import "./calendarPicker.css";

function CalendarPicker({ unavailableDates }) {
  const [selectedDate, setSelectedDate] = useState(null);

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
  };

  const renderPopup = () => {
    if (selectedDate) {
      return (
        <div className="popup">
          The date you picked is available for booking.
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Calendar
        onClickDay={handleDayClick}
        tileDisabled={tileDisabled}
        calendarType="US"
        dayClassName={(date) => {
          const isActive = selectedDate && isSameDay(date, selectedDate);
          return isActive ? "active" : undefined;
        }}
      />
      {renderPopup()}
    </>
  );
}

export default CalendarPicker;
