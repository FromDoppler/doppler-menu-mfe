import { useEffect, useMemo, useState } from "react";

export function useMutationObserver<T>({
  targetNode,
  config,
  initialValue,
  onMutation,
  global = window,
}: {
  targetNode: HTMLElement;
  config: MutationObserverInit;
  initialValue: T | (() => T);
  onMutation: (
    mutations: MutationRecord[],
    setValue: (newValue: T) => void
  ) => void;
  global?: Window & typeof globalThis;
}): T {
  const [value, setValue] = useState(initialValue);
  const observer = useMemo(
    () =>
      new global.MutationObserver((mutationList) =>
        onMutation(mutationList, setValue)
      ),
    [onMutation, setValue, global.MutationObserver]
  );

  useEffect(() => {
    if (targetNode) {
      observer.observe(targetNode, config);
      return () => {
        observer.disconnect();
      };
    }
  }, [targetNode, config, observer]);

  return value;
}
