import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

const expectedIconClasses = "ms-icon icon-doppler-logo";

describe("<Logo />", () => {
  it("renders logo link", () => {
    render(<Logo />);

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href");
  });

  it("displays icon image properly", () => {
    render(<Logo />);

    const icon = screen.getByRole("img");

    expect(icon).toHaveAccessibleName();
    expect(icon).toHaveClass(expectedIconClasses);
  });
});
