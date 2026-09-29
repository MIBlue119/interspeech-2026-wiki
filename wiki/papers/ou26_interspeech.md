---
id: ou26_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-234
pdf: https://www.isca-archive.org/interspeech_2026/ou26_interspeech.pdf
---

# Positioning Effect of Syllable Shortening on Speech Segmentation: Evidence from Mandarin Listeners

*Shu-Chen Ou*

[PDF](https://www.isca-archive.org/interspeech_2026/ou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-234)

**Category:** `phonetics-linguistics`

**TL;DR** — This study investigates how syllable shortening position affects speech segmentation in Mandarin listeners using an artificial language paradigm, finding that middle-syllable shortening significantly improves word segmentation while final-syllable shortening impairs it.

## Key contributions

- Demonstrates that word-internal syllable shortening (middle-syllable shortening) facilitates speech segmentation in native Mandarin listeners.
- Shows that word-final syllable shortening significantly hinders segmentation by conflicting with listener expectations of boundary lengthening.
- Provides empirical evidence from an artificial language experiment (N=120) that durational reduction can serve as a functional cue to internal unit structure rather than just noise.
- Links perceptual processing of durational reduction to native language phonotactic experiences, such as the systematic reduction of middle syllables in Mandarin trisyllabic words.

## Problem

Continuous speech lacks reliable acoustic pauses between words, forcing the human auditory system to rely on distributional cues like transitional probabilities (TPs) alongside phonetic markers. While prior research extensively documents how salient phonetic cues like vowel or consonant lengthening signal word boundaries, the perceptual role of prosodic reduction—such as syllable shortening—remains largely understudied. In natural languages like Mandarin, middle syllables in trisyllabic words are frequently and systematically reduced, but it is unclear whether listeners exploit this non-salient reduction as a positive cue for internal word structure.

## Method

The experiment used an artificial language learning paradigm consisting of a continuous speech learning phase and a two-alternative forced-choice test phase. Six trisyllabic CVCVCV words (e.g., /banume/) and six part-words crossing word boundaries were constructed from a shared syllable inventory, maintaining a within-word TP of 1.0 and a cross-boundary TP of approximately 0.2. Component syllables were recorded by a male native Taiwan Mandarin speaker, normalized to 300 ms duration (150 ms consonant, 150 ms vowel), and synthesized with a flat F0 contour of 130 Hz using Praat to strip unintended prosodic variation.

Four experimental conditions were established by manipulating syllable duration to 150 ms: a TP-only control (all syllables 300 ms), Initial Shortening (IS, first syllable 150 ms), Middle Shortening (MS, second syllable 150 ms), and Final Shortening (FS, third syllable 150 ms). Participants listened to the continuous speech stream for 11-12 minutes via headphones using E-Prime 3.0, then completed 36 test trials where they identified which of two sequences matched the learned words. Responses were analyzed using a mixed-effects logistic regression model in R with condition as a fixed effect and word random intercepts.

## Experimental setup

One hundred and twenty native Mandarin listeners (mean age 26.78 years, 67 females, 53 males) participated, with 30 randomly assigned to each of the four duration conditions. Performance was evaluated via 2-alternative forced-choice identification accuracy (36 trials per participant) and analyzed using mixed-effects logistic regression.

## Results

Mean segmentation accuracy rates were 55.56% for the TP-only control, 55.46% for Initial Shortening (IS), 65.28% for Middle Shortening (MS), and 52.87% for Final Shortening (FS). The mixed-effects logistic regression revealed that Middle Shortening significantly enhanced segmentation relative to the baseline (beta = 0.307, SE = 0.13, z = 2.29, p = 0.0217). Conversely, Final Shortening significantly impaired segmentation performance compared to the baseline (beta = -0.348, SE = 0.13, z = -2.64, p = 0.0084). The Initial Shortening condition showed no statistically significant difference from the control baseline (beta = -0.105, SE = 0.13, z = -0.79, p = 0.428).

| Condition | Mean Accuracy (%) | Logistic Estimate (beta) | p-value |
|---|---|---|---|
| TP-only (Control) | 55.56% | Baseline (1.022) | < 0.001 |
| Initial Shortening (IS) | 55.46% | -0.105 | 0.428 |
| Middle Shortening (MS) | 65.28% | +0.308 | 0.021 |
| Final Shortening (FS) | 52.87% | -0.349 | 0.008 |

## Limitations

The study is scoped exclusively to native Mandarin listeners, limiting direct cross-linguistic generalization given that reduction and durational cues are processed differently across languages. The artificial language vocabulary was restricted to trisyllabic CVCVCV items with flat F0 contours and controlled syllable durations, which abstracts away from the acoustic complexity, tonal variations, and coarticulation of natural speech. Furthermore, only single-syllle reduction positions were tested independently, leaving the potential cumulative or interactive effects of multi-cue reductions unexplored.

## Why read this

Speech researchers and psycholinguists studying spoken word recognition and speech segmentation should read this work to understand how non-salient prosodic reductions shape lexical boundary perception. It challenges the view that durational cues only signal boundaries, demonstrating that listeners use syllable reduction as a positive cue to internal word structure.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving computational speech segmentation models, acoustic-phonetic frontend training for spoken language understanding systems, and cross-linguistic studies on human speech perception.

## Institutions / 機構

National Sun Yat-sen University

**Funding / 經費:** National Science and Technology Council

## Related

- (link related pages by id as the wiki grows)
