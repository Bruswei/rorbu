import { Box, Typography } from "@mui/material";
import { useRef } from "react";
import useOnScreen from "../utils/useOnScreen";
import norwayImage from "../../media/sea.jpg";

export default function HomeContent() {
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const isImageOnScreen = useOnScreen(imageRef);
  const isTitleOnScreen = useOnScreen(titleRef);
  const isBodyOnScreen = useOnScreen(bodyRef);

  return (
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
          color: "black",
        }}
      >
        <Box
          sx={{ flex: "1", color: "black" }}
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
            Norway, a beautiful and enchanting Nordic country, is famous for its
            breathtaking landscapes, mesmerizing fjords, and friendly locals.
            Known as the Land of the Midnight Sun, Norway offers a magical
            experience to travelers, with its picturesque countryside and
            vibrant cities.
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
  );
}
