import { useState } from "react";
import { FormattedNumber, useIntl } from "react-intl";
import { User } from "../model";
import { Modal } from "./Modal";
import { Tooltip } from "./Tooltip";
import { UpgradePlanForm } from "./UpgradePlanForm";

interface UserPlanProps {
  user: User;
}

export const UserPlan = ({ user }: UserPlanProps) => {
  const { sms, plan, hasClientManager, isLastPlanRequested, clientManager } =
    user;

  const {
    planName,
    maxSubscribers,
    planType,
    itemDescription,
    buttonUrl,
    buttonText,
    pendingFreeUpgrade,
    remainingCredits,
    description,
    isSubscribers,
    isMonthlyByEmail,
  } = plan;

  const {
    smsEnabled,
    remainingCredits: smsRemainingCredits,
    description: smsDescription,
    buttonUrl: smsButtonUrl,
    buttonText: smsButtonText,
  } = sms;

  const intl = useIntl();
  const planPrepaid = intl.formatMessage({ id: "header.plan_prepaid" });
  const sendRequest = intl.formatMessage({ id: "header.send_request" });
  const profile = intl.formatMessage({ id: "header.profile" });
  const sendMails = intl.formatMessage({ id: "header.send_mails" });
  const enabled = intl.formatMessage({ id: "header.enabled" });
  const suscribers = intl.formatMessage({ id: "header.plan_suscribers" });
  const emails = intl.formatMessage({ id: "header.plan_emails" });
  const availables = intl.formatMessage({ id: "header.availables" });
  const toolTipLastPlanText = intl.formatMessage({
    id: "header.tooltip_last_plan",
  });

  const isPlanTypeMonthlyDeliveries = planType === "monthly-deliveries";
  const isPlanTypeSuscribers = planType === "suscribers";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const showTooltip = () => (
    <Tooltip>
      <OpenModalButton
        className="user-plan close-user--menu dp-tooltip-left"
        openModalHandler={openModalHandler}
      >
        {sendRequest}
        <div className="tooltiptext">{toolTipLastPlanText}</div>
      </OpenModalButton>
      <span className="ms-icon icon-info-icon"></span>
    </Tooltip>
  );

  const renderPlanLink = () => {
    if (buttonUrl && !pendingFreeUpgrade)
      return (
        <a className="user-plan" href={buttonUrl}>
          {buttonText}
        </a>
      );
  };

  return (
    <div className="user-plan--container">
      {!hasClientManager && (
        <UserPlanType>
          {isSubscribers || isMonthlyByEmail ? (
            <>
              <MonthlyPlan>
                <strong>{planName}</strong> ({maxSubscribers} {itemDescription})
              </MonthlyPlan>
              {renderPlanLink()}
            </>
          ) : (
            <>
              <MonthlyPlan>{planPrepaid}</MonthlyPlan>
              {renderPlanLink()}
            </>
          )}

          {(buttonUrl && pendingFreeUpgrade) || !buttonUrl
            ? !isLastPlanRequested && (
                <OpenModalButton
                  className="user-plan"
                  openModalHandler={openModalHandler}
                >
                  {buttonText}
                </OpenModalButton>
              )
            : isLastPlanRequested && (
                <div className="dp-request-sent">{showTooltip()}</div>
              )}
        </UserPlanType>
      )}

      {hasClientManager && (
        <UserPlanType>
          {clientManager?.profileName && (
            <MonthlyPlan>
              {profile} <strong>{clientManager?.profileName}</strong>
            </MonthlyPlan>
          )}
          {!clientManager?.profileName && (
            <>
              <MonthlyPlan>{sendMails}</MonthlyPlan>
              <p className="user-plan-enabled">{enabled}</p>
            </>
          )}
        </UserPlanType>
      )}

      {!hasClientManager && (
        <UserPlanType>
          {isPlanTypeMonthlyDeliveries || isPlanTypeSuscribers ? (
            <BuyContainer>
              <p>
                {Number(maxSubscribers) - Number(remainingCredits)}{" "}
                {isPlanTypeSuscribers ? suscribers : emails} (
                <strong>{remainingCredits}</strong> {availables})
              </p>
            </BuyContainer>
          ) : (
            <BuyContainer>
              <p>
                <strong>{remainingCredits}</strong> {description}
              </p>
            </BuyContainer>
          )}
          {!!Object.keys(sms).length && smsEnabled && (
            <BuyContainer>
              <p>
                <strong>
                  US${" "}
                  <FormattedNumber
                    // eslint-disable-next-line react/style-prop-object
                    style="decimal"
                    value={smsRemainingCredits}
                    minimumFractionDigits={2}
                    maximumFractionDigits={2}
                  />
                </strong>{" "}
                {smsDescription}
              </p>
              {smsButtonUrl && (
                <a className="user-plan" target="_self" href={smsButtonUrl}>
                  {smsButtonText}
                </a>
              )}
            </BuyContainer>
          )}
        </UserPlanType>
      )}
      <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <UpgradePlanForm
          isSubscriber={plan.isSubscribers}
          handleClose={() => setIsModalOpen(false)}
          user={user}
        />
      </Modal>
    </div>
  );
};

const MonthlyPlan = ({ children }: { children: React.ReactNode }) => {
  return <p className="user-plan--monthly-text">{children}</p>;
};

const UserPlanType = ({ children }: { children: React.ReactNode }) => (
  <div className="user-plan--type">{children}</div>
);

const BuyContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="user-plan--buyContainer">{children}</div>;
};

const OpenModalButton = ({
  className,
  openModalHandler,
  children,
}: {
  className: string;
  openModalHandler: () => void;
  children: React.ReactNode;
}) => (
  <button onClick={() => openModalHandler()} className={className}>
    {children}
  </button>
);
