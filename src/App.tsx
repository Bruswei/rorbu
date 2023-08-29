import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { useState } from "react";
import i18n from "./il8n";

import HomePage from "./HomePage";

function App() {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const allowedLanguages = ["en", "de", "no"];

  const handleLanguageSwitch = (language: string) => {
    if (allowedLanguages.includes(language)) {
      setCurrentLanguage(language);
      i18n.changeLanguage(language);
    } else {
      setCurrentLanguage("en");
      i18n.changeLanguage("en");
    }
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
