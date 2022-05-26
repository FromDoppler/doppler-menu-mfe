import { render, screen } from "@testing-library/react";
import { User } from "../headerData";
import { MenuRight } from "./MenuRight";

const secondaryNav = "secondary nav";

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
    isSubscribers: "true",
    maxSubscribers: "500",
    remainingCredits: "500",
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

describe("<MenuRight />", () => {
  it("should not break if props are missing", () => {
    render(
      <MenuRight user={user} notifications={[]} emptyNotificationText={""} />
    );

    expect(screen.getAllByRole("navigation").length).toEqual(1);
    expect(screen.getByLabelText(secondaryNav)).toBeInTheDocument();
  });

  it("should render MenuRight properly", () => {
    render(
      <MenuRight user={user} notifications={[]} emptyNotificationText={""} />
    );

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
  });
});