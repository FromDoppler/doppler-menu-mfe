import { useState } from "react";
import Logo from "./Logo";
import Nav from "./Nav";

const Header = ({
  nav,
  notifications,
  isInactiveSection,
  emptyNotificationText,
  user,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const openMenuHeader = () => {
    setOpenMenu(true);
  };

  const closeMenuHeader = () => {
    setOpenMenu(false);
  };

  return (
    <header className={`header-main ${openMenu ? "header-open" : ""}`}>
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
