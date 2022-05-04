import { Plan } from "../headerData";

interface UserPlanProps {
  plan: Plan;
}

export const UserPlan = ({ plan }: UserPlanProps) => {
  const {
    planName,
    maxSubscribers,
    itemDescription,
    buttonUrl,
    buttonText,
    pendingFreeUpgrade,
    remainingCredits,
    description,
  } = plan;

  return (
    <div className="user-plan--container">
      <div className="user-plan--type">
        <p className="user-plan--monthly-text">
          <strong>{planName}</strong> ({maxSubscribers} {itemDescription})
        </p>
        {buttonUrl && !pendingFreeUpgrade && (
          <a className="user-plan" href={buttonUrl}>
            {buttonText}
          </a>
        )}
        <p className="user-plan--monthly-text" />
      </div>

      <div className="user-plan--type">
        <div className="user-plan--buyContainer">
          <p>
            <strong>{remainingCredits}</strong> {description}
          </p>
        </div>
      </div>
    </div>
  );
};
