import { useState } from "react";
import Modal from "./Modal";
import UpgradePlanForm from "./UpgradePlanForm";

const updatePlanPopup = "updatePlanPopup";

const HeaderMessages = ({ alert = {}, user = {} }) => {
  const { plan = {} } = user;
  const { type = "", message = "", button = {} } = alert;
  const { url = "", text = "", action = "" } = button;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = (isOpen) => setModalIsOpen(isOpen);

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
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        handleClose={() => toggleModal(false)}
      >
        <UpgradePlanForm
          isSubscriber={plan.isSubscribers}
          handleClose={() => toggleModal(false)}
          user={user}
        />
      </Modal>
    </div>
  );
};

export default HeaderMessages;
