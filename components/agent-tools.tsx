'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Download, Terminal } from 'lucide-react';
import { SITE_URL } from '@/lib/site';
import { REPO } from '@/lib/catalog';
import { createPaperHandoff } from '@/lib/paper-handoff';
import { sourceWorkflow, analysisWorkflow } from '@/lib/research-workflow';

const site = SITE_URL.replace(/\/+$/, '');

export async function copyTextToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // Older browsers and denied Clipboard API permissions may still allow a
    // user-initiated copy through a selected textarea. Never assume it worked.
  }
  const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const selection = window.getSelection();
  const ranges = selection ? Array.from({ length: selection.rangeCount }, (_, i) => selection.getRangeAt(i).cloneRange()) : [];
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.readOnly = true;
  textarea.setAttribute('aria-label', 'Text to copy');
  textarea.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;font-size:16px;';
  document.body.appendChild(textarea);
  try {
    textarea.focus({ preventScroll: true });
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    if (typeof document.execCommand !== 'function' || !document.execCommand('copy')) {
      throw new Error('Clipboard copy was not permitted');
    }
  } finally {
    textarea.remove();
    previousFocus?.focus({ preventScroll: true });
    if (selection) {
      selection.removeAllRanges();
      for (const range of ranges) selection.addRange(range);
    }
  }
}

export function researchPrompt(id?: string, title?: string): string {
  return `Act as my research collaborator for ${id ? `the Interspeech 2026 paper ${JSON.stringify(title || id)} (ID: ${id})` : 'the Interspeech 2026 Research Wiki'}. Start useful work now, not a question-only response.

Read ${site}/llms.txt, then ${site}/catalog.json. Download and parse the catalog programmatically if your tools support it; otherwise read relevant records through available browsing tools. Filter by my research question or selected IDs; do not paste the entire catalog into the conversation. A human-filtered brief defines the exact paper scope.
${id ? `Read ${site}/papers/${encodeURIComponent(id)}/markdown.md and produce the reading note below for this paper.` : 'If I supplied a topic, select up to 5 relevant papers and explain your choices. If I supplied no topic, show 4–6 research directions and up to 5 diverse starter papers with reasons, using catalog metadata rather than pretending you know my interests. Read those shortlisted markdown_url digests and provide a concise comparison of mechanisms, datasets, metrics and limitations. End with one focused question about my research goal. Do not retrieve PDFs for a generic overview; when a concrete technical question calls for a deep read, inspect at most 3 relevant PDFs initially and use the reading-note structure below.'}

${sourceWorkflow}

Deep-read format, for a selected paper or concrete technical question only. For no-topic discovery, keep the first response to the overview and shortlist described above:
${analysisWorkflow}

If browsing is unavailable, do not invent a catalog or paper recommendations. Use any attached evidence; if none is supplied, offer a few general speech-research directions clearly labeled as general knowledge, then ask me to paste a filtered brief or a paper's “Copy for your agent” payload. No package, skill or TypeSafe installation is needed.

Optional local workflow: only if I ask to work with a local checkout, use an existing checkout or clone ${REPO}. Read AGENTS.md first, then use wiki/papers for digests and data/papers for metadata. Do not clone by default. Keep downloaded PDFs local and untracked. Respect the repository’s code and content licenses.`;
}

