import { PrimaryNavItem, TerminalNavItem } from "../model";

export type SecondaryNavItemState = TerminalNavItem &
  Readonly<{
    /** isActive value is based on current URL.
     * It should be true when url matches current URL. */
    isActive?: true | undefined;
    subNavItems?: undefined;
  }>;

export type PrimaryNavItemState = Omit<PrimaryNavItem, "subNavItems"> &
  Readonly<{
    /** isActive value is based on current URL.
     * It should be true when url matches current URL
     * or when subItem's URL matches. */
    isActive?: true | undefined;
    isOpen?: true | undefined;
    /** isSelected value is based on mouse hover.
     * It should be the last primaryNavItem that was hovered. */
    isSelected?: true | undefined;
    subNavItems?: ReadonlyArray<SecondaryNavItemState>;
  }>;

export type NavBarState = Readonly<{
  currentUrl: string;
  /** selectedItemId is based on mouse hover.
   * It should be the idHTML of the last primaryNavItem that has been hovered */
  selectedItemId: string | null;
  items: ReadonlyArray<PrimaryNavItemState>;
  /** isExpanded is based on mouse hover.
   * It should be true when mouse is hovering over a primaryNavItem,
   * and it becomes false when the mouse leaves the menu */
  isExpanded: boolean;
}>;

// Using events like naming convention for action types
// See https://redux.js.org/style-guide/#model-actions-as-events-not-setters
export type NavBarStateReducerAction =
  | { type: "items/updated"; items: ReadonlyArray<PrimaryNavItem> }
  | { type: "url/updated"; href: string }
  | { type: "selected-item/updated"; idHTML: string | null };
