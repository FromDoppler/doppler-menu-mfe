import React, { useState } from "react";
import { Loading } from "../Loading";
import { QuestionsForm } from "./QuestionsForm";
import { ValidateMaxSubscribersConfirmation } from "./ValidateMaxSubscribersConfirmation";
import { UnexpectedError } from "../UnexpectedError";
import { useDopplerLegacyClient } from "../../client/dopplerLegacyClient";
import { useQuery } from "react-query";
import { FormattedMessage } from "react-intl";
import { SubmitButton } from "./form-helpers";
import { MaxSubscribersData } from "./types";

interface ValidateSubscribersProps {
  handleClose: () => void;
}

export const ValidateSubscribersForm = ({
  handleClose,
}: ValidateSubscribersProps) => {
  const dopplerLegacyClient = useDopplerLegacyClient();
  const {
    data: validationFormData,
    isLoading,
    error,
  } = useQuery<MaxSubscribersData>(
    "getMaxSubscribersData",
    dopplerLegacyClient.getMaxSubscribersData,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    // TODO: improve that, never occur if validationFormData is undefined
    const isSuccess = validationFormData
      ? await dopplerLegacyClient.sendMaxSubscribersData(validationFormData)
      : false;
    if (isSuccess) {
      setSuccess(isSuccess);
    }
    return isSuccess;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <UnexpectedError />;
  }

  if (success) {
    return <ValidateMaxSubscribersConfirmation handleClose={handleClose} />;
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
              onClick={handleClose}
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
