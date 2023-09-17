import React, { useState } from "react";
import { Group, Indicator } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./CalendarPicker.css";

interface Props {
  bookedDates?: BookedDates;
  reservedDates?: BookedDates;
  onSelect?: (dates: [Date | null, Date | null]) => void;
}

interface BookedDates {
  [key: string]: boolean;
}

function CalendarPicker({
  bookedDates: initialBookedDates,
  reservedDates: initialReservedDates,
  onSelect: handleSelect,
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
    if (handleSelect) {
      handleSelect(range);
    }
  };

  const isDateBooked = (date: Date): boolean => {
    const localDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Europe/Oslo" })
    );
    const dateString = localDate.toISOString().split("T")[0];
    return Boolean(bookedDates[dateString]);
  };

  const isDateReserved = (date: Date): boolean => {
    const localDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Europe/Oslo" })
    );
    const dateString = localDate.toISOString().split("T")[0];
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
              const isBooked = isDateBooked(date);
              const isReserved = isDateReserved(date);
              return (
                <div style={{ color: isBooked ? "red" : "black" }}>
                  {isReserved ? (
                    <Indicator
                      size={6}
                      color="yellow"
                      offset={-2}
                      disabled={isBooked}
                    >
                      {date.getDate()}
                    </Indicator>
                  ) : (
                    <div>{date.getDate()}</div>
                  )}
                </div>
              );
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
