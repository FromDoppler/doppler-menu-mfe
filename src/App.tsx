import { Header, HeaderPlaceholder } from "./components/Header";
import { HeaderMessages } from "./components/HeaderMessages";
import { useLocationHref } from "./hooks/useLocationHref";
import { useAppSessionState } from "./session/AppSessionStateContext";
import { useNavBarState } from "./navbar-state/navbar-state-hook";
import { createContext, useContext, useEffect, useState } from "react";
import { AppSessionState } from "./session/app-session-abstractions";
import { Modal } from "./components/Modal";
import { UserSelection } from "./components/UserSelection";
import { Userpilot } from "userpilot";
import { useAppConfiguration } from "./AppConfiguration";

const defaultDashboardUrl = "https://app.fromdoppler.com/dashboard";

interface userSelectionModal {
  setOpenUserSelection: (value: boolean) => void;
}

const UserSelectionModalContext = createContext<userSelectionModal>({
  setOpenUserSelection: () => {},
});

export function useUserSelectionContext() {
  return useContext(UserSelectionModalContext);
}

function App({
  onStatusUpdate,
}: {
  onStatusUpdate?: (status: AppSessionState["status"]) => void;
}) {
  const href = useLocationHref(window);
  const AppConfiguration = useAppConfiguration();
  const appSessionState = useAppSessionState();

  const { navBar, selectNavItem, unselectNavItem } = useNavBarState({
    currentUrl: href,
    appSessionState,
  });
  const [hideHeaderMessage, setHideHeaderMessage] = useState(false);
  const [hideApp, setHideApp] = useState(false);
  const [openUserSelection, setOpenUserSelection] = useState(false);
  const [userpilotInitialized, setUserpilotInitialized] = useState(false);

  useEffect(() => {
    if (AppConfiguration?.userpilotToken) {
      Userpilot.initialize(AppConfiguration.userpilotToken);
      console.log("Userpilot - initialized");
      setUserpilotInitialized(true);
    }
  }, [AppConfiguration.userpilotToken]);

  useEffect(() => {
    if (userpilotInitialized && appSessionState?.status === "authenticated") {
      const {
        userData: { user },
      } = appSessionState;

      const userFullName = user.userAccount
        ? `${user.userAccount.firstName} ${user.userAccount.lastName}`
        : user.fullname;

      console.log("Userpilot - identifying");
      Userpilot.identify(user.idUser, {
        name: userFullName,
        fullname: userFullName,
        firstname: user.userAccount
          ? user.userAccount.firstName
          : user.firstname,
        email: user.userAccount ? user.userAccount.email : user.email,
        language: user.userAccount ? user.userAccount.language : user.lang,
        company: {
          id: user.idUser,
          name: user.companyName,
          created_at: new Date(Date.parse(user.utcRegisterDate)),
          userType: user.userType,
          planType: user.plan.planType,
          industry: user.industryCode,
          country: user.country,
          billingCountry: user.billingCountry,
          integrations: user.integrations?.toString().replaceAll(",", ";"),
          dkimOk: user.domainStatus.isDKIMEnabled,
          spfOk: user.domainStatus.isSPFEnabled,
          dmarcOk: user.domainStatus.isDMARCEnabled,
          trialends: user.plan.trialExpirationDate,
          conversationsPlan: user.chat,
          landingsPlan: user.landings,
          onsitePlan: user.onsite,
        },
      });
      console.log("Userpilot - identified");
    }
  }, [appSessionState, userpilotInitialized]);

  useEffect(() => {
    if (userpilotInitialized && appSessionState?.status === "authenticated") {
      Userpilot.reload();
    }
  }, [appSessionState.status, userpilotInitialized, href]);

  useEffect(() => {
    onStatusUpdate?.(appSessionState.status);
  }, [appSessionState.status, onStatusUpdate]);

  (window as any).displayDopplerNavBar = (value: boolean) => {
    setHideApp(!value);
  };

  if (hideApp) {
    return <></>;
  }

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
    <>
      {
        // TODO: confirm if it is rendered in the right way
        alert && !hideHeaderMessage ? (
          <HeaderMessages alert={alert} user={user} onClose={closeAlert} />
        ) : null
      }
      <UserSelectionModalContext.Provider value={{ setOpenUserSelection }}>
        <Header
          selectNavItem={selectNavItem}
          unselectNavItem={unselectNavItem}
          navBar={navBar}
          user={user}
          sticky={!!alert && !hideHeaderMessage}
          dashboardUrl={dashboardUrl}
        />
      </UserSelectionModalContext.Provider>
      {openUserSelection && user.relatedUsers ? (
        <Modal
          isOpen={openUserSelection}
          handleClose={() => setOpenUserSelection(false)}
          modalId="modal-all-accounts"
        >
          <UserSelection
            data={user.relatedUsers}
            currentUser={user.email}
          ></UserSelection>
        </Modal>
      ) : null}
    </>
  );
}

export default App;
