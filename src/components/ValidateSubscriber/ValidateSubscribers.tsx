import React, { useState } from "react";
import { Loading } from "../Loading";
import { ValidateMaxSubscribersForm } from "./ValidateMaxSubscribersForm";
import { ValidateMaxSubscribersConfirmation } from "./ValidateMaxSubscribersConfirmation";
import { UnexpectedError } from "../UnexpectedError";
import { useDopplerLegacyClient } from "../../client/dopplerLegacyClient";
import { useQuery } from "react-query";
import { FormattedMessage } from "react-intl";
import { SubmitButton } from "./form-helpers";

interface ValidateSubscribersProps {
  handleClose: () => void;
}

export const ValidateSubscribers = ({
  handleClose,
}: ValidateSubscribersProps) => {
  const dopplerLegacyClient = useDopplerLegacyClient();
  const {
    data: validationFormData,
    isLoading,
    error,
  } = useQuery<any>(
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
    const isSuccess = await dopplerLegacyClient.sendMaxSubscribersData(
      validationFormData
    );
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
    <ValidateMaxSubscribersForm
      validationFormData={validationFormData}
      onSubmit={handleSubmit}
      customSubmit={customSubmit}
    />
  );
};
