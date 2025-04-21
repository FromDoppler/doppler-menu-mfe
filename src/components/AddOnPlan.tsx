export const AddOnPlan = ({
  planName,
  description,
  qty,
  buttonUrl,
  buttonText,
}: {
  planName: string;
  description: string;
  qty: number | undefined;
  buttonUrl?: string;
  buttonText?: string;
}) => (
  <>
    <div className="user-plan--type" data-testid="addon-plan-test-id">
      <p className="user-plan--chat-text">
        <strong>{planName}</strong>
      </p>
      <a type="button" href={buttonUrl} className="user-plan">
        {buttonText}
      </a>
      {qty ? (
        <div className="user-plan--buyContainer">
          <p>
            Plan <strong>{qty}</strong> {description}
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  </>
);
