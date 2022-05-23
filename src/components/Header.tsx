import { useState } from "react";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { MenuRight } from "./MenuRight";
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
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const openMenuHeader = () => {
    setOpenMenu(true);
  };

  const closeMenuHeader = () => {
    setOpenMenu(false);
  };

  return (
    <header
      className={`header-main sticky ${openMenu ? "header-open" : ""} ${
        openMenuMobile ? "open" : ""
      }`}
      aria-label="main header"
    >
      <div className="header-wrapper">
        <Logo />
        <Nav
          currentPath={currentPath}
          nav={nav}
          openMenuHeader={openMenuHeader}
          closeMenuHeader={closeMenuHeader}
        />
        <MenuRight
          user={user}
          notifications={notifications}
          emptyNotificationText={emptyNotificationText}
          setOpenMenuMobile={setOpenMenuMobile}
        />
      </div>
    </header>
  );
};

export default Header;
