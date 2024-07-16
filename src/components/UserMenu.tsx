import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { User } from "../model";
import { Avatar } from "./Avatar";
import { UserPlan } from "./UserPlan";
import { ClientManagerUserPlan } from "./ClientManagerUserPlan";
import { Modal } from "./Modal";
import { FormattedMessage } from "react-intl";

interface UserMenuProps {
  user: User;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const { fullname, email, avatar, navItems, userAccount } = user;
  const { color: backgroundColor, text: avatarText } = avatar;

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openUserSelection, setOpenUserSelection] = useState(false);
  const userMenuRef = useOnclickOutside(() => {
    setOpenUserMenu(false);
    setOpenUserSelection(false);
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
        <header>
          <Avatar
            text={avatarText}
            backgroundColor={backgroundColor}
            size="lg"
          />
          <p>
            <span className="name">{fullname}</span>
            <span className="email">{email}</span>
          </p>
          {userAccount ? (
            <div data-testid="user-accounts-test-id">
              <p className="dp-account-status">
                <span>
                  <FormattedMessage
                    id={`header.profile_${userAccount.userProfileType}`}
                  />
                </span>
              </p>
              <button
                type="button"
                className="dp-button button-big primary-green button-medium "
                onClick={handleToggleModal}
              >
                <FormattedMessage id="header.change_account_button" />
              </button>
            </div>
          ) : (
            <></>
          )}
        </header>
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
        {openUserSelection ? (
          <Modal
            isOpen={openUserSelection}
            handleClose={() => setOpenUserSelection(false)}
          >
            <span></span>
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
