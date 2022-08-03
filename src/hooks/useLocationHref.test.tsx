import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
//import { patchBrowserBehaviorToInterceptLocationUpdates } from "../history/historyUtils";
import { useLocationHref } from "./useLocationHref";

// Duplicated from historyUtils.ts in order to detect breaking changes
const locationUpdatedEventType = "doppler-menu-mfe-location-updated";

function TestComponent({ global }: { global: Window }) {
  const locationHref = useLocationHref(global);
  return <div>[ {locationHref} ]</div>;
}

describe(useLocationHref.name, () => {
  it("should listen for location-updated event and update state", () => {
    // Arrange
    let locationUpdatedEventListener: () => void = () => {};
    const windowDouble = {
      location: {
        href: "https://test1",
      },
      addEventListener: jest.fn(
        (_eventType: string, listener: () => void) =>
          (locationUpdatedEventListener = listener)
      ),
      removeEventListener: jest.fn(),
    };

    // Act
    render(<TestComponent global={windowDouble as any} />);

    // Assert
    screen.getByText("[ https://test1 ]");

    // Act
    act(() => {
      windowDouble.location.href = "https://test2";
      locationUpdatedEventListener();
    });

    // Assert
    screen.getByText("[ https://test2 ]");
  });

  it("should cleanup handler on unmount", () => {
    // Arrange
    const windowDouble = {
      location: {
        href: "https://test1",
      },
      addEventListener: jest.fn<void, [string, () => void]>(),
      removeEventListener: jest.fn<void, [string, () => void]>(),
    };

    const { unmount } = render(<TestComponent global={windowDouble as any} />);
    expect(windowDouble.removeEventListener).not.toHaveBeenCalled();

    // Act
    unmount();

    // Assert
    expect(windowDouble.removeEventListener).toHaveBeenCalledTimes(1);
    expect(windowDouble.removeEventListener).toHaveBeenCalledWith(
      locationUpdatedEventType,
      expect.any(Function)
    );
    expect(windowDouble.addEventListener).toHaveBeenCalledTimes(1);
    expect(windowDouble.addEventListener).toHaveBeenCalledWith(
      locationUpdatedEventType,
      expect.any(Function)
    );
    expect(windowDouble.removeEventListener.mock.lastCall[1]).toBe(
      windowDouble.addEventListener.mock.lastCall[1]
    );
  });
});
