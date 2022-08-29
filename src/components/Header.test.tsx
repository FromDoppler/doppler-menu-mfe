import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { User } from "../model";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";

const userMock: User = {
  email: "bseguer@makingsense.com",
  fullname: "bruno seguer",
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
    isMonthlyByEmail: false,
  },
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
};

describe(Header.name, () => {
  it("should not break if props are missing", () => {
    const mainHeaderLabel = "main header";
    const mainHeaderClass = "header-main";

    render(
      <MenuIntlProvider>
        <Header
          currentPath={"/"}
          nav={[]}
          emptyNotificationText={""}
          notifications={[]}
          user={userMock}
          sticky={true}
        />
      </MenuIntlProvider>
    );

    const headerLabel = screen.getByLabelText(mainHeaderLabel);
    expect(headerLabel).toHaveClass(mainHeaderClass);
  });
});
