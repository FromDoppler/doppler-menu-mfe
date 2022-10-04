import { Header, HeaderPlaceholder } from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";
import { useLocationHref } from "./hooks/useLocationHref";
import { useAppSessionState } from "./session/AppSessionStateContext";
import { useNavBarState } from "./navbar-state/navbar-state-hook";
import { useEffect, useState } from "react";
import { AppSessionState } from "./session/app-session-abstractions";

function App({
  onStatusUpdate,
}: {
  onStatusUpdate?: (status: AppSessionState["status"]) => void;
}) {
  const href = useLocationHref(window);

  const appSessionState = useAppSessionState();

  const { navBar, selectNavItem, unselectNavItem } = useNavBarState({
    currentUrl: href,
    appSessionState,
  });
  const [hideHeaderMessage, setHideHeaderMessage] = useState(false);

  useEffect(() => {
    onStatusUpdate?.(appSessionState.status);
  }, [appSessionState.status, onStatusUpdate]);

  if (appSessionState.status !== "authenticated") {
    return <HeaderPlaceholder />;
  }

  const { notifications, emptyNotificationText, user, alert } =
    appSessionState.userData;
  const closeAlert = () => {
    setHideHeaderMessage(true);
  };

  return (
    <>
      {
        // TODO: confirm if it is rendered in the right way
        alert && !hideHeaderMessage ? (
          <HeaderMessages alert={alert} user={user} onClose={closeAlert} />
        ) : null
      }
      <Header
        selectNavItem={selectNavItem}
        unselectNavItem={unselectNavItem}
        navBar={navBar}
        notifications={notifications}
        emptyNotificationText={emptyNotificationText}
        user={user}
        sticky={!!alert && !hideHeaderMessage}
      />
    </>
  );
}

export default App;
