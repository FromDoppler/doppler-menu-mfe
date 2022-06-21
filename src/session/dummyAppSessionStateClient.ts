import {
  AppSessionState,
  AppSessionStateClient,
} from "./app-session-abstractions";
import testUserData from "../testUserData.json";
import { parseUserData } from "../utils";
import { UserData } from "../model";

export function createDummyAppSessionStateClient(): AppSessionStateClient {
  let currentSessionState: AppSessionState = { status: "unknown" };
  const instance = {
    getCurrentSessionState: () => currentSessionState,
    start: () => {
      setTimeout(() => {
        currentSessionState = {
          status: "authenticated",
          dopplerAccountName: testUserData.user.email,
          userData: parseUserData(testUserData) as UserData,
        };
        instance.onSessionUpdate();
      }, 1000);
    },
    onSessionUpdate: () => {},
  };
  return instance;
}
