import Header from "./components/Header";
import headerData from "./headerData";
import { HeaderMessages } from "./components/HeaderMessages";

function App() {
  const { pathname, search } = window.location;
  const { nav, notifications, emptyNotificationText, user, alert }: any =
    headerData;

  return (
    <>
      <HeaderMessages alert={alert} user={user} />
      <Header
        currentPath={`${pathname}${search}`}
        nav={nav}
        notifications={notifications}
        emptyNotificationText={emptyNotificationText}
        user={user}
      />
    </>
  );
}

export default App;
