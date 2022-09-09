import { Header, HeaderPlaceholder } from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";
import { useLocationHref } from "./hooks/useLocationHref";
import { useAppSessionState } from "./session/AppSessionStateContext";
import { useNavBarState } from "./navbar-state/navbar-state-hook";

function App() {
  const href = useLocationHref(window);

  const appSessionState = useAppSessionState();

  const { navBar, selectNavItem, unselectNavItem } = useNavBarState({
    currentUrl: href,
    appSessionState,
  });

  if (appSessionState.status !== "authenticated") {
    return <HeaderPlaceholder />;
  }

  const { notifications, emptyNotificationText, user, alert } =
    appSessionState.userData;

  return (
    <>
      {
        // TODO: confirm if it is rendered in the right way
        alert ? <HeaderMessages alert={alert} user={user} /> : null
      }
      <Header
        selectNavItem={selectNavItem}
        unselectNavItem={unselectNavItem}
        navBar={navBar}
        notifications={notifications}
        emptyNotificationText={emptyNotificationText}
        user={user}
        sticky={!!alert}
      />
    </>
  );
}

export default App;
