---
id: hosseinikivanani26b_interspeech
category: phonetics-linguistics
labels: [multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1335
pdf: https://www.isca-archive.org/interspeech_2026/hosseinikivanani26b_interspeech.pdf
---

# Speaker-Specific and Language-Dependent Temporal Organization in Bilingual Political Speech

*Nina Hosseini-Kivanani, Nafiseh Taghva, Peter Gilles, Oliver Niebuhr*

[PDF](https://www.isca-archive.org/interspeech_2026/hosseinikivanani26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hosseinikivanani26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1335)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — An acoustic analysis of 400 spontaneous sentences from ten bilingual politicians reveals that duration-based speech rhythm metrics sharply divide by category: vowel timing is dictated by language choice (French showing significantly longer and more variable vowels), whereas consonant timing preserves stable speaker-specific signatures.

## Key contributions

- Evaluated 23 duration-based rhythm metrics across a balanced within-speaker dataset of 400 spontaneous political sentences in Luxembourgish and French.
- Demonstrated a structural asymmetry where vowel-based metrics (mean V, delta V, rPVI.V) exhibit large language-driven shifts (Cohen's d >= 1.41, p < 0.01) with near-zero speaker intraclass correlation (ICC).
- Found that consonant-based metrics (mean C, delta C, rPVI.C) maintain high speaker ICC values (up to 0.689) and weak, non-significant language differences.
- Established that politicians speak significantly faster in Luxembourgish than French (segment rate d = +2.10, p = 0.002), with language accounting for ~50% of rate variance.
- Showed via two-way ANOVA with Benjamini-Hochberg FDR correction that bilingual rhythm modulation and speaking rate adjustments are largely gender-neutral.

## Problem

Empirical speech rhythm research has overwhelmingly focused on monolingual English speakers or controlled reading tasks, leaving a gap in understanding how bilingual speakers temporally organize high-stakes public speech where language choice carries social meaning. Prior studies have struggled to untangle whether duration-based metrics reflect stable idiosyncratic speaker traits, stylistic choices, or language-inherent phonotactic constraints. Furthermore, it remains unknown whether female and male public figures deploy different gendered timing strategies across languages. Addressing this in a bilingual political context like Luxembourg—where Luxembourgish indexes national identity and French dominates prestige domains—provides crucial baseline insights for multilingual speech processing and prosodic modeling.

## Method

The corpus consists of spontaneous speech from 10 high-profile bilingual Luxembourgish politicians (5 female, 5 male) obtained from parliamentary records, press conferences, and interviews via the RTL Archive. Each speaker provided 20 spontaneous sentences in Luxembourgish and 20 in French (400 total intonationally and syntactically coherent sentence tokens). Audio was extracted at 16-kHz mono. Initial alignment was generated using WebMAUS and manually corrected in Praat to build a consonant-vowel (CV) tier, treating silences >= 200 ms as pauses and stop/affricate closures as consonantal intervals.

From the CV and pause tiers, 23 duration-based metrics were computed per sentence, including means, standard deviations (delta), and raw/normalized pairwise variability indices (rPVI, nPVI) for consonants, vowels, vocalic intervals, consonantal intervals, syllables, and intensity peaks, alongside syllable and segment speaking rates. Highly skewed metrics (pause counts, rPVI) were log-transformed, and all features were z-scored (mean 0, SD 1) across the dataset to standardize fixed-effect estimates.

Metrics were aggregated to obtain one value per speaker per language for statistical evaluation. Variance components were partitioned using one-way random effects intraclass correlation coefficients (ICC) for speaker identity and R-squared from one-way ANOVAs for language choice. Within-speaker language effects were assessed via paired t-tests (Cohen's d paired), while Language x Gender interactions were tested via two-way ANOVAs. P-values across all 23 metrics were adjusted using Benjamini-Hochberg false discovery rate (FDR) correction.

## Experimental setup

The dataset comprises 400 spontaneous sentence tokens from 10 elite bilingual politicians (5 female, 5 male) speaking Luxembourgish and French in comparable public and parliamentary settings. The study utilizes paired comparisons across 23 duration-based rhythm metrics, evaluated via paired t-tests, one-way random effects ICC, R-squared variance decomposition, and two-way ANOVAs with Benjamini-Hochberg FDR correction. Implementation relied on Python (scipy.stats, statsmodels, scikit-learn). The statistical design yielded 80% power to detect large effects (Cohen's d >= 0.9) at alpha = 0.05.

## Results

French speech exhibited significantly longer and more variable vowels and vocalic intervals compared to Luxembourgish, with large effect sizes: Mean V (d = -1.71, FDR p = 0.0049), delta V (d = -1.41, p = 0.0059), and rPVI.V (d = -1.57, p = 0.0049). Vocalic interval measures (Mean Vow, delta Vow, rPVI.Vow) mirrored this expansion (|d| >= 1.44, p < 0.01). Conversely, consonant-based metrics showed minimal, non-significant language differences (e.g., delta C d = +0.18, p = 0.6995; rPVI.C d = -0.06, p = 0.8887).

Variance decomposition confirmed that language choice dominated vowel metrics (R^2 between 0.38 and 0.43, ICC near zero), whereas consonant metrics displayed high speaker ICCs (e.g., Mean C ICC = 0.689, delta C ICC = 0.549) and low language R^2 values (<= 0.068). Speaking rate was substantially faster in Luxembourgish than French for both syllable rate (d = +1.12, p = 0.0204) and segment rate (d = +2.10, p = 0.0020), with segment rate variance heavily driven by language (R^2 = 0.499, ICC = 0.0). No significant Language x Gender interactions survived FDR correction.

| Metric | Luxembourgish (Lb) | French (Fr) | Paired d | p_Lang (FDR) | Speaker ICC | Language R^2 |
|---|---|---|---|---|---|---|
| Mean V | 0.0886 s | 0.1172 s | -1.71 | 0.0049 | 0.000 | 0.419 |
| delta V | 0.0607 s | 0.0950 s | -1.41 | 0.0059 | 0.000 | 0.433 |
| rPVI.V | 5.5494 | 8.2633 | -1.57 | 0.0049 | 0.000 | 0.426 |
| Mean C | 0.0994 s | 0.1043 s | -0.77 | 0.0889 | 0.689 | 0.068 |
| Rate Seg | 12.38 seg/s | 9.62 seg/s | +2.10 | 0.0020 | 0.000 | 0.499 |

## Limitations

The study relies on a modest sample size of 10 speakers and restricts its scope to elite politicians, limiting generalizability to casual bilingual populations or other sociolinguistic registers. Aggregating rhythm metrics at the speaker-by-language level collapses sentence-level temporal variance, reducing degrees of freedom for interaction tests. Furthermore, the analysis focuses strictly on acoustic production without evaluating perceptual salience or listener-rated impressions of charisma or fluency.

## Why read this

Speech and ML researchers building multilingual text-to-speech, speech synthesis, or prosody transfer models should read this to understand that rhythm cannot be modeled as a monolithic speaker trait across languages. It provides concrete evidence that acoustic rhythm features partition cleanly into language-governed vowel domains and speaker-governed consonant domains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multilingual text-to-speech (TTS) synthesis, cross-lingual voice cloning, and spoken language analysis systems needing accurate modeling of language-dependent prosodic and temporal structures.

## Institutions / 機構

University of Luxembourg, Radio Television Luxembourg, Shiraz University, University of Southern Denmark

**Funding / 經費:** Luxembourg National Research Fund

## Related

- (link related pages by id as the wiki grows)
