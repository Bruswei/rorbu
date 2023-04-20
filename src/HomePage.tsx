import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./assets/styles.css";

export default function HomePage() {
  return (
    <>
      <AppBar
        position="fixed"
        className="blurry-appbar"
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
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              Vacation House
            </Typography>
            <Box>
              <Button
                component={RouterLink}
                to="/"
                color="inherit"
                sx={{ textTransform: "none", color: "black" }}
              >
                Home
              </Button>
              <Button
                component={RouterLink}
                to="/pricing"
                color="inherit"
                sx={{ textTransform: "none", color: "black" }}
              >
                Pricing
              </Button>
              <Button
                component={RouterLink}
                to="/contact"
                color="inherit"
                sx={{ textTransform: "none", color: "black" }}
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
          <Typography variant="h1">
            <span className="word" style={{ animationDelay: "0.25s" }}>
              Welcome
            </span>{" "}
            <span className="word" style={{ animationDelay: "0.5s" }}>
              to
            </span>{" "}
            <span className="word" style={{ animationDelay: "0.75s" }}>
              Norway
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            margin: "0 auto",
            maxWidth: "60%", // Set the desired maxWidth for centered content
          }}
        >
          <Typography variant="h2">Discover the Beauty of Norway</Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Norway, a beautiful and enchanting Nordic country, is famous for its
            breathtaking landscapes, mesmerizing fjords, and friendly locals.
            Known as the Land of the Midnight Sun, Norway offers a magical
            experience to travelers, with its picturesque countryside and
            vibrant cities.
          </Typography>
          {/* ... */}
        </Box>
      </Box>
      {/* Add your main content here */}
    </>
  );
}
