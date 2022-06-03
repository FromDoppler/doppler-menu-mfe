import { Header, HeaderPlaceholder } from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";

import { useAppSessionState } from "./session/AppSessionStateContext";

function App() {
  const { pathname, search } = window.location;
  const appSessionState = useAppSessionState();

  if (appSessionState.status !== "authenticated") {
    return <HeaderPlaceholder />;
  }

  const { nav, notifications, emptyNotificationText, user, alert } =
    appSessionState.userData;

  return (
    <>
      {
        // TODO: confirm if it is rendered in the right way
        alert ? <HeaderMessages alert={alert} user={user} /> : null
      }
      <Header
        currentPath={`${pathname}${search}`}
        nav={nav}
        notifications={notifications}
        emptyNotificationText={emptyNotificationText}
        user={user}
        sticky={!!alert}
      />
    </>
  );
}

export default App;
