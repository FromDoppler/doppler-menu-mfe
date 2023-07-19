import { render, screen } from "@testing-library/react";
import { MenuIntlProvider } from "./MenuIntlProvider";
import { FormattedMessage } from "react-intl";

jest.mock("./es", () => ({
  messages_es: {
    lang: "es",
  },
}));

const LANG_DEFAULT = "es";

describe(MenuIntlProvider.name, () => {
  it("should translate a message using the default language", () => {
    // Act
    render(
      <MenuIntlProvider>
        <FormattedMessage id="lang" />
      </MenuIntlProvider>,
    );
    // Assert
    screen.getByText(LANG_DEFAULT);
  });
});
