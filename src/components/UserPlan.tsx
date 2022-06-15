import { useState } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
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

  const isPlanTypeMonthlyDeliveries = planType === "monthly-deliveries";
  const isPlanTypeSuscribers = planType === "suscribers";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const renderModalButton = () => (
    <OpenModalButton className="user-plan" openModalHandler={openModalHandler}>
      {buttonText}
    </OpenModalButton>
  );

  const renderModalButtonWithTooltip = () => (
    <div className="dp-request-sent">
      <Tooltip>
        <OpenModalButton
          className="user-plan close-user--menu dp-tooltip-left"
          openModalHandler={openModalHandler}
        >
          <FormattedMessage id="header.send_request" />
          <div className="tooltiptext">
            <FormattedMessage id="header.tooltip_last_plan" />
          </div>
        </OpenModalButton>
        <span className="ms-icon icon-info-icon"></span>
      </Tooltip>
    </div>
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
        <>
          <UserPlanType>
            {isSubscribers || isMonthlyByEmail ? (
              <>
                <MonthlyPlan>
                  <strong>{planName}</strong> ({maxSubscribers}{" "}
                  {itemDescription})
                </MonthlyPlan>
                {renderPlanLink()}
              </>
            ) : (
              <>
                <MonthlyPlan>
                  <FormattedMessage id="header.plan_prepaid" />
                </MonthlyPlan>
                {renderPlanLink()}
              </>
            )}
            {!buttonUrl || pendingFreeUpgrade
              ? !isLastPlanRequested
                ? renderModalButton()
                : renderModalButtonWithTooltip()
              : ""}
          </UserPlanType>
          <UserPlanType>
            {isPlanTypeMonthlyDeliveries || isPlanTypeSuscribers ? (
              <BuyContainer>
                <p>
                  {Number(maxSubscribers) - Number(remainingCredits)}{" "}
                  {isPlanTypeSuscribers ? (
                    <FormattedMessage id="header.plan_suscribers" />
                  ) : (
                    <FormattedMessage id="header.plan_emails" />
                  )}{" "}
                  (<strong>{remainingCredits}</strong>{" "}
                  <FormattedMessage id="header.availables" />)
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
        </>
      )}

      {hasClientManager && (
        <UserPlanType>
          {clientManager?.profileName && (
            <MonthlyPlan>
              <FormattedMessage id="header.profile" />{" "}
              <strong>{clientManager?.profileName}</strong>
            </MonthlyPlan>
          )}
          {!clientManager?.profileName && (
            <>
              <MonthlyPlan>
                <FormattedMessage id="header.send_mails" />
              </MonthlyPlan>
              <p className="user-plan-enabled">
                <FormattedMessage id="header.enabled" />
              </p>
            </>
          )}
        </UserPlanType>
      )}
      <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <UpgradePlanForm
          isSubscriber={isSubscribers}
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
