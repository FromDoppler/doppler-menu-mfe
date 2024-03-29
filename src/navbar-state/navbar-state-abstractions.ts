import { PrimaryNavItem, TerminalNavItem } from "../model";

export type SecondaryNavItemState = TerminalNavItem &
  Readonly<{
    /** isActive value is based on current URL.
     * It should be true when url matches current URL. */
    isActive: boolean;
  }>;

export type PrimaryNavItemState = Omit<PrimaryNavItem, "subNavItems"> &
  Readonly<{
    /** isActive value is based on current URL.
     * It should be true when url matches current URL
     * or when subItem's URL matches. */
    isActive: boolean;
    isOpen: boolean;
    /** isSelected value is based on mouse hover.
     * It should be the last primaryNavItem that was hovered. */
    isSelected: boolean;
    subNavItems:
      | Readonly<[SecondaryNavItemState, ...SecondaryNavItemState[]]>
      | undefined;
  }>;

export type NavBarState = Readonly<{
  currentUrl: string;
  /** selectedItemId is based on mouse hover.
   * It should be the idHTML of the last primaryNavItem that has been hovered */
  selectedItemId: string | null;
  defaultActiveItemId: string | null;
  forcedActiveItemId: string | null;
  items: ReadonlyArray<PrimaryNavItemState>;
  /** isExpanded is based on mouse hover.
   * It should be true when mouse is hovering over a primaryNavItem,
   * and it becomes false when the mouse leaves the menu */
  isExpanded: boolean;
}>;

// Using events like naming convention for action types
// See https://redux.js.org/style-guide/#model-actions-as-events-not-setters
export type NavBarStateReducerAction =
  | { type: "items/updated"; items: ReadonlyArray<PrimaryNavItemState> }
  | { type: "url/updated"; href: string }
  | { type: "selected-item/updated"; idHTML: string | null }
  | { type: "default-active/updated"; idHTML: string | null }
  | { type: "forced-active/updated"; idHTML: string | null };
