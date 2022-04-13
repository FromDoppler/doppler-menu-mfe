import Logo from "./Logo";
import Nav from "./Nav";
import { getCurrentPageForUrl, getUpdateMenu } from "../utils";
import headerData from "../headerData.json";

const Header = () => {
  const { pathname } = window.location;
  const { nav } = headerData;
  const updatedNav = getUpdateMenu(pathname, nav);
  const currentPage = getCurrentPageForUrl(pathname);
  const isInactiveSection = !currentPage || !currentPage.menu;

  return (
    <>
      <Logo />
      <Nav nav={updatedNav} isInactiveSection={isInactiveSection} />
    </>
  );
};

export default Header;
