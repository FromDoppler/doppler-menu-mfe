import { FormattedMessage } from "react-intl";

export const ClientManagerUserPlan = ({
  profileName,
}: {
  profileName?: string;
}) => (
  <div className="user-plan--type">
    {profileName ? (
      <p className="user-plan--monthly-text">
        <FormattedMessage id="header.profile" /> <strong>{profileName}</strong>
      </p>
    ) : (
      <>
        <p className="user-plan--monthly-text">
          <FormattedMessage id="header.send_mails" />
        </p>
        <p className="user-plan-enabled">
          <FormattedMessage id="header.enabled" />
        </p>
      </>
    )}
  </div>
);
