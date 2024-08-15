import { FormattedMessage } from "react-intl";
import { RelatedUsersData } from "../model";
import { useState } from "react";
import { useChangeUserSession } from "../client/dopplerLegacyClient";
import { Avatar } from "./Avatar";
import { useAppSessionState } from "../session/AppSessionStateContext";

interface UserSelectionProps {
  data: RelatedUsersData[];
  currentUser: string;
}

export const UserSelection = ({ data, currentUser }: UserSelectionProps) => {
  const [users, setUsers] = useState(
    data.sort((item) => {
      return item.AccountName === currentUser ? -1 : 0;
    }),
  );

  const appSessionState = useAppSessionState();

  const {
    mutate: sendChangeUserSessionMutate,
    isSuccess,
    isLoading: isSending,
    isError,
  } = useChangeUserSession();

  const handleSearchOnChange = (value: string) => {
    setUsers(
      data
        .filter((user) => user.AccountName.includes(value))
        .sort((item) => {
          return item.AccountName === currentUser ? -1 : 0;
        }),
    );
  };

  const handleClick = (value: number) => {
    if (isSending) {
      return;
    }
    sendChangeUserSessionMutate(value);
  };

  if (isSuccess) {
    if (appSessionState.status === "authenticated") {
      const dashboardNav = appSessionState.userData.navItems.filter(
        (item) => item.idHTML === "dashboardMenu",
      )[0];
      window.location.href = dashboardNav.url;
    }
  }

  return (
    <>
      <h2 className="modal-title">
        <FormattedMessage id={"userSelectionMenu.title"} />
      </h2>
      <p>
        <FormattedMessage id={"userSelectionMenu.description"} />
      </p>
      {isError ? (
        <div className="dp-wrap-message dp-wrap-cancel m-b-24">
          <span className="dp-message-icon"></span>
          <div className="dp-content-message">
            <FormattedMessage id={"common.unexpected_error"} />
          </div>
        </div>
      ) : (
        <></>
      )}
      <form action="#" className="awa-form">
        <fieldset className="">
          <ul className="field-group">
            <li className="field-item">
              <label
                htmlFor="search"
                className="labelcontrol"
                aria-disabled="false"
              >
                <FormattedMessage id={"userSelectionMenu.search_text"} />
                <div className="dp-wrap-search">
                  <button className="dp-button button-medium dp-button--search">
                    <span
                      className="ms-icon icon-search"
                      aria-hidden="true"
                    ></span>
                  </button>
                  <FormattedMessage id="userSelectionMenu.search_placeholder">
                    {(placeholderText) => (
                      <input
                        type="search"
                        id="search"
                        placeholder={placeholderText.toString()}
                        aria-invalid="false"
                        onChange={(e) => handleSearchOnChange(e.target.value)}
                      />
                    )}
                  </FormattedMessage>
                </div>
              </label>
            </li>
          </ul>
        </fieldset>
      </form>
      <div className="dp-list-scroll-accounts">
        <ul className="dp-list-accounts">
          {users.map((user) => {
            return (
              <li key={user.IdUserAccount}>
                <div className="dp-account">
                  <Avatar
                    text={user.AvatarText}
                    backgroundColor={user.AvatarColor}
                  />
                  <p className="dp-account-name">
                    <span>
                      <strong>{`${user.FirstName} ${user.LastName}`}</strong>
                    </span>
                    <span>{user.AccountName}</span>
                  </p>
                  <p className="dp-account-status">
                    <span>
                      <FormattedMessage id={`header.profile_${user.Type}`} />
                    </span>
                  </p>
                  <div className="dp-input--radio">
                    <label>
                      <input
                        type="radio"
                        name="radio"
                        defaultChecked={user.AccountName === currentUser}
                        onClick={() => handleClick(user.IdUser)}
                      />
                      <span></span>
                    </label>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
