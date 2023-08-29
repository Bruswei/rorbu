import React, { useState } from "react";
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
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AvailabilityContent from "./Availability";

interface AppBarProps {
  scrollPosition: number;
  currentLanguage: string;
  handleLanguageSwitch: (lang: string) => void;
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelection = (language: string) => {
    handleLanguageSwitch(language);
    handleLanguageMenuClose();
  };

  const germanyFlag = "./../../media/de-flag.svg";
  const ukFlag = "./../../media/uk-flag.svg";
  const norwegianFlag = "./../../media/no-flag.svg";

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
              onClick={handleLanguageMenuOpen}
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
                  src={ukFlag}
                  alt="UK"
                  style={{ width: "1.8rem", height: "auto" }}
                />
              ) : currentLanguage === "de" ? (
                <img
                  src={germanyFlag}
                  alt="Germany"
                  style={{ width: "1.8rem", height: "auto" }}
                />
              ) : (
                <img
                  src={norwegianFlag}
                  alt="Norway"
                  style={{ width: "1.8rem", height: "auto" }}
                />
              )}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleLanguageMenuClose}
            >
              <MenuItem onClick={() => handleLanguageSelection("en")}>
                <ListItemIcon>
                  <img
                    src={ukFlag}
                    alt="UK"
                    style={{ width: "1.8rem", height: "auto" }}
                  />
                </ListItemIcon>
                {t("language.english")}
              </MenuItem>
              <MenuItem onClick={() => handleLanguageSelection("de")}>
                <ListItemIcon>
                  <img
                    src={germanyFlag}
                    alt="Germany"
                    style={{ width: "1.8rem", height: "auto" }}
                  />
                </ListItemIcon>
                {t("language.german")}
              </MenuItem>
              <MenuItem onClick={() => handleLanguageSelection("no")}>
                <ListItemIcon>
                  <img
                    src={norwegianFlag}
                    alt="Norway"
                    style={{ width: "1.8rem", height: "auto" }}
                  />
                </ListItemIcon>
                {t("language.norwegian")}
              </MenuItem>
            </Menu>
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
            {t("availability.title")}
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
          <AvailabilityContent />
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}
