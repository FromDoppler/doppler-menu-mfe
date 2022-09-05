import { useEffect } from "react";
import { AppSessionState } from "../session/app-session-abstractions";
import { useNavBarStateReducer } from "./navbar-state-reducer";
import { NavBarState } from "./navbar-state-abstractions";

function extractNavItems(appSessionState: AppSessionState) {
  const items =
    appSessionState.status === "authenticated"
      ? appSessionState.userData.navItems
      : [];
  return items;
}

export function useNavBarState({
  currentUrl,
  appSessionState,
}: {
  currentUrl: string;
  appSessionState: AppSessionState;
}): {
  navBar: NavBarState;
  /** call this on hovering a primary NavItem */
  selectNavItem: (idHTML: string) => void;
  /** call this on mouse leave menu */
  unselectNavItem: () => void;
} {
  const [state, dispatch] = useNavBarStateReducer(() => ({
    currentUrl,
    items: extractNavItems(appSessionState),
  }));

  useEffect(() => {
    dispatch({
      type: "items/updated",
      items: extractNavItems(appSessionState),
    });
  }, [appSessionState, dispatch]);

  useEffect(() => {
    dispatch({ type: "url/updated", href: currentUrl });
  }, [currentUrl, dispatch]);

  return {
    navBar: state,
    selectNavItem: (idHTML: string) =>
      dispatch({ type: "selected-item/updated", idHTML }),
    unselectNavItem: () =>
      dispatch({ type: "selected-item/updated", idHTML: null }),
  };
}
