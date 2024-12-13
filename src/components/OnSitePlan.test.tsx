import { render, screen } from "@testing-library/react";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { IntlProviderDouble } from "./i18n/DopplerIntlProvider.double-with-ids-as-values";
import { userData } from "../mocks/userMock";
import { User } from "../model";
import { OnSitePlan } from "./OnSitePlan";

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
};

describe(OnSitePlan.name, () => {
  it("should render onsite plan details", () => {
    // Act
    if (defaultUser.onsite.active) {
      render(
        <MenuIntlProvider>
          <OnSitePlan
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
    screen.getByText("Available prints");
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
          <OnSitePlan
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
});
