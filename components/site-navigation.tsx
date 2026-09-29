"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const destinations = [
  { href: "/#explore", label: "Papers", matches: (path: string) => path === "/" || path.startsWith("/papers/") },
  { href: "/categories/", label: "Categories", matches: (path: string) => path.startsWith("/categories") },
  { href: "/institutions/", label: "Institutions", matches: (path: string) => path.startsWith("/institutions") },
  { href: "/about/", label: "About", matches: (path: string) => path.startsWith("/about") },
];

export function SiteNavigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation">
      {destinations.map(({ href, label, matches }) => (
        <Link key={href} prefetch={false} href={href} aria-current={matches(pathname) ? "location" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
