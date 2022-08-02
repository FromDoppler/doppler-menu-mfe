import { Header, HeaderPlaceholder } from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";
import { useAppSessionState } from "./session/AppSessionStateContext";

const webappDomainRegex =
  /^https?:\/\/(?:webapp(?:qa|int)\.fromdoppler\.net|app\.fromdoppler\.com)(?=\/|$)/;
const applyUrlPatchInTheseDomainsRegex =
  /^https?:\/\/(?:testmenu(?:qa|int)\.fromdoppler\.net|testmenu\.fromdoppler\.com)(?=\/|$)/;

function App() {
  const { href, origin } = window.location;
  const appSessionState = useAppSessionState();

  if (appSessionState.status !== "authenticated") {
    return <HeaderPlaceholder />;
  }

  const { nav, notifications, emptyNotificationText, user, alert } =
    appSessionState.userData;

  // For testing in testmenu enviroment
  const patchWebAppUrl = (url: string): string => {
    const isWebAppUrl = webappDomainRegex.test(url);
    return isWebAppUrl ? url.replace(webappDomainRegex, origin) : url;
  };

  const shouldPatchWebAppUrls = applyUrlPatchInTheseDomainsRegex.test(origin);

  const navigation = shouldPatchWebAppUrls
    ? nav.map((navElement) => {
        return {
          ...navElement,
          url: patchWebAppUrl(navElement.url),
          ...(navElement.subNav && {
            subNav: navElement.subNav.map((subNavElement) => {
              return {
                ...subNavElement,
                url: patchWebAppUrl(subNavElement.url),
              };
            }),
          }),
        };
      })
    : nav;
  // End

  return (
    <>
      {
        // TODO: confirm if it is rendered in the right way
        alert ? <HeaderMessages alert={alert} user={user} /> : null
      }
      <Header
        currentPath={href}
        nav={navigation}
        notifications={notifications}
        emptyNotificationText={emptyNotificationText}
        user={user}
        sticky={!!alert}
      />
    </>
  );
}

export default App;
