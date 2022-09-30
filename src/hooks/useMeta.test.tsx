import { render, screen } from "@testing-library/react";
import { useMeta } from "./useMeta";

describe(useMeta.name, () => {
  it("should return selected meta content value", () => {
    const metaName = "metaName123";
    const expectedSelector = `meta[name="${metaName}"]`;
    const metaContent = "content123";
    const metaElement = { content: metaContent } as HTMLMetaElement;

    const querySelectorDouble = (selectors: string) =>
      selectors == expectedSelector ? metaElement : null;

    const { TestComponent, windowDouble } = createTestContext();
    windowDouble.document = {
      querySelector: querySelectorDouble,
    };

    render(<TestComponent metaName={metaName} />);

    screen.getByText(`[${metaContent}]`);
  });

  it("should return null when meta element is not found", () => {
    const metaName = "metaName123";

    const querySelectorDouble = () => null;

    const { TestComponent, windowDouble } = createTestContext();
    windowDouble.document = {
      querySelector: querySelectorDouble,
    };

    render(<TestComponent metaName={metaName} />);

    screen.getByText(`[]`);
  });
});

function createTestContext() {
  const windowDouble: any = {};

  const TestComponent = ({ metaName }: { metaName: string }) => {
    const content = useMeta(metaName, windowDouble as any);
    return <>[{content}]</>;
  };

  return { TestComponent, windowDouble };
}
