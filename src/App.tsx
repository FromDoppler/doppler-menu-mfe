import Header from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";
import { useAppSessionState } from "./session/AppSessionStateContext";

function App() {
  const { pathname, search } = window.location;
  const appSessionState = useAppSessionState();

  if (appSessionState.status !== "authenticated") {
    // TODO: keep the same layout to avoid blinks
    return <p>NON-AUTHENTICATED</p>;
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
      />
    </>
  );
}

export default App;
