"use client";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowUpRight, Search, X, Code2 } from "lucide-react";
import {
  Paper,
  categories,
  categoryName,
  countBy,
  filterPapers,
  number,
} from "@/lib/catalog";
import { FilteredAgentTools } from "./filtered-agent-tools";
import { SITE_URL } from "@/lib/site";
import { ResourceLink } from "./resource-link";
import { ResearchFilters } from "./research-filters";
import {
  institutionType,
  institutionTypes,
  InstitutionType,
  typeLabel,
} from "@/lib/institutions";
const PAGE_SIZE = 18;
export function Explorer({ papers }: { papers: Paper[] }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const query = params.get("q") || "";
  const selectedAreas = [...new Set(params.getAll("category"))];
  const selectedInstitutions = [...new Set(params.getAll("institution"))];
  const code = params.get("code") === "1";
  const orgTypes = [...new Set(params.getAll("orgtype"))].filter((value) =>
    institutionTypes.some((t) => t.id === value),
  );
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [sort, setSort] = useState("title");
  const [resetVersion, setResetVersion] = useState(0);
  const resetButton = useRef<HTMLButtonElement>(null);
  const counts = useMemo(() => countBy(papers, "category"), [papers]);
  const contextualPapers = useMemo(
    () => filterPapers(papers, { q: query, category: selectedAreas, code }),
    [papers, query, selectedAreas.join("|"), code],
  );
  const institutions = useMemo(
    () =>
      countBy(contextualPapers, "institutions").filter(
        (i) => !orgTypes.length || orgTypes.includes(institutionType(i.name)),
      ),
    [contextualPapers, orgTypes.join("|")],
  );
  const typeCounts = useMemo(
    () =>
      Object.fromEntries(
        institutionTypes.map((t) => [
          t.id,
          contextualPapers.filter((p) =>
            p.institutions.some((n) => institutionType(n) === t.id),
          ).length,
        ]),
      ),
    [contextualPapers],
  );
  const results = useMemo(() => {
    const rows = filterPapers(papers, {
      q: query,
      category: selectedAreas,
      institution: selectedInstitutions,
      code,
      orgtype: orgTypes,
    });
    return sort === "updated"
      ? [...rows].sort(
          (a, b) =>
            b.updated.localeCompare(a.updated) ||
            a.title.localeCompare(b.title),
        )
      : rows;
  }, [
    papers,
    query,
    selectedAreas.join("|"),
    selectedInstitutions.join("|"),
    code,
    sort,
    orgTypes.join("|"),
  ]);
  function update(key: string, value: string) {
    const next = new URLSearchParams(window.location.search);
    if (["category", "institution", "orgtype"].includes(key)) {
      const current = next.getAll(key);
      next.delete(key);
      if (value)
        for (const item of current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value])
          next.append(key, item);
    } else {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    setVisible(PAGE_SIZE);
    window.history.replaceState(
      null,
      "",
      `${pathname}${next.size ? `?${next.toString()}` : ""}#explore`,
    );
  }
  function reset() {
    setVisible(PAGE_SIZE);
    const next = new URLSearchParams(window.location.search);
    for (const key of ["q", "category", "institution", "orgtype", "code"])
      next.delete(key);
    setResetVersion((version) => version + 1);
    window.history.replaceState(
      null,
      "",
      `${pathname}${next.size ? `?${next.toString()}` : ""}#explore`,
    );
    resetButton.current?.focus({ preventScroll: true });
  }
  function removeFilter(key: string, value: string, button: HTMLButtonElement) {
    const next = button.nextElementSibling;
    const previous = button.previousElementSibling;
    update(key, value);
    requestAnimationFrame(() => {
      const target =
        next instanceof HTMLButtonElement && next.isConnected
          ? next
          : previous instanceof HTMLButtonElement && previous.isConnected
            ? previous
            : resetButton.current;
      target?.focus({ preventScroll: true });
    });
  }
  return (
    <section
      className="explore wrap"
      id="explore"
      data-categories={selectedAreas.join("|")}
      data-institutions={selectedInstitutions.join("|")}
      data-orgtypes={orgTypes.join("|")}
    >
      <div className="section-heading">
        <div>
          <div className="eyebrow">THE COLLECTION</div>
          <h2>{selectedAreas.length === 1 ? categoryName(selectedAreas[0]) : "A starting point for your next idea."}</h2>
        </div>
        <span className="collection-label">READ. CONNECT. BUILD.</span>
      </div>
      <div className="explorer-layout">
        <ResearchFilters
          counts={counts}
          total={papers.length}
          selectedAreas={selectedAreas}
          institutions={institutions}
          selectedInstitutions={selectedInstitutions}
          orgTypes={orgTypes}
          typeCounts={typeCounts}
          onUpdate={update}
          resetVersion={resetVersion}
        />
        <div className="results-panel">
          <form
            className="search-box"
            onSubmit={(e) => {
              e.preventDefault();
              update("q", String(new FormData(e.currentTarget).get("q") || ""));
            }}
          >
            <Search size={20} />
            <input
              key={`${query}:${resetVersion}`}
              name="q"
              type="search"
              aria-label="Search papers"
              placeholder="Search papers, authors, or ideas…"
              defaultValue={query}
            />
            <button type="submit">
              Search <ArrowRight size={15} />
            </button>
          </form>
          <div className="filter-toolbar">
            <label className="code-toggle">
              <input
                type="checkbox"
                checked={code}
                onChange={(e) => update("code", e.target.checked ? "1" : "")}
              />
              <Code2 size={15} /> Has code or resource links
            </label>
            <Link prefetch={false} href="/institutions/" className="text-link">
              Browse institutions <ArrowUpRight size={13} />
            </Link>
          </div>
          {(query ||
            selectedAreas.length > 0 ||
            selectedInstitutions.length > 0 ||
            code ||
            orgTypes.length > 0) && (
            <div className="active-filters">
              {query && (
                <button
                  aria-label={`Remove search: ${query}`}
                  onClick={(e) => removeFilter("q", "", e.currentTarget)}
                >
                  “{query}” <X size={12} />
                </button>
              )}
              {selectedAreas.map((value) => (
                <button
                  key={value}
                  aria-label={`Remove research area: ${categoryName(value)}`}
                  onClick={(e) =>
                    removeFilter("category", value, e.currentTarget)
                  }
                >
                  {categoryName(value)} <X size={12} />
                </button>
              ))}
              {orgTypes.map((value) => (
                <button
                  key={value}
                  aria-label={`Remove organization type: ${typeLabel(value as InstitutionType)}`}
                  onClick={(e) =>
                    removeFilter("orgtype", value, e.currentTarget)
                  }
                >
                  {typeLabel(value as InstitutionType)} <X size={12} />
                </button>
              ))}
              {selectedInstitutions.map((value) => (
                <button
                  key={value}
                  aria-label={`Remove institution: ${value}`}
                  onClick={(e) =>
                    removeFilter("institution", value, e.currentTarget)
                  }
                >
                  {value} <X size={12} />
                </button>
              ))}
              {code && (
                <button
                  aria-label="Remove code or resource links filter"
                  onClick={(e) => removeFilter("code", "", e.currentTarget)}
                >
                  Code or resource links <X size={12} />
                </button>
              )}
            </div>
          )}

          <div
            className="results-meta"
            style={{ flexWrap: "wrap", gap: "12px" }}
          >
            <span aria-live="polite" aria-atomic="true">
              <strong>{number(results.length)}</strong>{" "}
              {results.length === 1 ? "paper" : "papers"}
              {query ? " matching your search" : ""}
            </span>
            <button
              ref={resetButton}
              type="button"
              className="text-link clear-filters"
              onClick={reset}
              style={{ border: 0, padding: "8px 0", minHeight: 44 }}
            >
              Reset all filters
            </button>
            <label>
              Sort by{" "}
              <select
                aria-label="Sort papers"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setVisible(PAGE_SIZE);
                }}
              >
                <option value="title">Title A–Z</option>
                <option value="updated">Recently updated</option>
              </select>
            </label>
          </div>
          <FilteredAgentTools
            papers={results}
            selection={{
              query,
              categories: selectedAreas,
              institutions: selectedInstitutions,
              organizationTypes: orgTypes,
              hasResources: code,
            }}
            canonicalUrl={`${SITE_URL}/?${params.toString()}#explore`}
          />
          <div className="paper-list">
            {results.slice(0, visible).map((p, index) => (
              <article className="paper-card" key={p.id}>
                <span className="paper-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="paper-card-content">
                  <div className="paper-topline">
                    <Link
                      prefetch={false}
                      href={`/?category=${p.category}#explore`}
                      className="category-tag"
                    >
                      {categoryName(p.category)}
                    </Link>
                  </div>
                  <h3>
                    <Link prefetch={false} href={`/papers/${p.id}/`}>
                      {p.title}
                      <ArrowUpRight size={18} />
                    </Link>
                  </h3>
                  <p className="paper-authors">
                    {p.authors.slice(0, 3).join(", ")}
                    {p.authors.length > 3 ? " et al." : ""}
                  </p>
                  <p className="paper-summary">
                    {p.summary ||
                      "Open this paper to read its research digest."}
                  </p>
                  <div className="paper-card-actions">
                    <Link
                      prefetch={false}
                      href={`/papers/${p.id}/`}
                      className="digest-action"
                    >
                      Read digest <ArrowRight size={14} />
                    </Link>
                    {p.code && <ResourceLink url={p.code} title={p.title} />}
                  </div>
                  <div className="paper-bottom">
                    <span>
                      {p.institutions.slice(0, 2).join(" · ") ||
                        "Institution not listed"}
                      {p.institutions.length > 2
                        ? ` +${p.institutions.length - 2}`
                        : ""}
                    </span>
                    <span
                      className={`confidence ${p.confidence === "abstract-only" ? "abstract" : ""}`}
                    >
                      <span />
                      {p.confidence === "full-paper"
                        ? "Full-paper digest"
                        : "Abstract-only"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!results.length && (
            <div className="empty-state">
              <Search size={30} />
              <h3>No papers found.</h3>
              <p>
                Try a broader term or remove a category or institution filter.
              </p>
              <button className="primary-button" onClick={reset}>
                Reset all filters <ArrowRight size={15} />
              </button>
            </div>
          )}
          {visible < results.length && (
            <div className="load-more">
              <span>
                Showing {Math.min(visible, results.length)} of{" "}
                {number(results.length)} papers
              </span>
              <button onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Load more papers <ArrowDownIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
function ArrowDownIcon() {
  return <span aria-hidden="true">↓</span>;
}
