import { render, screen } from "@testing-library/react";
import { UserMenu } from "./UserMenu";
import { User } from "../model";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";

const baseUser: User = {
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
  onsite: { active: false },
};

describe("<UserMenu />", () => {
  it("renders user menu", () => {
    render(
      <MenuIntlProvider>
        <UserMenu user={baseUser} />
      </MenuIntlProvider>,
    );

    expect(screen.getAllByText(baseUser.fullname)).toHaveLength(2);
    expect(screen.getByText(baseUser.email)).toBeInTheDocument();
    expect(screen.getByText(baseUser.navItems[0].title)).toBeInTheDocument();
    expect(screen.getAllByText(baseUser.avatar.text)).toHaveLength(1);
  });

  it("renders user menu without accounts button", () => {
    render(
      <MenuIntlProvider>
        <UserMenu user={baseUser} />
      </MenuIntlProvider>,
    );

    expect(screen.queryByTestId("user-accounts-test-id")).not.toBeInTheDocument;
  });

  it("renders user menu with accounts button", () => {
    const user = {
      ...baseUser,
      userAccount: {
        email: "test@fromdoppler.com",
        firstName: "test",
        idLanguage: 2,
        lastName: "test",
        userProfileType: "USER",
      },
      relatedUsers: [
        {
          IdUser: 123,
          IdUserAccount: 123,
          UTCLastAccessDate: new Date(),
          AccountName: "test@makingsense.com",
          FirstName: "TEST",
          LastName: "LastName",
          Type: "COLLABORATOR",
        },
        {
          IdUser: 456,
          IdUserAccount: 456,
          UTCLastAccessDate: new Date(),
          AccountName: "bseguer@makingsense.com",
          FirstName: "Bruno",
          LastName: "Seguer",
          Type: "USER",
        },
      ],
    };

    render(
      <MenuIntlProvider>
        <UserMenu user={user} />
      </MenuIntlProvider>,
    );

    expect(screen.getByText("Ver todas las cuentas")).toBeInTheDocument;
  });
});
