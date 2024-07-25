import {
  AppSessionState,
  AppSessionStateClient,
} from "./app-session-abstractions";
import testUserData from "../testUserData.json";
import { safeUserData } from "../utils";

export function createDummyAppSessionStateClient(): AppSessionStateClient {
  let currentSessionState: AppSessionState = { status: "unknown" };
  const instance = {
    getCurrentSessionState: () => currentSessionState,
    start: () => {
      setTimeout(() => {
        currentSessionState = {
          status: "authenticated",
          dopplerAccountName: testUserData.user.email,
          lang: "es",
          userData: safeUserData(testUserData),
        };
        instance.onSessionUpdate();
      }, 1000);
    },
    onSessionUpdate: () => {},
    restart: () => {},
  };
  return instance;
}
