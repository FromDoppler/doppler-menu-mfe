import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { PlanType, User } from "../model";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { UserPlan } from "./UserPlan";
import { userData as defaultUser } from "../mocks/userMock";
import { IntlProviderDouble } from "./i18n/DopplerIntlProvider.double-with-ids-as-values";

describe(UserPlan.name, () => {
  it("should render user free trial plan", () => {
    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={defaultUser} />
      </MenuIntlProvider>,
    );

    // Assert
    screen.getByText(defaultUser.plan.planName);
    screen.getByText(defaultUser.plan.maxSubscribers);
    screen.getByText(defaultUser.plan.buttonText);
    screen.getByText(defaultUser.plan.remainingCredits);
    screen.getByText(defaultUser.plan.description);
  });

  it("should display the user's monthly plan information.", () => {
    // Arrange
    const maxSubscribers = 500;
    const remainingCredits = 1212;
    const usedCredits = maxSubscribers - remainingCredits;
    const monthlyPlanUser: User = {
      ...defaultUser,
      plan: {
        ...defaultUser.plan,
        planType: "monthly-deliveries",
        isMonthlyByEmail: true,
        maxSubscribers,
        remainingCredits,
      },
    };

    // Act
    render(
      <IntlProviderDouble>
        <UserPlan user={monthlyPlanUser} />
      </IntlProviderDouble>,
    );

    // Assert
    screen.getByText(new RegExp(`${usedCredits}\ +header.plan_emails`));
    screen.getByText(remainingCredits);
    screen.getByText(/header.availables/);
  });

  it("should display the user's contact plan information", () => {
    // Arrange
    const maxSubscribers = 500;
    const remainingCredits = 1212;
    const usedCredits = maxSubscribers - remainingCredits;
    const contactPlanUser: User = {
      ...defaultUser,
      plan: {
        ...defaultUser.plan,
        planType: "contacts",
        maxSubscribers,
        remainingCredits,
      },
    };

    // Act
    render(
      <IntlProviderDouble>
        <UserPlan user={contactPlanUser} />
      </IntlProviderDouble>,
    );

    // Assert
    screen.getByText(new RegExp(`${usedCredits}\ +header.plan_subscribers`));
    screen.getByText(remainingCredits);
    screen.getByText(/header.availables/);
  });

  it.each([
    { planType: undefined },
    { planType: "prepaid" },
    { planType: "agencies" },
    { planType: "free" },
  ])(
    "should display the user's plan information for $planType plan types",
    ({ planType }) => {
      // Arrange
      const remainingCredits = 878876;
      const contactPlanUser: User = {
        ...defaultUser,
        plan: {
          ...defaultUser.plan,
          planType: planType as PlanType,
          description: "undefined.plan.description",
          remainingCredits,
        },
      };

      // Act
      render(
        <IntlProviderDouble>
          <UserPlan user={contactPlanUser} />
        </IntlProviderDouble>,
      );

      // Assert
      screen.getByText(remainingCredits);
      screen.getByText(/undefined.plan.description/);
    },
  );

  it("should render an Upgrade button when plan has a button url and a pending free upgrade", () => {
    // Arrange
    const upgradeLabel = "UPGRADE";

    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={defaultUser} />
      </MenuIntlProvider>,
    );

    // Assert
    expect(screen.getByText(upgradeLabel)).toBeInTheDocument();
  });

  it("should display upgrade form modal when Upgrade button is clicked", async () => {
    // Arrange
    const modalTestId = "upgrade.plan.form.modal";
    const freeUser = {
      ...defaultUser,
      plan: {
        ...defaultUser.plan,
        buttonText: "upgrade.plan.button",
      },
    };

    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={freeUser} />
      </MenuIntlProvider>,
    );

    const upgradeButton = screen.getByText("upgrade.plan.button");
    await user.click(upgradeButton);
    screen.getByTestId(modalTestId);
  });

  it("should display plan link when plan no pending for upgrade", () => {
    const buttonText = "no.pending.for.upgrade";
    const upgradeLinkPlanUser: User = {
      ...defaultUser,
      plan: {
        ...defaultUser.plan,
        pendingFreeUpgrade: false,
        buttonUrl: "upgrade/link/to/test",
        buttonText,
      },
    };

    // Act
    render(
      <IntlProviderDouble>
        <UserPlan user={upgradeLinkPlanUser} />
      </IntlProviderDouble>,
    );

    // Assert
    const upgradeLink = screen.getByText(buttonText);
    expect(upgradeLink).toHaveAttribute(
      "href",
      upgradeLinkPlanUser.plan.buttonUrl,
    );
  });

  it("should display button with tip when upgrade request was sent", () => {
    // Arrange
    const tooltipPlanUser: User = {
      ...defaultUser,
      isLastPlanRequested: true,
    };

    // Act
    render(
      <IntlProviderDouble>
        <UserPlan user={tooltipPlanUser} />
      </IntlProviderDouble>,
    );

    screen.getByText("header.send_request");
    screen.getByText("header.tooltip_last_plan");
  });

  it("don't should display button with tip when upgrade request wasn't sent", () => {
    // Arrange
    const tooltipPlanUser: User = {
      ...defaultUser,
      isLastPlanRequested: false,
    };

    // Act
    render(
      <IntlProviderDouble>
        <UserPlan user={tooltipPlanUser} />
      </IntlProviderDouble>,
    );

    const updatePlanButton = screen.queryByText("header.send_request");
    const tip = screen.queryByText("header.tooltip_last_plan");
    expect(updatePlanButton).not.toBeInTheDocument();
    expect(tip).not.toBeInTheDocument();
  });

  it("should display sms plan information when is enabled", () => {
    // Arrange
    const smsPlanUser: User = {
      ...defaultUser,
      sms: {
        smsEnabled: true,
        remainingCredits: -1.0,
        description: "description.sms",
        buttonText: "button.sms",
        buttonUrl: "sms.url",
      },
    };

    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={smsPlanUser} />
      </MenuIntlProvider>,
    );
    screen.getByTestId("sms-information-test-id");
    screen.getByText("description.sms");
    screen.getByText(/-1.0/);
    const smsLink = screen.getByText("button.sms");
    expect(smsLink).toHaveAttribute("href", smsPlanUser.sms!.buttonUrl);
  });

  it("should no display sms plan information when sms is disable", () => {
    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={defaultUser} />
      </MenuIntlProvider>,
    );

    const description = screen.queryByTestId("sms-information-test-id");
    expect(description).not.toBeInTheDocument();
  });

  it("should display chat plan information when is enabled and user is not client manager", () => {
    // Arrange
    const chatPlanUser: User = {
      ...defaultUser,
      chat: {
        active: true,
        planName: "Premium Plan Conversations",
        chatDescription: "chat",
        wppDescription: "whats app",
        conversationsQtyBalance: 10,
        whatsAppCreditBalance: 10,
      },
    };

    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={chatPlanUser} />
      </MenuIntlProvider>,
    );
    screen.getByTestId("chat-plan-test-id");
    screen.getByText("Premium Plan Conversations");
  });

  it("should not display chat plan information when is disabled", () => {
    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={defaultUser} />
      </MenuIntlProvider>,
    );
    const description = screen.queryByTestId("chat-plan-test-id");
    expect(description).not.toBeInTheDocument();
  });
});
