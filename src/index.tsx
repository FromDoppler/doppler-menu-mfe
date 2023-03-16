import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MenuIntlProvider } from "./components/i18n/MenuIntlProvider";
import { AppSessionStateProvider } from "./session/AppSessionStateContext";
import { AppConfiguration, AppConfigurationProvider } from "./AppConfiguration";
import { createDummyAppSessionStateClient } from "./session/dummyAppSessionStateClient";
import { SessionMfeAppSessionStateClient } from "./session/SessionMfeAppSessionStateClient";
import { patchBrowserBehaviorToInterceptLocationUpdates } from "./history/historyUtils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

patchBrowserBehaviorToInterceptLocationUpdates(window);

const configuration: AppConfiguration = readConfiguration(window);
const targetElement = getTargetElement(document, configuration);

if (targetElement) {
  initialize(window, configuration, targetElement);
} else {
  // In some scenarios, the target element is not available yet, so we need to wait for it.
  // For example, now it is happening in resports2
  document.addEventListener("DOMContentLoaded", () => {
    const targetElement = getTargetElement(document, configuration);
    if (targetElement) {
      initialize(window, configuration, targetElement);
    } else {
      console.error(
        `Element with id ${configuration.dopplerMenuElementId} not found.`
      );
    }
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function initialize(
  window: Window,
  configuration: AppConfiguration,
  targetElement: HTMLElement
) {
  const appSessionStateClient = createAppSessionStateClient(
    window,
    configuration
  );
  appSessionStateClient.start();
  // Create a client
  const queryClient = new QueryClient();

  const root = createRoot(targetElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppSessionStateProvider appSessionStateClient={appSessionStateClient}>
          <AppConfigurationProvider configuration={configuration}>
            <MenuIntlProvider>
              <App onStatusUpdate={configuration.onStatusUpdate} />
            </MenuIntlProvider>
          </AppConfigurationProvider>
        </AppSessionStateProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

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
