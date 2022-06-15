import { useState } from "react";
import { Modal } from "./Modal";
import { User, Alert } from "../model";
import { UpgradePlanForm } from "./UpgradePlanForm";

interface HeaderMessagesProp {
  alert: Alert;
  user: User;
}
const updatePlanPopup = "updatePlanPopup";

export const HeaderMessages = ({ alert, user }: HeaderMessagesProp) => {
  const { plan } = user;
  const { type, message, button } = alert;
  const { url, text, action } = button || {};

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = (isOpen: boolean) => setModalIsOpen(isOpen);

  const showLink = () =>
    text && (
      <a
        href={url}
        className="button button--light button--tiny"
        data-testid="linkButton"
      >
        {text}
      </a>
    );

  const showButton = () =>
    text && (
      <button
        className="button button--light button--tiny"
        data-testid="actionButton"
        onClick={() => toggleModal(true)}
      >
        {text}
      </button>
    );

  if (!Object.keys(alert).length) return null;
  if (action && action !== updatePlanPopup) return null;

  return (
    <div className={`messages-container sticky ${type}`}>
      <div className="wrapper">
        {message && <p>{message}</p>}
        {url ? showLink() : button ? showButton() : null}
      </div>
      <Modal isOpen={modalIsOpen} handleClose={() => toggleModal(false)}>
        <UpgradePlanForm
          isSubscriber={plan.isSubscribers}
          handleClose={() => toggleModal(false)}
          user={user}
        />
      </Modal>
    </div>
  );
};
