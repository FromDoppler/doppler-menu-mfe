import { ReactNode, useState } from "react";
import { Modal } from "./Modal";
import { User, Alert } from "../model";
import { UpgradePlanForm } from "./UpgradePlanForm";
import { ValidateSubscribersForm } from "./ValidateSubscriber/ValidateSubscribersForm";
import { useDopplerLegacyClient } from "../client/dopplerLegacyClient";
import { getProccessUrlWithAccountType } from "../utils";

interface HeaderMessagesProp {
  alert: Alert;
  user: User;
  onClose?: () => void;
}

const upgradePlanPopup = "upgradePlanPopup";
const validateSubscribersPopup = "validateSubscribersPopup";

export const HeaderMessages = ({
  alert,
  user,
  onClose,
}: HeaderMessagesProp) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<Alert>(alert);
  const client = useDopplerLegacyClient();

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

  const setButtonOnclick = () => {
    if (hasModal) {
      return toggleModal(true);
    }
    if (currentAlert.button?.action === "closeModal") {
      return client.sendAcceptButtonAction().then(() => {
        if (onClose) {
          onClose();
        }
      });
    }
  };

  return (
    <>
      <div className={`messages-container sticky ${type}`}>
        <div className="wrapper">
          {message && <p>{message}</p>}
          {showAction && (
            <ActionComponent
              type={button?.url ? "LINK" : "BUTTON"}
              url={button?.url}
              onClick={() => setButtonOnclick()}
              isFreeAccount={plan.isFreeAccount}
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
          data-testid={"validate.subscribe.modal"}
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
  isFreeAccount: boolean;
  type: "BUTTON" | "LINK";
}

const ActionComponent = ({
  children,
  type,
  url,
  isFreeAccount,
  onClick,
}: ActionComponentProps) => {
  if (type === "LINK") {
    const processedUrl = getProccessUrlWithAccountType(
      url || "",
      isFreeAccount,
    );
    return (
      <a href={processedUrl} className="button button--light button--tiny">
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="button button--light button--tiny"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
