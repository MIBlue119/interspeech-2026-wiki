---
id: zhang26g_interspeech
category: phonetics-linguistics
labels: [low-resource, multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-660
pdf: https://www.isca-archive.org/interspeech_2026/zhang26g_interspeech.pdf
---

# Prosodic Realization of Focus in Yi-Mandarin Bilingual Speakers: On-Focus Expansion without Post-Focus Compression

*Ziyu Zhang, Chenyu Li*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-660)

**Category:** `phonetics-linguistics` · **Labels:** `low-resource`, `multilingual`

**TL;DR** — This paper investigates prosodic focus realization in Yi-Mandarin bilingual speakers, demonstrating a complete dissociation where on-focus expansion is fully acquired in L2 Mandarin, while post-focus compression is entirely absent regardless of language experience.

## Key contributions

- Demonstrates that Yi-Mandarin bilinguals produce on-focus F0 and intensity expansion fully comparable to native Beijing Mandarin speakers.
- Establishes a complete absence of post-focus compression (PFC) across initial, medial, and final focus conditions in Yi-Mandarin L2 speech.
- Shows that individual variation in Mandarin language background (exposure, age of onset, proficiency, and use) does not predict post-focus F0 reduction.
- Provides empirical support for the functional independence of on-focus expansion and post-focus compression as separate prosodic modules.

## Problem

Post-focus compression (PFC) is present in languages like Beijing Mandarin, English, and Japanese, but entirely absent in tone languages such as Yi (Nuosu), Cantonese, and Southern Min. Prior research indicates that PFC does not easily transfer from an L1 to an L2, but it remains unclear whether the mechanism can emerge when the L1 completely lacks it. Understanding this boundary is critical for resolving whether on-focus expansion and post-focus compression are governed by unified mechanisms or distinct prosodic modules under the PENTA framework.

## Method

The study evaluates 21 Yi-Mandarin bilingual speakers (YI) and 5 Beijing Mandarin native controls (BJ). Speech materials consist of three-word Mandarin sentences where every syllable shares the same lexical tone (T1-T4) to isolate prosodic focus from tone-driven F0 variations. Focus conditions include Initial, Medial, and Final focus, elicited via wh-questions, plus a Neutral baseline elicited by general questions. Recordings were gathered via laptop-mounted microphones at 44.1 kHz, word boundaries were aligned via the Montreal Forced Aligner, and F0, intensity, and duration were extracted using Praat.

Raw F0 values were converted to semitones (st) relative to each speaker's median F0, time-normalized to 10 equidistant points per word, and subtracted from neutral baseline repetitions to compute trial-level delta values (delta-F0, delta-intensity, delta-duration). Linear mixed-effects (LME) models were fitted with speaker and sentence random intercepts to evaluate group, focus condition, and word position interactions. Individual language background questionnaires were additionally analyzed using z-scored predictors to test their correlation with post-focus F0 reduction.

## Experimental setup

The dataset includes 21 native Yi speakers from Puge County, Liangshan Yi Autonomous Prefecture, and 5 native Beijing Mandarin speakers as controls, totaling 4,662 tokens across 16 condition-sentence combinations repeated 5 times. The study uses linear mixed-effects models via lme4 and lmerTest, Satterthwaite's approximation for F-tests, and emmeans with Bonferroni corrections for post-hoc pairwise contrasts.

## Results

The LME yielded a significant three-way interaction across groups, focus conditions, and word positions (F(4, 4686.1) = 49.61, p < 0.001). At in-focus positions, BJ and YI speakers showed no significant differences in F0 expansion (estimates between -0.05 to 0.26 st, all p > 0.10). At post-focus positions, BJ speakers exhibited substantially lower delta-F0 values than YI speakers (estimates -1.33 to -2.48 st, all p < 0.001), where YI speakers stayed near zero (+0.22 st). Cohen's d on speaker-level means was negligible for on-focus expansion (d = -0.31) but extremely large for post-focus compression (d = -5.44).

Intensity results replicated the F0 pattern, showing no significant difference at in-focus positions, but significantly greater intensity reduction for BJ than YI at post-focus positions (e.g., initial W3 estimate = -2.70 dB, p < 0.001). Duration results were partially confounded by general group speech rate differences, showing group discrepancies at pre-focal and final-focus positions. None of the four Mandarin language experience predictors significantly predicted delta-F0 at post-focus positions among YI speakers (p > 0.11), largely because only 3 of 21 YI speakers produced any negative post-focus deltas.

| System / Condition | In-Focus F0 Delta (st) | Post-Focus F0 Delta (st) | In-Focus Intensity Delta (dB) | Post-Focus Intensity Delta (dB) |
|---|---|---|---|---|
| Beijing Control (BJ) | +0.68 to +0.34 | -1.11 to -2.34 | +0.40 to -0.06 | -1.19 to -2.70 |
| Yi-Mandarin Bilingual (YI) | +0.71 to +0.50 | +0.19 to +0.25 | +0.34 to +0.00 | +0.05 to +0.10 |

## Limitations

The duration measurements showed group differences at pre-focal and final-focus positions, indicating a general speech rate difference between the groups that complicates duration as a pure index of PFC. The sample size for the control group is small (n=5), and the Yi group's language background predictors suffer from restricted variance given that nearly all Yi speakers completely lacked post-focus compression.

## Why read this

Researchers studying L2 prosody, tone languages, and speech production models will find this a compelling test of prosodic transfer limits. It provides definitive evidence that local and global prosodic mechanisms dissociate entirely when L1 grammar lacks a target feature.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnostic tools for L2 speech acquisition, computer-assisted pronunciation training systems for bilingual minority language speakers, and cross-lingual text-to-speech prosody adaptation.

## Institutions / 機構

Flinders University, Johns Hopkins University

## Related

- (link related pages by id as the wiki grows)
