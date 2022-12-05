import { render } from "@testing-library/react";
import { userData as defaultUser } from "../mocks/userMock";
import { Notifications } from "./Notifications";

describe("<Notifications />", () => {
  it("should display notifications", () => {
    render(<Notifications user={defaultUser} />);
  });
});
