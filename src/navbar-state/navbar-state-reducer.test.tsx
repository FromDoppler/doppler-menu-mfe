import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {
  NavBarState,
  NavBarStateReducerAction,
  PrimaryNavItemState,
} from "./navbar-state-abstractions";
import {
  navBarStateReducer,
  useNavBarStateReducer,
} from "./navbar-state-reducer";

// Test Data
const url0 = "url0";
const url1 = "url1";
const url2 = "url2";
const idHTML0 = "idHTML0";
const idHTML1 = "idHTML1";
const idHTML2 = "idHTML2";
const item0 = {
  idHTML: idHTML0,
  title: "title0",
  url: url0,
  isActive: false,
  isOpen: false,
  isSelected: false,
  subNavItems: undefined,
} as const;
const item1 = {
  idHTML: idHTML1,
  title: "title1",
  url: url1,
  isActive: false,
  isOpen: false,
  isSelected: false,
  subNavItems: undefined,
} as const;
const item2 = {
  idHTML: idHTML2,
  title: "title2",
  url: url2,
  isActive: false,
  isOpen: false,
  isSelected: false,
  subNavItems: undefined,
} as const;

describe(navBarStateReducer.name, () => {
  describe("items/updated action", () => {
    it("should make honor to previously set URL", () => {
      // Arrange
      const state0 = {
        currentUrl: url1,
        isExpanded: false,
        items: [],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "items/updated",
        items: [item0, item1, item2],
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe(url1);
      expect(state1.items[1].isActive).toBe(true);
      expect(state1.items[0]).toEqual(item0);
      expect(state1.items[2]).toEqual(item2);
    });
  });

  describe("url/updated action", () => {
    it("should set active item when there is not a previously activated item", () => {
      // Arrange
      const state0 = {
        currentUrl: "Unknown URL",
        isExpanded: false,
        items: [item0, item1, item2],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "url/updated",
        href: url1,
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe(url1);
      expect(state1.items[1].isActive).toBe(true);
      expect(state1.items[0]).toEqual(item0);
      expect(state1.items[2]).toEqual(item2);
    });

    it("should not override active item when there is a forced one", () => {
      // Arrange
      const state0 = {
        currentUrl: "Unknown URL",
        isExpanded: false,
        items: [item0, item1, item2],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: idHTML2,
      } as const;
      const action = {
        type: "url/updated",
        href: url1,
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe(url1);
      expect(state1.items[1].isActive).toBe(false);
      expect(state1.items[2].isActive).toBe(true);
    });

    it("should change active item when there is a previously activated item", () => {
      // Arrange
      const state0 = {
        currentUrl: url0,
        isExpanded: false,
        items: [{ ...item0, isActive: true }, item1, item2],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "url/updated",
        href: url1,
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe(url1);
      expect(state1.items[0].isActive).toBe(false);
      expect(state1.items[1].isActive).toBe(true);
    });

    it("should remove active item when URL is not found", () => {
      // Arrange
      const state0 = {
        currentUrl: url0,
        isExpanded: false,
        items: [{ ...item0, isActive: true }, item1, item2],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "url/updated",
        href: "UNKNOWN URL",
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe("UNKNOWN URL");
      expect(state1.items[0].isActive).toBe(false);
      expect(state1.items[1].isActive).toBe(false);
      expect(state1.items[2].isActive).toBe(false);
    });

    it("should active default item when URL is not found", () => {
      // Arrange
      const state0 = {
        currentUrl: url0,
        isExpanded: false,
        items: [{ ...item0, isActive: true }, item1, item2],
        selectedItemId: null,
        defaultActiveItemId: idHTML2,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "url/updated",
        href: "UNKNOWN URL",
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe("UNKNOWN URL");
      expect(state1.items[0].isActive).toBe(false);
      expect(state1.items[1].isActive).toBe(false);
      expect(state1.items[2].isActive).toBe(true);
    });

    it("should deselect item", () => {
      // Arrange
      const state0 = {
        currentUrl: url0,
        isExpanded: true,
        items: [
          {
            ...item0,
            isActive: true,
            subNavItems: [
              {
                title: "subItem0",
                url: "urlSubItem0",
                idHTML: "idHTMLSubitem0",
                isActive: false,
              },
            ],
          },
          item1,
          {
            ...item2,
            isSelected: true,
            isOpen: true,
            subNavItems: [
              {
                title: "subItem1",
                url: "urlSubItem1",
                idHTML: "idHTMLSubitem1",
                isActive: false,
              },
            ],
          },
        ],
        selectedItemId: idHTML2,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "url/updated",
        href: url1,
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe(url1);
      expect(state1.selectedItemId).toBe(null);
      expect(state1.isExpanded).toBe(false);
      expect(state1.items[0].isActive).toBe(false);
      expect(state1.items[0].isSelected).toBe(false);
      expect(state1.items[0].isOpen).toBe(false);
      expect(state1.items[1].isActive).toBe(true);
      expect(state1.items[1].isSelected).toBe(false);
      expect(state1.items[1].isOpen).toBe(false);
      expect(state1.items[2].isActive).toBe(false);
      expect(state1.items[2].isSelected).toBe(false);
      expect(state1.items[2].isOpen).toBe(false);
    });

    it("should open the navbar when the URL matches a subItem", () => {
      // Arrange
      const state0 = {
        currentUrl: "Unknown URL",
        isExpanded: false,
        items: [
          {
            ...item0,
            subNavItems: [
              {
                title: "subItem0",
                url: "urlSubItem0",
                idHTML: "idHTMLSubitem0",
                isActive: false,
              },
            ],
          },
          item1,
          item2,
        ],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "url/updated",
        href: "urlSubItem0",
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe("urlSubItem0");
      expect(state1.isExpanded).toBe(true);
      expect(state1.items).toHaveLength(3);
      expect(state1.items[0].isActive).toBe(true);
      expect(state1.items[0].isOpen).toBe(true);
      expect(state1.items[0].subNavItems![0].isActive).toBe(true);
      expect(state1.items[1]).toEqual(item1);
      expect(state1.items[2]).toEqual(item2);
    });
  });

  describe("forced-active/updated action", () => {
    it("should set active item when there is not a previously activated item", () => {
      // Arrange
      const state0 = {
        currentUrl: "Unknown URL",
        isExpanded: false,
        items: [item0, item1, item2],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "forced-active/updated",
        idHTML: idHTML1,
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe(state0.currentUrl);
      expect(state1.items[1].isActive).toBe(true);
      expect(state1.items[0]).toEqual(item0);
      expect(state1.items[2]).toEqual(item2);
    });

    it("should open the navbar when the URL matches a subItem", () => {
      // Arrange
      const state0 = {
        currentUrl: "Unknown URL",
        isExpanded: false,
        items: [
          {
            ...item0,
            subNavItems: [
              {
                title: "subItem0",
                url: "urlSubItem0",
                idHTML: "idHTMLSubitem0",
                isActive: false,
              },
            ],
          },
          item1,
          item2,
        ],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "forced-active/updated",
        idHTML: "idHTMLSubitem0",
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe(state0.currentUrl);
      expect(state1.isExpanded).toBe(true);
      expect(state1.items).toHaveLength(3);
      expect(state1.items[0].isActive).toBe(true);
      expect(state1.items[0].isOpen).toBe(true);
      expect(state1.items[0].subNavItems![0].isActive).toBe(true);
      expect(state1.items[1]).toEqual(item1);
      expect(state1.items[2]).toEqual(item2);
    });
  });

  describe("default-active/updated action", () => {
    it("should set active item when there is not a previously activated item", () => {
      // Arrange
      const state0 = {
        currentUrl: "Unknown URL",
        isExpanded: false,
        items: [item0, item1, item2],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "default-active/updated",
        idHTML: idHTML1,
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe(state0.currentUrl);
      expect(state1.items[1].isActive).toBe(true);
      expect(state1.items[0]).toEqual(item0);
      expect(state1.items[2]).toEqual(item2);
    });

    it("should open the navbar when the URL matches a subItem", () => {
      // Arrange
      const state0 = {
        currentUrl: "Unknown URL",
        isExpanded: false,
        items: [
          {
            ...item0,
            subNavItems: [
              {
                title: "subItem0",
                url: "urlSubItem0",
                idHTML: "idHTMLSubitem0",
                isActive: false,
              },
            ],
          },
          item1,
          item2,
        ],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "default-active/updated",
        idHTML: "idHTMLSubitem0",
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe(state0.currentUrl);
      expect(state1.isExpanded).toBe(true);
      expect(state1.items).toHaveLength(3);
      expect(state1.items[0].isActive).toBe(true);
      expect(state1.items[0].isOpen).toBe(true);
      expect(state1.items[0].subNavItems![0].isActive).toBe(true);
      expect(state1.items[1]).toEqual(item1);
      expect(state1.items[2]).toEqual(item2);
    });
  });

  describe("selected-item/updated action", () => {
    it("should update selected item when new selected item is active", () => {
      // Arrange
      const state0 = {
        currentUrl: url0,
        isExpanded: true,
        items: [
          { ...item0, isActive: true },
          {
            ...item1,
            isSelected: true,
            subNavItems: [
              {
                title: "subItem1",
                url: "urlSubItem1",
                idHTML: "idHTMLSubitem1",
                isActive: false,
              },
            ],
          },
          item2,
        ],
        selectedItemId: idHTML1,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "selected-item/updated",
        idHTML: idHTML0,
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.selectedItemId).toBe(idHTML0);
      expect(state1.items[0].isSelected).toBe(true);
      expect(state1.items[0].isActive).toBe(true);
      expect(state1.items[0].isOpen).toBe(false);
      expect(state1.currentUrl).toBe(url0);
      expect(state1.items[1].isActive).toBe(false);
      expect(state1.items[1].isSelected).toBe(false);
      expect(state1.items[1].isOpen).toBe(false);
      expect(state1.items[2]).toEqual(item2);
    });

    it("should update selected item and expand navbar when the new selected item has subItems", () => {
      // Arrange
      const state0 = {
        currentUrl: url0,
        isExpanded: false,
        items: [
          { ...item0, isActive: true },
          item1,
          {
            ...item2,
            subNavItems: [
              {
                title: "subItem1",
                url: "urlSubItem1",
                idHTML: "idHTMLSubitem1",
                isActive: false,
              },
            ],
          },
        ],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "selected-item/updated",
        idHTML: idHTML2,
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.selectedItemId).toBe(idHTML2);
      expect(state1.items[2].isSelected).toBe(true);
      expect(state1.items[2].isOpen).toBe(true);
      expect(state1.items[2].isActive).toBe(false);
      expect(state1.isExpanded).toBe(true);
      expect(state1.items[0].isActive).toBe(true);
      expect(state1.items[0].isOpen).toBe(false);
      expect(state1.items[1]).toEqual(item1);
    });

    it("should collapse navbar when new selected item does not have subItems", () => {
      // Arrange
      const state0 = {
        currentUrl: url2,
        isExpanded: true,
        items: [
          item0,
          item1,
          {
            ...item2,
            isActive: true,
            isOpen: true,
            subNavItems: [
              {
                title: "subItem1",
                url: "urlSubItem1",
                idHTML: "idHTMLSubitem1",
                isActive: true,
              },
            ],
          },
        ],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "selected-item/updated",
        idHTML: idHTML0,
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.selectedItemId).toBe(idHTML0);
      expect(state1.isExpanded).toBe(false);
      expect(state1.items[0].isActive).toBe(false);
      expect(state1.items[0].isOpen).toBe(false);
      expect(state1.items[0].isSelected).toBe(true);
      expect(state1.items[2].isOpen).toBe(false);
      expect(state1.items[2].isActive).toBe(true);
      expect(state1.items[2].isSelected).toBe(false);
    });

    it("should open selected item when the active one was open", () => {
      // Arrange
      const state0 = {
        currentUrl: url0,
        isExpanded: true,
        items: [
          {
            ...item0,
            isOpen: true,
            isActive: true,
            subNavItems: [
              {
                title: "subItem0",
                url: "urlSubItem0",
                idHTML: "idHTMLSubitem0",
                isActive: false,
              },
            ],
          },
          item1,
          {
            ...item2,
            subNavItems: [
              {
                title: "subItem1",
                url: "urlSubItem1",
                idHTML: "idHTMLSubitem1",
                isActive: false,
              },
            ],
          },
        ],
        selectedItemId: null,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "selected-item/updated",
        idHTML: idHTML2,
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.selectedItemId).toBe(idHTML2);
      expect(state1.isExpanded).toBe(true);
      expect(state1.items[0].isActive).toBe(true);
      expect(state1.items[0].isOpen).toBe(false);
      expect(state1.items[0].isSelected).toBe(false);
      expect(state1.items[2].isSelected).toBe(true);
      expect(state1.items[2].isOpen).toBe(true);
      expect(state1.items[2].isActive).toBe(false);
      expect(state1.items[1]).toEqual(item1);
    });

    it("should open active item when selected item becomes null", () => {
      // Arrange
      const state0 = {
        currentUrl: url0,
        isExpanded: true,
        items: [
          {
            ...item0,
            isActive: true,
            subNavItems: [
              {
                title: "subItem0",
                url: "urlSubItem0",
                idHTML: "idHTMLSubitem0",
                isActive: false,
              },
            ],
          },
          item1,
          {
            ...item2,
            isSelected: true,
            isOpen: true,
            subNavItems: [
              {
                title: "subItem1",
                url: "urlSubItem1",
                idHTML: "idHTMLSubitem1",
                isActive: false,
              },
            ],
          },
        ],
        selectedItemId: idHTML2,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
      } as const;
      const action = {
        type: "selected-item/updated",
        idHTML: null,
      } as const;

      // Act
      const state1 = navBarStateReducer(state0, action);

      // Assert
      expect(state1.currentUrl).toBe(url0);
      expect(state1.selectedItemId).toBe(null);
      expect(state1.isExpanded).toBe(true);
      expect(state1.items[0].isActive).toBe(true);
      expect(state1.items[0].isOpen).toBe(true);
      expect(state1.items[0].isSelected).toBe(false);
      expect(state1.items[2].isActive).toBe(false);
      expect(state1.items[2].isOpen).toBe(false);
      expect(state1.items[2].isSelected).toBe(false);
      expect(state1.items[1]).toEqual(item1);
    });
  });
});

describe(useNavBarStateReducer.name, () => {
  describe("initialization", () => {
    it("should accept empty items", () => {
      // Arrange
      const currentUrl = url1;
      const initializationData = {
        currentUrl,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
        items: [],
      };

      const { TestComponent, getCurrentState } = createTestContext(
        () => initializationData
      );

      // Act
      render(<TestComponent />);

      // Assert
      const state1 = getCurrentState();
      expect(state1.items).toHaveLength(0);
      expect(state1.currentUrl).toBe(currentUrl);
      expect(state1.isExpanded).toBe(false);
      expect(state1.selectedItemId).toBeNull();
    });

    it("should accept items and make honor to currentUrl", () => {
      // Arrange
      const initializationData = {
        currentUrl: url1,
        defaultActiveItemId: null,
        forcedActiveItemId: null,
        items: [item0, item1, item2],
      };

      const { TestComponent, getCurrentState } = createTestContext(
        () => initializationData
      );

      // Act
      render(<TestComponent />);

      // Assert
      const state0 = getCurrentState();
      expect(state0.items).toHaveLength(3);
      expect(state0.currentUrl).toBe(url1);
      expect(state0.isExpanded).toBe(false);
      expect(state0.selectedItemId).toBeNull();
      expect(state0.items).toHaveLength(3);
      expect(state0.items[1].isActive).toBe(true);
      expect(state0.items[0]).toEqual(item0);
      expect(state0.items[2]).toEqual(item2);
    });
  });
});

function createTestContext(
  getInitializationData: () => {
    currentUrl: string;
    defaultActiveItemId: string | null;
    forcedActiveItemId: string | null;
    items: ReadonlyArray<PrimaryNavItemState>;
  }
): {
  TestComponent: () => JSX.Element;
  getCurrentState: () => NavBarState;
  dispatchAndFlush: (action: NavBarStateReducerAction) => void;
} {
  let _state: any;
  let _dispatch: any;

  const TestComponent = () => {
    [_state, _dispatch] = useNavBarStateReducer(getInitializationData);
    return <div>Hola</div>;
  };

  const getCurrentState = () => _state;
  const dispatchAndFlush = (action: NavBarStateReducerAction) =>
    act(() => _dispatch(action));
  return { TestComponent, getCurrentState, dispatchAndFlush };
}
