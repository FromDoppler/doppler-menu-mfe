import { ReactNode, useState } from "react";
import { Modal } from "./Modal";
import { User, Alert } from "../model";
import { UpgradePlanForm } from "./UpgradePlanForm";
import { ValidateSubscribersForm } from "./ValidateSubscriber/ValidateSubscribersForm";

interface HeaderMessagesProp {
  alert: Alert;
  user: User;
}

const upgradePlanPopup = "upgradePlanPopup";
const validateSubscribersPopup = "validateSubscribersPopup";

export const HeaderMessages = ({ alert, user }: HeaderMessagesProp) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<Alert>(alert);

  if (!Object.keys(alert).length) {
    return null;
  }

  const { plan } = user;
  const { type, message, button } = currentAlert;

  const toggleModal = (isOpen: boolean) => setModalIsOpen(isOpen);
  const showNextAlert = () => {
    alert.nextAlert && setCurrentAlert(alert.nextAlert);
  };

  // Only validateSubscribersPopup and upgradePlanPopup actions are supported
  const hasModal =
    button?.action &&
    (button.action === validateSubscribersPopup ||
      button?.action === upgradePlanPopup);

  const showAction = button?.url || button?.action;

  return (
    <>
      <div className={`messages-container sticky ${type}`}>
        <div className="wrapper">
          {message && <p>{message}</p>}
          {showAction && (
            <ActionComponent
              type={button?.url ? "LINK" : "BUTTON"}
              url={button?.url}
              onClick={() => toggleModal(true)}
            >
              {button?.text}
            </ActionComponent>
          )}
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
            <ValidateSubscribersForm
              onClose={() => toggleModal(false)}
              onComplete={showNextAlert}
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

interface ActionComponentProps {
  url?: string;
  onClick?: () => void;
  children: string | ReactNode;
  type: "BUTTON" | "LINK";
}

const ActionComponent = ({
  children,
  type,
  url,
  onClick,
}: ActionComponentProps) => {
  if (type === "LINK") {
    return (
      <a href={url} className="button button--light button--tiny">
        {children}
      </a>
    );
  }

  return (
    <button className="button button--light button--tiny" onClick={onClick}>
      {children}
    </button>
  );
};
