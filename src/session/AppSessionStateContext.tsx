import { createContext, useContext, useEffect, useState } from "react";
import {
  AppSessionState,
  AppSessionStateClient,
} from "./app-session-abstractions";

const AppSessionStateContext = createContext<AppSessionState>({
  status: "unknown",
});

const isTheSameSession: (
  prevState: AppSessionState,
  newValue: AppSessionState
) => boolean = (previousState: AppSessionState, newState: AppSessionState) =>
  newState.status !== "authenticated"
    ? previousState.status === newState.status
    : newState.status === previousState.status &&
      newState.dopplerAccountName === previousState.dopplerAccountName;

export function AppSessionStateProvider({
  appSessionStateClient,
  children,
}: {
  appSessionStateClient: AppSessionStateClient;
  children: React.ReactNode;
}) {
  const initialState = appSessionStateClient.getCurrentSessionState();
  const [appSessionState, setAppSessionState] =
    useState<AppSessionState>(initialState);

  useEffect(() => {
    appSessionStateClient.onSessionUpdate = () => {
      const newState = appSessionStateClient.getCurrentSessionState();
      setAppSessionState((previousState) =>
        isTheSameSession(previousState, newState) ? previousState : newState
      );
    };
    appSessionStateClient.onSessionUpdate();
    return () => {
      appSessionStateClient.onSessionUpdate = () => {};
    };
  }, [appSessionStateClient]);

  return (
    <AppSessionStateContext.Provider value={appSessionState}>
      {children}
    </AppSessionStateContext.Provider>
  );
}

export function useAppSessionState() {
  return useContext(AppSessionStateContext);
}
