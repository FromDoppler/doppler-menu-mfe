const DOPPLER_MENU_LOCATION_UPDATED = "doppler-menu-mfe-location-updated";

export function patchBrowserBehaviorToInterceptLocationUpdates(
  global: Window = window
) {
  const dispatchLocationUpdatedEvent = () =>
    global.dispatchEvent(new CustomEvent(DOPPLER_MENU_LOCATION_UPDATED));

  const originalPushState = global.history.pushState.bind(global.history);
  global.history.pushState = function (...args) {
    originalPushState(...args);
    dispatchLocationUpdatedEvent();
  };

  const originalReplaceState = global.history.replaceState.bind(global.history);
  global.history.replaceState = function (...args) {
    originalReplaceState(...args);
    dispatchLocationUpdatedEvent();
  };

  global.addEventListener("popstate", dispatchLocationUpdatedEvent);
}

export function addLocationUpdatedEventListener(
  listener: () => void,
  global: Window = window
) {
  global.addEventListener(DOPPLER_MENU_LOCATION_UPDATED, listener);
}

export function removeLocationUpdatedEventListener(
  listener: () => void,
  global: Window = window
) {
  global.removeEventListener(DOPPLER_MENU_LOCATION_UPDATED, listener);
}
