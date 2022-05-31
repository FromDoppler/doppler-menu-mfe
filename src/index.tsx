import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MenuIntlProvider } from "./components/i18n/MenuIntlProvider";
import { AppConfiguration } from "./AppConfiguration";

const configuration: AppConfiguration = (window as any)[
  "doppler-menu-mfe-configuration"
];

const targetElement =
  configuration.dopplerMenuElementId &&
  document.getElementById(configuration.dopplerMenuElementId);

if (targetElement) {
  const root = createRoot(targetElement);
  root.render(
    <StrictMode>
      <MenuIntlProvider>
        <App />
      </MenuIntlProvider>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
