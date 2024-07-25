import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { User } from "../model";
import { Avatar } from "./Avatar";
import { UserPlan } from "./UserPlan";
import { ClientManagerUserPlan } from "./ClientManagerUserPlan";
import { Modal } from "./Modal";
import { FormattedMessage } from "react-intl";
import { UserSelection } from "./UserSelection";

interface UserMenuProps {
  user: User;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const { fullname, email, avatar, navItems, userAccount, relatedUsers } = user;
  const { color: backgroundColor, text: avatarText } = avatar;

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openUserSelection, setOpenUserSelection] = useState(false);
  const showRelatedUsersMenu =
    userAccount && relatedUsers && relatedUsers.length > 1;
  const isCollaborator =
    userAccount && userAccount.userProfileType === "COLLABORATOR";
  const userMenuRef = useOnclickOutside(() => {
    setOpenUserMenu(false);
  });

  const handleToggleNotification = () => {
    setOpenUserMenu((prev) => !prev);
  };

  const handleToggleModal = () => {
    setOpenUserSelection((prev) => !prev);
  };

  return (
    <div ref={userMenuRef}>
      <span
        className="user-menu--open dp-avatar-user"
        onClick={handleToggleNotification}
      >
        {fullname}
      </span>
      <div className={`user-menu ${openUserMenu ? "open" : ""}`}>
        {showRelatedUsersMenu || isCollaborator ? (
          <header className="header-user-info">
            <Avatar
              text={avatarText}
              backgroundColor={backgroundColor}
              size="lg"
            />
            <div className="dp-info-user">
              <p>
                <span className="name">{fullname}</span>
                <span className="email">{email}</span>
                <span className="dp-account-status">
                  <span>
                    <FormattedMessage
                      id={`header.profile_${userAccount.userProfileType}`}
                    />
                  </span>
                </span>
              </p>
              {showRelatedUsersMenu ? (
                <button
                  type="button"
                  className="dp-button button-small primary-green dp-w-100"
                  onClick={handleToggleModal}
                >
                  <FormattedMessage id="header.change_account_button" />
                </button>
              ) : (
                <></>
              )}
            </div>
          </header>
        ) : (
          <header>
            <Avatar
              text={avatarText}
              backgroundColor={backgroundColor}
              size="lg"
            />
            <div className="dp-info-user">
              <p>
                <span className="name">{fullname}</span>
                <span className="email">{email}</span>
              </p>
            </div>
          </header>
        )}
        <div className="user-plan--container">
          {user.hasClientManager ? (
            <ClientManagerUserPlan
              profileName={user.clientManager.profileName}
            />
          ) : (
            <UserPlan user={user} />
          )}
        </div>
        <ul className="options-user">
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
        {openUserSelection && relatedUsers ? (
          <Modal
            isOpen={openUserSelection}
            handleClose={() => setOpenUserSelection(false)}
            modalId="modal-all-accounts"
          >
            <UserSelection
              data={relatedUsers}
              currentUser={email}
            ></UserSelection>
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
