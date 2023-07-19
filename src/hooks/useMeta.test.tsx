import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useMeta } from "./useMeta";

type MutationObserverMock = MutationObserver & {
  trigger: (mockedMutationsList: MutationRecord[]) => void;
};

describe(useMeta.name, () => {
  it("should return selected meta content value", () => {
    const metaName = "metaName123";
    const expectedSelector = `meta[name="${metaName}"]`;
    const metaContent = "content123";
    const metaElement = { content: metaContent } as HTMLMetaElement;

    const { TestComponent, windowDouble } = createTestContext();

    windowDouble.document.querySelector.mockImplementation(
      (selectors: string) =>
        selectors == expectedSelector ? metaElement : null,
    );

    render(<TestComponent metaName={metaName} />);

    screen.getByText(`[${metaContent}]`);
  });

  it("should return null when meta element is not found", () => {
    const metaName = "metaName123";

    const { TestComponent, windowDouble } = createTestContext();

    windowDouble.document.querySelector.mockImplementation(() => null);

    render(<TestComponent metaName={metaName} />);

    screen.getByText(`[]`);
  });

  it("should update value when meta element is added to DOM in the first mutation", async () => {
    // Arrange
    const metaName = "metaName123";
    const expectedSelector = `meta[name="${metaName}"]`;
    const metaContentA = "contentA";
    const metaContentB = "contentB";

    let metaElement = { content: metaContentA } as HTMLMetaElement;

    const { TestComponent, windowDouble, getObserverInstance } =
      createTestContext();

    windowDouble.document.querySelector.mockImplementation(
      (selectors: string) =>
        selectors == expectedSelector ? metaElement : null,
    );

    render(<TestComponent metaName={metaName} />);
    screen.getByText(`[${metaContentA}]`);

    metaElement = { content: metaContentB } as HTMLMetaElement;

    // Act
    act(() => {
      getObserverInstance(0).trigger([
        {
          addedNodes: [
            {
              querySelector: () =>
                expectedSelector
                  ? ({ content: "ANY CONTENT" } as HTMLMetaElement)
                  : null,
            },
          ] as any as NodeList,
          attributeName: null,
          attributeNamespace: null,
          nextSibling: null,
          oldValue: null,
          previousSibling: null,
          removedNodes: [] as any as NodeList,
          target: {} as Node,
          type: "childList",
        },
      ]);
    });

    // Assert
    await waitFor(() => {
      screen.getByText(`[${metaContentB}]`);
    });
  });

  it("should update value when meta element is added to DOM in the second mutation", async () => {
    // Arrange
    const metaName = "metaName123";
    const expectedSelector = `meta[name="${metaName}"]`;
    const metaContentA = "contentA";
    const metaContentB = "contentB";

    let metaElement = { content: metaContentA } as HTMLMetaElement;

    const { TestComponent, windowDouble, getObserverInstance } =
      createTestContext();

    windowDouble.document.querySelector.mockImplementation(
      (selectors: string) =>
        selectors == expectedSelector ? metaElement : null,
    );

    render(<TestComponent metaName={metaName} />);
    screen.getByText(`[${metaContentA}]`);

    metaElement = { content: metaContentB } as HTMLMetaElement;

    // Act
    act(() => {
      getObserverInstance(0).trigger([
        {
          addedNodes: [
            {},
            {
              querySelector: () =>
                expectedSelector
                  ? ({ content: "ANY CONTENT" } as HTMLMetaElement)
                  : null,
            },
          ] as any as NodeList,
          attributeName: null,
          attributeNamespace: null,
          nextSibling: null,
          oldValue: null,
          previousSibling: null,
          removedNodes: [] as any as NodeList,
          target: {} as Node,
          type: "childList",
        },
      ]);
    });

    // Assert
    await waitFor(() => {
      screen.getByText(`[${metaContentB}]`);
    });
  });

  it("should update value when meta element is the only added element to DOM", async () => {
    // Arrange
    const metaName = "metaName123";
    const expectedSelector = `meta[name="${metaName}"]`;
    const metaContentA = "contentA";
    const metaContentB = "contentB";

    let metaElement = { content: metaContentA } as HTMLMetaElement;

    const { TestComponent, windowDouble, getObserverInstance } =
      createTestContext();

    windowDouble.document.querySelector.mockImplementation(
      (selectors: string) =>
        selectors == expectedSelector ? metaElement : null,
    );

    render(<TestComponent metaName={metaName} />);
    screen.getByText(`[${metaContentA}]`);

    metaElement = { content: metaContentB } as HTMLMetaElement;

    // Act
    act(() => {
      getObserverInstance(0).trigger([
        {
          addedNodes: [
            {
              nodeName: "META",
              name: metaName,
              content: metaContentB,
              querySelector: () => null,
            },
          ] as any as NodeList,
          attributeName: null,
          attributeNamespace: null,
          nextSibling: null,
          oldValue: null,
          previousSibling: null,
          removedNodes: [] as any as NodeList,
          target: {} as Node,
          type: "childList",
        },
      ]);
    });

    // Assert
    await waitFor(() => {
      screen.getByText(`[${metaContentB}]`);
    });
  });

  it("should update value when meta element is removed from DOM and there is not another one", async () => {
    // Arrange
    const metaName = "metaName123";
    const expectedSelector = `meta[name="${metaName}"]`;
    const metaContentA = "contentA";

    let metaElement = { content: metaContentA } as HTMLMetaElement;

    const { TestComponent, windowDouble, getObserverInstance } =
      createTestContext();

    windowDouble.document.querySelector.mockImplementation(
      (selectors: string) =>
        selectors == expectedSelector ? metaElement : null,
    );

    render(<TestComponent metaName={metaName} />);
    screen.getByText(`[${metaContentA}]`);

    windowDouble.document.querySelector.mockImplementation(() => null);

    // Act
    act(() => {
      getObserverInstance(0).trigger([
        {
          addedNodes: [] as any as NodeList,
          attributeName: null,
          attributeNamespace: null,
          nextSibling: null,
          oldValue: null,
          previousSibling: null,
          removedNodes: [
            {
              querySelector: () =>
                expectedSelector
                  ? ({ content: "ANY CONTENT" } as HTMLMetaElement)
                  : null,
            },
          ] as any as NodeList,
          target: {} as Node,
          type: "childList",
        },
      ]);
    });

    // Assert
    await waitFor(() => {
      screen.getByText(`[]`);
    });
  });

  it("should update value when meta element is removed from DOM and there is another one", async () => {
    // Arrange
    const metaName = "metaName123";
    const expectedSelector = `meta[name="${metaName}"]`;
    const metaContentA = "contentA";
    const metaContentB = "contentB";

    let metaElement = { content: metaContentA } as HTMLMetaElement;

    const { TestComponent, windowDouble, getObserverInstance } =
      createTestContext();

    windowDouble.document.querySelector.mockImplementation(
      (selectors: string) =>
        selectors == expectedSelector ? metaElement : null,
    );

    render(<TestComponent metaName={metaName} />);
    screen.getByText(`[${metaContentA}]`);

    metaElement = { content: metaContentB } as HTMLMetaElement;

    // Act
    act(() => {
      getObserverInstance(0).trigger([
        {
          addedNodes: [] as any as NodeList,
          attributeName: null,
          attributeNamespace: null,
          nextSibling: null,
          oldValue: null,
          previousSibling: null,
          removedNodes: [
            {
              querySelector: () =>
                expectedSelector
                  ? ({ content: "ANY CONTENT" } as HTMLMetaElement)
                  : null,
            },
          ] as any as NodeList,
          target: {} as Node,
          type: "childList",
        },
      ]);
    });

    // Assert
    await waitFor(() => {
      screen.getByText(`[${metaContentB}]`);
    });
  });

  it("should not update value when DOM mutation is not childList", async () => {
    // Arrange
    const metaName = "metaName123";
    const expectedSelector = `meta[name="${metaName}"]`;
    const metaContentA = "contentA";
    const metaContentB = "contentB";

    let metaElement = { content: metaContentA } as HTMLMetaElement;

    const { TestComponent, windowDouble, getObserverInstance } =
      createTestContext();

    windowDouble.document.querySelector.mockImplementation(
      (selectors: string) =>
        selectors == expectedSelector ? metaElement : null,
    );

    render(<TestComponent metaName={metaName} />);
    screen.getByText(`[${metaContentA}]`);

    metaElement = { content: metaContentB } as HTMLMetaElement;

    // Act
    act(() => {
      getObserverInstance(0).trigger([
        {
          addedNodes: [
            {},
            {
              querySelector: () =>
                expectedSelector
                  ? ({ content: "ANY CONTENT" } as HTMLMetaElement)
                  : null,
            },
          ] as any as NodeList,
          attributeName: null,
          attributeNamespace: null,
          nextSibling: null,
          oldValue: null,
          previousSibling: null,
          removedNodes: [] as any as NodeList,
          target: {} as Node,
          type: "attributes",
        },
      ]);
    });

    // Assert
    await timeout(1);
    screen.getByText(`[${metaContentA}]`);
  });
});

function createMutationObserverCtorMock() {
  return jest.fn(function MutationObserver(
    this: MutationObserverMock,
    callback: MutationCallback,
  ) {
    this.observe = jest.fn();
    this.disconnect = jest.fn();
    this.trigger = (mockedMutationsList: MutationRecord[]) => {
      callback(mockedMutationsList, this);
    };
    return this;
  });
}

function createTestContext() {
  const windowDouble = {
    MutationObserver: createMutationObserverCtorMock(),
    document: {
      querySelector: jest.fn<HTMLMetaElement | null, [string]>(),
    },
  };

  const TestComponent = ({ metaName }: { metaName: string }) => {
    const content = useMeta(metaName, windowDouble as any);
    return <>[{content}]</>;
  };

  const getObserverInstance = (index: number = 0) =>
    windowDouble.MutationObserver.mock.instances[index];

  return { TestComponent, windowDouble, getObserverInstance };
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
