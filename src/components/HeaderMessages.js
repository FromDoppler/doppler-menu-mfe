import { useState } from "react";
import Modal from "./Modal";

const updatePlanPopup = "updatePlanPopup";

const HeaderMessages = ({ alert = {} }) => {
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
    <div className={`messages-container  ${type}`}>
      <div className="wrapper">
        {message && <p>{message}</p>}
        {url ? showLink() : showButton()}
      </div>
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        handleClose={() => toggleModal(false)}
      >
        <div>test modal</div>
      </Modal>
    </div>
  );
};

export default HeaderMessages;
