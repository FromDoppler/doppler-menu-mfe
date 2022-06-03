import { useState } from "react";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { MenuRight } from "./MenuRight";
import { NavItem, User } from "../model";

interface HeaderProp {
  currentPath: string;
  nav: NavItem[];
  notifications: string[];
  user: User;
  emptyNotificationText: string;
  sticky: boolean;
}

export const Header = ({
  currentPath,
  nav,
  notifications,
  user,
  emptyNotificationText,
  sticky,
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
      aria-label="main header"
      className={`header-main
      ${sticky ? "sticky" : ""}
      ${openMenu ? "header-open" : ""}
      ${openMenuMobile ? "open" : ""}`}
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

export const HeaderPlaceholder = () => (
  <header className="header-main sticky" aria-label="header placeholder">
    <div className="header-wrapper">
      <nav className="nav-left-main">
        <div className="menu-main--container">
          <ul className="menu-main"></ul>
        </div>
      </nav>
    </div>
  </header>
);
