import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("<Header/>", () => {
  it("should not break if props are missing", () => {
    const mainHeaderLabel = "main header";
    const mainHeaderClass = "header-main";

    render(<Header />);

    expect(screen.getByLabelText(mainHeaderLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(mainHeaderLabel)).toHaveClass(mainHeaderClass);
  });
});
