import { render, screen } from "@testing-library/react";
import { UnexpectedError } from "./UnexpectedError";
import { MenuIntlProvider } from "./i18n/MenuIntlProvider";

describe("UnexpectedError component", () => {
  it("should render UnexpectedError", async () => {
    // Act
    render(
      <MenuIntlProvider>
        <UnexpectedError />
      </MenuIntlProvider>
    );

    // Assert
    expect(screen.getByTestId("unexpected-error")).toBeInTheDocument();
  });
});
