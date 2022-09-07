import { useReducer } from "react";
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
  itemsWithObsoleteState,
}: {
  currentUrl: string;
  selectedItemId: string | null;
  itemsWithObsoleteState: ReadonlyArray<PrimaryNavItemState>;
}): NavBarState {
  // TODO: refactorize it
  let isExpanded = false;
  const primaryItems = [];
  for (const primaryItem of itemsWithObsoleteState) {
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
                isActive: secondaryIsActive,
              };
        secondaryItems.push(newSecondaryItem);
        primaryIsActive ||= secondaryIsActive;
      }
    }
    let primaryIsOpen = primaryItem.subNavItems
      ? (primaryIsActive && !selectedItemId) ||
        primaryItem.idHTML === selectedItemId
      : false;

    // Comparing negations in order to normalize values to boolean
    const newPrimaryItem: PrimaryNavItemState =
      !primaryIsActive &&
      !primaryItem.isActive &&
      !primaryIsOpen &&
      !primaryItem.isOpen &&
      !primaryIsSelected === !primaryItem.isSelected
        ? primaryItem
        : {
            ...primaryItem,
            subNavItems:
              secondaryItems.length > 0
                ? (secondaryItems as [
                    SecondaryNavItemState,
                    ...SecondaryNavItemState[]
                  ])
                : undefined,
            isActive: primaryIsActive,
            isSelected: primaryIsSelected,
            isOpen: primaryIsOpen,
          };
    primaryItems.push(newPrimaryItem);
    isExpanded ||= !!primaryIsOpen;
  }

  return { currentUrl, selectedItemId, items: primaryItems, isExpanded };
}

export function navBarStateReducer(
  state: NavBarState,
  action: NavBarStateReducerAction
): NavBarState {
  const { currentUrl, selectedItemId, items } = state;
  switch (action.type) {
    case "items/updated":
      return buildNavBarState({
        currentUrl,
        selectedItemId,
        itemsWithObsoleteState: action.items,
      });
    case "url/updated":
      return action.href !== currentUrl
        ? buildNavBarState({
            currentUrl: action.href,
            selectedItemId: null,
            itemsWithObsoleteState: items,
          })
        : state;
    case "selected-item/updated":
      return action.idHTML !== selectedItemId
        ? buildNavBarState({
            currentUrl,
            selectedItemId: action.idHTML,
            itemsWithObsoleteState: items,
          })
        : state;
  }
}

export function useNavBarStateReducer(
  getInitializationData: () => {
    currentUrl: string;
    items: ReadonlyArray<PrimaryNavItemState>;
  }
) {
  return useReducer(navBarStateReducer, null, () => {
    const { currentUrl, items } = getInitializationData();
    return buildNavBarState({
      currentUrl,
      selectedItemId: null,
      itemsWithObsoleteState: items,
    });
  });
}
