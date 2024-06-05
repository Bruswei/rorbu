
// This was added due to calendarpicker showing incorrect dates
// but if we are using the same datepicker, we might be enable to remove this.
export const getDatesBetweenForCalendar = (
  start: Date,
  end: Date
): BookedDates => {
  let startDate = new Date(start.setDate(start.getDate() - 1));
  let endDate = new Date(end.setDate(end.getDate() - 1));
  const result: BookedDates = {};

  while (startDate <= endDate) {
    result[startDate.toISOString().split("T")[0]] = true;
    startDate = new Date(startDate.setDate(startDate.getDate() + 1));
  }

  return result;
};

export interface BookedDates {
  [key: string]: boolean;
}