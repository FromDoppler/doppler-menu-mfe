import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Doppler Menu Micro-Frontend", () => {
  render(<App />);
  const el = screen.getByText("Home");
  expect(el).toBeInTheDocument();
  expect(el.classList.toString()).toBe("active");
});
