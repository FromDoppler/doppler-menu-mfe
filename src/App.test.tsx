import { prettyDOM, render, screen } from "@testing-library/react";
import App from "./App";

test("renders Doppler Menu Micro-Frontend", () => {
  const { container } = render(<App />);
  console.log(prettyDOM(container));

  const el = screen.getByText("Home");
  expect(el).toBeInTheDocument();
  expect(el.classList.toString()).toBe("active");
});
