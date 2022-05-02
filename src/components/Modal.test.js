import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { IntlProvider } from "react-intl";
import messages_es from "../i18n/es";
import Modal from "./Modal";

describe("<Modal />", () => {
  it("renders Modal component", async () => {
    const modalTestId = "modal";
    const modalClass = "modal";

    render(
      <IntlProvider locale="es" messages={messages_es}>
        <Modal isOpen={true} />
      </IntlProvider>
    );

    const modal = screen.getByTestId(modalTestId);
    expect(modal).toHaveClass(modalClass);
  });

  it("renders children prop", async () => {
    const content = "Test Children";

    render(
      <IntlProvider locale="es" messages={messages_es}>
        <Modal isOpen={true} children={content} />
      </IntlProvider>
    );

    screen.getByText(content);
  });

  it("closes when click on close icon", async () => {
    const iconTestId = "modal-close";
    const toggleModal = jest.fn();

    render(
      <IntlProvider locale="es" messages={messages_es}>
        <Modal isOpen={true} handleClose={toggleModal} />
      </IntlProvider>
    );

    const closeIcon = screen.getByTestId(iconTestId);
    await user.click(closeIcon);
    expect(toggleModal).toHaveBeenCalledTimes(1);
  });
});
