import { render, screen } from "@testing-library/react";
import { User } from "../model";
import { MenuRight } from "./MenuRight";
import user from "@testing-library/user-event";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";

const secondaryNav = "secondary nav";

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
      <MenuIntlProvider>
        <MenuRight
          user={userData}
          notifications={[]}
          emptyNotificationText={""}
          setOpenMenuMobile={jest.fn()}
        />
      </MenuIntlProvider>
    );

    expect(screen.getAllByRole("navigation").length).toEqual(1);
    expect(screen.getByLabelText(secondaryNav)).toBeInTheDocument();
  });

  it("should render MenuRight properly", () => {
    render(
      <MenuIntlProvider>
        <MenuRight
          user={userData}
          notifications={[]}
          emptyNotificationText={""}
          setOpenMenuMobile={jest.fn()}
        />
      </MenuIntlProvider>
    );

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href");
    });
  });

  it("should call toggle menu when open/close icon is clicked", async () => {
    const toggleMenu = jest.fn();
    render(
      <MenuIntlProvider>
        <MenuRight
          user={userData}
          notifications={[]}
          emptyNotificationText={""}
          setOpenMenuMobile={toggleMenu}
        />
      </MenuIntlProvider>
    );

    const openMenu = screen.getByTestId("open-menu");
    const closeMenu = screen.getByTestId("close-menu");
    await user.click(openMenu);
    await user.click(closeMenu);
    expect(toggleMenu).toHaveBeenCalledTimes(2);
  });
});
