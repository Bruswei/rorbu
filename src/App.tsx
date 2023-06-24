import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./il8n";

import HomePage from "./HomePage";

function App() {
  return (
    <Router>
      <I18nextProvider i18n={i18n}>
        <HomePage />
      </I18nextProvider>
    </Router>
  );
}

export default App;
