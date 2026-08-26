import { fireEvent, render, screen } from "@testing-library/react";
import {
  EcoIAMenuButton,
  ECO_IA_OPEN_REQUESTED_EVENT_TYPE,
} from "./EcoIAMenuButton";
import { DOPPLER_SESSION_STATE_UPDATE_EVENT_TYPE } from "../session/doppler-session-mfe-conventions";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";

const renderEcoIAMenuButton = () =>
  render(
    <MenuIntlProvider>
      <EcoIAMenuButton />
    </MenuIntlProvider>,
  );

const setEcoIAAddOnActive = (active: boolean) => {
  window.dopplerSessionState = {
    status: "authenticated",
    jwtToken: "test-token",
    dopplerAccountName: "test-account",
    lang: "es",
    rawDopplerUserData: {
      user: {
        addOnPlans: [
          {
            active,
            planData: { idAddOnType: 5 },
          },
        ],
      },
    },
  };
};

describe(EcoIAMenuButton.name, () => {
  afterEach(() => {
    window.dopplerSessionState = undefined;
  });

  it("does not render when the Eco IA add-on is inactive", () => {
    setEcoIAAddOnActive(false);

    renderEcoIAMenuButton();

    expect(screen.queryByTestId("eco-ia-menu-button")).not.toBeInTheDocument();
  });

  it("renders after the session reports an active Eco IA add-on", () => {
    renderEcoIAMenuButton();

    setEcoIAAddOnActive(true);
    fireEvent(window, new Event(DOPPLER_SESSION_STATE_UPDATE_EVENT_TYPE));

    expect(screen.getByTestId("eco-ia-menu-button")).toBeInTheDocument();
  });

  it("requests the docked widget to open when clicked", () => {
    setEcoIAAddOnActive(true);
    const openRequested = jest.fn();
    window.addEventListener(ECO_IA_OPEN_REQUESTED_EVENT_TYPE, openRequested);

    renderEcoIAMenuButton();
    fireEvent.click(screen.getByTestId("eco-ia-menu-button"));

    expect(openRequested).toHaveBeenCalledTimes(1);
    window.removeEventListener(ECO_IA_OPEN_REQUESTED_EVENT_TYPE, openRequested);
  });
});
