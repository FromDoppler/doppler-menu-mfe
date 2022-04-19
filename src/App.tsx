import Header from "./components/Header";
import { getUpdatedMenu, isInactiveSection } from "./utils";
import headerData from "./headerData";

function App() {
  const { pathname } = window.location;
  const { nav, notifications, emptyNotificationText, user }: any = headerData;

  return (
    <Header
      nav={getUpdatedMenu(pathname, nav)}
      isInactiveSection={isInactiveSection(pathname)}
      notifications={notifications}
      emptyNotificationText={emptyNotificationText}
      user={user}
    />
  );
}

export default App;
