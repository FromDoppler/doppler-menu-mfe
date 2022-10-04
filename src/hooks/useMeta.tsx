import { useState } from "react";
import { useMutationObserver } from "./useMutationObserver";

export function useMeta(name: string, global: Window = window) {
  const [content, setContent] = useState(() => readMeta(global.document, name));

  useMutationObserver({
    targetNode: global.document.body,
    config: {
      subtree: true,
      childList: true,
    },
    callback: (mutations) => {
      if (isAnyMutationRelated(mutations, name)) {
        const newContent = readMeta(global.document, name);
        setContent(newContent);
      }
    },
  });

  return content;
}

function isAnyMutationRelated(mutations: MutationRecord[], name: string) {
  for (const mutation of mutations) {
    for (const nodeList of [mutation.addedNodes, mutation.removedNodes]) {
      for (let index = 0; index < nodeList.length; index++) {
        const node = nodeList[index];
        // TODO: confirm if it works when meta is the only added element
        if ("querySelector" in node && readMeta(node as ParentNode, name)) {
          return true;
        }
      }
    }
    return false;
  }
}

function readMeta(node: ParentNode, name: string): string | null {
  return (
    node.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content || null
  );
}
