import React, { useEffect, useState } from "react";
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

interface AppBarProps {
  scrollPosition: number;
}

export default function MyAppBar({ scrollPosition }: AppBarProps) {
  const [isRestored, setIsRestored] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const unavailableDates = [
    new Date("2023-05-01"),
    new Date("2023-05-02"),
    new Date("2023-05-03"),
    new Date("2023-05-04"),
    new Date("2023-06-01"),
    new Date("2023-06-02"),
    new Date("2023-06-03"),
    new Date("2023-06-04"),
  ];

  const handleRangeSelected = (selectedRange) => {
    // Handle the selected range here
    console.log(selectedRange);
  };

  useEffect(() => {
    const handleLoad = () => {
      const restoredScrollPosition = window.pageYOffset;
      if (restoredScrollPosition > 0) {
        setIsRestored(true);
      }
    };
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

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
              Home
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
              Pricing
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
              Availability
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
          <CalendarPicker onRangeSelected={handleRangeSelected} />
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}
