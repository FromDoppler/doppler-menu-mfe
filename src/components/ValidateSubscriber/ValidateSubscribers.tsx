import { useReducer, useEffect, useState } from "react";
import { Loading } from "../Loading";
import {
  INITIAL_STATE,
  validateMaxSubscribersFormReducer,
  VALIDATE_MAX_SUBSCRIBERS_FORM_ACTIONS,
} from "./reducer/validateMaxSubscribersFormReducer";
import { ValidateMaxSubscribersForm } from "./ValidateMaxSubscribersForm";
import { getMaxSubscribersData } from "./validate-max-subscribers-doubles";
import { ValidateMaxSubscribersConfirmation } from "./ValidateMaxSubscribersConfirmation";
import { UnexpectedError } from "../UnexpectedError";

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

  const [success, setSuccess] = useState(false);
  const handleSubmit = () => {
    // TODO: submit implementation
    setSuccess(true);
    setNextAlert();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: VALIDATE_MAX_SUBSCRIBERS_FORM_ACTIONS.START_FETCH });
        // TODO: Connect with data.
        const response = await getMaxSubscribersData();
        dispatch({
          type: VALIDATE_MAX_SUBSCRIBERS_FORM_ACTIONS.FINISH_FETCH,
          payload: response,
        });
      } catch (error) {
        dispatch({ type: VALIDATE_MAX_SUBSCRIBERS_FORM_ACTIONS.FAIL_FETCH });
      }
    };
    fetchData();
  }, []);

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
