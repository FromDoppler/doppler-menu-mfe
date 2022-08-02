import { Header, HeaderPlaceholder } from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";
import { useAppSessionState } from "./session/AppSessionStateContext";

const webappDomainRegex =
  /^https?:\/\/(?:webapp(?:qa|int)\.fromdoppler\.net|app\.fromdoppler\.com)(?=\/|$)/;
const applyUrlPatchInTheseDomainsRegex =
  /^https?:\/\/(?:testmenu(?:qa|int)\.fromdoppler\.net|testmenu\.fromdoppler\.com|localhost:3000)(?=\/|$)/;

function App() {
  const { href, origin } = window.location;
  const appSessionState = useAppSessionState();

  if (appSessionState.status !== "authenticated") {
    return <HeaderPlaceholder />;
  }

  const { nav, notifications, emptyNotificationText, user, alert } =
    appSessionState.userData;

  // For testing in testmenu enviroment
  const shouldPatchWebAppUrls = applyUrlPatchInTheseDomainsRegex.test(origin);

  const navigation = shouldPatchWebAppUrls
    ? nav.map((navElement) => {
        return {
          ...navElement,
          url: navElement.url?.replace(webappDomainRegex, origin),
          ...(navElement.subNav && {
            subNav: navElement.subNav.map((subNavElement) => {
              return {
                ...subNavElement,
                url: subNavElement.url?.replace(webappDomainRegex, origin),
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
