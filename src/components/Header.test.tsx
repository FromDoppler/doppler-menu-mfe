import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { User } from "../model";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";

const userMock: User = {
  idUser: 123,
  email: "bseguer@makingsense.com",
  fullname: "bruno seguer",
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

describe(Header.name, () => {
  it("should not break if props are missing", () => {
    const mainHeaderLabel = "main header";
    const mainHeaderClass = "header-main";
    const dashboardUrl = "http://test/";

    const { container } = render(
      <MenuIntlProvider>
        <Header
          selectNavItem={() => {}}
          unselectNavItem={() => {}}
          navBar={{
            currentUrl: "/",
            selectedItemId: null,
            defaultActiveItemId: null,
            forcedActiveItemId: null,
            items: [],
            isExpanded: false,
          }}
          user={userMock}
          sticky={true}
          dashboardUrl={dashboardUrl}
        />
      </MenuIntlProvider>,
    );

    const headerLabel = screen.getByLabelText(mainHeaderLabel);
    expect(headerLabel).toHaveClass(mainHeaderClass);
    const dashboardLink = container.querySelector(".logo a");
    expect(dashboardLink).toBeTruthy();
    expect(dashboardLink).toHaveAttribute("href", dashboardUrl);
  });
});
