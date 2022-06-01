import { render, screen } from "@testing-library/react";
import App from "./App";
import { AppSessionStateProvider } from "./session/AppSessionStateContext";
import {
  AppSessionState,
  AppSessionStateClient,
} from "./session/app-session-abstractions";
import testUserData from "./testUserData.json";

test("renders Doppler Menu Micro-Frontend", () => {
  const mainHeaderLabel = "main header";
  const logoLabel = "company logo";
  const mainNav = "main nav";
  const secondaryNav = "secondary nav";

  const appSessionState: AppSessionState = {
    status: "authenticated",
    dopplerAccountName: "dopplerAccountName",
    userData: testUserData as any,
  };

  const dummyAppSessionStateClient: AppSessionStateClient = {
    getCurrentSessionState: () => appSessionState,
    onSessionUpdate: () => {},
    start: () => {},
  };

  render(
    <AppSessionStateProvider appSessionStateClient={dummyAppSessionStateClient}>
      <App />
    </AppSessionStateProvider>
  );

  expect(screen.getByLabelText(mainHeaderLabel)).toBeInTheDocument();
  expect(screen.getByLabelText(logoLabel)).toBeInTheDocument();
  expect(screen.getByLabelText(mainNav)).toBeInTheDocument();
  expect(screen.getByLabelText(secondaryNav)).toBeInTheDocument();
});
