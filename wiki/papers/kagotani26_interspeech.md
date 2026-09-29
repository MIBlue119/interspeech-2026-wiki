---
id: kagotani26_interspeech
category: phonetics-linguistics
institutions: ["University of Tsukuba", "University of Amsterdam"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2956
pdf: https://www.isca-archive.org/interspeech_2026/kagotani26_interspeech.pdf
---

# Effects of distributional bias in vowels and consonants on the Speech-to-Song Illusion

*Haruki Kagotani, Hiroko Terasawa, Makiko Sadakata*

[PDF](https://www.isca-archive.org/interspeech_2026/kagotani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kagotani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2956)

**Category:** `phonetics-linguistics`

**TL;DR** — This study investigates how phonological distributional bias (in vowels and consonants) and instructional priming (song vs. rap) influence the Speech-to-Song illusion, finding that biased phoneme distributions significantly enhance perceived musicalization and that rap instructions yield higher transformation ratings than song instructions.

## Key contributions

- Demonstrates that segmental-level phonological structures, specifically vowel or consonant distributional biases, systematically strengthen the Speech-to-Song (STS) illusion.
- Introduces a novel 'speech-to-rap' evaluation framework alongside traditional song-likeness, showing that rap instructions elicit consistently higher transformation ratings due to a better affinity for natural speech pitch fluctuations.
- Establishes that while either vowel bias or consonant bias alone is sufficient to significantly boost the perceptual illusion relative to non-biased controls, combining both biases does not yield a statistically significant additive effect.
- Provides a controlled experimental dataset of 40 Japanese short phrases (9 morae each) systematically balanced across a 2x2 vowel and consonant bias factorial design.

## Problem

Prior research on the Speech-to-Song (STS) illusion has heavily prioritized prosodic features like pitch stability and temporal regularity, or listener characteristics such as musical aptitude and linguistic background. However, the impact of segmental phonological structures—such as distributional biases and rhymes inspired by rap music—has not been directly tested within the STS paradigm. Understanding whether phonological distributional structure drives musicalization helps clarify the cognitive boundaries between speech, poetry, rap, and song.

## Method

The experiment manipulated phonological distributional structures across four conditions: Non-bias, Vowel-bias-only, Consonant-bias-only, and Both-bias. Vowel bias was controlled by repeating specific elements from the five Japanese vowels (/a/, /i/, /u/, /e/, /o/) and the moraic nasal (/N/), quantified via Shannon entropy of vowel occurrence (ranging from 0.00 to 2.50). Consonant bias was manipulated by categorizing consonants into sonorants (nasals, liquids, glides) and obstruents (plosives, fricatives, affricates) based on the major manner of articulation, using Shannon entropy (ranging from 0.00 to 0.99) to control distribution. Stimuli consisted of 40 short Japanese phrases of approximately 9 morae (duration 1.0 to 1.5 seconds), normalized to a peak amplitude of -3 dB and recorded by a professional male native Japanese speaker in a low-noise environment.

Participants evaluated the stimuli in two distinct blocks using counterbalanced sets (Set X and Set Y) under two instructional conditions: 'Song' instruction (judging song-likeness on a 7-point Likert scale) and 'Rap' instruction (judging rap-likeness on a 7-point Likert scale). In each trial, participants rated stimuli after a single exposure and again after ten rapid repetitions (with a 400 ms inter-stimulus interval), alongside subjective understanding ratings. The primary dependent variable measuring the intensity of the STS illusion was the mean perceptual change (post-repetition minus pre-repetition rating), analyzed via a three-way repeated-measures ANOVA.

## Experimental setup

The listening experiment included 120 adult native Japanese-speakers recruited via Lancers and hosted on the OpenLab platform. Stimuli comprised 40 Japanese phrases divided equally across non-biased, vowel-biased, consonant-biased, and doubly-biased conditions. Objective musical sophistication was measured using the Japanese version of the Goldsmiths Musical Sophistication Index (Gold-MSI). Statistical evaluation used a three-way repeated-measures ANOVA with factors of Instruction (Song/Rap), Vowel Bias (Present/Absent), and Consonant Bias (Present/Absent), followed by Bonferroni-corrected simple effect analyses.

## Results

A three-way repeated-measures ANOVA revealed significant main effects for all factors: Instruction (F(1,119) = 6.20, p = .014, eta^2 = .011), Vowel Bias (F(1,119) = 19.11, p < .001, eta^2 = .033), and Consonant Bias (F(1,119) = 19.90, p < .001, eta^2 = .019). The Rap instruction elicited a significantly larger mean perceptual change (M = 0.95, SE = 0.069) than the Song instruction (M = 0.84, SE = 0.070). Similarly, presence of vowel bias increased the illusion magnitude (M = 1.00) over its absence (M = 0.80), and consonant bias increased it (M = 0.97) over its absence (M = 0.82).

A significant two-way interaction emerged between Vowel Bias and Consonant Bias (F(1,119) = 6.25, p = .014, eta^2 = .006). Post-hoc Bonferroni-corrected tests showed that the Non-bias condition elicited significantly lower ratings than all biased conditions (all ps < .001; mean differences of -0.28, -0.23, and -0.35 vs. Vowel-bias-only, Consonant-bias-only, and Both-bias, respectively). However, no significant differences were observed among the single-bias and double-bias conditions (ps > .10), indicating that a single phonological bias is sufficient to trigger the enhancement.

| Condition | Instruction | Mean Perceptual Change (Rating Diff) |
|---|---|---|
| Non-bias | Song / Rap Combined | 0.82 (Baseline) |
| Vowel-bias-only | Song / Rap Combined | 1.10 |
| Consonant-bias-only | Song / Rap Combined | 1.05 |
| Both-bias | Song / Rap Combined | 1.17 |
| Rap Instruction | All Conditions | 0.95 |
| Song Instruction | All Conditions | 0.84 |

## Limitations

The study is restricted to Japanese phonotactics and native Japanese speakers, limiting immediate cross-linguistic generalization, particularly given known interactions between tone/pitch-accent languages and the STS illusion. The definition of distributional bias used binary presence/absence checks and broad sonorant-obstruent categorizations rather than continuous fine-grained n-gram or distinctive feature metrics. Furthermore, the online crowdsourcing setup introduces uncontrolled acoustic environments across participants despite headphone instructions.

## Why read this

Researchers studying speech perception, music cognition, and the boundary between language and music will find this paper valuable for demonstrating that segmental phonology and instructional framing drive the Speech-to-Song illusion independently of traditional melodic prosody.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving computational models of musicality perception in speech, designing audio content for speech-to-music artistic transformations, and advancing text-to-speech prosody generation for rhythmic styles like rap.

## Institutions / 機構

University of Tsukuba, University of Amsterdam

**Funding / 經費:** JSPS KAKENHI

## Related

- No closely related Interspeech 2026 papers found.

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
