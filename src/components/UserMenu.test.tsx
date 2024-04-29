import { render, screen } from "@testing-library/react";
import { UserMenu } from "./UserMenu";
import { User } from "../model";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";

const user: User = {
  idUser: 123,
  email: "test@makingsense.com",
  fullname: "test makingsense",
  plan: {
    planType: "free",
    description: "Available Contacts",
    itemDescription: "Contacts",
    planName: "Free Trial",
    isSubscribers: true,
    maxSubscribers: 500,
    remainingCredits: 500,
    buttonText: "UPGRADE",
    buttonUrl: "/ControlPanel/AccountPreferences/PreUpgrade?origin=hello_bar",
    pendingFreeUpgrade: true,
    isMonthlyByEmail: false,
  },
  landings: {
    planName: "Add Ons",
    buttonText: "BUY NOW",
    buttonUrl: "https://webappint.fromdoppler.net",
    landingsEditorEnabled: true,
    landingPacks: [
      {
        packageQty: 1,
        landingsQty: 5,
      },
    ],
  },
  lang: "es",
  avatar: { text: "BS", color: "#EE9C70" },
  navItems: [
    {
      title: "Control Panel",
      url: "/ControlPanel/ControlPanel/",
      idHTML: "controlPanel",
    },
  ],
  sms: { smsEnabled: false },
  isLastPlanRequested: false,
  hasClientManager: false,
  chat: { active: false },
};

describe("<UserMenu />", () => {
  it("renders user menu", () => {
    render(
      <MenuIntlProvider>
        <UserMenu user={user} />
      </MenuIntlProvider>,
    );

    expect(screen.getAllByText(user.fullname)).toHaveLength(2);
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(user.navItems[0].title)).toBeInTheDocument();
    expect(screen.getAllByText(user.avatar.text)).toHaveLength(1);
  });
});
