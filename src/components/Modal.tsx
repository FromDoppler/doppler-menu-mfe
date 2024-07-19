interface ModalProp {
  isOpen: boolean;
  type?: string;
  modalId?: string;
  handleClose: () => void;
  children: React.ReactNode;
  "data-testid"?: string;
}

export const Modal = ({
  isOpen,
  type = "medium",
  modalId = "",
  handleClose,
  children,
  ...otherProps
}: ModalProp) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" {...otherProps} id={modalId}>
      <div className={`modal-content--${type}`}>
        <span
          onClick={handleClose}
          className="close"
          data-testid="modal-close"
        />
        {children}
      </div>
    </div>
  );
};
