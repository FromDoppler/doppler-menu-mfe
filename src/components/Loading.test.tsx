import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";

describe("<Loading />", () => {
  it("render loading page if page is defined", () => {
    const wrapperId = "wrapper-loading";
    const loadingPageId = "loading-page";

    render(<Loading page />);

    const loadingWrapper = screen.getByTestId(wrapperId);
    const loadingPage = screen.getByTestId(loadingPageId);

    expect(loadingWrapper).toHaveClass("wrapper-loading");
    expect(loadingPage).toHaveClass("loading-page");
  });

  it("render loading box if page is undefined", () => {
    const loadingBoxId = "loading-box";

    render(<Loading />);

    const loadingBox = screen.getByTestId(loadingBoxId);

    expect(loadingBox).toHaveClass("loading-box");
  });
});
