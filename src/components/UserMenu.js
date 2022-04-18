import { useRef, useState } from "react";
import useClickOutsideHandler from "../hooks/useClickOutsideHandler";

const UserMenu = ({ user }) => {
  const { fullname = "", email = "", avatar = {}, plan = {}, nav = [] } = user;
  const { color: backgroundColor = "", text: avatarText = "" } = avatar;
  const {
    planName = "",
    maxSubscribers = "",
    itemDescription = "",
    buttonUrl = "",
    buttonText = "",
    pendingFreeUpgrade = "",
    remainingCredits = "",
    description = "",
  } = plan;

  const userMenuRef = useRef();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  useClickOutsideHandler(userMenuRef, () => setOpenUserMenu(false));

  const handleToggleNotification = () => {
    setOpenUserMenu((prev) => !prev);
  };

  return (
    <div ref={userMenuRef}>
      <button className="user-menu--open" onClick={handleToggleNotification}>
        <span style={{ background: backgroundColor }} className="user-avatar">
          {avatarText}
        </span>
      </button>
      <div className={`user-menu ${openUserMenu ? "open" : ""}`}>
        <header>
          <span
            className="user-avatar--menu"
            style={{ background: backgroundColor }}
          >
            {avatarText}
          </span>
          <p>
            <span className="name">{fullname}</span>
            <span className="email">{email}</span>
          </p>
        </header>
        <div className="user-plan--container">
          <div className="user-plan--type">
            <p className="user-plan--monthly-text">
              <strong>{planName}</strong> ({maxSubscribers} {itemDescription})
            </p>
            {buttonUrl && !pendingFreeUpgrade && (
              <a className="user-plan" href={buttonUrl}>
                {buttonText}
              </a>
            )}
            <p className="user-plan--monthly-text"></p>
          </div>
          <div className="user-plan--type">
            <div className="user-plan--buyContainer">
              <p>
                <strong>{remainingCredits}</strong> {description}
              </p>
            </div>
          </div>
        </div>
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

export default UserMenu;
