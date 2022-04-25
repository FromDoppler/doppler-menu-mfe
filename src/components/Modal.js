const Modal = ({
  isOpen,
  type = "medium",
  handleClose,
  className,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" data-testid="modal">
      <div className={`modal-content--${type} ${className}`}>
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

export default Modal;
