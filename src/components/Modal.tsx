interface ModalProp {
  isOpen: boolean;
  type?: string;
  handleClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({
  isOpen,
  type = "medium",
  handleClose,
  children,
}: ModalProp) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" data-testid="modal">
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
