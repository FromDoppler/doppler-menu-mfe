import { Header, HeaderPlaceholder } from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";

import { useAppSessionState } from "./session/AppSessionStateContext";

function App() {
  const { href, origin } = window.location;
  const appSessionState = useAppSessionState();

  if (appSessionState.status !== "authenticated") {
    return <HeaderPlaceholder />;
  }

  const { nav, notifications, emptyNotificationText, user, alert } =
    appSessionState.userData;

  // Temporal change: For testing purpose. PR-107
  const replaceOriginFromUrl = (urlString: string, origin: string): string => {
    const url = new URL(urlString);
    return url.href.replace(url.origin, origin);
  };

  const modifiedNav = nav.map((navElement) => {
    return {
      ...navElement,
      url: replaceOriginFromUrl(navElement.url, origin),
      ...(navElement.subNav && {
        subNav: navElement.subNav.map((subNavElement) => {
          return {
            ...subNavElement,
            url: replaceOriginFromUrl(subNavElement.url, origin),
          };
        }),
      }),
    };
  });
  // End Temporal Change

  return (
    <>
      {
        // TODO: confirm if it is rendered in the right way
        alert ? <HeaderMessages alert={alert} user={user} /> : null
      }
      <Header
        currentPath={href}
        nav={modifiedNav}
        notifications={notifications}
        emptyNotificationText={emptyNotificationText}
        user={user}
        sticky={!!alert}
      />
    </>
  );
}

export default App;
