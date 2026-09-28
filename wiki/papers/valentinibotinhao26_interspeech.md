---
id: valentinibotinhao26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-446
pdf: https://www.isca-archive.org/interspeech_2026/valentinibotinhao26_interspeech.pdf
---

# Exploring Active Sampling Strategies for Pairwise Comparisons in Speech Synthesis Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/valentinibotinhao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/valentinibotinhao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-446)

**TL;DR** — This paper evaluates active sampling strategies for pairwise comparisons and Best-Worst Scaling in text-to-speech subjective evaluation, finding that information-gain-based sampling (ASAP) reveals more statistically significant system differences with fewer evaluations.

## Problem

Subjective listening tests like Mean Opinion Score (MOS) suffer from listener-dependent biases and lack cross-test comparability, whereas preference-based tests avoid these flaws but are underutilized due to the misconception that every possible pair of systems must be compared. Evaluating a large number of text-to-speech systems exhaustively leads to quadratically exploding test durations, making active sampling methods crucial to reduce annotation overhead. This is especially vital for low-resource or endangered language applications where available human listeners are scarce.

## Method

The authors compare three pair-selection approaches across AB and Best-Worst Scaling (BWS) tests: random selection, a sorting-based merge-rank (MR) method, and an information-gain-based method called ASAP. They simulate test responses by sampling from a pre-collected rating bank covering all system combinations from the Blizzard Challenge 2013, encompassing 10 distinct systems (natural speech, five older challenge systems, and four newer neural systems combining Tacotron/FastPitch with WaveNet/Parallel WaveGAN). The MR approach is tested with a random initial ranking (MR1-R) and oracle initial rankings (MR1, MR2, MR3), while ASAP utilizes Kullback-Leibler divergence between prior and posterior score distributions via a minimum spanning tree to request batches of 9 pairs simultaneously. Question retrieval uses replacement alongside a greedy search for BWS tuples.

## Results

Evaluating using 54 participants for AB tests and 57 for BWS tests recruited via Prolific, the study shows that BWS tests are more effective than AB tests for a fixed test duration in terms of number of significant differences and system rank correlation. The ASAP active sampling strategy outperforms random selection and sorting-based alternatives by revealing a higher number of significantly different system pairs for the same number of total questions. Furthermore, ASAP matches or exceeds the efficiency of merge-rank methods even when the latter are provided with perfect oracle initial rankings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers designing subjective listening test campaigns for text-to-speech evaluation, particularly when benchmarking numerous systems or operating under low-resource listener constraints.

## Related

- (link related pages by id as the wiki grows)
