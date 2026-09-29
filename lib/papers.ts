import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parse } from "yaml";
import { Paper, safeUrl } from "./catalog";

let cached: Paper[] | undefined;
const root = process.cwd();
const stringList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((s): s is string => typeof s === "string")
    : [];
export function getPapers(): Paper[] {
  if (cached) return cached;
  cached = fs
    .readdirSync(path.join(root, "data/papers"))
    .filter((f) => f.endsWith(".yaml"))
    .map((file) => {
      const data = parse(
        fs.readFileSync(path.join(root, "data/papers", file), "utf8"),
      );
      const wiki = matter(
        fs.readFileSync(
          path.join(root, "wiki/papers", `${data.id}.md`),
          "utf8",
        ),
      );
      const summary =
        wiki.content.match(/\*\*TL;DR\*\*\s*[—–:-]?\s*([^\n]+)/)?.[1] ||
        wiki.content.match(/## TL;DR\s+([\s\S]*?)(?=\n##|$)/)?.[1]?.trim() ||
        "";
      return {
        id: String(data.id),
        title: String(data.title),
        authors: stringList(data.authors),
        category: data.category || "applications-other",
        labels: stringList(data.labels),
        topics: stringList(data.topics),
        institutions: stringList(data.institutions),
        doi: String(data.doi || ""),
        pdf: safeUrl(data.pdf_url),
        source: safeUrl(data.isca_url),
        code: safeUrl(data.code?.url),
        confidence: wiki.data.confidence || "abstract-only",
        updated:
          wiki.data.updated instanceof Date
            ? wiki.data.updated.toISOString().slice(0, 10)
            : String(wiki.data.updated || ""),
        summary: summary.replace(/\*\*|`/g, ""),
      } satisfies Paper;
    })
    .sort((a, b) => a.title.localeCompare(b.title, "en"));
  return cached;
}
export function getPaper(id: string) {
  return getPapers().find((p) => p.id === id);
}
export function getContent(id: string) {
  if (!getPaper(id)) return "";
  const { content } = matter(
    fs.readFileSync(path.join(root, "wiki/papers", `${id}.md`), "utf8"),
  );
  // The page shell renders title, authors and source metadata; retain the complete digest below it.
  const start = content.search(/\*\*TL;DR\*\*|^## /m);
  return (start >= 0 ? content.slice(start) : content)
    .replace(/^## Institutions \/ 機構/gm, "## Institutions")
    .replace(/<\/?sub>/g, "");
}
