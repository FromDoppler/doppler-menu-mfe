import { useEffect, useState } from "react";
import { Header, HeaderPlaceholder } from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";
import { NavItem, UserData } from "./model";
import { useAppSessionState } from "./session/AppSessionStateContext";

const testmenu = "testmenu";
const locationChangedEvent = "locationchanged";
const popStateEvent = "popstate";
const webAppSubDomainRegex =
  /(?<=http[s]*:\/\/)webapp(?=qa|int)|app(?=\.)(?=[^/]*\.)/i;

const testMenuSubDomainRegex =
  /(?<=http[s]*:\/\/)((testmenu(qa|int)*))(?=\.)(?=[^/]*\.)/i;

function App() {
  const { href } = window.location;
  const appSessionState = useAppSessionState();
  const [currentUrl, setCurrentUrl] = useState(href);
  const [userData, setUserData] = useState<UserData>();
  const [navigation, setNavigation] = useState<NavItem[]>([]);

  useEffect(() => {
    function handleLocationChange() {
      setCurrentUrl(window.location.href);
    }

    function dispatchLocationChangedEvent() {
      window.dispatchEvent(new Event(locationChangedEvent));
    }

    const pushState = window.history.pushState;
    window.history.pushState = function () {
      const [data, unused, url] = Array.from(arguments);
      pushState.apply(window.history, [data, unused, url]);
      dispatchLocationChangedEvent();
    };

    const replaceState = window.history.replaceState;
    window.history.replaceState = function () {
      const [data, unused, url] = Array.from(arguments);
      replaceState.apply(window.history, [data, unused, url]);
      dispatchLocationChangedEvent();
    };

    window.addEventListener(locationChangedEvent, handleLocationChange);
    window.addEventListener(popStateEvent, dispatchLocationChangedEvent);
    return () => {
      window.removeEventListener(locationChangedEvent, handleLocationChange);
      window.removeEventListener(popStateEvent, dispatchLocationChangedEvent);
    };
  }, []);

  useEffect(() => {
    const nav = appSessionState.userData?.nav ?? [];
    setNavigation(nav);
    setUserData(appSessionState.userData);
  }, [appSessionState.userData]);

  if (!userData) {
    return <HeaderPlaceholder />;
  }

  const { notifications, emptyNotificationText, user, alert } = userData;
  return (
    <>
      {
        // TODO: confirm if it is rendered in the right way
        alert ? <HeaderMessages alert={alert} user={user} /> : null
      }
      <Header
        currentPath={currentUrl}
        nav={processNavigationData(navigation)}
        notifications={notifications}
        emptyNotificationText={emptyNotificationText}
        user={user}
        sticky={!!alert}
      />
    </>
  );
}

// Replace urls when testmenu enviroment
function replaceUrl(url: string): string {
  const isWebAppUrl = webAppSubDomainRegex.test(url);
  return isWebAppUrl ? url.replace(webAppSubDomainRegex, testmenu) : url;
}

function processNavigationData(nav: NavItem[]) {
  return testMenuSubDomainRegex.test(window.location.origin)
    ? nav.map((navElement: NavItem) => {
        return {
          ...navElement,
          url: replaceUrl(navElement.url),
          ...(navElement.subNav && {
            subNav: navElement.subNav.map((subNavElement) => {
              return {
                ...subNavElement,
                url: replaceUrl(subNavElement.url),
              };
            }),
          }),
        };
      })
    : [...nav];
}

export default App;
