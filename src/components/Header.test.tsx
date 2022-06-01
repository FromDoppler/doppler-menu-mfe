import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { User } from "../model";

const userMock: User = {
  email: "bseguer@makingsense.com",
  fullname: "bruno seguer",
  lastName: "seguer",
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

describe(Header.name, () => {
  it("should not break if props are missing", () => {
    const mainHeaderLabel = "main header";
    const mainHeaderClass = "header-main";

    render(
      <Header
        currentPath={"/"}
        nav={[]}
        emptyNotificationText={""}
        notifications={[]}
        user={userMock}
      />
    );

    const headerLabel = screen.getByLabelText(mainHeaderLabel);
    expect(headerLabel).toHaveClass(mainHeaderClass);
  });
});
