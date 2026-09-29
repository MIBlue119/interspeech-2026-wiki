'use client';

import { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { createFilteredAgentBrief, type AgentSelection } from '@/lib/agent-selection';
import { copyTextToClipboard } from './agent-tools';

export type FilteredAgentToolsProps = AgentSelection;

export function FilteredAgentTools({ papers, selection, canonicalUrl }: FilteredAgentToolsProps) {
  const [status, setStatus] = useState<{ scope: string; message: string; copied?: boolean }>();
  const [copying, setCopying] = useState(false);
  const scope = JSON.stringify([selection, canonicalUrl, papers]);
  const currentStatus = status?.scope === scope ? status : undefined;
  const empty = papers.length === 0;
  async function copy() {
    if (empty) return;
    setCopying(true);
    try {
      await copyTextToClipboard(createFilteredAgentBrief({ papers, selection, canonicalUrl }));
      setStatus({ scope, message: `Copied all ${papers.length} matches as a frozen research brief.`, copied: true });
    } catch {
      setStatus({ scope, message: 'Could not copy. Check clipboard permissions or download the brief instead.' });
    } finally {
      setCopying(false);
    }
  }
  function download() {
    if (empty) return;
    let url: string | undefined;
    try {
      const brief = createFilteredAgentBrief({ papers, selection, canonicalUrl });
      url = URL.createObjectURL(new Blob([brief], { type: 'text/markdown;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `interspeech-2026-selected-${papers.length}-papers.md`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setStatus({ scope, message: `Download started for all ${papers.length} matches.` });
    } catch {
      setStatus({ scope, message: 'Could not download the brief. Try copying it instead.' });
    } finally {
      if (url) { const blobUrl = url; window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000); }
    }
  }
  return <section className="filtered-agent-tools" aria-label="Hand off your selected research scope">
    <div className="agent-tools-actions">
      <button type="button" className="secondary-button" onClick={copy} disabled={empty || copying}>
        {currentStatus?.copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        {copying ? 'Copying…' : currentStatus?.copied ? 'Copied' : 'Copy filtered brief'}
      </button>
      <button type="button" className="secondary-button" onClick={download} disabled={empty}><Download size={15} aria-hidden="true" />Download brief</button>
    </div>
    <p className="filtered-agent-helper">All {papers.length.toLocaleString('en-US')} matches · metadata, summaries &amp; Markdown links</p>
    <p className="filtered-agent-scope">Your selection becomes a frozen scope for your agent.</p>
    <span className="agent-copy-status" role="status" aria-live="polite">{currentStatus?.message || ''}</span>
  </section>;
}
