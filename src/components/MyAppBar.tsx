import React, { useEffect, useState } from "react";
import { Grid, Text } from "@mantine/core";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink } from "react-router-dom";
import CalendarPicker from "./CalendarPicker/CalendarPicker";
import { useTranslation } from "react-i18next";

interface AppBarProps {
  scrollPosition: number;
  currentLanguage: string;
  handleLanguageSwitch: () => void;
}
interface BookedDates {
  [key: string]: boolean;
}

export default function MyAppBar({
  scrollPosition,
  currentLanguage,
  handleLanguageSwitch,
}: AppBarProps) {
  const { t, i18n } = useTranslation();
  const [isRestored, setIsRestored] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const datesToDict = (datesArray: Date[]): BookedDates => {
    return datesArray.reduce<BookedDates>((accum, curr) => {
      const dateString = curr.toISOString().split("T")[0]; // format to YYYY-MM-DD
      accum[dateString] = true;
      return accum;
    }, {});
  };

  const bookedDatesArray = [
    new Date("2023-05-01"),
    new Date("2023-05-02"),
    new Date("2023-05-03"),
    new Date("2023-05-04"),
    new Date("2023-06-01"),
    new Date("2023-06-02"),
    new Date("2023-06-03"),
    new Date("2023-06-04"),
  ];

  const bookedDatesDict = datesToDict(bookedDatesArray);

  const reservedDatesArray = [
    new Date("2023-05-05"),
    new Date("2023-05-06"),
    new Date("2023-05-07"),
    new Date("2023-05-08"),
    new Date("2023-06-05"),
    new Date("2023-06-06"),
    new Date("2023-06-07"),
    new Date("2023-06-08"),
  ];

  const reservedDatesDict = datesToDict(reservedDatesArray);

  const appBarClass =
    scrollPosition > 0 || isRestored
      ? "blurry-appbar scrolled"
      : "blurry-appbar";
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const germanyFlag = "./../../media/de-flag.svg";
  const ukFlag = "./../../media/uk-flag.svg";

  return (
    <AppBar
      position="fixed"
      className={appBarClass}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        zIndex: 1000,
        width: "100%",
        animation: "slideDown 1s",
      }}
    >
      <Toolbar disableGutters>
        <Box
          sx={{
            margin: "0 auto",
            maxWidth: "60%", // Set the desired maxWidth for centered content
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: scrollPosition > 0 ? "black" : "white",
              transition: "color 0.3s",
            }}
          >
            <Typography variant="h6" component="div">
              Filipsson Rorbu
            </Typography>
          </Button>
          <Box>
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{
                textTransform: "none",
                color: scrollPosition > 0 ? "black" : "white",
                transition: "color 0.3s",
              }}
            >
              {t("nav.home")}
            </Button>
            <Button
              component={RouterLink}
              to="/pricing"
              color="inherit"
              sx={{
                textTransform: "none",
                color: scrollPosition > 0 ? "black" : "white",
                transition: "color 0.3s",
              }}
            >
              {t("nav.pricing")}
            </Button>
            {/* <Button
              component={RouterLink}
              to="/contact"
              color="inherit"
              sx={{
                textTransform: "none",
                color: scrollPosition > 0 ? "black" : "white",
                transition: "color 0.3s",
              }}
            >
              Contact
            </Button> */}
            <Button
              onClick={handleOpenDialog}
              color="inherit"
              sx={{
                textTransform: "none",
                color: scrollPosition > 0 ? "black" : "white",
                transition: "color 0.3s",
              }}
            >
              {t("nav.availability")}
            </Button>
            <Button
              onClick={handleLanguageSwitch}
              color="inherit"
              sx={{
                textTransform: "none",
                color: scrollPosition > 0 ? "black" : "white",
                transition: "color 0.3s",
                padding: 0,
              }}
            >
              {currentLanguage === "en" ? (
                <img
                  src={germanyFlag}
                  alt="Germany"
                  style={{ width: "1.8rem", height: "auto" }}
                />
              ) : (
                <img
                  src={ukFlag}
                  alt="UK"
                  style={{ width: "1.8rem", height: "auto" }}
                />
              )}
            </Button>
          </Box>
        </Box>
      </Toolbar>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        sx={{
          width: "80%",
          margin: "auto",
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: "80%",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" component="div">
            Check Availability
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CalendarPicker
            bookedDates={bookedDatesDict}
            reservedDates={reservedDatesDict}
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              Dates with yellow indicators are reserved already but not
              confirmed.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}
