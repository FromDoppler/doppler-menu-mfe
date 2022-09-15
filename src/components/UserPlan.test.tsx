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
    expect(screen.getByText(defaultUser.plan.planName)).toBeInTheDocument();
    expect(
      screen.getByText(defaultUser.plan.maxSubscribers)
    ).toBeInTheDocument();
    expect(screen.getByText(defaultUser.plan.buttonText)).toBeInTheDocument();
    expect(
      screen.getByText(defaultUser.plan.remainingCredits)
    ).toBeInTheDocument();
    expect(screen.getByText(defaultUser.plan.description)).toBeInTheDocument();
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

  it("should render Modal when Upgrade button is clicked", async () => {
    // Arrange
    const upgradeLabel = "UPGRADE";
    const modalTestId = "modal";

    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={defaultUser} />
      </MenuIntlProvider>
    );

    const upgradeButton = screen.getByText(upgradeLabel);
    await user.click(upgradeButton);
    const modal = screen.getByTestId(modalTestId);
    expect(modal).toBeInTheDocument();
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

  it("should render a sms plan description", () => {
    // Arrange
    const smsPlanUser: User = {
      ...defaultUser,
      sms: {
        smsEnabled: true,
        remainingCredits: 0.0,
        description: "Disponible para SMS",
        buttonText: "CARGAR",
        buttonUrl: "GetSmsConfiguration",
      },
      plan: {
        ...defaultUser.plan,
      },
    };

    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={smsPlanUser} />
      </MenuIntlProvider>
    );

    expect(screen.getByText("Disponible para SMS")).toBeInTheDocument();
    const smsLink = screen.getByText("CARGAR");
    expect(smsLink).toHaveAttribute("href", smsPlanUser.sms.buttonUrl);
  });
});
