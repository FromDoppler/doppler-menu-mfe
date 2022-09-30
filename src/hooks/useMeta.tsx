import { useState } from "react";

export function useMeta(name: string, global: Window = window) {
  // TODO: listening DOM changes and update the value
  // https://makingsense.atlassian.net/browse/DE-810
  const [content] = useState(
    () =>
      global.document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
        ?.content || null
  );
  return content;
}
