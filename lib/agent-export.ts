import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { parse, stringify } from 'yaml';
import { SITE_URL } from './site';
import { sourceWorkflow, analysisWorkflow } from './research-workflow';

type Fields = Record<string, unknown>;
type ExportPaper = { metadata: Fields; wiki: Fields; body: string };
const root = process.cwd();
const safeId = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
let papers: Map<string, ExportPaper> | undefined;

export function agentUrl(relativePath: string): string {
  return `${SITE_URL.replace(/\/+$/, '')}/${relativePath.replace(/^\/+/, '')}`;
}

function getExportPapers(): Map<string, ExportPaper> {
  if (papers) return papers;
  const result = new Map<string, ExportPaper>();
  for (const filename of fs.readdirSync(path.join(root, 'data/papers')).filter(name => name.endsWith('.yaml')).sort()) {
    const id = filename.slice(0, -5);
    if (!safeId.test(id)) throw new Error(`Invalid canonical paper filename: ${filename}`);
    const metadata = parse(fs.readFileSync(path.join(root, 'data/papers', filename), 'utf8')) as Fields;
    if (metadata.id !== id) throw new Error(`Paper metadata ID does not match filename: ${filename}`);
    const wiki = matter(fs.readFileSync(path.join(root, 'wiki/papers', `${id}.md`), 'utf8'), {
      engines: { yaml: source => parse(source) as Fields },
    });
    if (wiki.data.id !== id) throw new Error(`Wiki ID does not match metadata: ${id}`);
    result.set(id, { metadata, wiki: wiki.data, body: wiki.content });
  }
  papers = result;
  return result;
}

export function getAgentPaperIds(): string[] {
  return [...getExportPapers().keys()];
}

export function getAgentMarkdown(id: string): string | undefined {
  // Reject paths and encoded traversal before looking up the canonical corpus.
  if (!safeId.test(id)) return undefined;
  const paper = getExportPapers().get(id);
  if (!paper) return undefined;
  const frontmatter = {
    ...paper.metadata,
    wiki_frontmatter: paper.wiki,
    wiki_url: agentUrl(`papers/${id}/`),
    markdown_url: agentUrl(`papers/${id}/markdown.md`),
  };
  // Preserve the compiled digest verbatim, including title, links and related papers.
  return `---\n${stringify(frontmatter)}---\n${paper.body}`;
}

export function getAgentCatalog() {
  const entries = [...getExportPapers()].map(([id, paper]) => ({
    ...paper.metadata,
    wiki_frontmatter: paper.wiki,
    wiki_url: agentUrl(`papers/${id}/`),
    markdown_url: agentUrl(`papers/${id}/markdown.md`),
  }));
  return { schema_version: 1, site_url: SITE_URL, count: entries.length, papers: entries };
}

export function getLlmsText(): string {
  return `# Interspeech 2026 Research Wiki

> Public, AI-assisted research digests and structured paper metadata. These exports contain compiled summaries, never raw PDF full text.

## Start here

- [Paper catalog](${agentUrl('catalog.json')}): ${getAgentPaperIds().length} papers with complete metadata, DOI, authors, topics, institutions, links and wiki provenance.
- [Browse the wiki](${agentUrl('')}): search and read research digests.
- Individual Markdown: ${agentUrl('papers/{id}/markdown.md')} — substitute an exact catalog ID, or use its markdown_url.

## Reading the exports

The catalog has schema_version, site_url, count and papers. Each paper includes the full data/papers YAML metadata plus wiki_frontmatter, wiki_url and markdown_url. The Markdown frontmatter uses the same paper fields, followed by the complete compiled wiki body, including related-paper links.

wiki_frontmatter preserves digest provenance, including confidence, updated, source, digest and pdf when present. confidence: full-paper means the digest was compiled from the full paper; confidence: abstract-only means only the abstract supports the summary. Missing fields are not evidence of a claim. These are AI-assisted digests, not independently verified reproductions.

## Research workflow

1. Start from any supplied full paper digest or frozen brief; these do not require a new catalog search. For discovery, download and parse the catalog programmatically when tools support it, or inspect relevant records through available browsing tools. Filter by title, authors, topics, labels, institutions or category, and retain only relevant records in your working context. Do not paste the entire catalog into the conversation. If a human supplies a filtered brief, use its explicit paper IDs as the scope; do not silently expand it.
2. Fetch the markdown_url of relevant papers. Relative links such as another_id.md in a digest refer to other wiki papers; resolve them through catalog IDs and markdown_url, but ask before following papers outside an explicit human-selected scope.
3. Check wiki_frontmatter.confidence before comparing methods, results or limitations. Explicitly label abstract-only evidence and avoid inferring unreported details.
4. Cite papers by DOI using https://doi.org/{doi}. Use digest source links for traceability; distinguish reported results from your own interpretation.
5. Keep discovery bounded: up to 5 digests and, when a concrete technical question requires deep reading, up to 3 PDFs initially. A supplied single-paper handoff should proceed directly to that paper's deep read. Do not silently broaden a frozen selection or claim unread papers were reviewed.

${sourceWorkflow}

For a selected paper or concrete technical question, use this deep-read format. A no-topic discovery response should remain a brief overview and shortlist:
${analysisWorkflow}

When no topic is supplied, first offer a small evidence-based shortlist and one focused question. If no browsing or evidence is available, explain that limitation and ask for a copied paper handoff or filtered brief; do not invent recommendations from this catalog.

No installation, account or API key is required. Any agent that can read public URLs can use these endpoints.
`;
}
