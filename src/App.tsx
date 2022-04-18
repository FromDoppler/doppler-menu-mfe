import Header from "./components/Header";
import { getCurrentPageForUrl, getUpdateMenu } from "./utils";
import headerData from "./headerData.json";

function App() {
  const { pathname } = window.location;
  const { nav } = headerData;
  // Recursively set isSelected property in menu items
  const updatedNav = getUpdateMenu(pathname, nav);
  // Match pathname with a set of predefined urls "urlsWebApp"
  const currentPage = getCurrentPageForUrl(pathname);
  const isInactiveSection = !currentPage || !currentPage.menu;

  return (
    <>
      <Header nav={updatedNav} isInactiveSection={isInactiveSection} />
    </>
  );
}

export default App;
