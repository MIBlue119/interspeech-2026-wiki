---
id: horii26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3104
pdf: https://www.isca-archive.org/interspeech_2026/horii26_interspeech.pdf
---

# How does children's pronunciation develop? Capturing syllabic change with children's growth using unsupervised syllable discovery

[PDF](https://www.isca-archive.org/interspeech_2026/horii26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/horii26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3104)

**TL;DR** — This paper proposes a bottom-up framework using unsupervised syllable discovery (Sylber) to analyze children's pronunciation development, revealing an expansion of syllable patterns from ages 5 to 8 followed by stabilization toward adult-like speech across 957 children.

## Problem

Conventional top-down ASR analyses forcibly map variable child speech onto adult-defined phoneme categories, while expert-based evaluations by speech-language pathologists are labor-intensive, costly, and lack scalability. This limitation obscures child-specific and intermediate pronunciations, making it difficult to objectively study developmental pronunciation variation at scale.

## Method

The authors utilize Sylber, an unsupervised syllable discovery framework built on self-supervised learning that extracts frame-level acoustic features from self-supervised models, detects boundaries via similarity discontinuities, computes segment-level means, and applies hierarchical k-means and agglomerative clustering (targeting 1,024 clusters). Two model variants are evaluated: an adult-trained model on LibriSpeech and a child-adapted model further fine-tuned on 315 hours of spontaneous child speech from the MyST corpus. Developmental trends are analyzed across three metrics: boundary agreement with the Montreal Forced Aligner (MFA) via Jaccard index and over-segmentation ratio, pronunciation repertoire measured by active cluster count, and pronunciation stability measured by cluster purity against target syllables derived from ARPABET phonemes.

## Results

Evaluated on read English speech from 957 children aged 5-15 from the OGI Kids corpus (balanced to 87 speakers per age). The child-adapted Sylber model improved the Jaccard boundary agreement index (0.43 vs 0.39), cluster purity (59.60% vs 58.66%), and syllable purity (79.91% vs 78.55%) compared to the adult-trained baseline. Boundary agreement with MFA monotonically increased with age for both models. The number of discovered syllable clusters exhibited an inverted U-shaped curve, increasing from age 5 to a peak at ages 6-8 before decreasing, indicating an early expansion phase followed by repertoire consolidation. Average cluster purity increased monotonically with age, reaching adult-like levels around age 12.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech scientists and engineers building child speech technologies such as educational ICT, social robots, and speech disorder screening tools.

## Limitations

The framework currently relies on heuristic tuning of silence and similarity thresholds and excludes utterances with low MFA alignment confidence.

## Related

- (link related pages by id as the wiki grows)
