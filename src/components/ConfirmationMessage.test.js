import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import messages_es from "../i18n/es";
import ConfirmationMessage from "./ConfirmationMessage";

describe("<ConfirmationMessage />", () => {
  it("display amount subscribers prop in message", () => {
    const amount = "500";

    render(
      <IntlProvider locale="es" messages={messages_es}>
        <ConfirmationMessage isSubscriber={false} amountSubscribers={amount} />
      </IntlProvider>
    );

    screen.getByText(new RegExp(amount));
  });

  it("display shipping message when not a subscriber", () => {
    render(
      <IntlProvider locale="es" messages={messages_es}>
        <ConfirmationMessage isSubscriber={false} />
      </IntlProvider>
    );

    screen.getByText(/Envíos./);
  });

  it("display contact message when is subscriber", () => {
    render(
      <IntlProvider locale="es" messages={messages_es}>
        <ConfirmationMessage isSubscriber={true} />
      </IntlProvider>
    );

    screen.getByText(/Contactos./);
  });
});
