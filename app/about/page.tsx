import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { LINKEDIN, REPO, number } from "@/lib/catalog";
import { getPapers } from "@/lib/papers";
export const metadata = { title: "About Wei-Ren Lan & the wiki", description: "Meet Wei-Ren Lan, an AI architect and engineer with eight years in speech AI, and learn why he built an agent-friendly Interspeech research wiki." };
export default function About() {
  return (
    <div className="wrap interior about-page">
      <div className="eyebrow">OPEN RESEARCH, MADE ACCESSIBLE</div>
      <h1>
        Good ideas deserve
        <br />
        <span>to be discovered.</span>
      </h1>
      <p className="page-intro">
        An independent research companion to Interspeech 2026.
        <br />
        Made by Wei-Ren Lan, for people curious about speech.
      </p>
      <div className="about-layout">
        <aside>
          <span className="eyebrow">BUILT IN THE OPEN</span>
          <a href={REPO} target="_blank" rel="noreferrer">
            <Github size={17} /> GitHub repository <ArrowUpRight size={15} />
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            <Linkedin size={17} /> Wei-Ren on LinkedIn <ArrowUpRight size={15} />
          </a>
          <a href="mailto:weirenlan.tw@gmail.com"><Mail size={17} /> Email Wei-Ren <ArrowUpRight size={15} /></a>
        </aside>
        <div className="prose">
          <section className="creator-profile" id="about-weiren" aria-labelledby="creator-heading">
            <span className="eyebrow">MEET THE BUILDER</span>
            <h2 id="creator-heading">I’m Wei-Ren Lan.</h2>
            <p className="creator-role">AI architect, engineer, and consultant based in Taipei.</p>
            <p>I have eight years of experience in speech AI, building systems that take research into production—from speech recognition, noise reduction, and voice separation to meeting intelligence and real-time multimodal agents.</p>
            <p>As a founding AI engineer at DeepWave Intelligence, I built and led the AI team and helped deliver audio products serving more than two million users. Across my work, I have built and deployed more than 15 AI models.</p>
            <div className="creator-expertise" aria-label="Areas of experience"><span>Speech & audio AI</span><span>Production ML systems</span><span>LLMs & agents</span></div>
            <p className="creator-invitation">Hiring for speech AI or applied AI, exploring a consulting project, or looking to collaborate? I’d be glad to connect.</p>
            <div className="creator-profile-actions">
              <a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true" /> Connect on LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a>
              <a href="mailto:weirenlan.tw@gmail.com"><Mail size={16} aria-hidden="true" /> weirenlan.tw@gmail.com</a>
            </div>
          </section>
          <h2>Why I built this wiki.</h2>
          <p>Every year, I turn to Interspeech to keep up with speech research and find ideas worth exploring. This year, I wanted to make that process easier for both people and AI agents. That became the Interspeech 2026 Wiki and this website.</p>
          <p>The idea is simple: people choose the research questions and papers that matter to them; agents help explore the evidence. You can browse by topic or institution, select a research scope, and copy its metadata and summaries into your agent. Every paper also has a Markdown export with its digest and provenance.</p>
          <h2>A conference is more than a collection of PDFs.</h2>
          <p>
            With {number(getPapers().length)} papers to explore, finding a
            useful starting point can be hard. This wiki brings research into a
            connected, readable format: the problem, the method, the evidence,
            the limitations, and where to go next.
          </p>
          <h2>Built with Claude Code, TypeSafe AI, and Gemini.</h2>
          <p>
            Wei-Ren Lan assembled this open knowledge base with AI-assisted
            tools. Claude Code, TypeSafe AI, and Gemini helped organize the
            research into structured metadata and connected digests.
            Related-paper links are based on pairwise assessments by TypeSafe
            Jev.
          </p>
          <h2>Read with the evidence in view.</h2>
          <p>
            Every page identifies its source and summary coverage.{" "}
            <strong>Full-paper digest</strong> means the summary was compiled
            from the paper’s full text. <strong>Abstract-only</strong> means
            only the abstract supports the summary. AI-generated digests can
            contain mistakes; use the linked DOI and original paper to check
            important details.
          </p>
          <h2>What “code & resources” means.</h2>
          <p>
            Resource links come from the repository’s recorded code field. They
            may point to author implementations, datasets, models, demo pages,
            or tools referenced by the paper. A listed link does not by itself
            establish that the authors released their own implementation.
            Consult the paper’s Code section and the linked resource for
            context.
          </p>
          <h2>One open source of knowledge.</h2>
          <p>
            This website is built directly from the repository’s Markdown wiki
            pages and YAML metadata. There is no separate content database. You
            can browse here, clone the repository for your own research, or use
            a coding agent to ask questions across the wiki.
          </p>
          <h2>Help make the next read better.</h2>
          <p>
            Spotted an error, a missing affiliation, or a new code release?
            Authors and readers are welcome to suggest corrections on GitHub.
            See the{" "}
            <a href={`${REPO}/blob/main/CONTRIBUTING.md`}>contribution guide</a>{" "}
            to get started.
          </p>
          <p>
            This is an independent community project, not an official ISCA or
            Interspeech website. Original papers remain with their respective
            rights holders; this site hosts compiled research digests and links
            to the source papers.
          </p>
          <Link prefetch={false} href="/#explore" className="primary-button">
            Explore the research <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
