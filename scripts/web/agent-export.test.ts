import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import matter from 'gray-matter';
import { parse } from 'yaml';
import { agentUrl, getAgentCatalog, getAgentMarkdown, getAgentPaperIds, getLlmsText } from '../../lib/agent-export';
import { GET as getMarkdown, generateStaticParams } from '../../app/papers/[id]/markdown.md/route';
import { GET as getCatalog } from '../../app/catalog.json/route';
import { GET as getGuide } from '../../app/llms.txt/route';
import { copyTextToClipboard, researchPrompt } from '../../components/agent-tools';
import { createFilteredAgentBrief, type FilterSelection } from '../../lib/agent-selection';
import { getPapers } from '../../lib/papers';

test('every canonical paper exports all metadata, provenance and unchanged compiled body', () => {
  const ids = getAgentPaperIds();
  assert.equal(ids.length, 1379);
  assert.deepEqual(generateStaticParams(), ids.map(id => ({ id })));
  for (const id of ids) {
    const source = parse(fs.readFileSync(`data/papers/${id}.yaml`, 'utf8'));
    const original = matter(fs.readFileSync(`wiki/papers/${id}.md`, 'utf8'), { engines: { yaml: parse } });
    const exported = matter(getAgentMarkdown(id)!, { engines: { yaml: parse } });
    for (const key of Object.keys(source)) assert.deepEqual(exported.data[key], source[key], `${id}: ${key}`);
    assert.deepEqual(exported.data.wiki_frontmatter, original.data, id);
    assert.equal(exported.content, original.content, id);
    assert.equal(exported.data.markdown_url, agentUrl(`papers/${id}/markdown.md`));
  }
});

test('unknown IDs and traversal cannot select filesystem paths', async () => {
  for (const id of ['missing-paper', '../AGENTS', '/etc/passwd', '%2e%2e%2fAGENTS', 'lee26g_interspeech.md', 'lee26g_interspeech\\..', '__proto__', 'constructor', '']) {
    assert.equal(getAgentMarkdown(id), undefined, id);
    const response = await getMarkdown(new Request('https://example.com'), { params: Promise.resolve({ id }) });
    assert.equal(response.status, 404, id);
  }
});

test('catalog, guide and Markdown handlers agree on URLs and retain both confidence levels', async () => {
  const catalog = getAgentCatalog();
  assert.equal(catalog.count, getAgentPaperIds().length);
  const entries = catalog.papers as Array<Record<string, unknown> & { wiki_frontmatter: Record<string, unknown> }>;
  assert.ok(entries.some(paper => paper.wiki_frontmatter.confidence === 'abstract-only'));
  assert.ok(entries.some(paper => paper.wiki_frontmatter.confidence === 'full-paper'));
  assert.deepEqual(await getCatalog().json(), catalog);
  assert.match(getCatalog().headers.get('content-type')!, /application\/json/);
  assert.equal(await getGuide().text(), getLlmsText());
  assert.match(getGuide().headers.get('content-type')!, /text\/plain/);
  assert.ok(getLlmsText().includes(agentUrl('catalog.json')));
  assert.match(getLlmsText(), /download and parse the catalog programmatically/);
  assert.match(getLlmsText(), /Do not paste the entire catalog/);
  const response = await getMarkdown(new Request('https://example.com'), { params: Promise.resolve({ id: 'lee26g_interspeech' }) });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type')!, /text\/markdown/);
  assert.equal(await response.text(), getAgentMarkdown('lee26g_interspeech'));
});

test('agent prompts point to implemented endpoints and set evidence boundaries', () => {
  for (const prompt of [researchPrompt(), researchPrompt('lee26g_interspeech', 'AccentDrift')]) {
    assert.ok(prompt.includes(agentUrl('llms.txt')));
    assert.ok(prompt.includes(agentUrl('catalog.json')));
    assert.match(prompt, /wiki_frontmatter\.confidence/);
    assert.match(prompt, /abstract-only/);
    assert.match(prompt, /https:\/\/doi\.org/);
    assert.match(prompt, /do not download PDFs/);
    assert.match(prompt, /Download and parse the catalog programmatically/);
    assert.match(prompt, /do not paste the entire catalog/);
  }
  assert.ok(researchPrompt('lee26g_interspeech').includes(agentUrl('papers/lee26g_interspeech/markdown.md')));
});

