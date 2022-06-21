import { render, screen } from "@testing-library/react";
import { UserMenu } from "./UserMenu";
import { User } from "../model";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";

const user: User = {
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

describe("<UserMenu />", () => {
  it("renders user menu", () => {
    render(
      <MenuIntlProvider>
        <UserMenu user={user} />
      </MenuIntlProvider>
    );

    expect(screen.getByText(user.fullname)).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(user.nav[0].title)).toBeInTheDocument();
    expect(screen.getAllByText(user.avatar.text)).toHaveLength(2);
  });
});
