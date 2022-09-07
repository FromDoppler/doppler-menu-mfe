import { render, screen } from "@testing-library/react";
import { HeaderMessages } from "./HeaderMessages";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { Alert, User } from "../model";
import { QueryClient, QueryClientProvider } from "react-query";
import userEvent from "@testing-library/user-event";

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
  navItems: [
    {
      title: "Control Panel",
      url: "/ControlPanel/ControlPanel/",
      idHTML: "controlPanel",
    },
  ],
  sms: { smsEnabled: false },
  isLastPlanRequested: false,
  hasClientManager: false,
};

describe("<HeaderMessages />", () => {
  it("render alert action as link when url is defined", () => {
    const url = "test--url";
    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: { url, text: "upgrade.now" },
    };

    render(
      <MenuIntlProvider>
        <HeaderMessages alert={alertData} user={userData} />
      </MenuIntlProvider>
    );

    const actionLink = screen.getByText("upgrade.now");
    expect(actionLink).toHaveAttribute("href", url);
  });

  it.each([
    { action: "upgradePlanPopup" },
    { action: "validateSubscribersPopup" },
  ])(
    "render alert action as button when url is undefined and action is $action",
    ({ action }) => {
      const alertData: Alert = {
        type: "warning",
        message: "test--message",
        button: { text: "upgrade.now.button", action },
      };

      render(
        <MenuIntlProvider>
          <HeaderMessages alert={alertData} user={userData} />
        </MenuIntlProvider>
      );

      screen.getByText("upgrade.now.button");
    }
  );

  it("display a button if url property is undefined and action is validateSubscribersPopup", async () => {
    const modalTestId = "modal";
    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        text: "button.action.text",
        action: "validateSubscribersPopup",
      },
    };

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MenuIntlProvider>
          <HeaderMessages alert={alertData} user={userData} />
        </MenuIntlProvider>
      </QueryClientProvider>
    );

    const button = screen.getByText("button.action.text");
    await userEvent.click(button);

    const modal = screen.queryByTestId(modalTestId);
    const content = modal!.querySelector(".modal-content--large");
    expect(content).toBeInTheDocument();
  });

  it("render alert action as button when url and action properties are undefined", () => {
    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        text: "upgrade.now.with.action.unknown",
        action: "UNKNOWN ACTION",
      },
    };

    render(
      <MenuIntlProvider>
        <HeaderMessages alert={alertData} user={userData} />
      </MenuIntlProvider>
    );

    screen.queryByTestId("upgrade.now.with.action.unknown");
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
