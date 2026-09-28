---
id: gonzalez26d_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-934
pdf: https://www.isca-archive.org/interspeech_2026/gonzalez26d_interspeech.pdf
---

# Minimum Token Thresholds and Stabilisation for Reliable Automatic Vowel Alignment: Empirical Study on TIMIT Vowels and MFA

[PDF](https://www.isca-archive.org/interspeech_2026/gonzalez26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gonzalez26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-934)

**TL;DR** — This study evaluates how token quantity affects automatic vowel alignment reliability using the Montreal Forced Aligner on the TIMIT corpus, revealing that most vowels stabilize around 50% of available tokens.

## Problem

While automatic forced alignment is standard in sociophonetic research, the minimum quantity of uncorrected data required to produce reliable acoustic measurements that match manual segmentation remains unclear. This ambiguity complicates data collection for low-resource languages and large-scale speech analyses where manual annotations are scarce. Determining these minimum thresholds helps researchers optimize study design and ensure statistical robustness without incurring unnecessary manual labor costs.

## Method

The authors utilize the TIMIT corpus containing over 55,000 vowel tokens and analyze them using Montreal Forced Aligner version 3.0.5 with the pre-trained English model v2.0.0. Incremental token subsets starting at 200 tokens and scaling up in steps of 50 are randomly sampled ten times per increment to evaluate acoustic features including segmental duration, F1, and F2 measured at the vowel midpoint. Linear mixed-effects models are fitted at each step with speaker and word as random intercepts to track error reduction trajectories. Delta-based metrics, Kendall's tau for monotonic trends, and stabilization threshold equations determine convergence points relative to maximum available data.

## Results

Across all evaluations, 85% of vowel-feature combinations show significant improvement in alignment reliability as token counts increase, with F1 showing the most consistent gains. Duration measurements stabilize earliest at approximately 24% of available tokens (about 730 tokens), whereas F2 requires the most data, stabilizing at around 56% (roughly 2,335 tokens). Vowels like IH achieve stability early at 31% overall, while AW and AO require up to 86% and 82% of the dataset respectively.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Sociphonetic researchers and speech engineers working on corpus validation or low-resource language documentation seeking data collection guidelines for automatic alignment.

## Limitations

The study focuses exclusively on vowel segments in the English TIMIT corpus using a single specific aligner version and pre-trained acoustic model.

## Related

- (link related pages by id as the wiki grows)
