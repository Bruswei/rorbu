import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import "./assets/styles.css";
import norwayImage from "./../media/view.jpg";
import { useState, useEffect, useRef } from "react";
import useOnScreen from "./utils/useOnScreen";

export default function HomePage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const isImageOnScreen = useOnScreen(imageRef);
  const isTitleOnScreen = useOnScreen(titleRef);
  const isBodyOnScreen = useOnScreen(bodyRef);
  const homeContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "";
    };
  }, []);

  const location = useLocation();

  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (!isInitialRender) {
      if (location.pathname === "/") {
        if (homeContentRef.current) {
          window.scrollTo({
            top: homeContentRef.current.offsetTop,
            behavior: "smooth",
          });
        }
      }
    } else {
      setIsInitialRender(false);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        className={
          scrollPosition > 0 ? "blurry-appbar scrolled" : "blurry-appbar"
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
              <Button
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
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        className="home-background"
        sx={{
          paddingTop: "64px",
          minHeight: "100vh",
          backgroundSize: "cover",
          position: "fixed",
          width: "100%",
          zIndex: -1,
        }}
      />
      <Box
        ref={homeContentRef}
        className="home-content"
        sx={{
          backgroundColor: "white",
          padding: "2rem",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          top: "100%",
          paddingTop: "calc(64px + 2rem)",
          paddingBottom: "calc(64px + 2rem)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: "10%",
            top: "-40%",
            color: "white",
            zIndex: 1,
          }}
        >
          <Typography variant="h1" className="welcome-text">
            <span className="word" style={{ animationDelay: "0.3s" }}>
              Welcome
            </span>{" "}
            <span className="word" style={{ animationDelay: "0.7s" }}>
              to
            </span>{" "}
            <span className="word" style={{ animationDelay: "1.1s" }}>
              Bømlo
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            margin: "0 auto",
            maxWidth: "60%",
            display: "flex",
          }}
        >
          <Box
            sx={{ flex: "1" }}
            ref={titleRef}
            className={`slideUp-initial ${isTitleOnScreen ? "slideUp" : ""}`}
          >
            <Typography
              style={{ transitionDelay: "1s" }}
              className={`slideUp-initial ${isBodyOnScreen ? "slideUp" : ""}`}
              variant="h2"
            >
              Discover the Beauty of Norway
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginTop: 2 }}
              ref={bodyRef}
              className={`slideUp-initial ${isBodyOnScreen ? "slideUp" : ""}`}
              style={{ transitionDelay: "1.5s" }}
            >
              Norway, a beautiful and enchanting Nordic country, is famous for
              its breathtaking landscapes, mesmerizing fjords, and friendly
              locals. Known as the Land of the Midnight Sun, Norway offers a
              magical experience to travelers, with its picturesque countryside
              and vibrant cities.
            </Typography>
          </Box>
          <Box
            sx={{ flex: "1", marginLeft: 6 }}
            ref={imageRef}
            className={`slideUp-initial ${isImageOnScreen ? "slideUp" : ""}`}
            style={{ transitionDelay: "0.5s" }}
          >
            <img src={norwayImage} alt="Norway" style={{ width: "100%" }} />
          </Box>
        </Box>
      </Box>
      {/* Add your main content here */}
    </>
  );
}
