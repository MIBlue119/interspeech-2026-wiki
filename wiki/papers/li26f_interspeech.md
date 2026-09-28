---
id: li26f_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-576
pdf: https://www.isca-archive.org/interspeech_2026/li26f_interspeech.pdf
---

# Perceptual Trade-offs Across Segmental and Suprasegmental Levels: Comparing Ganong Patterns in Mandarin Consonants and Lexical Tones

[PDF](https://www.isca-archive.org/interspeech_2026/li26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-576)

**TL;DR** — This paper investigates individual perceptual trade-offs between acoustic-phonetic processing and lexical knowledge, discovering that a shared reliability-based weighting strategy operates uniformly across both segmental (consonants) and suprasegmental (lexical tones) levels.

## Problem

While the Ganong effect demonstrates that top-down lexical knowledge biases the perception of ambiguous speech, it remains unknown whether individual differences in acoustic-phonetic processing and lexical reliance generalize across segmental (temporal cues like VOT) and suprasegmental levels (spectral cues like lexical tones). Understanding this relationship is critical to determining whether human speech perception utilizes a domain-general weighting strategy or level-specific mechanisms.

## Method

The study utilized a within-subject design with 57 native Mandarin speakers participating in a 320-trial two-alternative forced-choice phoneme categorization task. The stimuli comprised 16-step continua for Mandarin Tone 1-Tone 2 contrasts (synthesized via Tandem-STRAIGHT with standardized pitch contours) and unaspirated-aspirated /t/-/th/ consonant contrasts (VOT range 5-76 ms). Generalized Linear Mixed-Effects Models (GLMMs) were fitted to evaluate group-level identification curves. Individual acoustic-phonetic processing sensitivity was quantified as the absolute slope coefficient from ambiguous steps, while lexical reliance was measured as Cohen's d across bias conditions.

## Results

Participants exhibited robust categorical perception across both conditions, with high endpoint accuracy averaging 98.0% for tones and 97.6% for consonants. Group-level paired t-tests revealed no significant differences between identification slopes or Ganong effect magnitudes across contrast types. Cross-contrast correlations between tonal and consonantal measures were weak and non-significant for both slopes (rho = 0.237, p = 0.076) and Ganong effect magnitudes (rho = 0.186, p = 0.166), indicating level-specific processing capacities. However, Spearman rank correlations showed a significant negative relationship between slopes and Ganong effects for both tonal (rho = -0.537, p < 0.001) and consonantal contrasts (rho = -0.466, p < 0.001), demonstrating a universal reliability-based weighting strategy where listeners with less precise acoustic processing compensate via greater lexical reliance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech scientists, cognitive psychologists, and engineers designing robust automatic speech recognition or human-machine interfaces that account for human perceptual variability and ambiguity resolution.

## Limitations

The study is restricted to native Mandarin speakers evaluating specific tonal and consonantal contrasts, leaving open whether these cross-level trade-offs generalize to stress-accent languages or non-tonal phonologies.

## Related

- (link related pages by id as the wiki grows)
