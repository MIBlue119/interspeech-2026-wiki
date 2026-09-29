---
id: li26f_interspeech
category: phonetics-linguistics
institutions: ["Hong Kong Polytechnic University", "Shanghai Jiao Tong University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-576
pdf: https://www.isca-archive.org/interspeech_2026/li26f_interspeech.pdf
---

# Perceptual Trade-offs Across Segmental and Suprasegmental Levels: Comparing Ganong Patterns in Mandarin Consonants and Lexical Tones

*Jiaxin LI, Yi Weng, Yicheng Rong, Gang Peng*

[PDF](https://www.isca-archive.org/interspeech_2026/li26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-576)

**Category:** `phonetics-linguistics`

**TL;DR** — This study investigates whether the Ganong effect (lexical bias in speech perception) generalizes across segmental and suprasegmental levels by comparing Mandarin consonants and lexical tones within 57 subjects. It reveals that while individual processing capacities do not correlate across levels, individuals universally apply a reliability-based weighting trade-off where poorer acoustic-phonetic processing leads to greater lexical reliance.

## Key contributions

- Employs a within-subject design (N=57 native Mandarin speakers) to directly compare acoustic-phonetic processing and lexical reliance across segmental (consonant VOT) and suprasegmental (lexical tone) domains.
- Demonstrates that individual identification slopes and Ganong effect magnitudes do not significantly correlate between Mandarin tones and consonants, indicating level-specific processing capacities.
- Establishes a universal reliability-based trade-off principle: individuals with shallower acoustic-phonetic identification slopes consistently exhibit larger Ganong effects across both temporal consonantal cues and spectral tonal cues.
- Provides empirical data showing comparable group-level task difficulty and lexical integration magnitudes between spectral pitch-based tone perception and temporal VOT consonant perception.

## Problem

Prior research on individual differences in speech perception and the Ganong effect has focused almost exclusively on segmental contrasts like Voice Onset Time (VOT) in stop consonants, which rely on rapid temporal processing. It remains unclear whether this top-down lexical reliance generalizes to suprasegmental features like lexical tones, which rely primarily on spectral pitch contour processing handled by distinct neural pathways. Furthermore, previous studies left unverified whether processing capacities and integration strategies for resolving perceptual ambiguity are shared domain-general abilities or level-specific mechanisms.

## Method

The experiment utilized a within-subject 2-alternative forced-choice (2AFC) phoneme categorization paradigm consisting of 320 trials per participant. Stimuli comprised Mandarin Tone 1 (high-level) vs. Tone 2 (rising) contrasts and unaspirated /t/ vs. aspirated /th/ consonant contrasts, forming 16-step continua where endpoints were real words or pseudo-words. Tonal continua were synthesized using Tandem-STRAIGHT with standardized pitch contours, while consonantal VOT continua ranged from 5 to 76 ms; all items were normalized to 350 ms duration and 75 dB SPL.

Acoustic-phonetic processing precision was quantified as the absolute value of the step coefficient (Slope) derived from individual Generalized Linear Mixed-Effects Models (GLMMs) fitted with a binomial distribution on ambiguous steps 6 through 11. Lexical reliance was measured via Cohen's d representing the standardized difference in identification rates between opposing word/pseudo-word bias conditions. Group-level patterns were evaluated using maximal random-effect GLMMs, while individual relationships were examined using Spearman's rank correlations across the two contrast types to decouple processing capacity from weighting strategy.

## Experimental setup

Sixty-two university students were recruited; 5 were excluded due to incomplete data or low endpoint accuracy (<80%), leaving a final cohort of 57 native Mandarin speakers (28 females, 29 males, aged 22-29 years). The experiment used E-Prime 3 for presentation and R with the lme4 package for GLMM fitting. Metrics evaluated included categorization slope coefficients from GLMMs and Cohen's d for Ganong effect magnitude, compared via paired t-tests and Spearman's rank correlations.

## Results

Participants exhibited clear categorical perception and robust Ganong effects across both conditions, with high endpoint accuracies of 98.0% for tones and 97.6% for consonants. Group-level GLMMs showed significant negative step coefficients (Tonal: β = -4.59, p < 0.001; Consonantal: β = -4.48, p < 0.001) and bias effects (Tonal: β = -1.65, p < 0.001; Consonantal: β = -1.79, p < 0.001). Paired t-tests confirmed no significant differences between tonal and consonantal contrasts in identification slopes (t(56) = 1.30, p = 0.199) or Ganong effect sizes (t(56) = -1.09, p = 0.281).

Cross-contrast individual correlations were weak and non-significant for both slopes (ρ = 0.237, p = 0.076) and Ganong magnitudes (ρ = 0.186, p = 0.166), indicating level-specific processing resources. However, Spearman's correlations revealed a significant negative trade-off between individual slopes and Ganong effect magnitudes for both tonal (ρ = -0.537, p < 0.001) and consonantal contrasts (ρ = -0.466, p < 0.001), demonstrating that listeners with less precise bottom-up acoustic processing universally scale up top-down lexical reliance.

| System / Condition | Slope β | Bias β | Step × Bias β | Ganong Effect (Cohen's d) | Cross-Contrast Correlation (ρ) |
|---|---|---|---|---|---|
| Tonal Contrast | -4.59 | -1.65 | -0.50 (p = .083) | ~0.4 (approx) | 0.237 (Slope) / 0.186 (Ganong) |
| Consonantal Contrast | -4.48 | -1.79 | -0.75 (p = .025) | ~0.4 (approx) | N/A |

## Limitations

The study is restricted to native Mandarin speakers evaluating a specific set of tonal (Tone 1 vs. Tone 2) and consonantal (/t/ vs. /th/) contrasts, limiting immediate cross-linguistic generalization to non-tonal languages or other phonological categories. Spoken syllable frequencies across bias conditions were not fully controlled for natural lexical frequency, which may account for the significant step-by-bias interaction observed in consonants but not tones. The sample is limited to healthy young university adults, leaving open how age-related cognitive decline or clinical deficits interact with suprasegmental lexical weighting.

## Why read this

Speech perception and psycholinguistics researchers should read this paper to understand how cognitive weighting strategies are allocated across spectral and temporal auditory dimensions. It challenges simple domain-general resource models by showing that while processing capacities are strictly level-specific, the brain enforces a universal reliability-based trade-off strategy for resolving ambiguity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving computational speech recognition and spoken language understanding models by dynamically weighting acoustic-phonetic confidence against top-down language model probabilities, and designing diagnostic tests for auditory processing disorders.

## Institutions / 機構

Hong Kong Polytechnic University, Shanghai Jiao Tong University

**Funding / 經費:** Research Grants Council of the Hong Kong SAR, Shanghai Planning Project of Philosophy and Social Science

## Related

- [From Words to Sentences: Contextual Predictability Overrides Phonetic Ambiguity in Lexical Competition](chang26g_interspeech.md) — same problem · relatedness 1.9/3
- [Categorical Perception of Mandarin Tones in Jingpo Native Speakers](wang26z_interspeech.md) — same problem · relatedness 1.7/3
- [Perceptual compensation for tonal context in self-supervised speech models](kirby26_interspeech.md) — same problem · relatedness 1.7/3
- [Voice Onset Time Categorical Perception in Mandarin-Speaking People Who Stutter: A Zoom-In Nonword Study](kiyama26_interspeech.md) — shared technique · relatedness 1.6/3
- [The (non-)universality of prominence and Intonation Phrases: German and Hungarian listeners'' perception of an unfamiliar language](jabeen26_interspeech.md) — relatedness 1.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
