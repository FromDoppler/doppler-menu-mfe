import {
  AppSessionState,
  AppSessionStateClient,
} from "./app-session-abstractions";
import testUserData from "../testUserData.json";

export function createDummyAppSessionStateClient(): AppSessionStateClient {
  let currentSessionState: AppSessionState = { status: "unknown" };
  const instance = {
    getCurrentSessionState: () => currentSessionState,
    start: () => {
      setTimeout(() => {
        currentSessionState = {
          status: "authenticated",
          dopplerAccountName: testUserData.user.email,
          userData: testUserData as any,
        };
        instance.onSessionUpdate();
      }, 1000);
    },
    onSessionUpdate: () => {},
  };
  return instance;
}
