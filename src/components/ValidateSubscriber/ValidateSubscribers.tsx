import { useReducer, useEffect, useState } from "react";
import { Loading } from "../Loading";
import {
  INITIAL_STATE,
  validateMaxSubscribersFormReducer,
  VALIDATE_MAX_SUBSCRIBERS_FORM_ACTIONS,
} from "./reducer/validateMaxSubscribersFormReducer";
import { ValidateMaxSubscribersForm } from "./ValidateMaxSubscribersForm";
import { ValidateMaxSubscribersConfirmation } from "./ValidateMaxSubscribersConfirmation";
import { UnexpectedError } from "../UnexpectedError";
import { useDopplerLegacyClient } from "../../client/dopplerLegacyClient";

interface ValidateSubscribersProps {
  handleClose: () => void;
  setNextAlert: () => void;
}

export const ValidateSubscribers = ({
  handleClose,
  setNextAlert,
}: ValidateSubscribersProps) => {
  const [{ loading, hasError, validationFormData }, dispatch] = useReducer(
    validateMaxSubscribersFormReducer,
    INITIAL_STATE
  );
  const dopplerLegacyClient = useDopplerLegacyClient();

  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const isSuccess = await dopplerLegacyClient.sendMaxSubscribersData(
      validationFormData
    );
    if (isSuccess) {
      setSuccess(isSuccess);
      setNextAlert();
    }
    return isSuccess;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: VALIDATE_MAX_SUBSCRIBERS_FORM_ACTIONS.START_FETCH });
        const response = await dopplerLegacyClient.getMaxSubscribersData();
        dispatch({
          type: VALIDATE_MAX_SUBSCRIBERS_FORM_ACTIONS.FINISH_FETCH,
          payload: response,
        });
      } catch (error) {
        dispatch({ type: VALIDATE_MAX_SUBSCRIBERS_FORM_ACTIONS.FAIL_FETCH });
      }
    };
    fetchData();
  }, [dopplerLegacyClient.getMaxSubscribersData]);

  if (loading) {
    return <Loading />;
  }

  if (hasError) {
    return <UnexpectedError />;
  }

  if (success) {
    return <ValidateMaxSubscribersConfirmation handleClose={handleClose} />;
  }

  return (
    <ValidateMaxSubscribersForm
      validationFormData={validationFormData}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};
