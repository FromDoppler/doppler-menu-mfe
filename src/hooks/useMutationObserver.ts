import { useEffect, useMemo, useState } from "react";

const identity = (x: any) => x;

export function useMutationObserver<T = MutationRecord[]>({
  targetNode,
  config,
  callback = identity,
}: {
  targetNode: HTMLElement;
  config: MutationObserverInit;
  callback?: (mutations: MutationRecord[], observer: MutationObserver) => T;
}): T | undefined {
  // TODO: allow to set initial value
  const [value, setValue] = useState<T | undefined>(undefined);

  const observer = useMemo(
    () =>
      // TODO: allow to inject this factory to make it testable
      new MutationObserver((mutationList, observer) => {
        const result = callback(mutationList, observer);
        setValue(result);
      }),
    [callback]
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
