import { render, screen } from "@testing-library/react";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { IntlProviderDouble } from "./i18n/DopplerIntlProvider.double-with-ids-as-values";
import { userData } from "../mocks/userMock";
import { User } from "../model";
import { AddOnPlan } from "./AddOnPlan";

const defaultUser: User = {
  ...userData,
  onsite: {
    active: true,
    planName: "Premium Plan OnSite",
    description: "Available prints",
    qty: 100,
    buttonText: "BUY NOW",
    buttonUrl: "https://webappint.fromdoppler.net",
  },
  pushNotificationPlan: {
    active: true,
    planName: "Premium Plan Push Notification",
    description: "Available emails",
    qty: 100,
    buttonText: "BUY NOW",
    buttonUrl: "https://webappint.fromdoppler.net",
  },
};

describe(AddOnPlan.name, () => {
  it("should render onsite plan details", () => {
    // Act
    if (defaultUser.onsite.active) {
      render(
        <MenuIntlProvider>
          <AddOnPlan
            planName={defaultUser.onsite.planName}
            description={defaultUser.onsite.description}
            qty={defaultUser.onsite.qty}
            buttonText={defaultUser.onsite.buttonText}
            buttonUrl={defaultUser.onsite.buttonUrl}
          />
        </MenuIntlProvider>,
      );
    }

    // Assert
    screen.getByText("Premium Plan OnSite");
    screen.getByText("Plan Available prints");
    expect(
      screen.getByText(defaultUser.onsite.buttonText ?? "").closest("a"),
    ).toHaveAttribute("href", defaultUser.onsite.buttonUrl ?? "");
  });

  it("should not render onsite plan details when qty isn't defined", () => {
    //Arrenge
    const onSiteUser: User = {
      ...defaultUser,
      onsite: {
        active: true,
        planName: "Premium Plan OnSite",
        description: "Available prints",
        qty: undefined,
        buttonText: "BUY NOW",
        buttonUrl: "https://webappint.fromdoppler.net",
      },
    };

    // Act
    if (onSiteUser.onsite.active) {
      render(
        <MenuIntlProvider>
          <AddOnPlan
            planName={onSiteUser.onsite.planName}
            description={onSiteUser.onsite.description}
            qty={onSiteUser.onsite.qty}
            buttonText={onSiteUser.onsite.buttonText}
            buttonUrl={onSiteUser.onsite.buttonUrl}
          />
        </MenuIntlProvider>,
      );
    }

    // Assert
    const description = screen.queryByTestId("onsite-plan-description-test-id");
    expect(description).not.toBeInTheDocument();
  });

  it("should render push notification plan details", () => {
    // Act
    if (defaultUser.pushNotificationPlan.active) {
      render(
        <MenuIntlProvider>
          <AddOnPlan
            planName={defaultUser.pushNotificationPlan.planName}
            description={defaultUser.pushNotificationPlan.description}
            qty={defaultUser.pushNotificationPlan.qty}
            buttonText={defaultUser.pushNotificationPlan.buttonText}
            buttonUrl={defaultUser.pushNotificationPlan.buttonUrl}
          />
        </MenuIntlProvider>,
      );
    }

    // Assert
    screen.getByText("Premium Plan Push Notification");
    screen.getByText("Plan Available emails");
    expect(
      screen.getByText(defaultUser.onsite.buttonText ?? "").closest("a"),
    ).toHaveAttribute("href", defaultUser.onsite.buttonUrl ?? "");
  });

  it("should not render push notification plan details when qty isn't defined", () => {
    //Arrenge
    const pushNotificationUser: User = {
      ...defaultUser,
      pushNotificationPlan: {
        active: true,
        planName: "Premium Plan Push Notification",
        description: "Available emails",
        qty: undefined,
        buttonText: "BUY NOW",
        buttonUrl: "https://webappint.fromdoppler.net",
      },
    };

    // Act
    if (pushNotificationUser.pushNotificationPlan.active) {
      render(
        <MenuIntlProvider>
          <AddOnPlan
            planName={pushNotificationUser.pushNotificationPlan.planName}
            description={pushNotificationUser.pushNotificationPlan.description}
            qty={pushNotificationUser.pushNotificationPlan.qty}
            buttonText={pushNotificationUser.pushNotificationPlan.buttonText}
            buttonUrl={pushNotificationUser.pushNotificationPlan.buttonUrl}
          />
        </MenuIntlProvider>,
      );
    }

    // Assert
    const description = screen.queryByTestId("onsite-plan-description-test-id");
    expect(description).not.toBeInTheDocument();
  });
});
