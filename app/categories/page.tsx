import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getPapers } from "@/lib/papers";
import { categories, categoryName, countBy, number } from "@/lib/catalog";
import "./categories.css";

export const metadata = {
  title: "Research categories",
  description:
    "Compare the Interspeech 2026 research landscape across 14 categories, explore resource coverage, and find a reading route.",
};

const readingRoutes = [
  {
    title: "Build a spoken interface",
    description:
      "Explore how systems recognize speech, generate a voice, hold a conversation, and translate between languages.",
    areas: ["asr", "tts", "speech-llm-dialogue", "translation"],
  },
  {
    title: "Make audio dependable",
    description:
      "Follow work on clearer audio, speaker identity, synthetic-speech detection, and efficient representations.",
    areas: [
      "enhancement-separation",
      "speaker",
      "deepfake-security",
      "speech-coding",
    ],
  },
  {
    title: "Study people through speech",
    description:
      "Connect the structure of speech with emotion, human communication, and clinical applications.",
    areas: [
      "phonetics-linguistics",
      "paralinguistics-emotion",
      "health-clinical",
    ],
  },
];
const percentage = (part: number, total: number) =>
  total ? ((part / total) * 100).toFixed(1) : "0.0";
function exploreHref(areas: string[], resources = false) {
  const params = new URLSearchParams();
  areas.forEach((area) => params.append("category", area));
  if (resources) params.set("code", "1");
  return `/?${params.toString()}#explore`;
}

