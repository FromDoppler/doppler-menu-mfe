import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Doppler Menu Micro-Frontend", () => {
  const mainHeaderLabel = "main header";
  const logoLabel = "company logo";
  const mainNav = "main nav";
  const secundaryNav = "secundary nav";

  render(<App />);

  expect(screen.getByLabelText(mainHeaderLabel)).toBeInTheDocument();
  expect(screen.getByLabelText(logoLabel)).toBeInTheDocument();
  expect(screen.getByLabelText(mainNav)).toBeInTheDocument();
  expect(screen.getByLabelText(secundaryNav)).toBeInTheDocument();
});
