import { useEffect, useState } from "react";
import {
  addLocationUpdatedEventListener,
  removeLocationUpdatedEventListener,
} from "../history/historyUtils";

export function useLocationHref(global: Window = window) {
  const [locationHref, setLocationHref] = useState<string>(
    global.location.href,
  );

  useEffect(() => {
    const onLocationChange = () => {
      setLocationHref(global.location.href);
    };

    addLocationUpdatedEventListener(onLocationChange, global);

    return () => {
      removeLocationUpdatedEventListener(onLocationChange, global);
    };
  }, [global]);

  return locationHref;
}
