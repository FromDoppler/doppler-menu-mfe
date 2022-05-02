import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import messages_es from "../i18n/es";
import HeaderMessages from "./HeaderMessages";

describe("<HeaderMessages />", () => {
  it("display a link if url property is defined", () => {
    const linkTestId = "linkButton";
    const alertData = {
      button: {
        url: "test--url",
        text: "Upgrade Now",
      },
    };

    render(
      <IntlProvider locale="es" messages={messages_es}>
        <HeaderMessages alert={alertData} />
      </IntlProvider>
    );

    const link = screen.getByTestId(linkTestId);
    expect(link).toHaveAttribute("href", alertData.button.url);
  });

  it("display a button if url property is undefined", () => {
    const buttonTestId = "actionButton";
    const alertData = {
      button: {
        text: "Upgrade Now",
      },
    };

    render(
      <IntlProvider locale="es" messages={messages_es}>
        <HeaderMessages alert={alertData} />
      </IntlProvider>
    );

    screen.getByTestId(buttonTestId);
  });

  it("display button text property", () => {
    const alertData = {
      button: {
        text: "Upgrade Now",
      },
    };

    render(
      <IntlProvider locale="es" messages={messages_es}>
        <HeaderMessages alert={alertData} />
      </IntlProvider>
    );

    screen.getByText(alertData.button.text);
  });
});
