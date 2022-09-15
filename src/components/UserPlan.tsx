import { useState } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { PlanType, User } from "../model";
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
        <span className="ms-icon icon-info-icon" />
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
            <UserPlanInformation
              planType={planType}
              remainingCredits={remainingCredits}
              credits={maxSubscribers}
              description={description}
            />
            {sms.smsEnabled ? (
              <SmsInformation
                buttonText={sms.buttonText}
                buttonUrl={sms.buttonUrl}
                description={sms.description}
                remainingCredits={sms.remainingCredits}
              />
            ) : null}
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

const UserPlanInformation = ({
  planType,
  credits,
  remainingCredits,
  description,
}: {
  credits: number;
  remainingCredits: number;
  planType?: PlanType;
  description?: string;
}) => {
  if (planType === "monthly-deliveries" || planType === "contacts") {
    const creditCriteria =
      planType === "contacts"
        ? "header.plan_subscribers"
        : "header.plan_emails";
    return (
      <div className="user-plan--buyContainer">
        <p>
          {credits - remainingCredits} <FormattedMessage id={creditCriteria} />{" "}
          (<strong>{remainingCredits}</strong>{" "}
          <FormattedMessage id="header.availables" />)
        </p>
      </div>
    );
  }
  return (
    <div className="user-plan--buyContainer">
      <p>
        <strong>{remainingCredits}</strong> {description}
      </p>
    </div>
  );
};

const SmsInformation = ({
  remainingCredits,
  description,
  buttonUrl,
  buttonText,
}: {
  remainingCredits: number;
  description: string;
  buttonUrl: string;
  buttonText: string;
}) => {
  return (
    <div
      className="user-plan--buyContainer"
      data-testid="sms-information-test-id"
    >
      <p>
        <strong>
          US${" "}
          <FormattedNumber
            // eslint-disable-next-line react/style-prop-object
            style="decimal"
            value={remainingCredits}
            minimumFractionDigits={2}
            maximumFractionDigits={2}
          />
        </strong>{" "}
        {description}
      </p>
      <a className="user-plan" target="_self" href={buttonUrl}>
        {buttonText}
      </a>
    </div>
  );
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
