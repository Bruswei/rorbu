import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { useState } from "react";
import i18n from "./il8n";

import HomePage from "./HomePage";

function App() {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const handleLanguageSwitch = (language: string) => {
    const newLanguage = currentLanguage === "en" ? "de" : "no";
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <Router>
      <I18nextProvider i18n={i18n}>
        <HomePage
          currentLanguage={currentLanguage}
          handleLanguageSwitch={handleLanguageSwitch}
        />
      </I18nextProvider>
    </Router>
  );
}

export default App;
