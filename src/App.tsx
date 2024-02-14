import { Header, HeaderPlaceholder } from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";
import { useLocationHref } from "./hooks/useLocationHref";
import { useAppSessionState } from "./session/AppSessionStateContext";
import { useNavBarState } from "./navbar-state/navbar-state-hook";
import { useEffect, useState } from "react";
import { AppSessionState } from "./session/app-session-abstractions";

const defaultDashboardUrl = "https://app.fromdoppler.com/dashboard";

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
    return <HeaderPlaceholder dashboardUrl={defaultDashboardUrl} />;
  }

  const { user, alert } = appSessionState.userData;
  const closeAlert = () => {
    setHideHeaderMessage(true);
  };

  const dashboardUrl =
    navBar.items.find((item) => item.idHTML === "dashboardMenu")?.url ??
    defaultDashboardUrl;

  return (
    //Use div instead of react fragment here. // See https://stackoverflow.com/questions/54880669/
    // react-domexception-failed-to-execute-removechild-on-node-the-node-to-be-re#:~:text=Problem%
    // 20explanation%3A
    <div>
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
        user={user}
        sticky={!!alert && !hideHeaderMessage}
        dashboardUrl={dashboardUrl}
      />
    </div>
  );
}

export default App;
