"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { getAffiliateUrl } from "@/lib/affiliate";

/** Sticky bottom CTA (all screen sizes) for the page's lead product. */
export function StickyAffiliateBar({
  productSlug,
  productName,
  amazonAsin,
  amazonQuery,
  label,
  placement = "sticky",
  showAfterId,
}: {
  productSlug: string;
  productName: string;
  amazonAsin?: string;
  amazonQuery?: string;
  label?: string;
  placement?: string;
  /** Keep the bar hidden until the reader has scrolled past this element (e.g. Quick picks). */
  showAfterId?: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [pastAnchor, setPastAnchor] = useState(!showAfterId);
  const [footerInView, setFooterInView] = useState(false);

  // Reserve space at the bottom of the page so the fixed bar never covers the footer.
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const prev = document.body.style.paddingBottom;
    const apply = () => {
      document.body.style.paddingBottom = `calc(${el.offsetHeight}px + env(safe-area-inset-bottom, 0px))`;
    };
    apply();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(apply) : null;
    ro?.observe(el);
    return () => {
      ro?.disconnect();
      document.body.style.paddingBottom = prev;
    };
  }, []);

  // Hide while the footer (commission line) is on screen; show only after the anchor is passed.
  useEffect(() => {
    const footer = document.querySelector("footer");
    const anchorEl = showAfterId ? document.getElementById(showAfterId) : null;
    const anchor = anchorEl ? (anchorEl.closest("section") ?? anchorEl) : null;
    if (showAfterId && !anchor) setPastAnchor(true);
    const onScroll = () => {
      if (anchor) setPastAnchor(anchor.getBoundingClientRect().bottom < 0);
      if (footer) setFooterInView(footer.getBoundingClientRect().top < window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [showAfterId]);

  const visible = pastAnchor && !footerInView;

  const href = getAffiliateUrl({
    slug: productSlug,
    amazonAsin,
    amazonQuery,
  });

  return (
    <>
    <div ref={barRef} aria-hidden={!visible} className={`fixed inset-x-0 bottom-[env(safe-area-inset-bottom,0px)] z-40 m-0 border-t-2 border-[#9a3f12]/30 bg-white/95 p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md transition-[translate,transform,visibility] duration-200 ${visible ? "translate-y-0" : "pointer-events-none invisible translate-y-[calc(100%+env(safe-area-inset-bottom,0px))]"}`} data-sticky-cta>
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="min-w-0 flex-1">
          {label && <p className="text-[11px] font-bold uppercase tracking-wider text-[#9a3f12]">{label}</p>}
          <p className="truncate text-sm font-medium text-stone-900">{productName}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          aria-label={`Check price on Amazon: ${productName}`}
          className="shrink-0 rounded-full bg-[#9a3f12] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#7c320e]"
          onClick={() =>
            track("amazon_outbound_click", {
              product_slug: productSlug,
              asin: amazonAsin ?? "",
              product_name: productName,
              placement,
            })
          }
        >
          Check price on Amazon
        </a>
      </div>
    </div>
      </>
  );
}