function CopyAction({ label, getText }: { label: string; getText: () => string | Promise<string> }) {
  const [status, setStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
  async function copy() {
    setStatus('copying');
    try {
      const text = await getText();
      await copyTextToClipboard(text);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }
  return <span className="agent-copy-action">
    <button type="button" className="secondary-button agent-copy-button" onClick={copy} disabled={status === 'copying'}>
      {status === 'success' ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
      {status === 'copying' ? 'Copying…' : status === 'success' ? 'Copied' : label}
    </button>
    <span className="agent-copy-status" role="status" aria-live="polite">
      {status === 'success' ? `${label} copied to clipboard.` : status === 'error' ? 'Could not copy. Check clipboard permissions or open the text link to copy manually.' : ''}
    </span>
  </span>;
}

export function PaperAgentTools({ id, title, markdown, confidence }: { id: string; title: string; markdown: string; confidence: string }) {
  const markdownPath = `/papers/${encodeURIComponent(id)}/markdown.md`;
  const payload = createPaperHandoff({ id, title, markdown });
  const size = (new TextEncoder().encode(payload).length / 1024).toFixed(1);
  const [status, setStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
  const [previewOpen, setPreviewOpen] = useState(false);
  const preview = useRef<HTMLTextAreaElement>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const attempt = useRef(0);
  useEffect(() => () => {
    attempt.current++;
    clearTimeout(resetTimer.current);
  }, []);
  useEffect(() => {
    if (status === 'error' && previewOpen) {
      preview.current?.focus();
      preview.current?.select();
    }
  }, [status, previewOpen]);
  async function copy() {
    const current = ++attempt.current;
    clearTimeout(resetTimer.current);
    setStatus('copying');
    try {
      // Build-time content keeps this copy in the click gesture; no fetch is needed.
      await copyTextToClipboard(payload);
      if (current !== attempt.current) return;
      setStatus('success');
      resetTimer.current = setTimeout(() => setStatus('idle'), 3000);
    } catch {
      if (current !== attempt.current) return;
      setStatus('error');
      setPreviewOpen(true);
    }
  }
  return <section className="paper-agent-tools" aria-labelledby="paper-agent-heading">
    <div className="paper-agent-intro">
      <Terminal size={20} aria-hidden="true" />
      <div>
        <h2 id="paper-agent-heading">Explore this paper with your agent</h2>
        <p>Get a guided paper analysis: method, diagrams, experiments, and metrics. Includes the full wiki digest and metadata.</p>
        <span className="paper-agent-size">{size} KB · Ready to paste{confidence === 'abstract-only' ? ' · Abstract-only summary' : ''}</span>
      </div>
    </div>
    <div className="agent-tools-actions">
      <button type="button" className="secondary-button agent-copy-button paper-agent-primary" onClick={copy} disabled={status === 'copying'} aria-busy={status === 'copying'}>
        {status === 'success' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        {status === 'copying' ? 'Copying for your agent…' : status === 'success' ? 'Copied for your agent' : 'Copy for your agent'}
      </button>
      <div className="paper-agent-exports">
        <a className="agent-text-link" href={markdownPath} download={`${id}.md`}><Download size={14} aria-hidden="true" />Download .md</a>
        <a className="agent-text-link" href={markdownPath}>View raw .md <ArrowUpRight size={13} aria-hidden="true" /></a>
      </div>
    </div>
    <p className="agent-copy-status paper-agent-status" role="status" aria-live="polite" aria-atomic="true">
      {status === 'success' ? 'Prompt, metadata, and full wiki digest copied. Paste into your agent to begin.' : status === 'error' ? 'Automatic copying was blocked. The text below is selected; press ⌘C or Ctrl+C, or touch and hold to copy.' : ''}
    </p>
    <details className="agent-prompt-details" open={previewOpen} onToggle={event => setPreviewOpen(event.currentTarget.open)}>
      <summary>Preview copied content</summary>
      <textarea ref={preview} className="agent-prompt-text paper-agent-preview" value={payload} readOnly aria-label="Prompt and complete wiki Markdown to copy" spellCheck={false} />
    </details>
  </section>;
}

export function AgentStarter() {
  return <section className="agent-starter" aria-labelledby="agent-starter-title">
    <div className="agent-starter-heading"><Terminal size={22} aria-hidden="true" /><span className="eyebrow">YOUR RESEARCH WORKFLOW</span></div>
    <h2 id="agent-starter-title">Use with your agent</h2>
    <p>Explore papers, compare methods, and follow the evidence with Claude Code, Codex, or your preferred research agent.</p>
    <p>Copy the research prompt into your agent to get started. No installation required.</p>
    <p>For an optional local workflow, ask your agent to clone the <a className="agent-text-link" href={REPO} target="_blank" rel="noreferrer">GitHub repository <ArrowUpRight size={13} aria-hidden="true" /></a>. The prompt includes this optional path.</p>
    <div className="agent-tools-actions"><CopyAction label="Copy research prompt" getText={() => researchPrompt()} /><a className="agent-text-link" href="/llms.txt">Agent guide <ArrowUpRight size={14} aria-hidden="true" /></a><a className="agent-text-link" href="/catalog.json">Paper catalog <ArrowUpRight size={14} aria-hidden="true" /></a></div>
    <details className="agent-prompt-details"><summary>Read research prompt</summary><pre className="agent-prompt-text">{researchPrompt()}</pre></details>
  </section>;
}
