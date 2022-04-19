import Logo from "./Logo";
import Nav from "./Nav";

const Header = ({
  nav,
  notifications,
  isInactiveSection,
  emptyNotificationText,
  user,
}) => {
  return (
    <>
      <Logo />
      <Nav
        nav={nav}
        notifications={notifications}
        isInactiveSection={isInactiveSection}
        emptyNotificationText={emptyNotificationText}
        user={user}
      />
    </>
  );
};

export default Header;
