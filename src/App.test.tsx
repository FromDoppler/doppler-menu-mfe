import { render, screen } from "@testing-library/react";
import App from "./App";
import { AppSessionStateProvider } from "./session/AppSessionStateContext";
import {
  AppSessionState,
  AppSessionStateClient,
} from "./session/app-session-abstractions";
import testUserData from "./testUserData.json";
import { MenuIntlProvider } from "./components/i18n/MenuIntlProvider";
import { safeUserData } from "./utils";
import { QueryClient, QueryClientProvider } from "react-query";

test("renders Doppler Menu Micro-Frontend", () => {
  const mainHeaderLabel = "main header";
  const logoLabel = "company logo";
  const mainNav = "main nav";
  const secondaryNav = "secondary nav";

  const appSessionState: AppSessionState = {
    status: "authenticated",
    dopplerAccountName: "dopplerAccountName",
    lang: testUserData.user.lang,
    userData: safeUserData(testUserData),
  };

  const dummyAppSessionStateClient: AppSessionStateClient = {
    getCurrentSessionState: () => appSessionState,
    onSessionUpdate: () => {},
    start: () => {},
  };
  const queryClient = new QueryClient();

  render(
    <AppSessionStateProvider appSessionStateClient={dummyAppSessionStateClient}>
      <MenuIntlProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </MenuIntlProvider>
    </AppSessionStateProvider>
  );

  expect(screen.getByLabelText(mainHeaderLabel)).toBeInTheDocument();
  expect(screen.getByLabelText(logoLabel)).toBeInTheDocument();
  expect(screen.getByLabelText(mainNav)).toBeInTheDocument();
  expect(screen.getByLabelText(secondaryNav)).toBeInTheDocument();
});
