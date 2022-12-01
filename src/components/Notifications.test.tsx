import { render } from "@testing-library/react";
import { Notifications } from "./Notifications";

describe("<Notifications />", () => {
  it("should display notifications", () => {
    render(<Notifications />);
  });
});
