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
      </MenuIntlProvider>
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
      </IntlProviderDouble>
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
      </IntlProviderDouble>
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
        </IntlProviderDouble>
      );

      // Assert
      screen.getByText(remainingCredits);
      screen.getByText(/undefined.plan.description/);
    }
  );

  it("should render an Upgrade button when plan has a button url and a pending free upgrade", () => {
    // Arrange
    const upgradeLabel = "UPGRADE";

    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={defaultUser} />
      </MenuIntlProvider>
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
      </MenuIntlProvider>
    );

    const upgradeButton = screen.getByText("upgrade.plan.button");
    await user.click(upgradeButton);
    screen.getByTestId(modalTestId);
  });

  it("should render an Upgrade link when plan has a button url and no pending free upgrade", () => {
    const upgradeLinkPlanUser: User = {
      ...defaultUser,
      plan: {
        ...defaultUser.plan,
        pendingFreeUpgrade: false,
        buttonUrl: "upgrade/link/to/test",
      },
    };
    const upgradeLabel = "UPGRADE";

    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={upgradeLinkPlanUser} />
      </MenuIntlProvider>
    );

    // Assert
    const upgradeLink = screen.getByText(upgradeLabel);
    expect(upgradeLink).toHaveAttribute(
      "href",
      upgradeLinkPlanUser.plan.buttonUrl
    );
  });

  it("should render a button with tooltip when upgrade request was sent", () => {
    // Arrange
    const tooltipPlanUser: User = {
      ...defaultUser,
      isLastPlanRequested: true,
      plan: {
        ...defaultUser.plan,
      },
    };
    const requestSentLabel = "SOLICITUD ENVIADA";

    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={tooltipPlanUser} />
      </MenuIntlProvider>
    );

    const requestSentButton = screen.getByText(requestSentLabel);
    const tooltip = screen.getByText(
      "Estamos diseñando un Plan a la medida de tus necesidades. ¡Te contactaremos pronto!"
    );

    expect(requestSentButton).toBeInTheDocument();
    expect(tooltip).toBeInTheDocument();
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
      </MenuIntlProvider>
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
      </MenuIntlProvider>
    );

    const description = screen.queryByTestId("sms-information-test-id");
    expect(description).not.toBeInTheDocument();
  });
});
