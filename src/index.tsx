import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MenuIntlProvider } from "./components/i18n/MenuIntlProvider";
import { AppSessionStateProvider } from "./session/AppSessionStateContext";
import { AppConfiguration } from "./AppConfiguration";
import { createDummyAppSessionStateClient } from "./session/dummyAppSessionStateClient";
import { SessionMfeAppSessionStateClient } from "./session/SessionMfeAppSessionStateClient";
import { patchBrowserBehaviorToInterceptLocationUpdates } from "./history/historyUtils";

patchBrowserBehaviorToInterceptLocationUpdates(window);

const configuration: AppConfiguration = readConfiguration(window);
const targetElement = getTargetElement(document, configuration);

if (targetElement) {
  const appSessionStateClient = createAppSessionStateClient(
    window,
    configuration
  );
  appSessionStateClient.start();

  const root = createRoot(targetElement);
  root.render(
    <StrictMode>
      <AppSessionStateProvider appSessionStateClient={appSessionStateClient}>
        <MenuIntlProvider>
          <App />
        </MenuIntlProvider>
      </AppSessionStateProvider>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function readConfiguration(window: Window): AppConfiguration {
  return (window as any)["doppler-menu-mfe-configuration"] ?? {};
}

function getTargetElement(document: Document, configuration: AppConfiguration) {
  return configuration.dopplerMenuElementId
    ? document.getElementById(configuration.dopplerMenuElementId)
    : null;
}

function createAppSessionStateClient(
  window: Window,
  configuration: AppConfiguration
) {
  return configuration.useDummies
    ? createDummyAppSessionStateClient()
    : new SessionMfeAppSessionStateClient({ window });
}
