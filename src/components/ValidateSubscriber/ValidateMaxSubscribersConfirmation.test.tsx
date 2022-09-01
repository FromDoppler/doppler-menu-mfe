import { render, screen } from "@testing-library/react";
import { ValidateMaxSubscribersConfirmation } from "./ValidateMaxSubscribersConfirmation";
import { IntlProviderDouble } from "../i18n/DopplerIntlProvider.double-with-ids-as-values";
import userEvent from "@testing-library/user-event";

describe("ValidateMaxSubscribersConfirm", () => {
  it("should call handleClose when button is clicked", async () => {
    // Arrange
    const handleClose = jest.fn();

    // Act
    render(
      <IntlProviderDouble>
        <ValidateMaxSubscribersConfirmation handleClose={handleClose} />
      </IntlProviderDouble>
    );
    const button = screen.getByText(
      "validate_max_subscribers_form.button_accept"
    );
    await userEvent.click(button);

    // Assert
    expect(handleClose).toBeCalledTimes(1);
  });
});
