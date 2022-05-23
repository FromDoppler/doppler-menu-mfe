import { useState } from "react";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { NavItem, User } from "../headerData";

interface HeaderProp {
  currentPath: string;
  nav: NavItem[];
  notifications: string[];
  user: User;
  emptyNotificationText: string;
}

const Header = ({
  currentPath,
  nav,
  notifications,
  user,
  emptyNotificationText,
}: HeaderProp) => {
  const [openMenu, setOpenMenu] = useState(false);

  const openMenuHeader = () => {
    setOpenMenu(true);
  };

  const closeMenuHeader = () => {
    setOpenMenu(false);
  };

  return (
    <header
      className={`header-main sticky ${openMenu ? "header-open" : ""}`}
      aria-label="main header"
    >
      <div className="header-wrapper">
        <Logo />
        <Nav
          currentPath={currentPath}
          nav={nav}
          notifications={notifications}
          emptyNotificationText={emptyNotificationText}
          user={user}
          openMenuHeader={openMenuHeader}
          closeMenuHeader={closeMenuHeader}
        />
      </div>
    </header>
  );
};

export default Header;
