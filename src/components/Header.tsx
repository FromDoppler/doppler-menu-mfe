import { useState } from "react";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { MenuRight } from "./MenuRight";
import { User } from "../model";
import { NavBarState } from "../navbar-state/navbar-state-abstractions";
import { ClientManagerLogo } from "./ClientManagerLogo";

interface HeaderProp {
  navBar: NavBarState;
  notifications: ReadonlyArray<string>;
  user: User;
  emptyNotificationText: string;
  sticky: boolean;
  selectNavItem: (idHTML: string) => void;
  unselectNavItem: () => void;
}

export const Header = ({
  selectNavItem,
  unselectNavItem,
  navBar,
  notifications,
  user,
  emptyNotificationText,
  sticky,
}: HeaderProp) => {
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  return (
    <header
      aria-label="main header"
      className={`header-main ${sticky ? "sticky" : ""} ${
        navBar.isExpanded ? "header-open" : ""
      } ${openMenuMobile ? "open" : ""} ${
        user.hasClientManager ? "dp-header--cm" : ""
      }`}
    >
      {user.hasClientManager ? (
        <ClientManagerLogo clientManager={user.clientManager} />
      ) : null}
      <div className="header-wrapper">
        <Logo />
        <Nav
          selectNavItem={selectNavItem}
          unselectNavItem={unselectNavItem}
          navBar={navBar}
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
  <header>
    <div className="header-wrapper">
      <Logo />
    </div>
  </header>
);
