import { render, screen } from "@testing-library/react";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";
import { ConfirmationMessage } from "./ConfirmationMessage";

describe("<ConfirmationMessage />", () => {
  const amount = 500;

  it("should display amount subscribers prop in message", () => {
    render(
      <MenuIntlProvider>
        <ConfirmationMessage
          isSubscriber={"false"}
          amountSubscribers={amount}
        />
      </MenuIntlProvider>
    );

    screen.getByText(new RegExp(amount.toString()));
  });

  it("should display shipping message when not a subscriber", () => {
    render(
      <MenuIntlProvider>
        <ConfirmationMessage
          isSubscriber={"false"}
          amountSubscribers={amount}
        />
      </MenuIntlProvider>
    );

    screen.getByText(/Envíos./);
  });

  it("should display contact message when is subscriber", () => {
    render(
      <MenuIntlProvider>
        <ConfirmationMessage isSubscriber={"true"} amountSubscribers={amount} />
      </MenuIntlProvider>
    );

    screen.getByText(/Contactos./);
  });
});
