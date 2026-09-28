---
id: bai26_interspeech
category: singing-voice
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-131
pdf: https://www.isca-archive.org/interspeech_2026/bai26_interspeech.pdf
---

# Towards Chinese Yue Opera Singing Voice Synthesis: A Benchmark with Dataset, Data Augmentation and Baseline Model

[PDF](https://www.isca-archive.org/interspeech_2026/bai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-131)

**TL;DR** — This paper establishes the first comprehensive benchmark for Chinese Yue Opera Singing Voice Synthesis (SVS) using the YOAT dataset and a conditional flow matching baseline, achieving a subjective MOS of 3.92.

## Problem

Traditional Chinese opera SVS is severely hindered by a low-resource bottleneck caused by scarce professional performers, lack of standard electronic scores, small training scales that preclude automatic alignment, and ineffective voice separation models. Specifically, Yue Opera in the Wu dialect has remained completely unexplored with no dedicated datasets prior to this work. This absence impedes digital preservation and innovative dissemination efforts for endangered cultural heritage arts.

## Method

The authors introduce YOAT, a high-quality single-singer dataset comprising 565 studio recordings (1.35 hours) with sentence-level audio-text alignments, phoneme labels, manually annotated durations via Praat, and pitch annotations via Parselmouth. To mitigate the low-resource constraint, they propose three targeted data augmentation strategies: 1 hour of raw authentic recitations (DA1), 8 hours of concatenated single-word recitations from scripts (DA2), and 4.5 hours of aligned Gezi Opera data for pitch augmentation (DA3). They build YueOpera-Singer, a conditional flow matching acoustic model using optimal transport, featuring a 4-layer Transformer encoder, a length regulator using pre-aligned durations, and a U-Net decoder with convolutional residual and Transformer blocks trained with AdamW via the Euler ODE solver.

## Results

Evaluated on the YOAT dataset against baselines like FFT-Singer, DiffSinger, and FT-GAN, YueOpera-Singer achieves competitive synthesis quality with a subjective pronunciation MOS (MOS-P) and naturalness MOS (MOS-N) reaching 3.92, alongside robust objective fundamental frequency accuracy (F0 RMSE). The proposed data augmentation strategies and the reliability of the YOAT benchmark are verified through extensive subjective and objective evaluations.

## Code

- https://anonymous.4open.science/api/repo/YueOpera_Benchmark-6914/file/index.html

## Applications

Digital preservation, cultural heritage archiving, and automated artistic dissemination of traditional Chinese opera and regional Wu dialect vocal performances.

## Limitations

The dataset currently relies on a single professional singer and a restricted aria repertoire, limiting multi-singer and cross-style generalization.

## Related

- (link related pages by id as the wiki grows)
