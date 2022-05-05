import { render, screen } from "@testing-library/react";
import { Nav } from "./Nav";
import { User, NavItem } from "../headerData";

const mainNav = "main nav";
const secondaryNav = "secondary nav";
const nav: NavItem[] = [
  {
    title: "Home",
    url: "/Dashboard/",
    isEnabled: false,
    isSelected: false,
    idHTML: "dashboard",
  },
  {
    title: "Campaigns",
    url: "/Campaigns/Draft/",
    idHTML: "campaignMenu",
    isEnabled: false,
    isSelected: false,
    subNav: [
      {
        title: "Draft",
        url: "/Campaigns/Draft/",
        isEnabled: false,
        isSelected: false,
        idHTML: "dashboard",
      },
      {
        title: "Scheduled",
        url: "/Campaigns/Scheduled/",
        isEnabled: false,
        isSelected: false,
        idHTML: "dashboard",
      },
      {
        title: "Sent",
        url: "/Campaigns/Sent/",
        isEnabled: false,
        isSelected: false,
        idHTML: "dashboard",
      },
      {
        title: "A/B Test",
        url: "/Campaigns/TestAB/",
        isEnabled: false,
        isSelected: false,
        idHTML: "dashboard",
      },
    ],
  },
];

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

describe(Nav.name, () => {
  it("should not break if props are missing", () => {
    render(
      <Nav
        user={user}
        nav={[]}
        notifications={[]}
        isInactiveSection={false}
        emptyNotificationText={""}
        openMenuHeader={jest.fn()}
        closeMenuHeader={jest.fn()}
      />
    );

    expect(screen.getAllByRole("navigation").length).toEqual(2);
    expect(screen.getByLabelText(mainNav)).toBeInTheDocument();
    expect(screen.getByLabelText(secondaryNav)).toBeInTheDocument();
  });

  it("should render Navs properly", () => {
    render(
      <Nav
        nav={nav}
        user={user}
        notifications={[]}
        isInactiveSection={false}
        emptyNotificationText={""}
        openMenuHeader={jest.fn()}
        closeMenuHeader={jest.fn()}
      />
    );

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
  });
});
