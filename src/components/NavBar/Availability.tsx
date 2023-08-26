import React from "react";
import { DialogContent, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import CalendarPicker from "../CalendarPicker/CalendarPicker";

interface AvailabilityContentProps {
  bookedDates: { [key: string]: boolean };
  reservedDates: { [key: string]: boolean };
}

const AvailabilityContent: React.FC<AvailabilityContentProps> = ({
  bookedDates,
  reservedDates,
}) => {
  const { t } = useTranslation();

  return (
    <DialogContent>
      <CalendarPicker bookedDates={bookedDates} reservedDates={reservedDates} />
      <Box display="flex" justifyContent="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          {t("availability.calendar.info")}
        </Typography>
      </Box>
    </DialogContent>
  );
};

export default AvailabilityContent;
