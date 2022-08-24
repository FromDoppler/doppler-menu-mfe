import { render, screen } from "@testing-library/react";
import { ValidateMaxSubscribersConfirmation } from "./ValidateMaxSubscribersConfirmation";
import user from "@testing-library/user-event";
import { MenuIntlProvider } from "../i18n/MenuIntlProvider";

describe("ValidateMaxSubscribersConfirm", () => {
  it("should call handleClose when button is clicked", async () => {
    // Arrange
    const handleClose = jest.fn();

    // Act
    render(
      <MenuIntlProvider>
        <ValidateMaxSubscribersConfirmation handleClose={handleClose} />
      </MenuIntlProvider>
    );

    const button = screen.getByRole("button", {
      name: "Aceptar",
    });

    await user.click(button);

    // Assert
    expect(handleClose).toBeCalledTimes(1);
  });
});
