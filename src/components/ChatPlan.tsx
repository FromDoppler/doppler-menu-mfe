import { FormattedNumber } from "react-intl";

export const ChatPlan = ({
  planName,
  chatDescription,
  chatQty,
  wppBalance,
  wppDescription,
  buttonUrl,
  buttonText
}: {
  planName: string;
  chatDescription: string;
  chatQty: number | undefined;
  wppBalance: number | undefined;
  wppDescription: string;
  buttonUrl?: string;
  buttonText?: string;
}) => (
  <>
    <div className="user-plan--type" data-testid="chat-plan-test-id">
      <p className="user-plan--chat-text">
        <strong>{planName}</strong>
      </p>
      <a type="button" href={buttonUrl} className="user-plan">
        {buttonText}
      </a>
    </div>
    {chatQty && wppBalance ? (
      <div
        className="user-plan--type"
        data-testid="chat-plan-description-test-id"
      >
        <div className="user-plan--buyContainer">
          <p>
            <strong>{chatQty}</strong> {chatDescription}
          </p>
        </div>
        <div className="user-plan--buyContainer">
          <p>
            <strong>
              US${" "}
              <FormattedNumber
                // eslint-disable-next-line react/style-prop-object
                style="decimal"
                value={wppBalance}
                minimumFractionDigits={2}
                maximumFractionDigits={2}
              />
            </strong>{" "}
            {wppDescription}
          </p>
        </div>
      </div>
    ) : (
      <></>
    )}
  </>
);
