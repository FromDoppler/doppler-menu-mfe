import { render, screen, waitFor } from "@testing-library/react";
import { HeaderMessages } from "./HeaderMessages";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { Alert, User } from "../model";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import userEvent from "@testing-library/user-event";
import * as dopplerLegacyClient from "../client/dopplerLegacyClient";
import { MaxSubscribersData } from "./ValidateSubscriber/types";

const userData: User = {
  email: "email@mock.com",
  fullname: "bruno seguer",
  plan: {
    planType: "free",
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

    const queryClient = new QueryClient();
    render(
      <MenuIntlProvider>
        <QueryClientProvider client={queryClient}>
          <HeaderMessages alert={alertData} user={userData} />
        </QueryClientProvider>
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

      const queryClient = new QueryClient();
      render(
        <MenuIntlProvider>
          <QueryClientProvider client={queryClient}>
            <HeaderMessages alert={alertData} user={userData} />
          </QueryClientProvider>
        </MenuIntlProvider>
      );

      screen.getByText("upgrade.now.button");
    }
  );

  it("display a button if url property is undefined and action is validateSubscribersPopup", async () => {
    const modalTestId = "validate.subscribe.modal";
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

    const queryClient = new QueryClient();
    render(
      <MenuIntlProvider>
        <QueryClientProvider client={queryClient}>
          <HeaderMessages alert={alertData} user={userData} />
        </QueryClientProvider>
      </MenuIntlProvider>
    );

    screen.getByText("upgrade.now.with.action.unknown");
  });

  it("display button text property when it is a button", () => {
    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        text: "button.action.upgrade.now",
        action: "upgradePlanPopup",
      },
    };

    const queryClient = new QueryClient();
    render(
      <MenuIntlProvider>
        <QueryClientProvider client={queryClient}>
          <HeaderMessages alert={alertData} user={userData} />
        </QueryClientProvider>
      </MenuIntlProvider>
    );

    screen.getByText("button.action.upgrade.now");
  });

  it("show next alert when action alert is complete", async () => {
    // Arrange
    const questions = {
      questionsList: [
        {
          answer: {
            answerType: "TEXTFIELD",
            answerOptions: [],
            value: "answer.input",
            optionsSelected: [],
          },
          question: "question",
        },
      ],
      isSentSuccessEmail: false,
      urlReferrer: "",
      urlHelp: "https://help.fromdoppler.com/",
    };
    jest
      .spyOn(dopplerLegacyClient, "useGetMaxSubscribers")
      .mockImplementation(() =>
        useQuery<MaxSubscribersData>(
          "getMaxSubscribersData",
          async () => Promise.resolve(questions),
          {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
          }
        )
      );

    const alertData: Alert = {
      type: "warning",
      message: "test--message",
      button: {
        text: "button.action.text",
        action: "validateSubscribersPopup",
      },
      nextAlert: {
        type: "warning",
        message: "next.alert.message",
        button: {
          text: "button.action.text",
          action: "validateSubscribersPopup",
        },
      },
    };

    const queryClient = new QueryClient();
    // Act
    render(
      <QueryClientProvider client={queryClient}>
        <MenuIntlProvider>
          <HeaderMessages alert={alertData} user={userData} />
        </MenuIntlProvider>
      </QueryClientProvider>
    );
    // Assert
    const button = screen.getByText("button.action.text");
    await userEvent.click(button);

    const answerInput = screen.getByLabelText("question", {
      selector: "input",
    });
    await userEvent.type(answerInput, "answer");

    const submitButton = screen.getByText("Guardar");
    await userEvent.click(submitButton);

    waitFor(async () => {
      const confirmButton = screen.getByText("Aceptar");
      await userEvent.click(confirmButton);

      screen.getByText("next.alert.message");
    });
  });
});
