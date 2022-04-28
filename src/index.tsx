import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// TODO: Implement Internationalization properly
import { IntlProvider } from "react-intl";
import messages_es from "./i18n/es";

const targetElement = document.getElementById(
  (window as any)["doppler-menu-mfe-configuration"]?.dopplerMenuElementId
);

if (targetElement) {
  const root = createRoot(targetElement);
  root.render(
    <StrictMode>
      <IntlProvider locale="es" defaultLocale="es" messages={messages_es}>
        <App />
      </IntlProvider>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
