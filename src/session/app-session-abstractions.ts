import { UserData } from "../model";

export type AppSessionState =
  | { readonly status: "unknown" }
  | { readonly status: "non-authenticated" }
  | {
      readonly status: "authenticated";
      readonly dopplerAccountName: string;
      readonly lang?: string;
      readonly userData: UserData;
    };

export interface AppSessionStateClient {
  readonly getCurrentSessionState: () => AppSessionState;
  readonly start: () => void;
  onSessionUpdate: () => void;
  restart: () => void;
}
