import { Header, HeaderPlaceholder } from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";
import { useAppSessionState } from "./session/AppSessionStateContext";

const testmenu = "testmenu";
const webAppSubDomainRegex =
  /(?<=http[s]*:\/\/)webapp(?=qa|int)|app(?=\.)(?=[^/]*\.)/gi;

const testMenuSubDomainRegex =
  /(?<=http[s]*:\/\/)((testmenu(qa|int)*))(?=\.)(?=[^/]*\.)/gi;

function App() {
  const { href, origin } = window.location;
  const appSessionState = useAppSessionState();

  if (appSessionState.status !== "authenticated") {
    return <HeaderPlaceholder />;
  }

  const { nav, notifications, emptyNotificationText, user, alert } =
    appSessionState.userData;

  // For testing in testmenu enviroment
  const replaceUrl = (url: string): string => {
    const isWebAppUrl = webAppSubDomainRegex.test(url);
    return isWebAppUrl ? url.replace(webAppSubDomainRegex, testmenu) : url;
  };

  const isTestMenuEnv = testMenuSubDomainRegex.test(origin);

  const navigation = isTestMenuEnv
    ? nav.map((navElement) => {
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
