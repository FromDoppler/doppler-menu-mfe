import { render, screen } from "@testing-library/react";
import { UserMenu } from "./UserMenu";
import { User } from "../model";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";

const user: User = {
  email: "test@makingsense.com",
  fullname: "test makingsense",
  plan: {
    planType: "1",
    description: "Available Contacts",
    itemDescription: "Contacts",
    planName: "Free Trial",
    isSubscribers: true,
    maxSubscribers: 500,
    remainingCredits: 500,
    buttonText: "UPGRADE",
    buttonUrl: "/ControlPanel/AccountPreferences/PreUpgrade?origin=hello_bar",
    pendingFreeUpgrade: true,
  },
  avatar: { text: "BS", color: "#EE9C70" },
  nav: [
    {
      title: "Control Panel",
      url: "/ControlPanel/ControlPanel/",
      idHTML: "controlPanel",
    },
  ],
  sms: { smsEnabled: false, remainingCredits: 0.0 },
  isLastPlanRequested: false,
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
