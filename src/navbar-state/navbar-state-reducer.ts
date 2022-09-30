import { useReducer } from "react";
import { IsActiveUrl } from "../utils";
import {
  NavBarState,
  NavBarStateReducerAction,
  PrimaryNavItemState,
  SecondaryNavItemState,
} from "./navbar-state-abstractions";

function findActiveItemsByUrl(
  currentUrl: string,
  items: readonly PrimaryNavItemState[]
) {
  const activeSecondaryItem = findSecondaryItemByUrl({ currentUrl, items });
  const activePrimaryItem = activeSecondaryItem
    ? findParent({ subItem: activeSecondaryItem, items })
    : findPrimaryItemByUrl({ currentUrl, items });
  return activePrimaryItem ? { activePrimaryItem, activeSecondaryItem } : null;
}

function findActiveItemsByIdHTML(
  idHTML: string,
  items: readonly PrimaryNavItemState[]
) {
  const activeSecondaryItem = findSecondaryItemByIdHTML({ idHTML, items });
  const activePrimaryItem = activeSecondaryItem
    ? findParent({ subItem: activeSecondaryItem, items })
    : findPrimaryItemByIdHTML({ idHTML, items });
  return activePrimaryItem ? { activePrimaryItem, activeSecondaryItem } : null;
}

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

const findSecondaryItemByIdHTML = ({
  idHTML,
  items,
}: {
  idHTML: string;
  items: ReadonlyArray<PrimaryNavItemState>;
}) =>
  !idHTML
    ? undefined
    : items
        .flatMap((primaryItem) => primaryItem.subNavItems || [])
        .find((secondaryItem) => secondaryItem.idHTML === idHTML);

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
  defaultActiveItemId,
  forcedActiveItemId,
  itemsWithObsoleteState: items,
}: {
  currentUrl: string;
  selectedItemId: string | null;
  defaultActiveItemId: string | null;
  forcedActiveItemId: string | null;
  itemsWithObsoleteState: ReadonlyArray<PrimaryNavItemState>;
}): NavBarState {
  const { activePrimaryItem, activeSecondaryItem } = (forcedActiveItemId
    ? findActiveItemsByIdHTML(forcedActiveItemId, items)
    : findActiveItemsByUrl(currentUrl, items)) || {
    activePrimaryItem: null,
    activeSecondaryItem: null,
  };

  const selectedPrimaryItem = findPrimaryItemByIdHTML({
    idHTML: selectedItemId,
    items,
  });

  // TODO: take into account defaultActiveItemId and forcedActiveItemId

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
    defaultActiveItemId,
    forcedActiveItemId,
    items: newItems,
  };
}

export function navBarStateReducer(
  state: NavBarState,
  action: NavBarStateReducerAction
): NavBarState {
  const {
    currentUrl,
    selectedItemId,
    defaultActiveItemId,
    forcedActiveItemId,
    items,
  } = state;
  switch (action.type) {
    case "items/updated":
      return buildNavBarState({
        currentUrl,
        selectedItemId,
        defaultActiveItemId,
        forcedActiveItemId,
        itemsWithObsoleteState: action.items,
      });
    case "url/updated":
      return action.href !== currentUrl
        ? buildNavBarState({
            currentUrl: action.href,
            selectedItemId: null,
            defaultActiveItemId,
            forcedActiveItemId,
            itemsWithObsoleteState: items,
          })
        : state;
    case "selected-item/updated":
      return action.idHTML !== selectedItemId
        ? buildNavBarState({
            currentUrl,
            selectedItemId: action.idHTML,
            defaultActiveItemId,
            forcedActiveItemId,
            itemsWithObsoleteState: items,
          })
        : state;
    case "default-active/updated":
      return action.idHTML !== defaultActiveItemId
        ? buildNavBarState({
            currentUrl,
            selectedItemId,
            defaultActiveItemId: action.idHTML,
            forcedActiveItemId,
            itemsWithObsoleteState: items,
          })
        : state;
    case "forced-active/updated":
      return action.idHTML !== forcedActiveItemId
        ? buildNavBarState({
            currentUrl,
            selectedItemId,
            defaultActiveItemId,
            forcedActiveItemId: action.idHTML,
            itemsWithObsoleteState: items,
          })
        : state;
  }
}

export function useNavBarStateReducer(
  getInitializationData: () => {
    currentUrl: string;
    defaultActiveItemId: string | null;
    forcedActiveItemId: string | null;
    items: ReadonlyArray<PrimaryNavItemState>;
  }
) {
  return useReducer(navBarStateReducer, null, () => {
    const { currentUrl, defaultActiveItemId, forcedActiveItemId, items } =
      getInitializationData();
    return buildNavBarState({
      currentUrl,
      selectedItemId: null,
      defaultActiveItemId,
      forcedActiveItemId,
      itemsWithObsoleteState: items,
    });
  });
}
