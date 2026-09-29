---
id: gonzalez26d_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-934
pdf: https://www.isca-archive.org/interspeech_2026/gonzalez26d_interspeech.pdf
---

# Minimum Token Thresholds and Stabilisation for Reliable Automatic Vowel Alignment: Empirical Study on TIMIT Vowels and MFA

*Simon Gonzalez, Jason Littlefield, Tao Hoang, Chloe Dean, Hayden Ooi, Myung Kim, Bradley Donnelly, Latchman Singh, Jennifer Biggs, Tim Cawley*

[PDF](https://www.isca-archive.org/interspeech_2026/gonzalez26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gonzalez26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-934)

**Category:** `phonetics-linguistics`

**TL;DR** — An empirical study on the Montreal Forced Aligner (MFA) using the TIMIT corpus determines the minimum token thresholds required for automatically extracted vowel acoustic features to reliably match manual annotations, finding that ~2,335 tokens are needed for stable F2 measurements.

## Key contributions

- Proposes a trajectory-based evaluation framework to determine the 'minimum viable dataset' for automatic forced alignment based on acoustic measurement stability rather than boundary temporal precision alone.
- Establishes concrete empirical token thresholds across vowel categories and features, showing that 85% of vowel-feature combinations improve significantly with scale.
- Demonstrates that duration measurements stabilise earliest (approx. 730 tokens), followed by F1 (approx. 1,088 tokens), while F2 requires the largest datasets (approx. 2,335 tokens).
- Identifies specific vulnerable vowels (AO, AW, OY) that require larger sample sizes or segment-specific validation due to higher variance or lower corpus frequency.

## Problem

Prior validations of automatic forced aligners like the Montreal Forced Aligner (MFA) focus exclusively on temporal boundary precision (start, end, or midpoint absolute displacement) rather than assessing whether extracted acoustic distributions reliably mirror manual segmentation. In sociophonetic and low-resource research, it remains unclear how much automatically aligned data is necessary to produce statistically and phonetically sound acoustic distributions. Without knowing this minimum viable dataset, researchers risk drawing flawed conclusions from uncorrected forced alignment outputs or wasting resources collecting unnecessary data.

## Method

The study uses the TIMIT speech corpus containing over 55,000 individual vowel tokens (mean 3,673 per vowel) with gold-standard manual phoneme boundaries. Automatic alignment was executed using version 3.0.5 of the Montreal Forced Aligner with the US.v2.0.0 English pre-trained acoustic model and dictionary without additional fine-tuning. For every vowel token, three acoustic features were extracted using Praat at the temporal midpoint: segmental duration (ms), first formant (F1), and second formant (F2). 

To evaluate convergence, token subsets were randomly sampled starting at 200 tokens and increased in increments of 50 tokens up to the maximum available, with each sampling step repeated 10 times. At each increment, linear mixed-effects models were fitted using the lmerTest R package, treating alignment source (manual vs. automatic) as a fixed effect and speaker and word as random intercepts. Improvement trajectories were mapped using absolute source-difference estimates averaged across repetitions. 

Three analytical stages quantified the trajectory: Kendall's tau for monotonic decrease trends (p <= 0.05), a stabilisation threshold formula evaluating when distance to the final estimate remained below tolerance epsilon for k=3 consecutive increments, and a 50% relative dataset size check to categorize early vs. late stabilisation.

## Experimental setup

Evaluated on the TIMIT corpus using over 55,000 vowel tokens spanning monophthongs and diphthongs. Automatic alignment performed via Montreal Forced Aligner v3.0.5 and US.v2.0.0 model. Statistical modeling implemented in R using lmerTest. Metrics include absolute source-difference estimates, Kendall's tau for trajectory trends, and absolute/percentage token stabilisation points.

## Results

Across all vowels, 85% of vowel-feature combinations (33/39) showed statistically significant improvements in alignment reliability as token counts increased, with F1 consistently improving across every vowel. Duration measurements stabilised earliest at an average of 24% of available data (approx. 730 tokens), F1 at 36% (approx. 1,088 tokens), and F2 required the most data, stabilising at 56% (approx. 2,335 tokens). Vowels AW and AO required the highest percentage threshold of available tokens to stabilise (86% and 82% respectively), whereas IH stabilised earliest at 31%. Non-significant improvements were observed in 6 out of 39 combinations, specifically for duration in AO, EH, and OY, and for F2 in AW, AY, and OY.

| Acoustic Feature | Mean Stabilisation % | Approx. Token Count | Earliest Stabilising Vowel | Latest Stabilising Vowel |
|---|---|---|---|---|
| Duration | 24% | ~730 | IH (3%) | EY (41%) |
| F1 | 36% | ~1,088 | IY (7%) | AE (40%) |
| F2 | 56% | ~2,335 | IY (20%) | AE (48%) |

## Limitations

The study's findings are derived entirely from the TIMIT corpus, which consists of clean, controlled, high-quality read speech, limiting direct generalizability to spontaneous, conversational, or noisy recordings. Factors such as coarticulation, background noise, varying speech styles, and non-US English language varieties are not accounted for. The thresholds serve as empirically informed guidelines rather than universal requirements across different acoustic models.

## Why read this

Speech researchers and sociophoneticists building or scaling large-scale automatic pipelines should read this to stop guessing sample size requirements and instead use data-driven token thresholds for acoustic reliability. It provides concrete proof of when adding more automatically aligned data hits a point of diminishing returns.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Optimizing data collection workflows for large-scale sociophonetic studies, corpus linguistics, and low-resource acoustic analyses where manual phoneme segmentation is unavailable.

## Institutions / 機構

Defence Science and Technology Group

## Related

- (link related pages by id as the wiki grows)
