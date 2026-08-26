import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { DOPPLER_SESSION_STATE_UPDATE_EVENT_TYPE } from "../session/doppler-session-mfe-conventions";

// idAddOnType for the ECO IA add-on — same value the eco-ia-widget-docked
// project itself checks (see checkAddonActive() in its App.jsx).
const ECO_IA_ADDON_TYPE_ID = 5;

// Fired on this button's click. Whatever mounts <eco-ia-widget-docked>
// (outside this MFE) should listen for this and call .open() on it — see
// README.md in this folder for the exact listener snippet and why the
// button doesn't call .open() directly.
export const ECO_IA_OPEN_REQUESTED_EVENT_TYPE = "ecoia:open-requested";

type AddOnPlan = {
  active?: boolean;
  planData?: {
    idAddOnType?: number;
  };
};

function checkEcoIAAddonActive(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const addOnPlans = window.dopplerSessionState?.rawDopplerUserData?.user
    ?.addOnPlans as AddOnPlan[] | undefined;

  return (
    Array.isArray(addOnPlans) &&
    addOnPlans.some(
      (addOnPlan) =>
        addOnPlan.planData?.idAddOnType === ECO_IA_ADDON_TYPE_ID &&
        addOnPlan.active === true,
    )
  );
}

export const EcoIAMenuButton = () => {
  const [active, setActive] = useState(checkEcoIAAddonActive());
  const intl = useIntl();

  useEffect(() => {
    const recheck = () => setActive(checkEcoIAAddonActive());
    // Same convention SessionMfeAppSessionStateClient.ts already uses to
    // react to session changes — no new event type introduced.
    window.addEventListener(DOPPLER_SESSION_STATE_UPDATE_EVENT_TYPE, recheck);
    return () =>
      window.removeEventListener(
        DOPPLER_SESSION_STATE_UPDATE_EVENT_TYPE,
        recheck,
      );
  }, []);

  if (!active) {
    return null;
  }

  const openEcoIA = () => {
    window.dispatchEvent(new CustomEvent(ECO_IA_OPEN_REQUESTED_EVENT_TYPE));
  };

  return (
    <button
      type="button"
      onClick={openEcoIA}
      aria-label={intl.formatMessage({ id: "header.eco_ia_open" })}
      data-testid="eco-ia-menu-button"
      className="dp-eco-ia-menu-button"
    >
      <span className="dp-eco-ia-menu-button__icon">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="#fff"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M12 2l1.8 6.4L20 10l-6.2 1.6L12 18l-1.8-6.4L4 10l6.2-1.6z" />
        </svg>
      </span>
      <span className="dp-eco-ia-menu-button__label">
        <FormattedMessage id="header.eco_ia" />
      </span>
      <span className="dp-eco-ia-menu-button__badge">
        <FormattedMessage id="header.eco_ia_beta" />
      </span>
    </button>
  );
};
