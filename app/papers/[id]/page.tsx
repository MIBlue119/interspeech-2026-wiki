import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Code2, FileText, Github } from "lucide-react";
import { WikiMarkdown, headingId } from "@/components/wiki-markdown";
import { getPapers, getPaper, getContent } from "@/lib/papers";
import { PaperAgentTools } from "@/components/agent-tools";
import { getAgentMarkdown } from "@/lib/agent-export";
import { ResourceLink } from "@/components/resource-link";
import { describeResource } from "@/lib/resources";
import { categoryName, REPO, wikiHref } from "@/lib/catalog";
export const dynamicParams = false;
export function generateStaticParams() {
  return getPapers().map((p) => ({ id: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = getPaper(id);
  return {
    title: p?.title || "Paper not found",
    description: p?.summary.slice(0, 180),
  };
}
export default async function PaperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paper = getPaper(id);
  if (!paper) notFound();
  const content = getContent(id);
  const headings = [...content.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
  return (
    <div className="wrap paper-page">
      <Link prefetch={false} className="back-link" href="/#explore">
        <ArrowLeft size={15} /> All papers
      </Link>
      <div className="paper-heading">
        <div className="paper-topline">
          <Link prefetch={false}
            className="category-tag"
            href={`/?category=${paper.category}#explore`}
          >
            {categoryName(paper.category)}
          </Link>
          <span
            className={`confidence ${paper.confidence === "abstract-only" ? "abstract" : ""}`}
          >
            <span />
            {paper.confidence === "full-paper"
              ? "Full-paper digest"
              : "Abstract-only summary"}
          </span>
        </div>
        <h1>{paper.title}</h1>
        <p className="detail-authors">{paper.authors.join(", ")}</p>
        <div className="affiliations">
          {paper.institutions.map((i) => (
            <Link prefetch={false}
              key={i}
              href={`/?institution=${encodeURIComponent(i)}#explore`}
            >
              {i}
              <ArrowUpRight size={11} />
            </Link>
          ))}
        </div>
        <div className="paper-actions">
          {paper.doi && (
            <a
              className="primary-button"
              href={`https://doi.org/${paper.doi}`}
              target="_blank"
              rel="noreferrer"
            >
              Read original paper <ArrowUpRight size={15} />
            </a>
          )}
          {paper.pdf && (
            <a
              className="secondary-button"
              href={paper.pdf}
              target="_blank"
              rel="noreferrer"
            >
              <FileText size={15} /> PDF <ArrowUpRight size={13} />
            </a>
          )}
          {paper.code && <ResourceLink url={paper.code} title={paper.title} />}
        </div>
        {paper.code && (
          <p className="resource-destination">
            <Code2 size={13} />
            <span>Code & resources</span>
            <a href={paper.code} target="_blank" rel="noreferrer">
              {describeResource(paper.code).destination}{" "}
              <ArrowUpRight size={12} />
            </a>
          </p>
        )}
      </div>
      <PaperAgentTools key={paper.id} id={paper.id} title={paper.title} markdown={getAgentMarkdown(paper.id)!} confidence={paper.confidence}/>
      <div className="paper-body-layout">
        <aside className="paper-toc">
          <div className="eyebrow">ON THIS PAGE</div>
          <nav aria-label="Table of contents">
            {headings.map((h) => (
              <a key={h} href={`#${headingId(h)}`}>
                {h}
              </a>
            ))}
          </nav>
          <a
            className="edit-link"
            href={`${REPO}/edit/main/wiki/papers/${paper.id}.md`}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={14} /> Suggest an edit <ArrowUpRight size={12} />
          </a>
          <div className="toc-meta">
            Updated {paper.updated}
            <br />
            AI-assisted research digest
          </div>
        </aside>
        <article className="prose research-digest">
          {paper.confidence === "abstract-only" && (
            <div className="abstract-notice">
              This summary is based on the abstract only. Details beyond the
              abstract have not been verified against the full paper.
            </div>
          )}
          <WikiMarkdown>{content}</WikiMarkdown>
          <div className="digest-source">
            <span className="eyebrow">SOURCE & COVERAGE</span>
            <p>
              AI-assisted{" "}
              {paper.confidence === "full-paper"
                ? "full-paper digest"
                : "abstract summary"}
              . Check important claims against the original paper.
            </p>
            {paper.doi && (
              <a href={`https://doi.org/${paper.doi}`}>
                DOI: {paper.doi} <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
