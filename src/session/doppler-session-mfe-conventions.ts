export const DOPPLER_SESSION_STATE_UPDATE_EVENT_TYPE =
  "doppler-session-state-update";

export type DopplerSessionState =
  | undefined
  | { status: "non-authenticated" }
  | {
      status: "authenticated";
      jwtToken: string;
      dopplerAccountName: string;
      lang: string;
      rawDopplerUserData: any;
    };

declare global {
  interface Window {
    dopplerSessionState: DopplerSessionState;
  }
}
