---
id: hosseinikivanani26b_interspeech
category: prosody
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1335
pdf: https://www.isca-archive.org/interspeech_2026/hosseinikivanani26b_interspeech.pdf
---

# Speaker-Specific and Language-Dependent Temporal Organization in Bilingual Political Speech

[PDF](https://www.isca-archive.org/interspeech_2026/hosseinikivanani26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hosseinikivanani26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1335)

**TL;DR** — This study analyzes spontaneous bilingual political speech in Luxembourgish and French, demonstrating that vowel timing and speaking rate are systematically driven by language choice while consonant timing preserves speaker-specific signatures.

## Problem

Most empirical work on speech rhythm and persuasive speech focuses on monolingual English, leaving open how bilingual speakers organize timing when switching between languages in high-stakes public settings. Understanding these dynamics is crucial because politicians must satisfy language-specific timing constraints while maintaining audience authority, yet it remains unknown how much rhythmic variance reflects speaker identity, language, or gender.

## Method

The authors analyze 400 spontaneous sentences (20 Luxembourgish and 20 French per speaker) from ten high-profile Luxembourgish politicians (5 female, 5 male) collected from parliamentary recordings and press conferences. Initial forced alignments are generated using WebMAUS and manually corrected in Praat to build sentence and consonant-vowel (CV) tiers. Duration-based rhythm metrics are extracted, including means and standard deviations of consonant and vowel durations (C, V, Delta C, Delta V), pairwise variability indices (rPVI, nPVI), and speaking rate. Variance decomposition uses intraclass correlation coefficients (ICC) for speaker identity and R-squared for language choice, supplemented by paired t-tests and two-way ANOVAs with Benjamini-Hochberg FDR correction.

## Results

French speech exhibits significantly longer and more variable vowels and vocalic intervals compared to Luxembourgish (e.g., Mean V, Delta V, and rPVI.V show large effect sizes with Cohen's d around -1.41 to -1.71, p < 0.01). Conversely, consonant-based metrics show weak, non-significant language differences and retain higher speaker ICC values. Luxembourgish is spoken significantly faster than French for both syllable rate (d = +1.12, p = 0.020) and segment rate (d = +2.10, p = 0.002). No significant Language by Gender interactions emerge after FDR correction, indicating that female and male politicians adopt comparable bilingual rhythm strategies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and linguists building multilingual speech technologies, text-to-speech systems, and prosody models for bilingual communities or political media analysis.

## Limitations

The dataset is restricted to a modest sample of ten elite politicians, limiting generalizability beyond high-stakes public speaking niches, and rhythm metrics are aggregated per speaker-by-language which collapses fine-grained sentence-level variability.

## Related

- (link related pages by id as the wiki grows)
