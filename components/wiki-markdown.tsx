import Link from 'next/link';
import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { wikiHref } from '../lib/catalog';
import { remarkRepairMath } from '../lib/markdown';

// Keep this algorithm aligned with the paper table of contents.
export const headingId = (text: string) => text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

const components: Components = {
  h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>,
  a: ({ href = '', children }) => {
    const target = wikiHref(href);
    return target.startsWith('/papers/')
      ? <Link prefetch={false} href={target}>{children}</Link>
      : <a href={target} {...(target.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{children}</a>;
  },
  table: ({ children }) => (
    <div className="table-scroll" tabIndex={0} role="region" aria-label="Research results table">
      <table>{children}</table>
    </div>
  ),
};

/** Render Markdown with math while keeping raw HTML and TeX HTML commands untrusted. */
export function WikiMarkdown({ children }: { children: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, [remarkMath, { singleDollarTextMath: true }], remarkRepairMath]}
      rehypePlugins={[[rehypeKatex, { trust: false, strict: 'ignore' }]]}
      components={components}
    >
      {children}
    </Markdown>
  );
}
