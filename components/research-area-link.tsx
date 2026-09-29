"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export const RESEARCH_AREA_NAVIGATION = "wiki:research-area-navigation";

/** Keep ordinary links/new tabs working; same-page navigation waits for the filter UI. */
export function ResearchAreaLink({ category, label, children }: {
  category: string;
  label: string;
  children: ReactNode;
}) {
  const href = `/?category=${encodeURIComponent(category)}#research-areas`;
  return <Link
    prefetch={false}
    href={href}
    title={label}
    aria-label={`Filter papers by research area: ${label}`}
    className="corpus-band"
    onNavigate={(event) => {
      event.preventDefault();
      window.history.pushState(null, "", href);
      window.dispatchEvent(new CustomEvent(RESEARCH_AREA_NAVIGATION, { detail: category }));
    }}
  >{children}</Link>;
}
