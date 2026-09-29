import Link from 'next/link';
export default function NotFound(){return <div className="wrap empty-state interior"><div className="eyebrow">404 / SIGNAL NOT FOUND</div><h1>This page isn’t in the collection.</h1><p>Head back to the explorer to find a paper, author, or research area.</p><Link className="primary-button" href="/#explore">Explore papers →</Link></div>}
