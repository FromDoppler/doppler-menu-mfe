import { Header, HeaderPlaceholder } from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";
import { useLocationHref } from "./hooks/useLocationHref";
import { useAppSessionState } from "./session/AppSessionStateContext";

function App() {
  const href = useLocationHref(window);

  const appSessionState = useAppSessionState();

  if (appSessionState.status !== "authenticated") {
    return <HeaderPlaceholder />;
  }

  const { navItems, notifications, emptyNotificationText, user, alert } =
    appSessionState.userData;

  return (
    <>
      {
        // TODO: confirm if it is rendered in the right way
        alert ? <HeaderMessages alert={alert} user={user} /> : null
      }
      <Header
        currentPath={href}
        nav={navItems}
        notifications={notifications}
        emptyNotificationText={emptyNotificationText}
        user={user}
        sticky={!!alert}
      />
    </>
  );
}

export default App;
