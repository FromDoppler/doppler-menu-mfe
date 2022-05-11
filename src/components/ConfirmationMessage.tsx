import { FormattedMessage } from "react-intl";

interface ConfirmationMessageProp {
  isSubscriber: boolean;
  amountSubscribers: number;
}

export const ConfirmationMessage = ({
  isSubscriber,
  amountSubscribers,
}: ConfirmationMessageProp) => {
  const values: Record<string, any> = {
    bold: (chunks: string): any => <b>{` ${amountSubscribers} ${chunks} `}</b>,
  };

  return (
    <>
      <h1 className="text-align--center">
        <FormattedMessage id="upgradePlanForm.confirmation_title" />
      </h1>
      <p className="text-align--center">
        <FormattedMessage
          id={`upgradePlanForm.confirmation_subtitle_${
            isSubscriber ? "contact" : "shipping"
          }`}
          values={values}
        />
      </p>
    </>
  );
};
