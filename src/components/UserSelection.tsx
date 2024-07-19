import { FormattedMessage } from "react-intl";
import { RelatedUsersData } from "../model";
import { useState } from "react";

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

  const handleSearchOnChange = (value: string) => {
    setUsers(
      data
        .filter((user) => user.AccountName.includes(value))
        .sort((item) => {
          return item.AccountName === currentUser ? -1 : 0;
        }),
    );
  };

  return (
    <>
      <h2 className="modal-title">
        <FormattedMessage id={"userSelectionMenu.title"} />
      </h2>
      <p>
        <FormattedMessage id={"userSelectionMenu.description"} />
      </p>
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
                  <span className="dp-img-account"></span>
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
