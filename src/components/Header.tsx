import { useState } from "react";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { MenuRight } from "./MenuRight";
import { User } from "../model";
import { NavBarState } from "../navbar-state/navbar-state-abstractions";
import { ClientManagerLogo } from "./ClientManagerLogo";
import { SubNavDesktop } from "./SubNavDesktop";

interface HeaderProp {
  navBar: NavBarState;
  user: User;
  sticky: boolean;
  selectNavItem: (idHTML: string) => void;
  unselectNavItem: () => void;
  dashboardUrl: string;
}

export const Header = ({
  selectNavItem,
  unselectNavItem,
  navBar,
  user,
  sticky,
  dashboardUrl,
}: HeaderProp) => {
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const openItem = navBar.items.find((item) => item.isOpen);

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
      <div
        className={`header-wrapper ${
          navBar.isExpanded ? "dp-shadow-bottom" : ""
        }`}
      >
        <Logo url={dashboardUrl} />
        <Nav
          selectNavItem={selectNavItem}
          unselectNavItem={unselectNavItem}
          navBar={navBar}
          openMenuMobile={openMenuMobile}
        />
        <MenuRight user={user} setOpenMenuMobile={setOpenMenuMobile} />
      </div>
      {!!openItem && <SubNavDesktop item={openItem} />}
    </header>
  );
};

export const HeaderPlaceholder = ({
  dashboardUrl,
}: {
  dashboardUrl: string;
}) => (
  <header>
    <div className="header-wrapper">
      <Logo url={dashboardUrl} />
    </div>
  </header>
);
