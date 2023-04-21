import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { User } from "../model";
import { Avatar } from "./Avatar";
import { UserPlan } from "./UserPlan";
import { ClientManagerUserPlan } from "./ClientManagerUserPlan";

interface UserMenuProps {
  user: User;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const { fullname, email, avatar, navItems } = user;
  const { color: backgroundColor, text: avatarText } = avatar;

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenuRef = useOnclickOutside(() => setOpenUserMenu(false));

  const handleToggleNotification = () => {
    setOpenUserMenu((prev) => !prev);
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
      </div>
    </div>
  );
};
