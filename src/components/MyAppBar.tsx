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
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CalendarPicker from "./CalendarPicker/CalendarPicker";

interface AppBarProps {
  scrollPosition: number;
}

export default function MyAppBar({ scrollPosition }: AppBarProps) {
  const [isRestored, setIsRestored] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const unavailableDates = [new Date("2023-05-10"), new Date("2023-05-11"), new Date("2023-05-12"), new Date("2023-05-15")];

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
      className={
        // scrollPosition > 0 ? "blurry-appbar scrolled" : "blurry-appbar"
        appBarClass
      }
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
              Rorbu Bømlo
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
              color="inherit"
              onClick={handleOpenDialog}
              sx={{
                textTransform: "none",
                color: scrollPosition > 0 ? "black" : "white",
                transition: "color 0.3s",
              }}
            >
              Availability
            </Button>
          </Box>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Check Availability</DialogTitle>
            <DialogContent>
              <CalendarPicker unavailableDates={unavailableDates} />
            </DialogContent>
          </Dialog>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
