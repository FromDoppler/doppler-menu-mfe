import { useCallback, useEffect, useState } from "react";

export const useTimeout = () => {
  const [timerIds, setTimerIds] = useState<number[]>([]);

  // clear the timeout.
  useEffect(() => {
    return () => timerIds.forEach((timerId: number) => clearTimeout(timerId));
  }, [timerIds]);

  const createTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(callback, delay);
    setTimerIds((timerIds: any) => [...timerIds, id]);
  };

  return useCallback(createTimeout, []);
};
