import { render, screen } from "@testing-library/react";
import Nav from "./Nav";
import { User } from "../headerData";

const mainNav = "main nav";
const secundaryNav = "secundary nav";
const nav = [
  {
    title: "Home",
    url: "/Dashboard/",
  },
  {
    title: "Campaigns",
    url: "/Campaigns/Draft/",
    subNav: [
      {
        title: "Draft",
        url: "/Campaigns/Draft/",
      },
      {
        title: "Scheduled",
        url: "/Campaigns/Scheduled/",
      },
      {
        title: "Sent",
        url: "/Campaigns/Sent/",
      },
      {
        title: "A/B Test",
        url: "/Campaigns/TestAB/",
      },
    ],
    idHTML: "campaignMenu",
  },
  {
    title: "Lists",
    url: "/Lists/SubscribersList/",
    subNav: [
      {
        title: "Main Lists",
        url: "/Lists/SubscribersList/",
      },
      {
        title: "Segments",
        url: "/Lists/Segment/",
      },
      {
        title: "Contacts",
        url: "/Lists/MasterSubscriber/",
      },
      {
        title: "Custom Fields",
        url: "/Lists/MasterCustomFields/",
      },
      {
        title: "Forms",
        url: "/Lists/Form/",
      },
    ],
  },
];

const user = {
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

describe("<Nav />", () => {
  it("should not break if props are missing", () => {
    render(<Nav user={user} />);

    expect(screen.getAllByRole("navigation").length).toEqual(2);
    expect(screen.getByLabelText(mainNav)).toBeInTheDocument();
    expect(screen.getByLabelText(secundaryNav)).toBeInTheDocument();
  });

  it("should render Navs properly", () => {
    render(<Nav nav={nav} user={user} />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
  });
});
