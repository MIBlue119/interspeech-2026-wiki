import { institutionType } from "./institutions";
export const REPO = "https://github.com/MIBlue119/interspeech-2026-wiki";
export const LINKEDIN = "https://www.linkedin.com/in/weiren-lan/";
export const categories: Record<
  string,
  { name: string; short: string; description: string }
> = {
  asr: {
    name: "Speech recognition",
    short: "ASR",
    description:
      "From speech to text, across languages and listening conditions.",
  },
  tts: {
    name: "Speech synthesis",
    short: "TTS",
    description: "Natural, expressive, and controllable speech generation.",
  },
  "resources-evaluation": {
    name: "Resources & evaluation",
    short: "Resources",
    description: "Datasets, benchmarks, and better ways to measure progress.",
  },
  "enhancement-separation": {
    name: "Enhancement & separation",
    short: "Enhancement",
    description: "Making voices clearer and separating the sounds around us.",
  },
  "phonetics-linguistics": {
    name: "Phonetics & linguistics",
    short: "Phonetics",
    description: "How speech is produced, perceived, and structured.",
  },
  "speech-llm-dialogue": {
    name: "Speech LLMs & dialogue",
    short: "Speech LLMs",
    description:
      "Spoken interaction, audio language models, and conversational agents.",
  },
  "health-clinical": {
    name: "Health & clinical speech",
    short: "Health",
    description: "Speech as a window into health, accessibility, and care.",
  },
  "deepfake-security": {
    name: "Deepfakes & security",
    short: "Security",
    description:
      "Detecting synthetic speech and building trustworthy voice systems.",
  },
  "paralinguistics-emotion": {
    name: "Paralinguistics & emotion",
    short: "Emotion",
    description: "The emotion, intent, and human signals beyond words.",
  },
  speaker: {
    name: "Speaker recognition",
    short: "Speaker",
    description:
      "Who is speaking: verification, identification, and diarization.",
  },
  "audio-understanding": {
    name: "Audio understanding",
    short: "Audio",
    description:
      "Understanding acoustic scenes, events, music, and multimodal signals.",
  },
  "speech-coding": {
    name: "Speech coding",
    short: "Coding",
    description:
      "Audio codecs, compression, and efficient speech representations.",
  },
  "applications-other": {
    name: "Applications & other",
    short: "Applications",
    description:
      "Speech technology in practice and emerging research directions.",
  },
  translation: {
    name: "Speech translation",
    short: "Translation",
    description:
      "Bridging languages through speech-to-text and speech-to-speech translation.",
  },
};
export type Paper = {
  id: string;
  title: string;
  authors: string[];
  category: string;
  labels: string[];
  topics: string[];
  institutions: string[];
  doi: string;
  pdf: string;
  source: string;
  code: string;
  confidence: string;
  updated: string;
  summary: string;
};
export const categoryName = (key: string) => categories[key]?.name || key;
export const number = (value: number) => value.toLocaleString("en-US");
export function safeUrl(value: unknown): string {
  if (typeof value !== "string") return "";
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}
export type PaperFilters = {
  q?: string;
  category?: string | string[];
  institution?: string | string[];
  code?: boolean;
  orgtype?: string | string[];
};
const values = (value?: string | string[]) =>
  Array.isArray(value) ? value : value ? [value] : [];
export function filterPapers(papers: Paper[], filters: PaperFilters) {
  const terms = (filters.q || "")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const areas = values(filters.category),
    organizations = values(filters.institution),
    types = values(filters.orgtype);
  return papers.filter(
    (p) =>
      (!areas.length || areas.includes(p.category)) &&
      ((!organizations.length && !types.length) ||
        p.institutions.some(
          (name) =>
            (!organizations.length || organizations.includes(name)) &&
            (!types.length || types.includes(institutionType(name))),
        )) &&
      (!filters.code || !!p.code) &&
      terms.every((term) =>
        [
          p.title,
          p.summary,
          ...p.authors,
          ...p.institutions,
          ...p.labels,
          ...p.topics,
          p.id,
          p.doi,
          categoryName(p.category),
        ]
          .join(" ")
          .toLowerCase()
          .includes(term),
      ),
  );
}
export function countBy(papers: Paper[], field: "category" | "institutions") {
  const counts = new Map<string, number>();
  for (const paper of papers)
    for (const key of new Set(
      field === "category" ? [paper.category] : paper.institutions,
    ))
      counts.set(key, (counts.get(key) || 0) + 1);
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
export function wikiHref(href: string): string {
  const match = href.match(
    /^(?:\.\/)?(?:\.\.\/papers\/)?([a-z0-9_]+)\.md(#[^\s]*)?$/i,
  );
  if (match) return `/papers/${match[1]}/${match[2] || ""}`;
  if (href === "../index.md" || href === "/wiki/index.md")
    return "/categories/";
  if (href === "../institutions.md") return "/institutions/";
  return href;
}
