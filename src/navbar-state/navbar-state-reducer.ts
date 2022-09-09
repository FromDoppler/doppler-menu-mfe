import { useReducer } from "react";
import { IsActiveUrl } from "../utils";
import {
  NavBarState,
  NavBarStateReducerAction,
  PrimaryNavItemState,
  SecondaryNavItemState,
} from "./navbar-state-abstractions";

const findSecondaryItemByUrl = ({
  currentUrl,
  items,
}: {
  currentUrl: string;
  items: ReadonlyArray<PrimaryNavItemState>;
}) =>
  !currentUrl
    ? undefined
    : items
        .flatMap((primaryItem) => primaryItem.subNavItems || [])
        .find((secondaryItem) => IsActiveUrl(currentUrl, secondaryItem.url));

const findPrimaryItemByUrl = ({
  currentUrl,
  items,
}: {
  currentUrl: string;
  items: ReadonlyArray<PrimaryNavItemState>;
}) =>
  !currentUrl
    ? undefined
    : items.find((primaryItem) => IsActiveUrl(currentUrl, primaryItem.url));

const findPrimaryItemByIdHTML = ({
  idHTML,
  items,
}: {
  idHTML: string | null;
  items: ReadonlyArray<PrimaryNavItemState>;
}) =>
  !idHTML
    ? undefined
    : items.find((primaryItem) => primaryItem.idHTML === idHTML);

const findParent = ({
  subItem: secondaryItem,
  items,
}: {
  subItem: SecondaryNavItemState;
  items: ReadonlyArray<PrimaryNavItemState>;
}) =>
  items.find(
    (primaryItem) =>
      primaryItem.subNavItems && primaryItem.subNavItems.includes(secondaryItem)
  );

function buildNavBarState({
  currentUrl,
  selectedItemId,
  itemsWithObsoleteState: items,
}: {
  currentUrl: string;
  selectedItemId: string | null;
  itemsWithObsoleteState: ReadonlyArray<PrimaryNavItemState>;
}): NavBarState {
  const activeSecondaryItem = findSecondaryItemByUrl({ currentUrl, items });

  const activePrimaryItem = activeSecondaryItem
    ? findParent({ subItem: activeSecondaryItem, items })
    : findPrimaryItemByUrl({ currentUrl, items });

  const selectedPrimaryItem = findPrimaryItemByIdHTML({
    idHTML: selectedItemId,
    items,
  });

  const newItems = items.map((primaryItem) => {
    const isActive = primaryItem === activePrimaryItem;
    const isSelected = primaryItem === selectedPrimaryItem;
    const isOpen = !!(
      (isSelected || (isActive && !selectedPrimaryItem)) &&
      primaryItem.subNavItems
    );
    const subNavItems = primaryItem.subNavItems?.map((secondaryItem) => ({
      ...secondaryItem,
      isActive: secondaryItem === activeSecondaryItem,
    }));

    return {
      ...primaryItem,
      isActive,
      isSelected,
      isOpen,
      subNavItems,
    } as PrimaryNavItemState;
  });

  const isExpanded = newItems.some((primaryItem) => primaryItem.isOpen);

  return {
    currentUrl,
    isExpanded,
    selectedItemId,
    items: newItems,
  };
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
