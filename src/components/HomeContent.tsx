import { Box, Typography } from "@mui/material";
import norwayImage from "../../media/sea.jpg";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface HomeContentProps {
  titleRef: React.RefObject<HTMLDivElement>;
  bodyRef: React.RefObject<HTMLDivElement>;
  imageRef: React.RefObject<HTMLImageElement>;
  isTitleOnScreen: boolean;
  isBodyOnScreen: boolean;
  isImageOnScreen: boolean;
}

export default function HomeContent(props: HomeContentProps) {
  const {
    titleRef,
    bodyRef,
    imageRef,
    isTitleOnScreen,
    isBodyOnScreen,
    isImageOnScreen,
  } = props;

  const { t } = useTranslation();
  const welcomeString = t("home.welcome");
  const welcomeWords = welcomeString.split(" ");

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
            {welcomeWords[0]}
          </span>{" "}
          <span className="word" style={{ animationDelay: "0.7s" }}>
            {welcomeWords[1]}
          </span>{" "}
          <span className="word" style={{ animationDelay: "1.1s" }}>
            {welcomeWords[2]}
          </span>
        </Typography>
        <Box className="slideUpIcon" sx={{ textAlign: "center", mt: 4 }}>
          <ExpandMoreIcon
            sx={{
              fontSize: "3rem",
              animation: "bounce 1s infinite",
              color: "primary",
            }}
          />
          <Typography
            sx={{
              marginTop: 1,
              fontSize: "1.5rem",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            {t("home.scrolldown")}
          </Typography>
        </Box>
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
            {t("home.content.1.title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginTop: 2 }}
            ref={bodyRef}
            className={`slideUp-initial ${isBodyOnScreen ? "slideUp" : ""}`}
            style={{ transitionDelay: "1.5s" }}
          >
            {t("home.content.1.description")}
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
