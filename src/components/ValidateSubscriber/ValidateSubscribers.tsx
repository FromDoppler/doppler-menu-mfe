import { useState } from "react";
import { Loading } from "../Loading";
import { ValidateMaxSubscribersForm } from "./ValidateMaxSubscribersForm";
import { ValidateMaxSubscribersConfirmation } from "./ValidateMaxSubscribersConfirmation";
import { UnexpectedError } from "../UnexpectedError";
import { useDopplerLegacyClient } from "../../client/dopplerLegacyClient";
import { useQuery } from "react-query";

interface ValidateSubscribersProps {
  handleClose: () => void;
  setNextAlert: () => void;
}

export const ValidateSubscribers = ({
  handleClose,
  setNextAlert,
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
      setNextAlert();
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

  return (
    <ValidateMaxSubscribersForm
      validationFormData={validationFormData}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};
