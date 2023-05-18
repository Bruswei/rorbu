import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { Group, Indicator } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Calendar } from "@mantine/dates";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./CalendarPicker.css";

function CalendarPicker({ onRangeSelected }) {
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  const changeDatePickerRange = (range: [Date | null, Date | null]) => {
    setValue(range);
  };

  return (
    <div className="calendar-container">
      <div className="date-range-container">
        <Group position="center">
          <DatePicker
            type="range"
            numberOfColumns={2}
            value={value}
            onChange={changeDatePickerRange}
            renderDay={(date) => {
              const day = date.getDate();
              return (
                <Indicator
                  size={6}
                  color="red"
                  offset={-2}
                  disabled={day !== 16}
                >
                  <div>{day}</div>
                </Indicator>
              );
            }}
            excludeDate={(date) => {
              return (
                date.getDate() === 10 ||
                date.getDate() === 11 ||
                date.getDate() === 12
              );
            }}
          />
        </Group>
      </div>
    </div>
  );
}

export default CalendarPicker;
