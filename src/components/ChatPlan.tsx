import { FormattedNumber } from "react-intl";

export const ChatPlan = ({
  planName,
  chatDescription,
  chatQty,
  wppBalance,
  wppDescription,
}: {
  planName: string;
  chatDescription: string;
  chatQty: number;
  wppBalance: number;
  wppDescription: string;
}) => (
  <>
    <div className="user-plan--type">
      <p className="user-plan--chat-text">
        <strong>{planName}</strong>
      </p>
    </div>
    <div className="user-plan--type">
      <div className="user-plan--buyContainer">
        <p>
          <strong>{chatDescription}</strong> {chatQty}
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
  </>
);
