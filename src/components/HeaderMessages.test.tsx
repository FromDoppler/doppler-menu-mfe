import { render, screen } from "@testing-library/react";
import { HeaderMessages } from "./HeaderMessages";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { Alert, User } from "../model";

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
};

describe("<HeaderMessages />", () => {
  it("display a link if url property is defined", () => {
    const linkTestId = "linkButton";
    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        url: "test--url",
        text: "Upgrade Now",
      },
    };

    render(
      <MenuIntlProvider>
        <HeaderMessages alert={alertData} user={userData} />
      </MenuIntlProvider>
    );

    const link = screen.getByTestId(linkTestId);
    expect(link).toHaveAttribute("href", alertData.button.url);
  });

  it("display a button if url property is undefined", () => {
    const buttonTestId = "actionButton";
    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        text: "Upgrade Now",
      },
    };

    render(
      <MenuIntlProvider>
        <HeaderMessages alert={alertData} user={userData} />
      </MenuIntlProvider>
    );

    screen.getByTestId(buttonTestId);
  });

  it("display button text property", () => {
    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        text: "Upgrade Now",
      },
    };

    render(
      <MenuIntlProvider>
        <HeaderMessages alert={alertData} user={userData} />
      </MenuIntlProvider>
    );

    screen.getByText(alertData.button.text);
  });
});
