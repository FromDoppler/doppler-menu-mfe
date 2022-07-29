import { UserData } from "../model";

export type AppSessionState =
  | { readonly status: "unknown"; readonly userData?: UserData }
  | { readonly status: "non-authenticated"; readonly userData?: UserData }
  | {
      readonly status: "authenticated";
      readonly dopplerAccountName: string;
      // TODO: use lang field in place of rawDopplerUserData.lang
      // lang: string;
      readonly userData: UserData;
    };

export interface AppSessionStateClient {
  readonly getCurrentSessionState: () => AppSessionState;
  readonly start: () => void;
  onSessionUpdate: () => void;
}
