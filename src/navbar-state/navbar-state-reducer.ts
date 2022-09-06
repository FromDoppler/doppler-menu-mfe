import { useReducer } from "react";
import { PrimaryNavItem } from "../model";
import { IsActiveUrl } from "../utils";
import {
  NavBarState,
  NavBarStateReducerAction,
  PrimaryNavItemState,
  SecondaryNavItemState,
} from "./navbar-state-abstractions";

function buildNavBarState({
  currentUrl,
  selectedItemId,
  items,
}: {
  currentUrl: string;
  selectedItemId: string | null;
  items: ReadonlyArray<PrimaryNavItemState>;
}): NavBarState {
  // TODO: refactorize it
  let activeWithSubitems = false;
  let selectedWithSubitems = false;
  let selectedWithoutSubitems = false;
  const primaryItems = [];
  for (const primaryItem of items) {
    let primaryIsActive = IsActiveUrl(currentUrl, primaryItem.url);
    let primaryIsSelected =
      selectedItemId != null && primaryItem.idHTML === selectedItemId;
    const secondaryItems: SecondaryNavItemState[] = [];
    if (primaryItem.subNavItems) {
      for (const secondaryItem of primaryItem.subNavItems) {
        const secondaryIsActive = IsActiveUrl(currentUrl, secondaryItem.url);
        // Comparing negations in order to normalize values to boolean
        const newSecondaryItem =
          !secondaryIsActive === !secondaryItem.isActive
            ? secondaryItem
            : {
                ...secondaryItem,
                isActive: secondaryIsActive ? (true as const) : undefined,
              };
        secondaryItems.push(newSecondaryItem);
        primaryIsActive ||= secondaryIsActive;
      }
    }
    let primaryIsOpen =
      primaryItem.subNavItems &&
      primaryItem.subNavItems.length > 0 &&
      primaryIsActive &&
      (!selectedItemId || primaryItem.idHTML === selectedItemId);

    // Comparing negations in order to normalize values to boolean
    const newPrimaryItem =
      !primaryIsActive &&
      !primaryItem.isActive &&
      !primaryIsOpen &&
      !primaryItem.isOpen &&
      !primaryIsSelected === !primaryItem.isSelected
        ? primaryItem
        : {
            ...primaryItem,
            subNavItems: secondaryItems,
            isActive: primaryIsActive ? (true as const) : undefined,
            isSelected: primaryIsSelected ? (true as const) : undefined,
            isOpen: primaryIsOpen ? (true as const) : undefined,
          };
    primaryItems.push(newPrimaryItem);
    if (
      primaryIsActive &&
      primaryItem.subNavItems &&
      primaryItem.subNavItems.length > 0
    ) {
      activeWithSubitems = true;
    }
    if (
      primaryIsSelected &&
      primaryItem.subNavItems &&
      primaryItem.subNavItems.length > 0
    ) {
      selectedWithSubitems = true;
    }
    if (
      primaryIsSelected &&
      (!primaryItem.subNavItems || primaryItem.subNavItems.length === 0)
    ) {
      selectedWithoutSubitems = true;
    }
  }

  const isExpanded =
    !selectedWithoutSubitems && (selectedWithSubitems || activeWithSubitems);

  return { currentUrl, selectedItemId, items: primaryItems, isExpanded };
}

function navBarStateReducer(
  state: NavBarState,
  action: NavBarStateReducerAction
): NavBarState {
  const { currentUrl, selectedItemId, items } = state;
  switch (action.type) {
    case "items/updated":
      return buildNavBarState({
        currentUrl,
        selectedItemId,
        items: action.items,
      });
    case "url/updated":
      return action.href !== currentUrl
        ? buildNavBarState({
            currentUrl: action.href,
            selectedItemId: null,
            items,
          })
        : state;
    case "selected-item/updated":
      return action.idHTML !== selectedItemId
        ? buildNavBarState({ currentUrl, selectedItemId: action.idHTML, items })
        : state;
  }
}

export function useNavBarStateReducer(
  getInitializationData: () => {
    currentUrl: string;
    items: ReadonlyArray<PrimaryNavItem>;
  }
) {
  return useReducer(navBarStateReducer, null, () =>
    buildNavBarState({ ...getInitializationData(), selectedItemId: null })
  );
}
