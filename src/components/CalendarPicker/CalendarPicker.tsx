import React, { useState } from "react";
import { Group, Indicator } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Calendar } from "@mantine/dates";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./CalendarPicker.css";

interface Props {
  bookedDates?: BookedDates;
  reservedDates?: BookedDates;
}

interface BookedDates {
  [key: string]: boolean;
}

function CalendarPicker({
  bookedDates: initialBookedDates,
  reservedDates: initialReservedDates,
}: Props) {
  const [bookedDates, setBookedDates] = useState<BookedDates>(
    initialBookedDates || {}
  );
  const [reservedDates, setReservedDates] = useState<BookedDates>(
    initialReservedDates || {}
  );

  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  const changeDatePickerRange = (range: [Date | null, Date | null]) => {
    setValue(range);
  };

  const isDateBooked = (date: Date): boolean => {
    const dateString = date.toISOString().split("T")[0]; // format to YYYY-MM-DD
    return Boolean(bookedDates[dateString]);
  };

  const isDateReserved = (date: Date): boolean => {
    const dateString = date.toISOString().split("T")[0]; // format to YYYY-MM-DD
    return Boolean(reservedDates[dateString]);
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
              if (isDateReserved(date)) {
                return (
                  <Indicator
                    size={6}
                    color="yellow"
                    offset={-2}
                    disabled={isDateBooked(date)} // show indicator if date is booked
                  >
                    <div>{date.getDate()}</div>
                  </Indicator>
                );
              }
            }}
            excludeDate={(date) => {
              return isDateBooked(date);
            }}
          />
        </Group>
      </div>
    </div>
  );
}

export default CalendarPicker;
