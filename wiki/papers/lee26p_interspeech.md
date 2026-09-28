---
id: lee26p_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1786
pdf: https://www.isca-archive.org/interspeech_2026/lee26p_interspeech.pdf
---

# Cross-linguistic word-medial stop lenition: A Functional PCA approach

*Seung Suk Lee, Morgan Sonderegger, Meghan Clayards*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1786)

**TL;DR** — This paper investigates word-medial continuity lenition across nine languages using Functional Principal Component Analysis (FPCA) on intensity contours, revealing a near-universal tendency for intervocalic stops to be weaker (shorter and/or less intense) word-medially than word-initially.

## Key contributions

- Applies a unified FPCA-based methodology to quantify stop lenition across 9 diverse languages without discarding extreme tokens.
- Analyzes 1.47 million intervocalic stop instances (/V1CV2/) drawn from large read and spontaneous speech corpora.
- Fits Bayesian mixed-effects models controlling for speech rate, place of articulation, vowel height, and syllable predictability.
- Provides supplementary stress analyses showing that word stress and word position independently modulate stop lenition and duration.

## Problem

Stop lenition is pervasive across languages, but prior work has relied on heterogeneous methods, small language samples (mostly lab speech), and measures requiring clear intensity dips that force the exclusion of up to 10% of highly lenited tokens. This methodological fragmentation obscures whether cross-linguistic variations in lenition reflect genuine linguistic differences or measurement artifacts. Resolving this is critical to evaluating the continuity lenition hypothesis, which posits that weakened word-medial stops act as a universal prosodic segmentation cue for listeners.

## Method

The authors extract roughly 1.47 million intervocalic stop tokens (/V1CV2/) from speech corpora, capturing nasal and oral stops across different laryngeal categories (lenis/aspirated/fortis for Seoul Korean, voiced/voiceless for others) at word-initial and word-medial syllable onsets. Consonant boundaries are registered as landmarks to time-normalize and smooth 10-ms interval intensity contours, which are then median-centered within each token. Functional Principal Component Analysis (FPCA) pooled across all nine languages identifies the primary dimension of variation (PC1), accounting for 40.3% of the variance and capturing both the magnitude of the intensity 'dip' and the steepness of the transitions relative to neighboring vowels.

For statistical evaluation, two Bayesian mixed-effects linear regression models are fitted per language using Stan/brms: a PC1 model and a log-transformed phone duration model. Both models use flat priors for fixed effects and weakly informative priors for random effects (Student-t for variances, LKJ(1.5) for correlations), estimated via Hamiltonian MCMC with 4 chains of 4,000 iterations and 50% warm-up. Predictors include speech rate, place of articulation, neighboring vowel height, syllable predictability, word position, and stop type, with random slopes for word position and stop type across speakers, words, and VCV sequences. A supplementary stress analysis is run on five languages (English, German, Russian, Spanish, Swedish) where partial stress information is available to isolate lexical stress confounds.

## Experimental setup

Evaluated on 9 languages spanning three corpora: GlobalPhone (approx. 20 hours per language for French, German, Polish, Russian, Spanish, Swedish, Turkish; 100 speakers/lang), LibriSpeech (approx. 20-hour subset from 99 American English speakers out of 1000h), and the Seoul Corpus (approx. 24 hours of spontaneous speech from 40 speakers). Metrics include standardized FPCA PC1 weights and standardized log-transformed phone durations analyzed through Bayesian highest posterior density intervals.

## Results

PC1 captures 40.3% of variance and stratifies stop types in the expected acoustic hierarchy (nasal < voiced < voiceless). Across 9 languages, word-medial voiced (or Seoul Korean lenis) stops are nearly universally both shorter and more lenited. Exceptions include Spanish nasal stops (showing no significant position differences), Korean aspirated and Swedish voiceless stops (less lenited word-medially), and Korean fortis stops (longer word-medially).

| Language / Condition | Voiced/Lenis PC1 (Med-Init) | Voiced/Lenis Duration (Med-Init) |
| --- | --- | --- |
| English (EN) | -0.15 | -0.20 |
| German (GE) | -0.12 | -0.18 |
| French (FR) | -0.25 | -0.05 |
| Spanish (SP) | -0.22 | -0.02 |
| Russian (RU) | -0.18 | -0.01 |

## Limitations

The use of forced alignment may introduce unrecognized cross-linguistic alignment errors, particularly for highly lenited or elided tokens. Treating 'word-initial' as an approximation of prosodic structure creates noise because some word-initial boundaries may align with larger prosodic constituents while others are prosodically bound. Additionally, Seoul Korean is the sole spontaneous speech corpus used, confounding stylistic differences with language-specific phonology.

## Why read this

Speech researchers and phoneticians studying prosody and speech segmentation should read this to see how FPCA successfully scales corpus phonetics across multiple languages while cleanly handling extreme lenition tokens.

## Code

- https://github.com/seungsuklee/stop-lenition-fpca

## Applications

Improving acoustic-phonetic feature representations for speech recognition, text-to-speech prosody modeling, and cross-linguistic phonetic analysis tools.

## Related

- (link related pages by id as the wiki grows)