test('filtered brief freezes every supplied match and exact filters without full digests', () => {
  const papers = getPapers().slice(0, 25);
  const selection: FilterSelection = { query: 'speech ```\nresearch', categories: ['asr', 'tts'], institutions: ['Samsung'], organizationTypes: ['company'], hasResources: true };
  const canonicalUrl = agentUrl('?q=speech&category=asr&category=tts');
  const exportedAt = '2026-09-29T00:00:00.000Z';
  const brief = createFilteredAgentBrief({ papers, selection, canonicalUrl }, exportedAt);
  const scope = JSON.parse(brief.match(/```json\n([\s\S]*?)\n```/)![1]);
  assert.deepEqual(scope.filters, selection);
  assert.equal(scope.canonical_url, canonicalUrl);
  assert.equal(scope.exported_at, exportedAt);
  assert.equal(scope.matched_count, 25);
  assert.deepEqual(scope.paper_ids, papers.map(p => p.id));
  assert.equal((brief.match(/^## \d+\./gm) || []).length, 25);
  for (const paper of papers) {
    assert.ok(brief.includes(agentUrl(`papers/${paper.id}/markdown.md`)));
    assert.ok(brief.includes(`- Confidence: ${paper.confidence}`));
    assert.ok(brief.includes(`- Updated: ${paper.updated}`));
  }
  assert.match(brief, /Do not silently expand/);
  assert.match(brief, /ask the human before expanding/);
  assert.match(brief, /explicitly caveat abstract-only/);
  assert.ok(!brief.includes('## Experimental setup'));
});

test('empty filtered selection remains empty and full-corpus brief is not truncated', () => {
  const selection: FilterSelection = { query: '', categories: [], institutions: [], organizationTypes: [], hasResources: false };
  const canonicalUrl = agentUrl('');
  assert.match(createFilteredAgentBrief({ papers: [], selection, canonicalUrl }), /No papers matched/);
  const all = getPapers();
  const brief = createFilteredAgentBrief({ papers: all, selection, canonicalUrl });
  assert.equal((brief.match(/^## \d+\./gm) || []).length, all.length);
  assert.ok(brief.includes(agentUrl(`papers/${all.at(-1)!.id}/markdown.md`)));
});

test('clipboard helper falls back on denial and rejects false copy results', async () => {
  const names = ['navigator', 'document', 'window', 'HTMLElement'] as const;
  const descriptors = names.map(name => Object.getOwnPropertyDescriptor(globalThis, name));
  let copied = '';
  let fallbackCalls = 0;
  let removed = 0;
  let fallbackResult = true;
  let denyClipboard = false;
  const textarea = { value: '', readOnly: false, style: { cssText: '' }, setAttribute() {}, focus() {}, select() {}, setSelectionRange() {}, remove() { removed++; } };
  try {
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { clipboard: { async writeText(value: string) { if (denyClipboard) throw new Error('Permission denied'); copied = value; } } } });
    Object.defineProperty(globalThis, 'HTMLElement', { configurable: true, value: class {} });
    Object.defineProperty(globalThis, 'window', { configurable: true, value: { getSelection: () => null } });
    Object.defineProperty(globalThis, 'document', { configurable: true, value: { activeElement: null, createElement: () => textarea, body: { appendChild() {} }, execCommand(command: string) { assert.equal(command, 'copy'); fallbackCalls++; return fallbackResult; } } });
    await copyTextToClipboard('modern clipboard');
    assert.equal(copied, 'modern clipboard');
    assert.equal(fallbackCalls, 0);
    denyClipboard = true;
    await copyTextToClipboard('fallback clipboard');
    assert.equal(textarea.value, 'fallback clipboard');
    assert.equal(fallbackCalls, 1);
    assert.equal(removed, 1);
    fallbackResult = false;
    await assert.rejects(copyTextToClipboard('must not claim success'), /not permitted/);
    assert.equal(removed, 2);
  } finally {
    names.forEach((name, index) => {
      const descriptor = descriptors[index];
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else Reflect.deleteProperty(globalThis, name);
    });
  }
});

test('paper handoff embeds complete metadata and digest with robust Markdown boundaries', async () => {
  const { createPaperHandoff } = await import('../../lib/paper-handoff');
  const id = 'lee26g_interspeech';
  const markdown = getAgentMarkdown(id)!;
  const payload = createPaperHandoff({ id, title: 'AccentDrift', markdown });
  assert.ok(payload.includes(markdown));
  assert.match(payload, /no browsing or installation is needed/);
  assert.match(payload, /not the original paper's full text/);
  assert.match(payload, /wiki_frontmatter.confidence/);
  assert.match(payload, /before expanding to other papers/);
  assert.ok(payload.includes(agentUrl(`papers/${id}/markdown.md`)));
  const tricky = '---\nid: test\n---\n```python\nprint("hello")\n```\n````\n</paper_markdown>\n';
  const exported = createPaperHandoff({ id: 'test', title: 'Quoted "title"', markdown: tricky });
  assert.ok(exported.includes(`\n\n\`\`\`\`\`markdown\n${tricky}\`\`\`\`\`\n`));
  assert.match(researchPrompt(), /Optional local workflow/);
  assert.match(researchPrompt(), /Read AGENTS.md first/);
  assert.match(researchPrompt(), /Do not clone by default/);
});
