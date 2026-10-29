import { createPortal } from "react-dom";
import type { ReactNode } from "react";

/** Move a docked desktop filter out of the clipped page content layer. */
export function FilterPanelPortal({ docked, children }: { docked: boolean; children: ReactNode }) {
  if (!docked || typeof document === "undefined") return children;
  return createPortal(children, document.body);
}
