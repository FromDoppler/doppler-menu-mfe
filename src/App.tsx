import { Header, HeaderPlaceholder } from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";
import { useLocationHref } from "./hooks/useLocationHref";
import { PrimaryNavItem } from "./model";
import { useAppSessionState } from "./session/AppSessionStateContext";

const webappDomainRegex =
  /^https?:\/\/(?:webapp(?:qa|int)\.fromdoppler\.net|app\.fromdoppler\.com)(?=\/|$)/;
const applyUrlPatchInTheseDomainsRegex =
  /^https?:\/\/(?:testmenu(?:qa|int)\.fromdoppler\.net|testmenu\.fromdoppler\.com|localhost:3000)(?=\/|$)/;

function patchWebAppUrlsIfNeeded(
  origin: string,
  navItems: ReadonlyArray<PrimaryNavItem>
): ReadonlyArray<PrimaryNavItem> {
  if (!applyUrlPatchInTheseDomainsRegex.test(origin)) {
    return navItems;
  }

  return navItems.map((navElement) => {
    return {
      ...navElement,
      url: navElement.url?.replace(webappDomainRegex, origin),
      ...(navElement.subNavItems && {
        subNavItems: navElement.subNavItems.map((subNavElement) => {
          return {
            ...subNavElement,
            url: subNavElement.url?.replace(webappDomainRegex, origin),
          };
        }),
      }),
    };
  });
}

function App() {
  const { origin } = window.location;
  const href = useLocationHref(window);

  const appSessionState = useAppSessionState();

  if (appSessionState.status !== "authenticated") {
    return <HeaderPlaceholder />;
  }

  const { navItems, notifications, emptyNotificationText, user, alert } =
    appSessionState.userData;

  const navigation = patchWebAppUrlsIfNeeded(origin, navItems);

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
