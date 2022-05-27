import Header from "./components/Header";
import { testUserData } from "./testData";
import { HeaderMessages } from "./components/HeaderMessages";

function App() {
  const { pathname, search } = window.location;
  const { nav, notifications, emptyNotificationText, user, alert } =
    testUserData;

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
