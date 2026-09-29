import Link from "next/link";
import { Suspense } from "react";
import { ArrowDown, ArrowUpRight, Braces, Network, Terminal, Linkedin, Mail } from "lucide-react";
import { getPapers } from "@/lib/papers";
import { countBy, number, LINKEDIN } from "@/lib/catalog";
import { AgentStarter } from "@/components/agent-tools";
import { Explorer } from "@/components/explorer";
import { SignalField } from "@/components/signal-field";
export default function Home() {
  const papers = getPapers();
  const institutions = countBy(papers, "institutions");
  const counts = countBy(papers, "category");
  const resources = papers.filter((p) => p.code).length;
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" /> AN INDEPENDENT RESEARCH WIKI
          </div>
          <h1>
            Interspeech 2026.
            <br />
            <em>A research guide.</em>
          </h1>
          <p className="hero-description">
            Explore {number(papers.length)} paper digests across {counts.length} research areas.
            Find institutions and code, follow related work, and bring your selected
            papers into your agent workflow.
          </p>
          <div className="hero-actions">
          <a className="primary-button" href="#explore">
            Explore the papers <ArrowDown size={16} />
          </a>
          <a className="hero-agent-link" href="#use-with-agent">
            <Terminal size={16} aria-hidden="true" /> Use with your agent
            <ArrowDown size={14} aria-hidden="true" />
          </a>
          </div>
          <div className="hero-creator" aria-label="About the creator">
            <p>Built by <Link prefetch={false} href="/about/#about-weiren">Wei-Ren Lan</Link></p>
            <span>AI architect & engineer · 8 years in speech AI</span>
            <div className="creator-contact-links">
              <a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={14} aria-hidden="true" /> Connect on LinkedIn <ArrowUpRight size={12} aria-hidden="true" /></a>
              <a href="mailto:weirenlan.tw@gmail.com"><Mail size={14} aria-hidden="true" /> Email Wei-Ren</a>
            </div>
          </div>
        </div>
        <SignalField counts={counts} />
      </section>
      <section className="stats wrap" aria-label="Collection statistics">
        <div>
          <strong>{number(papers.length)}</strong>
          <span>Research papers</span>
        </div>
        <Link prefetch={false} href="/categories/">
          <strong>
            {counts.length}
            <ArrowUpRight size={17} />
          </strong>
          <span>Research categories</span>
        </Link>
        <Link prefetch={false} href="/institutions/">
          <strong>
            {number(institutions.length)}
            <ArrowUpRight size={17} />
          </strong>
          <span>Institutions represented</span>
        </Link>
        <Link prefetch={false} href="/?code=1#explore">
          <strong>
            {number(resources)}
            <ArrowUpRight size={17} />
          </strong>
          <span>With code & resources</span>
        </Link>
      </section>
      <Suspense
        fallback={
          <div className="wrap loading">Loading the paper explorer…</div>
        }
      >
        <Explorer papers={papers} />
      </Suspense>
      <div id="use-with-agent" className="wrap agent-starter-wrap"><AgentStarter/></div>
      <section className="discovery wrap">
        <div className="section-heading">
          <div>
            <div className="eyebrow">FOLLOW YOUR CURIOSITY</div>
            <h2>More ways into the research.</h2>
          </div>
        </div>
        <div className="discovery-grid">
          <Link prefetch={false} href="/institutions/" className="discovery-card">
            <Network size={28} strokeWidth={1.3} />
            <h3>Find the people behind the papers.</h3>
            <p>
              Explore universities, labs, and companies. See what each research
              community is working on.
            </p>
            <span>
              Browse institutions <ArrowUpRight size={17} />
            </span>
          </Link>
          <Link prefetch={false} href="/?code=1#explore" className="discovery-card">
            <Braces size={28} strokeWidth={1.3} />
            <h3>From reading to experimenting.</h3>
            <p>
              Discover papers with linked implementations, models, datasets, and
              demos.
            </p>
            <span>
              Explore code & resources <ArrowUpRight size={17} />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
