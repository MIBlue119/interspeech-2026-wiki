"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { number } from "@/lib/catalog";
import {
  institutionType,
  institutionTypes,
  matchesInstitution,
  typeLabel,
} from "@/lib/institutions";
import { InstitutionLogo } from "./institution-logo";
type Institution = {
  name: string;
  count: number;
  resources: number;
  logo?: string;
  focus: string[];
};
export function InstitutionDirectory({
  institutions,
}: {
  institutions: Institution[];
}) {
  const [kind, setKind] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("count");
  const [limit, setLimit] = useState(48);
  const rows = useMemo(
    () =>
      institutions
        .filter(
          (i) =>
            (!kind || institutionType(i.name) === kind) &&
            matchesInstitution(i.name, query),
        )
        .sort((a, b) =>
          sort === "name"
            ? a.name.localeCompare(b.name)
            : b.count - a.count || a.name.localeCompare(b.name),
        ),
    [institutions, query, sort, kind],
  );
  return (
    <>
      <div className="directory-toolbar">
        <label className="search-box">
          <Search size={19} />
          <span className="sr-only">Search institutions</span>
          <input
            placeholder="Find a university, company, or lab…"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(48);
            }}
          />
        </label>
        <select
          aria-label="Sort institutions"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="count">Most papers</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
      <div
        className="directory-type-tabs"
        role="group"
        aria-label="Filter institutions by type"
      >
        <button
          aria-pressed={!kind}
          onClick={() => {
            setKind("");
            setLimit(48);
          }}
        >
          All institutions
        </button>
        {institutionTypes.map((t) => (
          <button
            key={t.id}
            aria-pressed={kind === t.id}
            onClick={() => {
              setKind(t.id);
              setLimit(48);
            }}
          >
            {t.plural}{" "}
            <span>
              {
                institutions.filter((i) => institutionType(i.name) === t.id)
                  .length
              }
            </span>
          </button>
        ))}
      </div>
      <p className="directory-count" aria-live="polite">
        {number(rows.length)}{" "}
        {rows.length === 1 ? "institution" : "institutions"}
      </p>
      <div className="institution-grid">
        {rows.slice(0, limit).map((i) => (
          <Link prefetch={false}
            key={i.name}
            className="institution-card"
            href={`/?institution=${encodeURIComponent(i.name)}#explore`}
          >
            <div className="institution-card-top">
              <InstitutionLogo name={i.name} src={i.logo} />
              <span className="institution-type-label">
                {typeLabel(institutionType(i.name))}
              </span>
              <ArrowUpRight size={18} />
            </div>
            <h2>{i.name}</h2>
            <p className="institution-focus">{i.focus.join(" · ")}</p>
            <div className="institution-metrics">
              <strong>
                {i.count} <span>{i.count === 1 ? "paper" : "papers"}</span>
              </strong>
              <span>{i.resources} with resources</span>
            </div>
          </Link>
        ))}
      </div>
      {!rows.length && (
        <div className="empty-state">
          <h2>No matching institutions.</h2>
          <p>Try a shorter name or a different spelling.</p>
          <button
            onClick={() => {
              setQuery("");
              setKind("");
            }}
          >
            Clear search
          </button>
        </div>
      )}
      {rows.length > limit && (
        <div className="load-more">
          <span>
            Showing {limit} of {number(rows.length)}
          </span>
          <button onClick={() => setLimit((l) => l + 48)}>
            Show more institutions ↓
          </button>
        </div>
      )}
    </>
  );
}
