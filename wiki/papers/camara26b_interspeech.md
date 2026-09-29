---
id: camara26b_interspeech
category: phonetics-linguistics
labels: [multilingual]
institutions: ["Universidad Politecnica de Madrid", "Massachusetts Institute of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1379
pdf: https://www.isca-archive.org/interspeech_2026/camara26b_interspeech.pdf
---

# Word Lengthening as a Function of Utterance Position: A Multi-Corpus Study

*Mateo Cámara, José Luis Blanco, Juan Ignacio Godino-Llorente, Jeung-Yoon Choi, Stefanie Shattuck-Hufnagel*

[PDF](https://www.isca-archive.org/interspeech_2026/camara26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/camara26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1379)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — A multi-corpus empirical study demonstrating that turn-final words are significantly lengthened compared to mid-sentence words across English and Spanish, providing a robust prosodic cue for conversational turn projection.

## Key contributions

- Quantified turn-final word lengthening across four diverse corpora spanning conversational, task-oriented, and read speech (>500 speakers, ~39,500 turns, ~245,000 tokens).
- Validated via strict matched-word, within-speaker comparisons (yielding an average ~80 ms increase, p < 0.001) that the effect is not an artifact of lexical choice.
- Localized the lengthening effect primarily to word-final syllables using time-aligned syllable segmentations (Cohen's d = 0.89).
- Linked turn-final lengthening to prosodic boundary strength using ToBI-style break indices, showing durational scaling analogous to phrase-boundary hierarchies.

## Problem

Efficient conversational turn-taking requires interlocutors to predict turn endings within a few hundred milliseconds, a timeframe shorter than typical speech production latencies. While prior work highlights the role of syntax, semantics, and prosodic phrase-final lengthening (largely in read speech), it remains unclear whether utterance-final lengthening in spontaneous conversation is robust across speech styles and languages, whether it represents true prosodic modification or merely lexical selection, and how it is distributed within words. Addressing these gaps is crucial for building accurate computational models of human turn-taking and spoken dialogue systems.

## Method

The authors analyze four well-established corpora: Switchboard and Columbia Games (English conversational/task-oriented), BU Radio News (English read broadcast), and Glissando (Spanish). Tokens are categorized into turn-final (TF) if immediately preceding a speaker change or long turn-completion silence, and mid-sentence (MS) otherwise, excluding backchannels (e.g., "yeah", "mm-hm", representing ~5.9% of tokens). To decouple lexical choice from prosodic modification, the study pairs occurrences of the exact same word uttered by the same speaker in both turn-final and mid-sentence positions, evaluating both a strict condition (same session) and a relaxed condition (any session).

For syllable-level localization, Switchboard and Glissando corpora with time-aligned syllable segmentations are utilized to compare polysyllabic word-final versus non-final syllables. Prosodic boundary strength is graded using ToBI-style break indices mapped to word tokens and categorized into low (0-1), medium (2), and high (3-4) boundaries. Statistical analyses rely on Welch's t-tests for independent groups, paired t-tests for matched-word pairs, and Cohen's d for standardized effect sizes, validating the findings across word-length stratifications and conversation sides.

## Experimental setup

Evaluated on four corpora: Switchboard (17,151 TF / 79,736 MS tokens), Columbia Games (7,437 TF / 66,417 MS tokens), BU Radio (7,821 TF / 23,954 MS tokens), and Glissando (7,061 TF / 36,161 MS tokens). A total of 39,470 turn-final and 206,268 mid-sentence tokens were analyzed. Baselines compared across speech styles (spontaneous, task-oriented, read), word lengths, syllable counts, and prosodic break indices. Metrics include mean word and syllable durations, duration differences in milliseconds, ratios, and Cohen's d effect sizes.

## Results

Across all pooled corpora excluding backchannels, turn-final words average 0.44 s compared to 0.24 s for mid-sentence words, yielding a mean difference of 203.1 ms (ratio = 1.85x, Cohen's d = 1.22). In corpus-specific evaluations, effect sizes range from d = 0.78 in Columbia Games (132 ms difference) to d = 1.47 in Glissando (254 ms difference). Matched-word controls show a persistent elongation of 79.9 ms (strict pairs, N = 9,018, d = 0.59) and 81.1 ms (relaxed pairs, N = 6,547, d = 0.69). Syllable-level stratification indicates that word-final syllables carry the bulk of the effect (d = 0.89), whereas non-final syllables show virtually no turn-position contrast (d = 0.01). Prosodic boundary strength correlates strongly with duration, moving from 0.22 s for low boundaries to 0.44 s for high boundaries (d = 1.35). Backchannels show negligible lengthening (∆ = 22 ms, d = 0.13), confirming they do not drive the phenomenon.

| Dataset / Condition | TF Duration (s) | MS Duration (s) | Delta (ms) | Cohen's d |
|---|---|---|---|---|
| Columbia Games | 0.38 | 0.25 | 132 | 0.78 |
| Switchboard | 0.40 | 0.22 | 179 | 1.19 |
| BU Radio | 0.50 | 0.30 | 201 | 1.08 |
| Glissando | 0.51 | 0.26 | 254 | 1.47 |
| Pooled (Backchannels Excluded) | 0.44 | 0.24 | 203 | 1.22 |

## Limitations

The study is restricted to English and Spanish (both stress-timed languages), leaving generalization to syllable-timed, mora-timed, or tone languages open. The analysis does not control for information structure features such as focus or information givenness, which are known to modulate word duration. Furthermore, corpus heterogeneity prevents a unified multi-variable regression model for speech rate and syntax, and automated word boundaries near turn ends may introduce minor estimation jitter.

## Why read this

Speech and ML researchers building real-time turn-taking models or expressive text-to-speech systems should read this to understand the quantitative magnitude (~200 ms pooled, ~80 ms lexically controlled) and precise syllable-level localization of turn-final prosodic lengthening.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computational turn-taking models, spoken dialogue systems, conversational agents, and expressive text-to-speech synthesis.

## Institutions / 機構

Universidad Politecnica de Madrid, Massachusetts Institute of Technology

**Funding / 經費:** Ministry of Economy and Competitiveness of Spain, Fundacion Santander, MISTI MIT Global Experiences program

## Related

- [Less can be More: What Aspects of Speech Drive End-of-Turn Detection](sharon26_interspeech.md) — complementary · relatedness 2.0/3
- [Towards an understanding of prosodic cue weighting for turn-end classification in older adults with varying hearing abilities](curetti26_interspeech.md) — same problem · relatedness 1.9/3
- [Speaker-Specific and Language-Dependent Temporal Organization in Bilingual Political Speech](hosseinikivanani26b_interspeech.md) — shared technique · relatedness 1.9/3
- [Non-linear Effects of Semantic Relevance on Word Duration in Spontaneous Speech](sun26c_interspeech.md) — same problem · relatedness 1.9/3
- [The Sound of Code-Switching: Prosodic Profiles of Spontaneous Spanish-English Speech](bhattacharya26_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
