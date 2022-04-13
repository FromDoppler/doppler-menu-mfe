import Logo from "./Logo";
import Nav from "./Nav";

const Header = ({ nav, isInactiveSection }) => {
  return (
    <>
      <Logo />
      <Nav nav={nav} isInactiveSection={isInactiveSection} />
    </>
  );
};

export default Header;
