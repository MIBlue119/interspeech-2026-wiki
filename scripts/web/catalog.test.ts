import test from "node:test";
import assert from "node:assert/strict";
import { getPapers, getContent } from "../../lib/papers";
import {
  categories,
  countBy,
  filterPapers,
  safeUrl,
  wikiHref,
} from "../../lib/catalog";

const papers = getPapers();
test("every paper has a unique identifier, a digest and a known primary category", () => {
  assert.ok(papers.length > 1300);
  assert.equal(new Set(papers.map((p) => p.id)).size, papers.length);
  for (const paper of papers) {
    assert.ok(categories[paper.category], `${paper.id}: unknown category`);
    assert.ok(paper.summary, `${paper.id}: missing summary`);
    assert.ok(getContent(paper.id).length > 100, `${paper.id}: missing digest`);
    assert.ok(["abstract-only", "full-paper"].includes(paper.confidence));
  }
  assert.equal(
    countBy(papers, "category").reduce((n, c) => n + c.count, 0),
    papers.length,
  );
});
test("combined search, institution, category and resource filters intersect correctly", () => {
  const selected = papers.find((p) => p.code && p.institutions.length)!;
  const matches = filterPapers(papers, {
    q: selected.title,
    category: selected.category,
    institution: selected.institutions[0],
    code: true,
  });
  assert.ok(matches.some((p) => p.id === selected.id));
  assert.ok(
    matches.every(
      (p) =>
        p.code &&
        p.category === selected.category &&
        p.institutions.includes(selected.institutions[0]),
    ),
  );
  assert.equal(
    filterPapers(papers, { q: "zzzz-no-such-paper-987654321" }).length,
    0,
  );
  assert.equal(filterPapers(papers, { q: "   " }).length, papers.length);
  assert.ok(
    filterPapers(papers, { q: "DIAMOE" }).some(
      (p) => p.id === "chen26z_interspeech",
    ),
  );
});
test("all related paper Markdown links resolve to existing local pages", () => {
  const ids = new Set(papers.map((p) => p.id));
  for (const paper of papers) {
    for (const match of getContent(paper.id).matchAll(
      /\]\(([^\s)]+\.md(?:#[^\s)]*)?)\)/g,
    )) {
      const href = wikiHref(match[1]);
      if (href.startsWith("/papers/"))
        assert.ok(
          ids.has(href.split("/")[2]),
          `${paper.id}: broken related link ${href}`,
        );
    }
  }
});
test("unsafe resource URLs cannot become links", () => {
  assert.equal(safeUrl("javascript:alert(1)"), "");
  assert.equal(safeUrl("data:text/html,hello"), "");
  assert.equal(safeUrl(""), "");
  assert.equal(
    safeUrl("https://github.com/example/repo"),
    "https://github.com/example/repo",
  );
  assert.equal(
    wikiHref("chen26z_interspeech.md"),
    "/papers/chen26z_interspeech/",
  );
  assert.equal(
    wikiHref("chen26z_interspeech.md#results"),
    "/papers/chen26z_interspeech/#results",
  );
});

test("multi-select uses OR within categories and institutions, AND between facets", () => {
  const areas = ["asr", "tts"];
  const institutions = ["Carnegie Mellon University", "NVIDIA"];
  const result = filterPapers(papers, {
    category: areas,
    institution: institutions,
  });
  const expected = papers.filter(
    (p) =>
      areas.includes(p.category) &&
      p.institutions.some((i) => institutions.includes(i)),
  );
  assert.deepEqual(
    result.map((p) => p.id),
    expected.map((p) => p.id),
  );
  assert.equal(new Set(result.map((p) => p.id)).size, result.length);
  assert.deepEqual(
    filterPapers(papers, { category: [], institution: [] }),
    papers,
  );
});
test("organization type and selected institution match the same affiliation", () => {
  assert.equal(
    filterPapers(papers, {
      institution: ["National Taiwan University"],
      orgtype: ["company"],
    }).length,
    0,
  );
  const matches = filterPapers(papers, {
    category: ["translation"],
    institution: ["National Taiwan University", "NVIDIA"],
    orgtype: ["university", "company"],
  });
  assert.ok(matches.length > 0);
  assert.deepEqual(
    matches.map((p) => p.id),
    papers
      .filter(
        (p) =>
          p.category === "translation" &&
          p.institutions.some((i) =>
            ["National Taiwan University", "NVIDIA"].includes(i),
          ),
      )
      .map((p) => p.id),
  );
  assert.ok(matches.every((p) => p.category === "translation"));
});
