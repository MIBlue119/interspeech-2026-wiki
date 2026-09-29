import identities from "./institution-identities.json";
import companyIcons from "./institution-icons-companies.json";
import universityIcons from "./institution-icons-universities.json";
import researchIcons from "./institution-icons-research.json";
export type InstitutionType = "university" | "company" | "research" | "other";
export const institutionTypes: {
  id: InstitutionType;
  label: string;
  plural: string;
}[] = [
  { id: "university", label: "University", plural: "Universities" },
  { id: "company", label: "Company", plural: "Companies" },
  {
    id: "research",
    label: "Research institute",
    plural: "Research institutes",
  },
  { id: "other", label: "Other / unclassified", plural: "Other" },
];
import classified from "./institution-classifications.json";
const classificationMap = classified as Record<
  string,
  { type: string; confidence: number }
>;
export function institutionType(name: string): InstitutionType {
  const value = classificationMap[name];
  return value &&
    value.confidence >= 0.8 &&
    ["university", "company", "research"].includes(value.type)
    ? (value.type as InstitutionType)
    : "other";
}
export const typeLabel = (type: InstitutionType) =>
  institutionTypes.find((t) => t.id === type)!.label;
const institutionLogoMap = new Map(
  [...identities, ...companyIcons, ...universityIcons, ...researchIcons]
    .filter((entry) => entry.file)
    .flatMap((entry) => entry.names.map((name) => [name, `/institutions/${entry.file}`] as const)),
);
export const institutionLogo = (name: string) => institutionLogoMap.get(name);
export const popularInstitutions = [
  {
    name: "Carnegie Mellon University",
    short: "CMU",
    aliases: ["carnegie", "cmu"],
  },
  {
    name: "National Taiwan University",
    short: "NTU Taiwan",
    aliases: ["ntu", "taiwan", "national taiwan universityu"],
  },
  { name: "NVIDIA", short: "NVIDIA", aliases: ["nvidia"] },
  {
    name: "Chinese University of Hong Kong",
    short: "CUHK",
    aliases: ["cuhk", "cukh"],
  },
  { name: "Samsung", short: "Samsung", aliases: ["samsung"] },
  { name: "Apple", short: "Apple", aliases: ["apple"] },
  { name: "Alibaba Group", short: "Alibaba", aliases: ["alibaba"] },
  { name: "Tencent", short: "Tencent", aliases: ["tencent", "tecent"] },
];
export function matchesInstitution(name: string, query: string) {
  const q = query.trim().toLocaleLowerCase("en-US");
  const aliases =
    popularInstitutions.find((p) => p.name === name)?.aliases || [];
  const acronym = name
    .split(/\s+/)
    .filter((w) => !["of", "the", "and", "for", "in"].includes(w.toLowerCase()))
    .map((w) => w[0])
    .join("");
  return (
    !q ||
    [name, acronym, ...aliases].some((s) =>
      s.toLocaleLowerCase("en-US").includes(q),
    )
  );
}
