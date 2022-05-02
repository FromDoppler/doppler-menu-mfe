import Header from "./components/Header";
import { getUpdatedMenu, isInactiveSection } from "./utils";
import headerData from "./mocks/headerData";
import HeaderMessages from "./components/HeaderMessages";

function App() {
  const { pathname } = window.location;
  const { nav, notifications, emptyNotificationText, user, alert }: any =
    headerData;

  return (
    <>
      <HeaderMessages alert={alert} user={user} />
      <Header
        nav={getUpdatedMenu(pathname, nav)}
        isInactiveSection={isInactiveSection(pathname)}
        notifications={notifications}
        emptyNotificationText={emptyNotificationText}
        user={user}
      />
    </>
  );
}

export default App;
