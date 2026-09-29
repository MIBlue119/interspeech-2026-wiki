import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, AudioLines, Mail } from "lucide-react";
import { REPO, LINKEDIN } from "@/lib/catalog";
import { SiteNavigation } from "@/components/site-navigation";
export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link prefetch={false}
          href="/"
          className="brand"
          aria-label="Interspeech 2026 Research Wiki, home"
        >
          <AudioLines size={24} strokeWidth={1.6} aria-hidden="true" />
          <span>
            interspeech<span className="brand-year">2026</span>
            <span className="brand-wiki">RESEARCH WIKI</span>
          </span>
        </Link>
        <SiteNavigation />
        <div className="header-socials">
        <a className="repo-link" href={REPO} target="_blank" rel="noreferrer" aria-label="GitHub repository (opens in a new tab)">
          <Github size={16} aria-hidden="true" />
          <span>GitHub</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <a className="linkedin-link" href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="Wei-Ren Lan on LinkedIn (opens in a new tab)">
          <Linkedin size={18} strokeWidth={1.7} aria-hidden="true" />
          <span>Wei-Ren Lan</span>
        </a>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-intro">
          <Link prefetch={false} href="/" className="footer-brand">
            A little more signal.
            <br />
            <em>A lot more discovery.</em>
          </Link>
          <p>An independent, open research wiki for Interspeech 2026.</p>
        </div>
        <nav className="footer-col" aria-label="Footer navigation">
          <p className="footer-heading">Explore</p>
          <Link prefetch={false} href="/#explore">Papers</Link>
          <Link prefetch={false} href="/categories/">Categories</Link>
          <Link prefetch={false} href="/institutions/">Institutions</Link>
          <Link prefetch={false} href="/about/">About</Link>
        </nav>
        <div className="footer-col">
          <p className="footer-heading">Built by</p>
          <p className="footer-creator-name">Wei-Ren Lan</p>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="Wei-Ren Lan on LinkedIn (opens in a new tab)">
            <Linkedin size={16} aria-hidden="true" /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href="mailto:weirenlan.tw@gmail.com">
            <Mail size={16} aria-hidden="true" /> weirenlan.tw@gmail.com
          </a>
          <a href={REPO} target="_blank" rel="noreferrer" aria-label="Source on GitHub (opens in a new tab)">
            <Github size={16} aria-hidden="true" /> Source on GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          Curated by Wei-Ren Lan · Built with Claude Code, TypeSafe AI & Gemini
        </span>
        <span>Independent community project · Not affiliated with ISCA</span>
      </div>
    </footer>
  );
}
