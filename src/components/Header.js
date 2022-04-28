import { useState } from "react";
import Logo from "./Logo";
import Nav from "./Nav";

const Header = ({
  nav = [],
  notifications = [],
  user = {},
  isInactiveSection,
  emptyNotificationText,
}) => {
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
