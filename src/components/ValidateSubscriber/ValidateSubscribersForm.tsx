import React from "react";
import { Loading } from "../Loading";
import { QuestionsForm } from "./QuestionsForm";
import { ValidateMaxSubscribersConfirmation } from "./ValidateMaxSubscribersConfirmation";
import { UnexpectedError } from "../UnexpectedError";
import {
  useGetMaxSubscribers,
  useSendMaxSubscribersData,
} from "../../client/dopplerLegacyClient";
import { FormattedMessage } from "react-intl";
import { SubmitButton } from "./form-helpers";

interface ValidateSubscribersProps {
  onClose: () => void;
  onComplete?: () => void;
}

export const ValidateSubscribersForm = ({
  onClose,
  onComplete,
}: ValidateSubscribersProps) => {
  const {
    data: validationFormData,
    isLoading,
    isError,
  } = useGetMaxSubscribers();
  const {
    mutate: sendMaxSubscriberMutate,
    isSuccess,
    isLoading: isSending,
  } = useSendMaxSubscribersData();

  const handleSubmit = () => {
    // TODO: improve that, never occur if validationFormData is undefined
    if (!validationFormData) {
      return;
    }
    if (isSending) {
      return;
    }
    sendMaxSubscriberMutate(validationFormData);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <UnexpectedError />;
  }

  if (isSuccess) {
    if (onComplete) {
      onComplete();
    }
    return <ValidateMaxSubscribersConfirmation handleClose={onClose} />;
  }

  const customSubmit = (
    <>
      <p>
        <i>
          <FormattedMessage id="validate_max_subscribers_form.form_help" />{" "}
          <a
            target="_BLANK"
            rel="noreferrer"
            href={validationFormData?.urlHelp}
          >
            <FormattedMessage id="validate_max_subscribers_form.form_help_link_text" />
            <br />
          </a>
          <FormattedMessage id="validate_max_subscribers_form.info_text" />
        </i>
      </p>
      <div className="dp-container">
        <div className="dp-rowflex">
          <div className="dp-footer-form">
            <button
              type="button"
              className="dp-button button-medium primary-grey m-r-6"
              onClick={onClose}
            >
              <FormattedMessage id="common.cancel" />
            </button>
            <SubmitButton className="dp-button button-medium primary-green">
              <FormattedMessage id="common.save" />
            </SubmitButton>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section className="dp-container">
      <div className="dp-wrapper-form-plans">
        <h2 className="modal-title">
          <FormattedMessage id="validate_max_subscribers_form.title" />
        </h2>
        <p>
          <FormattedMessage id="validate_max_subscribers_form.subtitle" />
        </p>
        {validationFormData && (
          <QuestionsForm
            questions={validationFormData.questionsList}
            onSubmit={handleSubmit}
            customSubmit={customSubmit}
            className="dp-validate-max-subscribers"
          />
        )}
      </div>
    </section>
  );
};
