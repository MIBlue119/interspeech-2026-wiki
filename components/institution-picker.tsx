"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Building2, Check, ChevronDown, Search, X } from "lucide-react";
import {
  institutionLogo,
  institutionType,
  institutionTypes,
  matchesInstitution,
  popularInstitutions,
  typeLabel,
} from "@/lib/institutions";
import { InstitutionLogo } from "./institution-logo";
type Option = { name: string; count: number };
export function InstitutionPicker({
  institutions,
  selected,
  onToggle,
  onClear,
  resetVersion = 0,
}: {
  institutions: Option[];
  selected: string[];
  onToggle: (name: string) => void;
  onClear: () => void;
  resetVersion?: number;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("");
  const [active, setActive] = useState(-1);
  const [limit, setLimit] = useState(60);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const id = useId();
  const results = useMemo(
    () =>
      institutions
        .filter(
          (i) =>
            (!kind || institutionType(i.name) === kind) &&
            matchesInstitution(i.name, query),
        )
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    [institutions, kind, query],
  );
  useEffect(() => {
    setOpen(false);
    setQuery("");
    setKind("");
    setActive(-1);
    setLimit(60);
  }, [resetVersion]);
  useEffect(() => {
    setActive(-1);
    setLimit(60);
  }, [institutions]);
  const shown = results.slice(0, limit);
  const countMap = new Map(institutions.map((i) => [i.name, i.count]));
  useEffect(() => {
    if (!open) return;
    search.current?.focus();
    function outside(e: PointerEvent) {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  useEffect(() => {
    if (active >= 0)
      document
        .getElementById(`${id}-option-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [active, id]);
  function choose(name: string) {
    onToggle(name);
    search.current?.focus();
  }
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <div
      className="institution-picker"
      ref={root}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null))
          setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          close();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={`institution-picker-trigger ${selected.length ? "selected" : ""}`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
      >
        {selected.length === 1 ? (
          <InstitutionLogo
            name={selected[0]}
            src={institutionLogo(selected[0])}
          />
        ) : (
          <Building2 size={17} />
        )}
        <span>
          {selected.length === 1
            ? selected[0]
            : selected.length
              ? `${selected.length} institutions selected`
              : "Find institutions"}
        </span>
        <ChevronDown size={15} />
      </button>
      {open && (
        <div
          className="institution-popover"
          id={`${id}-panel`}
          role="dialog"
          aria-label="Choose an institution"
        >
          <div className="picker-heading">
            <strong>Find your research community</strong>
            <button
              type="button"
              onClick={close}
              aria-label="Close institution picker"
            >
              <X size={16} />
            </button>
          </div>
          <label className="picker-search">
            <Search size={17} />
            <span className="sr-only">
              Search institutions by name or abbreviation
            </span>
            <input
              ref={search}
              placeholder="Search institutions, e.g. CMU or NVIDIA"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(-1);
                setLimit(60);
              }}
              role="combobox"
              aria-expanded="true"
              aria-autocomplete="list"
              aria-controls={`${id}-list`}
              aria-activedescendant={
                active >= 0 && shown[active]
                  ? `${id}-option-${active}`
                  : undefined
              }
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((n) => Math.min(n + 1, shown.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((n) => (shown.length ? Math.max(n - 1, 0) : -1));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  if (active >= 0 && shown[active]) choose(shown[active].name);
                  else if (shown.length === 1) choose(shown[0].name);
                }
              }}
            />
          </label>
          <div
            className="picker-type-tabs"
            role="group"
            aria-label="Institution type"
          >
            <button
              type="button"
              aria-pressed={!kind}
              onClick={() => {
                setKind("");
                setActive(-1);
                setLimit(60);
              }}
            >
              All
            </button>
            {institutionTypes.map((t) => (
              <button
                type="button"
                key={t.id}
                aria-pressed={kind === t.id}
                onClick={() => {
                  setKind(t.id);
                  setActive(-1);
                  setLimit(60);
                }}
              >
                {t.plural}
              </button>
            ))}
          </div>
          <div className="picker-results-summary">
            <span>{results.length} matching institutions</span>
            <button
              type="button"
              aria-disabled={!selected.length}
              onClick={() => {
                if (selected.length) onClear();
              }}
            >
              Clear institutions
            </button>
          </div>
          <div
            className="picker-options"
            id={`${id}-list`}
            role="listbox"
            aria-multiselectable="true"
            aria-label="Institutions"
          >
            {shown.map((i, index) => (
              <button
                type="button"
                role="option"
                tabIndex={-1}
                id={`${id}-option-${index}`}
                key={i.name}
                aria-selected={selected.includes(i.name)}
                className={active === index ? "keyboard-active" : ""}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i.name)}
              >
                <InstitutionLogo name={i.name} src={institutionLogo(i.name)} />
                <span className="picker-option-name">
                  <strong>{i.name}</strong>
                  <small>{typeLabel(institutionType(i.name))}</small>
                </span>
                <span className="picker-option-count">{i.count}</span>
                <span
                  className={`picker-selection-check ${selected.includes(i.name) ? "checked" : ""}`}
                  aria-hidden="true"
                >
                  {selected.includes(i.name) && <Check size={12} />}
                </span>
              </button>
            ))}
          </div>
          {!results.length && (
            <div className="picker-empty">
              No institutions match these filters. Try another name or
              organization type.
            </div>
          )}
          {results.length > limit && (
            <button
              type="button"
              className="picker-more"
              onClick={() => setLimit((n) => n + 100)}
            >
              Show more ({results.length - limit} remaining)
            </button>
          )}
          <div className="picker-footer">
            <span>{selected.length} selected · match any</span>
            <button type="button" onClick={close}>
              Done <Check size={13} />
            </button>
          </div>
          <p className="picker-note">
            Selections update results immediately. Done closes this picker.
            Paper counts reflect your current search and research filters.
          </p>
        </div>
      )}
      <div className="popular-institutions">
        <span className="popular-label">QUICK PICKS</span>
        {popularInstitutions.map((p) => (
          <button
            type="button"
            key={p.name}
            className={selected.includes(p.name) ? "active" : ""}
            disabled={!countMap.has(p.name) && !selected.includes(p.name)}
            aria-pressed={selected.includes(p.name)}
            title={
              countMap.has(p.name)
                ? `${p.name} · ${countMap.get(p.name)} papers`
                : `${p.name} · No papers match the current filters`
            }
            onClick={() => onToggle(p.name)}
          >
            <InstitutionLogo name={p.name} src={institutionLogo(p.name)} />
            <span>{p.short}</span>
            {selected.includes(p.name) && <Check size={11} />}
          </button>
        ))}
      </div>
    </div>
  );
}
