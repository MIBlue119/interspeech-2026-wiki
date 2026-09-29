import { institutionLogo } from "@/lib/institutions";
import { getPapers } from "@/lib/papers";
import { countBy, number, categories } from "@/lib/catalog";
import { InstitutionDirectory } from "@/components/institution-directory";
export const metadata = {
  title: "Institutions",
  description:
    "Find the universities, companies, and research labs behind Interspeech 2026 papers.",
};
export default function Institutions() {
  const papers = getPapers();
  const institutions = countBy(papers, "institutions").map((i) => {
    const rows = papers.filter((p) => p.institutions.includes(i.name));
    const logo = institutionLogo(i.name);
    return {
      ...i,
      logo,
      resources: rows.filter((p) => p.code).length,
      focus: countBy(rows, "category")
        .slice(0, 2)
        .map((c) => categories[c.name]?.short || c.name),
    };
  });
  return (
    <div className="wrap interior">
      <div className="eyebrow">THE PEOPLE BEHIND THE PROGRESS</div>
      <h1>
        Research is a<br />
        <span>collective effort.</span>
      </h1>
      <p className="page-intro">
        Discover the work of {number(institutions.length)} universities,
        companies, and labs.
        <br />
        Find a research group. Follow a shared interest. Start a conversation.
      </p>
      <div className="method-note">
        Based on affiliations recorded in the wiki. Collaborative papers count
        toward each participating institution; counts do not represent a ranking
        of research quality.
      </div>
      <InstitutionDirectory institutions={institutions} />
    </div>
  );
}
