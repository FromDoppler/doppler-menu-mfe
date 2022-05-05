import { render, screen } from "@testing-library/react";
import { Notifications } from "./Notifications";

describe("<Notifications />", () => {
  it("should display notifications", () => {
    const message = "This is a notification text";
    const testProps = {
      notifications: [`<strong>${message}</strong>`],
      emptyNotificationText: "empty",
    };

    render(<Notifications {...testProps} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should display many notifications", () => {
    const notifications = ["one", "two", "three"];
    const emptyNotificationText = "empty";

    render(
      <Notifications
        notifications={notifications}
        emptyNotificationText={emptyNotificationText}
      />
    );

    expect(screen.getByText(notifications[0])).toBeInTheDocument();
    expect(screen.getByText(notifications[1])).toBeInTheDocument();
    expect(screen.getByText(notifications[2])).toBeInTheDocument();
  });
});
