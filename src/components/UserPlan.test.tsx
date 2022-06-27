import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { User } from "../model";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { UserPlan } from "./UserPlan";

const userData: User = {
  email: "test@makingsense.com",
  fullname: "test makingsense",
  lastName: "makingsense",
  plan: {
    planType: "1",
    idUserTypePlan: 0,
    description: "Available Contacts",
    itemDescription: "Contacts",
    planName: "Free Trial",
    isSubscribers: true,
    maxSubscribers: 500,
    remainingCredits: 500,
    buttonText: "UPGRADE",
    buttonUrl: "/ControlPanel/AccountPreferences/PreUpgrade?origin=hello_bar",
    planDiscount: 0,
    monthPlan: 0,
    subscribersCount: 0,
    trialActive: true,
    trialExpired: false,
    trialExpirationDate: "2022-07-08T00:00:00",
    trialExpirationDays: 87,
    planFee: 0.0,
    pendingFreeUpgrade: true,
  },
  lang: "en",
  avatar: { text: "BS", color: "#EE9C70" },
  nav: [
    {
      title: "Control Panel",
      url: "/ControlPanel/ControlPanel/",
      isEnabled: false,
      isSelected: false,
      idHTML: "controlPanel",
    },
  ],
  sms: { smsEnabled: false, remainingCredits: 0.0 },
  isLastPlanRequested: false,
  hasCampaignSent: false,
};

describe("<UserPlan />", () => {
  it("should render user free trial plan", () => {
    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={userData} />
      </MenuIntlProvider>
    );

    // Assert
    expect(screen.getByText(userData.plan.planName)).toBeInTheDocument();
    expect(screen.getByText(userData.plan.maxSubscribers)).toBeInTheDocument();
    expect(screen.getByText(userData.plan.buttonText)).toBeInTheDocument();
    expect(
      screen.getByText(userData.plan.remainingCredits)
    ).toBeInTheDocument();
    expect(screen.getByText(userData.plan.description)).toBeInTheDocument();
  });

  it("should render user monthly plan", () => {
    // Arrange
    const monthlyPlanUser: User = {
      ...userData,
      plan: {
        ...userData.plan,
        isMonthlyByEmail: "true",
        planName: "Monthly Plan",
        buttonText: "upgrade",
        description: "Remaining Emails",
      },
    };

    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={monthlyPlanUser} />
      </MenuIntlProvider>
    );

    // Assert
    expect(screen.getByText(monthlyPlanUser.plan.planName)).toBeInTheDocument();
    expect(
      screen.getByText(monthlyPlanUser.plan.buttonText)
    ).toBeInTheDocument();
  });

  it("should render an Upgrade button when plan has a button url and a pending free upgrade", () => {
    // Arrange
    const upgradeLabel = "UPGRADE";

    // Act
    render(
      <MenuIntlProvider>
        <UserPlan user={userData} />
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
        <UserPlan user={userData} />
      </MenuIntlProvider>
    );

    const upgradeButton = screen.getByText(upgradeLabel);
    await user.click(upgradeButton);
    const modal = screen.getByTestId(modalTestId);
    expect(modal).toBeInTheDocument();
  });

  it("should render an Upgrade link when plan has a button url and no pending free upgrade", () => {
    const upgradeLinkPlanUser: User = {
      ...userData,
      plan: {
        ...userData.plan,
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
      ...userData,
      isLastPlanRequested: true,
      plan: {
        ...userData.plan,
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
      ...userData,
      sms: {
        smsEnabled: true,
        remainingCredits: 0.0,
        description: "Disponible para SMS",
        buttonText: "CARGAR",
        buttonUrl: "GetSmsConfiguration",
      },
      plan: {
        ...userData.plan,
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
