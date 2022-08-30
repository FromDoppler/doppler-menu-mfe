import { render, screen } from "@testing-library/react";
import { HeaderMessages } from "./HeaderMessages";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { Alert, User } from "../model";
import { act } from "react-dom/test-utils";

const userData: User = {
  email: "email@mock.com",
  fullname: "bruno seguer",
  plan: {
    planType: "1",
    description: "Available Contacts",
    itemDescription: "Contacts",
    planName: "Free Trial",
    isSubscribers: true,
    maxSubscribers: 500,
    remainingCredits: 500,
    buttonText: "UPGRADE",
    buttonUrl: "/ControlPanel/AccountPreferences/PreUpgrade?origin=hello_bar",
    pendingFreeUpgrade: true,
    isMonthlyByEmail: false,
  },
  avatar: { text: "BS", color: "#EE9C70" },
  nav: [
    {
      title: "Control Panel",
      url: "/ControlPanel/ControlPanel/",
      idHTML: "controlPanel",
    },
  ],
  sms: { smsEnabled: false, remainingCredits: 0.0 },
  isLastPlanRequested: false,
  hasClientManager: false,
};

describe("<HeaderMessages />", () => {
  it("display a link if url property is defined", () => {
    const linkTestId = "linkButton";
    const url = "test--url";
    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        url,
        text: "Upgrade Now",
      },
    };

    render(
      <MenuIntlProvider>
        <HeaderMessages alert={alertData} user={userData} />
      </MenuIntlProvider>
    );

    const link = screen.getByTestId(linkTestId);
    expect(link).toHaveAttribute("href", url);
  });

  it("display a button if url property is undefined and action is upgradePlanPopup", () => {
    const buttonTestId = "actionButton";
    const modalTestId = "modal";
    const expectedContentSelector = ".modal-content--medium";

    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        text: "Upgrade Now",
        action: "upgradePlanPopup",
      },
    };

    render(
      <MenuIntlProvider>
        <HeaderMessages alert={alertData} user={userData} />
      </MenuIntlProvider>
    );

    const button = screen.queryByTestId(buttonTestId);
    expect(button).toBeInTheDocument();

    act(() => {
      button!.click();
    });

    const modal = screen.queryByTestId(modalTestId);
    expect(modal).toBeInTheDocument();
    const content = modal!.querySelector(expectedContentSelector);
    expect(content).toBeInTheDocument();
  });

  it("display a button if url property is undefined and action is validateSubscribersPopup", () => {
    const buttonTestId = "actionButton";
    const modalTestId = "modal";
    const expectedContentSelector = ".modal-content--large";

    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        text: "VALIDATE!",
        action: "validateSubscribersPopup",
      },
    };

    render(
      <MenuIntlProvider>
        <HeaderMessages alert={alertData} user={userData} />
      </MenuIntlProvider>
    );

    const button = screen.queryByTestId(buttonTestId);
    expect(button).toBeInTheDocument();

    act(() => {
      button!.click();
    });

    const modal = screen.queryByTestId(modalTestId);
    expect(modal).toBeInTheDocument();
    const content = modal!.querySelector(expectedContentSelector);
    expect(content).toBeInTheDocument();
  });

  it("display a button when url property is undefined and action is not an expected action", () => {
    const buttonTestId = "actionButton";
    const modalTestId = "modal";
    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        text: "Upgrade Now",
        action: "UNKNOWN ACTION",
      },
    };

    render(
      <MenuIntlProvider>
        <HeaderMessages alert={alertData} user={userData} />
      </MenuIntlProvider>
    );

    const button = screen.queryByTestId(buttonTestId);
    expect(button).toBeInTheDocument();

    act(() => {
      button!.click();
    });

    const modal = screen.queryByTestId(modalTestId);
    expect(modal).not.toBeInTheDocument();
  });

  it("display button text property when it is a link", () => {
    const text = "Upgrade Now";
    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        text,
        url: "test--url",
      },
    };

    render(
      <MenuIntlProvider>
        <HeaderMessages alert={alertData} user={userData} />
      </MenuIntlProvider>
    );

    screen.getByText(text);
  });

  it("display button text property when it is a button", () => {
    const text = "Upgrade Now";
    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        text,
        action: "upgradePlanPopup",
      },
    };

    render(
      <MenuIntlProvider>
        <HeaderMessages alert={alertData} user={userData} />
      </MenuIntlProvider>
    );

    screen.getByText(text);
  });
});
