import { useState } from "react";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { NavItem, User } from "../headerData";

interface HeaderProp {
  nav: NavItem[];
  notifications: string[];
  user: User;
  isInactiveSection: boolean;
  emptyNotificationText: string;
}

const Header = ({
  nav,
  notifications,
  user,
  isInactiveSection,
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
      className={`header-main ${openMenu ? "header-open" : ""}`}
      aria-label="main header"
    >
      <div className="header-wrapper">
        <Logo />
        <Nav
          nav={nav}
          notifications={notifications}
          isInactiveSection={isInactiveSection}
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
