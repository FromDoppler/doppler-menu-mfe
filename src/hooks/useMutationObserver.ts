import { useEffect, useMemo, useState } from "react";

export function useMutationObserver<T>({
  targetNode,
  config,
  initialValue,
  onMutation,
}: {
  targetNode: HTMLElement;
  config: MutationObserverInit;
  initialValue: T | (() => T);
  onMutation: (
    mutations: MutationRecord[],
    setValue: (newValue: T) => void
  ) => void;
}): T {
  const [value, setValue] = useState(initialValue);

  const observer = useMemo(
    () =>
      // TODO: allow to inject this factory to make it testable
      new MutationObserver((mutationList) =>
        onMutation(mutationList, setValue)
      ),
    [onMutation, setValue]
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
