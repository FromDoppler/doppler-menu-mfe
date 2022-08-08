import { patchBrowserBehaviorToInterceptLocationUpdates } from "./historyUtils";

// Duplicated from historyUtils.ts in order to detect breaking changes
const locationUpdatedEventType = "doppler-menu-mfe-location-updated";

describe(patchBrowserBehaviorToInterceptLocationUpdates.name, () => {
  it("should dispatch location-updated events for pushState, replaceState and navigation buttons", () => {
    // Backup initial functions and allow to inspect them
    // (original for the SUT, not for the test 🤯)
    const originalPushState = jest.fn(window.history.pushState);
    window.history.pushState = originalPushState;
    const originalReplaceState = jest.fn(window.history.replaceState);
    window.history.replaceState = originalReplaceState;
    const dispatchEvent = jest.fn(window.dispatchEvent);
    window.dispatchEvent = dispatchEvent;

    // Arbitrary parameters
    const pushStateParameters = ["a", "b", "c"] as const;
    const replaceStateParameters = ["d", "e", "f"] as const;

    // Act
    patchBrowserBehaviorToInterceptLocationUpdates();
    // Assert
    expect(window.history.pushState).not.toBe(originalPushState);
    expect(window.history.replaceState).not.toBe(originalReplaceState);
    expect(originalPushState).not.toBeCalled();
    expect(originalReplaceState).not.toBeCalled();
    expect(dispatchEvent.mock.calls.length).toBe(0);

    // Act
    window.history.pushState(...pushStateParameters);
    // Assert
    expect(originalPushState).toBeCalledTimes(1);
    expect(originalPushState).toBeCalledWith(...pushStateParameters);
    expect(dispatchEvent).toBeCalledTimes(1);

    // Act
    window.history.replaceState(...replaceStateParameters);
    // Assert
    expect(originalReplaceState).toBeCalledTimes(1);
    expect(originalReplaceState).toBeCalledWith(...replaceStateParameters);
    expect(dispatchEvent).toBeCalledTimes(2);

    // Act, simulate back/forward buttons
    window.dispatchEvent(new PopStateEvent("popstate"));
    // Assert
    const locationUpdatedEventDispatches = dispatchEvent.mock.calls
      .map((e) => e[0])
      .filter((e) => e instanceof CustomEvent)
      .filter((e) => e.type === locationUpdatedEventType);
    expect(locationUpdatedEventDispatches.length).toBe(3);
  });
});
