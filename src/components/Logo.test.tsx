import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

const expectedIconClasses = "ms-icon icon-doppler-logo";

describe(Logo.name, () => {
  it("renders logo link", () => {
    const url = "https://test/";
    render(<Logo url={url} />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", url);
  });

  it("displays icon image properly", () => {
    render(<Logo url="https://test/" />);

    const icon = screen.getByRole("img");

    expect(icon).toHaveAccessibleName();
    expect(icon).toHaveClass(expectedIconClasses);
  });
});
