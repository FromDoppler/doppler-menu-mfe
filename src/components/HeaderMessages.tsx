import { useState } from "react";
import { Modal } from "./Modal";
import { User, Alert } from "../model";
import { UpgradePlanForm } from "./UpgradePlanForm";
import { ValidateSubscribers } from "./ValidateSubscriber/ValidateSubscribers";

interface HeaderMessagesProp {
  alert: Alert;
  user: User;
}

const upgradePlanPopup = "upgradePlanPopup";
const validateSubscribersPopup = "validateSubscribersPopup";

export const HeaderMessages = ({ alert, user }: HeaderMessagesProp) => {
  const { plan } = user;
  const { type, message, button } = alert;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = (isOpen: boolean) => setModalIsOpen(isOpen);
  // TODO: nextAlert logic

  const showLink = ({ text, url }: { text: string; url: string }) => (
    <a
      href={url}
      className="button button--light button--tiny"
      data-testid="linkButton"
    >
      {text}
    </a>
  );

  const showButton = ({ text }: { text: string; action: string }) => (
    <button
      className="button button--light button--tiny"
      data-testid="actionButton"
      onClick={() => toggleModal(true)}
    >
      {text}
    </button>
  );

  if (!Object.keys(alert).length) return null;

  // Only validateSubscribersPopup and upgradePlanPopup actions are supported
  const hasModal =
    button?.action &&
    (button.action === validateSubscribersPopup ||
      button?.action === upgradePlanPopup);

  return (
    <>
      <div className={`messages-container sticky ${type}`}>
        <div className="wrapper">
          {message && <p>{message}</p>}
          {button?.url
            ? showLink(button)
            : button?.action
            ? showButton(button)
            : null}
        </div>
      </div>
      {hasModal && (
        <Modal
          isOpen={modalIsOpen}
          handleClose={() => toggleModal(false)}
          type={
            button?.action === validateSubscribersPopup ? "large" : "medium"
          }
        >
          {button?.action === validateSubscribersPopup ? (
            <ValidateSubscribers
              handleClose={() => toggleModal(false)}
              setNextAlert={() => {}}
            />
          ) : (
            <UpgradePlanForm
              isSubscriber={plan.isSubscribers}
              handleClose={() => toggleModal(false)}
              user={user}
            />
          )}
        </Modal>
      )}
    </>
  );
};
