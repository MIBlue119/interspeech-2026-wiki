"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { categories, number } from "@/lib/catalog";
import { institutionTypes } from "@/lib/institutions";
import { InstitutionPicker } from "./institution-picker";
import { RESEARCH_AREA_NAVIGATION } from "./research-area-link";
type Count = { name: string; count: number };
export function ResearchFilters({
  counts,
  total,
  selectedAreas,
  institutions,
  selectedInstitutions,
  orgTypes,
  typeCounts,
  onUpdate,
  resetVersion,
}: {
  counts: Count[];
  total: number;
  selectedAreas: string[];
  institutions: Count[];
  selectedInstitutions: string[];
  orgTypes: string[];
  typeCounts: Record<string, number>;
  onUpdate: (key: string, value: string) => void;
  resetVersion: number;
}) {
  const [allAreas, setAllAreas] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const group = useRef<HTMLDivElement>(null);
  const [navigation, setNavigation] = useState<{ category: string } | null>(null);
  const handledNavigation = useRef<typeof navigation>(null);
  useEffect(() => {
    function navigate(event: Event) {
      const category = (event as CustomEvent<unknown>).detail;
      if (typeof category === "string" && Object.hasOwn(categories, category)) {
        setNavigation({ category });
      }
    }
    window.addEventListener(RESEARCH_AREA_NAVIGATION, navigate);
    // A copied link or new tab should also reveal the selected mobile chip.
    if (window.location.hash === "#research-areas") {
      const category = new URLSearchParams(window.location.search).get("category");
      if (category && Object.hasOwn(categories, category)) setNavigation({ category });
    }
    return () => window.removeEventListener(RESEARCH_AREA_NAVIGATION, navigate);
  }, []);
  useEffect(() => {
    if (!navigation || navigation === handledNavigation.current || !selectedAreas.includes(navigation.category)) return;
    const target = group.current?.querySelector<HTMLButtonElement>(`[data-research-area="${navigation.category}"]`);
    if (!target || !group.current) return;
    handledNavigation.current = navigation;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reducedMotion ? "instant" : "smooth";
    target.focus({ preventScroll: true });
    // Reveal the chosen chip inside the mobile horizontal list independently
    // of the page scroll, keeping the RESEARCH AREAS heading in view.
    const options = target.parentElement!;
    options.scrollTo({ left: options.scrollLeft + target.getBoundingClientRect().left - options.getBoundingClientRect().left - (options.clientWidth - target.offsetWidth) / 2, behavior });
    group.current.scrollIntoView({ block: "start", behavior });
    const attention = !reducedMotion ? target.animate([
      { boxShadow: "0 0 0 0px #55726000" },
      { boxShadow: "0 0 0 4px #55726055", offset: 0.3 },
      { boxShadow: "0 0 0 0px #55726000" },
    ], { duration: 2200, easing: "ease-out" }) : undefined;
    return () => attention?.cancel();
  }, [navigation, selectedAreas.join("|")]);
  const visibleAreas = allAreas
    ? counts
    : counts.filter((c, i) => i < 6 || selectedAreas.includes(c.name));
  return (
    <aside className="filter-sidebar" aria-label="Research filters">
      <div className="research-area-group" id="research-areas" ref={group} role="group" aria-labelledby="research-area-heading">
        <div className="filter-title" id="research-area-heading">
          <SlidersHorizontal size={15} /> RESEARCH AREAS
        </div>
        <button
          type="button"
          className="clear-group"
          aria-disabled={!selectedAreas.length}
          onClick={() => {
            if (selectedAreas.length) onUpdate("category", "");
          }}
        >
          Clear research areas
        </button>
        <div className="research-area-options">
          <button
            className={`category-filter ${!selectedAreas.length ? "active" : ""}`}
            aria-pressed={!selectedAreas.length}
            onClick={() => onUpdate("category", "")}
          >
            <span>All research areas</span>
            <span>{number(total)}</span>
          </button>
          {visibleAreas.map((c) => (
            <button
              key={c.name}
              data-research-area={c.name}
              aria-label={`${categories[c.name]?.name || c.name}, ${c.count} papers`}
              className={`category-filter ${selectedAreas.includes(c.name) ? "active" : ""}`}
              aria-pressed={selectedAreas.includes(c.name)}
              onClick={() => onUpdate("category", c.name)}
            >
              <span className="filter-check" aria-hidden="true">
                {selectedAreas.includes(c.name) ? "✓" : ""}
              </span>
              <span>{categories[c.name]?.short || c.name}</span>
              <span>{c.count}</span>
            </button>
          ))}
          <button
            className="more-areas"
            aria-expanded={allAreas}
            onClick={() => setAllAreas((v) => !v)}
          >
            {allAreas
              ? "Show fewer areas"
              : `All ${counts.length} research areas`}
            <ChevronDown
              size={13}
              style={{ transform: allAreas ? "rotate(180deg)" : undefined }}
            />
          </button>
        </div>
        <Link
          prefetch={false}
          className="text-link stats-link"
          href="/categories/"
        >
          Category statistics <ArrowUpRight size={13} />
        </Link>
      </div>
      <div className="institution-filter-group">
        <div className="filter-title institution-desktop-title">
          <Building2 size={15} /> INSTITUTIONS
        </div>
        <button
          className="mobile-institution-toggle"
          aria-expanded={mobileOpen}
          aria-controls="institution-filter-panel"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Building2 size={16} />
          <span>
            Institutions
            {selectedInstitutions.length || orgTypes.length
              ? ` · ${selectedInstitutions.length + orgTypes.length} active`
              : ""}
          </span>
          <ChevronDown size={15} />
        </button>
        <div
          id="institution-filter-panel"
          className={`institution-filter-panel ${mobileOpen ? "is-open" : ""}`}
        >
          <div className="filter-title">ORGANIZATION TYPES</div>
          <button
            className="clear-group"
            type="button"
            aria-disabled={!orgTypes.length}
            onClick={() => {
              if (orgTypes.length) onUpdate("orgtype", "");
            }}
          >
            Clear organization types
          </button>
          <div
            className="organization-types"
            role="group"
            aria-label="Filter papers by organization type"
          >
            {institutionTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={orgTypes.includes(t.id)}
                onClick={() => onUpdate("orgtype", t.id)}
              >
                <span className="filter-check" aria-hidden="true">
                  {orgTypes.includes(t.id) ? "✓" : ""}
                </span>
                <span>{t.plural}</span>
                <span className="type-paper-count">
                  {typeCounts[t.id] || 0}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="clear-group"
            aria-disabled={!selectedInstitutions.length}
            onClick={() => {
              if (selectedInstitutions.length) onUpdate("institution", "");
            }}
          >
            Clear institutions
          </button>
          <InstitutionPicker
            resetVersion={resetVersion}
            institutions={institutions}
            selected={selectedInstitutions}
            onToggle={(name) => onUpdate("institution", name)}
            onClear={() => onUpdate("institution", "")}
          />
          <Link
            prefetch={false}
            className="text-link directory-link"
            href="/institutions/"
          >
            Explore the full directory <ArrowUpRight size={13} />
          </Link>
          <p className="institution-filter-hint">
            Selections update results immediately. Choose any matching option
            within each group. Types are AI-assisted by TypeSafe; uncertain
            names remain unclassified.
          </p>
        </div>
      </div>
    </aside>
  );
}
