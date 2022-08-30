import { FormattedMessage } from "react-intl";

export const ValidateMaxSubscribersConfirmation = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  return (
    <div
      className="text-align--center"
      data-testid="validate-subscribers-confirm"
    >
      <p>
        <FormattedMessage id="validate_max_subscribers_form.request_processed" />
      </p>
      <button
        type="button"
        className="dp-button button-medium primary-green m-t-12"
        onClick={handleClose}
      >
        <FormattedMessage id="validate_max_subscribers_form.button_accept" />
      </button>
    </div>
  );
};
