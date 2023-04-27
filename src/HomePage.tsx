import { Typography, Box } from "@mui/material";
import MyAppBar from "./components/MyAppBar";
import { Link as RouterLink, useLocation } from "react-router-dom";
import "./assets/styles.css";
import HomeContent from "./components/HomeContent";
import { useState, useEffect, useRef } from "react";
import useOnScreen from "./utils/useOnScreen";

export default function HomePage() {
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);
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
      <MyAppBar scrollPosition={scrollPosition} />
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
      <HomeContent
        titleRef={titleRef}
        bodyRef={bodyRef}
        imageRef={imageRef}
        isTitleOnScreen={isTitleOnScreen}
        isBodyOnScreen={isBodyOnScreen}
        isImageOnScreen={isImageOnScreen}
      />
      {/* Add your main content here */}
    </>
  );
}