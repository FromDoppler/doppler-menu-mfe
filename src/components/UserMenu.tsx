import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { User } from "../model";
import { Avatar } from "./Avatar";
import { UserPlan } from "./UserPlan";

interface UserMenuProps {
  user: User;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const { fullname, email, avatar, nav } = user;
  const { color: backgroundColor, text: avatarText } = avatar;

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenuRef = useOnclickOutside(() => setOpenUserMenu(false));

  const handleToggleNotification = () => {
    setOpenUserMenu((prev) => !prev);
  };

  return (
    <div ref={userMenuRef}>
      <Avatar
        text={avatarText}
        onClick={handleToggleNotification}
        backgroundColor={backgroundColor}
      />
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
        <UserPlan user={user} />
        <ul className="options-user">
          {nav.map((item, index) => (
            <li key={index}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
