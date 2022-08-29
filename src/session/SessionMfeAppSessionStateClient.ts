import { parseUserData } from "../utils";
import {
  AppSessionState,
  AppSessionStateClient,
} from "./app-session-abstractions";
import {
  DopplerSessionState,
  DOPPLER_SESSION_STATE_UPDATE_EVENT_TYPE,
} from "./doppler-session-mfe-conventions";

const mapDopplerSessionState: (
  dopplerSessionState: DopplerSessionState
) => AppSessionState = (dopplerSessionState) =>
  !dopplerSessionState
    ? {
        status: "unknown",
      }
    : dopplerSessionState.status !== "authenticated"
    ? { status: dopplerSessionState.status }
    : {
        status: "authenticated",
        dopplerAccountName: dopplerSessionState.dopplerAccountName,
        lang: dopplerSessionState.rawDopplerUserData?.user?.lang,
        userData: parseUserData(dopplerSessionState.rawDopplerUserData),
      };

export class SessionMfeAppSessionStateClient implements AppSessionStateClient {
  private readonly _window;

  public onSessionUpdate: () => void = () => {};
  constructor({ window }: { window: Window }) {
    this._window = window;
  }

  getCurrentSessionState() {
    return mapDopplerSessionState(this._window.dopplerSessionState);
  }

  start() {
    this._window.addEventListener(
      DOPPLER_SESSION_STATE_UPDATE_EVENT_TYPE,
      () => {
        this.onSessionUpdate();
      }
    );
    this.onSessionUpdate();
  }
}
