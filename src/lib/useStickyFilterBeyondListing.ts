import { useEffect, useRef, useState, type CSSProperties } from "react";

type ElementRef<T extends HTMLElement> = { current: T | null };

/** Keeps the desktop listing filter docked after its grid ends, through the newsletter. */
export function useStickyFilterBeyondListing(
  panelRef: ElementRef<HTMLElement>,
  columnRef: ElementRef<HTMLElement>,
  listingRef: ElementRef<HTMLElement>,
  resumeKey?: number,
) {
  const [dockStyle, setDockStyle] = useState<CSSProperties>();
  const panelHeightRef = useRef(0);
  const resumeKeyRef = useRef(resumeKey);
  const newsletterSuppressedRef = useRef(false);
  const waitForNewsletterExitRef = useRef(false);

  useEffect(() => {
    const resuming = resumeKeyRef.current !== resumeKey;
    resumeKeyRef.current = resumeKey;
    if (resuming) {
      newsletterSuppressedRef.current = false;
      const newsletterTop = document.querySelector<HTMLElement>("[data-newsletter-signup]")?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      // If the user clicked “Ver mais” while the newsletter was still on
      // screen, wait for the newly appended cards to push it out of view
      // before arming the next hide-on-newsletter pass.
      waitForNewsletterExitRef.current = newsletterTop < window.innerHeight;
    }
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const panel = panelRef.current;
        const column = columnRef.current;
        const listing = listingRef.current;
        if (!panel || !column || !listing || !window.matchMedia("(min-width: 1024px)").matches) {
          setDockStyle(undefined);
          return;
        }

        const header = document.querySelector<HTMLElement>("header");
        // Use the header's actual height rather than its viewport bottom. The
        // latter can briefly be zero during sticky-position transitions and
        // would make the filter jump under the browser's top edge.
        const top = (header?.getBoundingClientRect().height ?? 0) + 12;
        const panelRect = panel.getBoundingClientRect();
        if (panelRect.height > 0) panelHeightRef.current = panelRect.height;
        const panelHeight = panelRect.height || panelHeightRef.current;
        const columnRect = column.getBoundingClientRect();
        const listingRect = listing.getBoundingClientRect();
        const newsletter = document.querySelector<HTMLElement>("[data-newsletter-signup]");
        const newsletterTop = newsletter?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
        if (waitForNewsletterExitRef.current && newsletterTop >= window.innerHeight) {
          waitForNewsletterExitRef.current = false;
        }
        if (!waitForNewsletterExitRef.current && newsletterTop < window.innerHeight) {
          newsletterSuppressedRef.current = true;
        }
        const pastListingEnd = listingRect.top < top
          && listingRect.bottom <= top + panelHeight;

        if (!pastListingEnd) {
          setDockStyle(undefined);
          return;
        }

        const next: CSSProperties = {
          position: "fixed",
          top,
          left: columnRect.left,
          width: columnRect.width,
          maxHeight: `calc(100svh - ${top}px - 12px)`,
          overflowY: "auto",
          // The header uses z-80. Keep the dock below it so the panel can
          // never cover the navigation while later sections pass underneath.
          zIndex: 50,
          // Once the newsletter enters the viewport, keep the filter hidden
          // until the user requests more listings (resumeKey changes).
          visibility: newsletterSuppressedRef.current ? "hidden" : "visible",
        };
        setDockStyle((current) => current
          && current.top === next.top
          && current.left === next.left
          && current.width === next.width
          && current.maxHeight === next.maxHeight
          && current.visibility === next.visibility
          ? current
          : next);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    if (listingRef.current) observer.observe(listingRef.current);
    if (panelRef.current) observer.observe(panelRef.current);
    const newsletter = document.querySelector<HTMLElement>("[data-newsletter-signup]");
    if (newsletter) observer.observe(newsletter);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [columnRef, listingRef, panelRef, resumeKey]);

  return dockStyle;
}
