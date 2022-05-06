import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Modal } from "./Modal";

const content = "Test Children";
const iconTestId = "modal-close";
const modalTestId = "modal";
const modalClass = "modal";
const toggleModal = jest.fn();

describe("<Modal />", () => {
  it("renders Modal component", async () => {
    render(
      <Modal isOpen={true} children={content} handleClose={toggleModal} />
    );

    const modal = screen.getByTestId(modalTestId);
    expect(modal).toHaveClass(modalClass);
  });

  it("renders children prop", async () => {
    render(
      <Modal isOpen={true} children={content} handleClose={toggleModal} />
    );

    screen.getByText(content);
  });

  it("closes when click on close icon", async () => {
    render(
      <Modal isOpen={true} children={content} handleClose={toggleModal} />
    );

    const closeIcon = screen.getByTestId(iconTestId);
    await user.click(closeIcon);
    expect(toggleModal).toHaveBeenCalledTimes(1);
  });
});
