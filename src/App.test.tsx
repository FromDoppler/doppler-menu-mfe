import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Doppler Menu Micro-Frontend", () => {
  render(<App />);
  const el = screen.getByText(/Doppler Menu Micro-Frontend/i);
  expect(el).toBeInTheDocument();
});