export default function Categories() {
  const papers = getPapers();
  const counts = countBy(papers, "category").map((category) => ({
    ...category,
    resources: papers.filter((p) => p.category === category.name && p.code)
      .length,
  }));
  const resourceCount = papers.filter((p) => p.code).length;
  const axisMax = Math.max(40, Math.ceil((counts[0]?.count || 0) / 40) * 40);
  return (
    <div className="wrap categories-page">
      <header className="landscape-hero">
        <div>
          <p className="landscape-kicker">THE RESEARCH LANDSCAPE</p>
          <h1>
            Find your way through
            <br />
            <span>speech research.</span>
          </h1>
          <p className="landscape-intro">
            See how the collection is distributed across {counts.length} primary
            categories. Follow a field you know, or find a new place to start.
          </p>
          <a className="landscape-jump" href="#reading-routes">
            Looking for a starting point?{" "}
            <span>
              Explore reading routes <ArrowRight size={15} aria-hidden="true" />
            </span>
          </a>
        </div>
        <dl className="landscape-stats">
          <div>
            <dt>Papers in the collection</dt>
            <dd>{number(papers.length)}</dd>
          </div>
          <div>
            <dt>With a code or resource link</dt>
            <dd>
              {number(resourceCount)}
              <small>
                {percentage(resourceCount, papers.length)}% of all papers
              </small>
            </dd>
          </div>
        </dl>
      </header>

      <section
        className="landscape-distribution"
        aria-labelledby="distribution-heading"
      >
        <div className="landscape-section-heading">
          <div>
            <p className="landscape-kicker">01 / THE COLLECTION AT A GLANCE</p>
            <h2 id="distribution-heading">Where the papers are.</h2>
          </div>
          <p>
            Ordered by paper count.
            <br />
            Each paper appears in one primary category.
          </p>
        </div>
        <div className="landscape-chart-guide">
          <div className="landscape-legend">
            <span>
              <i className="landscape-swatch-linked" aria-hidden="true" />
              With a resource link
            </span>
            <span>
              <i className="landscape-swatch-unlinked" aria-hidden="true" />
              No resource link recorded
            </span>
          </div>
          <span>Bar length = number of papers</span>
        </div>
        <table className="landscape-table" role="table">
          <caption className="sr-only">
            Papers by primary category, largest first. Shares use all{" "}
            {number(papers.length)} papers; resource coverage uses each
            category’s paper count. Bars use a shared zero to {axisMax} paper
            scale.
          </caption>
          <thead role="rowgroup">
            <tr role="row">
              <th scope="col" role="columnheader">
                Research category
              </th>
              <th scope="col" role="columnheader">
                Papers<small>Share of {number(papers.length)}</small>
              </th>
              <th scope="col" role="columnheader" className="landscape-axis">
                <span className="sr-only">Distribution, in papers</span>
                <div aria-hidden="true">
                  {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
                    <span key={tick}>{axisMax * tick}</span>
                  ))}
                </div>
              </th>
              <th scope="col" role="columnheader">
                Resource coverage<small>Linked papers / category total</small>
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {counts.map((c) => (
              <tr key={c.name} role="row">
                <th scope="row" role="rowheader" className="landscape-category">
                  <Link prefetch={false} href={exploreHref([c.name])}>
                    {categoryName(c.name)}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                  <p>{categories[c.name]?.description}</p>
                </th>
                <td role="cell" className="landscape-count">
                  <strong>{number(c.count)}</strong>
                  <span>
                    {percentage(c.count, papers.length)}%
                    <span className="landscape-mobile-only">
                      {" "}
                      of all papers
                    </span>
                  </span>
                </td>
                <td role="cell" className="landscape-bar-cell">
                  <div className="landscape-bar-grid" aria-hidden="true">
                    <div
                      className="landscape-bar"
                      style={{ width: `${(100 * c.count) / axisMax}%` }}
                    >
                      <span
                        style={{ width: `${(100 * c.resources) / c.count}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td role="cell" className="landscape-coverage">
                  <Link
                    prefetch={false}
                    href={exploreHref([c.name], true)}
                    aria-label={`Browse ${c.resources} ${categoryName(c.name)} papers with code or resource links`}
                  >
                    <span>
                      <strong>{c.resources}</strong> / {c.count}
                      <b>{percentage(c.resources, c.count)}%</b>
                    </span>
                    <small>
                      With resources <ArrowRight size={13} aria-hidden="true" />
                    </small>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot role="rowgroup">
            <tr role="row">
              <th scope="row" role="rowheader">
                Entire collection
              </th>
              <td role="cell" className="landscape-count">
                <strong>{number(papers.length)}</strong>
                <span>100% of papers</span>
              </td>
              <td role="cell" className="landscape-total-link">
                <Link prefetch={false} href="/#explore">
                  Browse all papers <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </td>
              <td role="cell" className="landscape-coverage">
                <Link prefetch={false} href="/?code=1#explore">
                  <span>
                    <strong>{resourceCount}</strong> / {number(papers.length)}
                    <b>{percentage(resourceCount, papers.length)}%</b>
                  </span>
                  <small>
                    With resources <ArrowRight size={13} aria-hidden="true" />
                  </small>
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
        <p className="landscape-method">
          A resource link can lead to code, a dataset, a demo, or a project
          page. Coverage describes links recorded in this wiki, not code
          availability or research quality. Percentages are rounded.
        </p>
      </section>

      <section
        id="reading-routes"
        className="landscape-routes"
        aria-labelledby="routes-heading"
      >
        <div className="landscape-section-heading">
          <div>
            <p className="landscape-kicker">02 / FOLLOW A QUESTION</p>
            <h2 id="routes-heading">A few ways into the research.</h2>
          </div>
          <p>
            Each route opens papers from any of its listed categories.
            <br />
            Choose a direction, then refine your search.
          </p>
        </div>
        <div className="landscape-route-grid">
          {readingRoutes.map((route, index) => {
            const count = papers.filter((p) =>
              route.areas.includes(p.category),
            ).length;
            return (
              <article className="landscape-route" key={route.title}>
                <span className="landscape-route-number">0{index + 1}</span>
                <h3>{route.title}</h3>
                <p>{route.description}</p>
                <ul aria-label="Included categories">
                  {route.areas.map((area) => (
                    <li key={area}>
                      <Link prefetch={false} href={exploreHref([area])}>
                        {categoryName(area)}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  prefetch={false}
                  className="landscape-route-action"
                  href={exploreHref(route.areas)}
                >
                  Explore {number(count)} papers{" "}
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
