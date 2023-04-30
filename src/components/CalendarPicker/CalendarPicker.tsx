import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./CalendarPicker.css";

function CalendarPicker({ onRangeSelected }) {
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  const handleRangeSelect = (ranges) => {
    setSelectedRange(ranges.selection);
    onRangeSelected(ranges.selection);
  };

  return (
    <div className="calendar-container">
      <div className="date-range-container">
        <DateRangePicker
          ranges={[selectedRange]}
          onChange={handleRangeSelect}
          months={2}
          direction="horizontal"
          showSelectionPreview={true}
          showMonthAndYearPickers={false}
        />
      </div>
    </div>
  );
}

export default CalendarPicker;
