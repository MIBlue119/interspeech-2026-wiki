---
id: wu26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-856
pdf: https://www.isca-archive.org/interspeech_2026/wu26c_interspeech.pdf
---

# SEA-MDD: Self-adapting Mispronunciation Detection and Diagnosis Models via Test-Time Training

[PDF](https://www.isca-archive.org/interspeech_2026/wu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-856)

**TL;DR** — SEA-MDD introduces test-time training (TTT) into wav2vec 2.0 to dynamically adapt mispronunciation detection and diagnosis models to novel speech inputs, achieving a phoneme error rate of 8.03% and an F1 score of 81.54%.

## Problem

Second language learners exhibit diverse proficiencies and numerous mispronunciation types, leading to severe distribution shifts that degrade the performance of fixed models. Large-scale data collection covering all possible errors is prohibitively expensive, and prior metalearning adaptation methods require substantial target-speaker adaptation data.

## Method

The framework integrates multilayer perceptron (MLP) or linear TTT modules into the Transformer blocks of a 12-layer wav2vec 2.0 base model. During both training and test time, the TTT module parameters are updated via gradient descent on an auxiliary self-supervised reconstruction task using query, key, and value projections. The outer loop is optimized using CTC loss on 34.6 hours of the CU-CHLOE L2 English dataset, while the inner loop updates the TTT weights dynamically per input sentence.

## Results

Evaluated on the CU-CHLOE dataset comprising 100 Cantonese and 110 Mandarin speakers, SEA-MDD models are compared against wav2vec2-CTC and wav2vec2-MAML baselines. SEA-MDD-MLP applied to all blocks achieves a phoneme error rate (PER) of 8.03%, false rejection rate (FRR) of 4.40%, false acceptance rate (FAR) of 19.62%, F1 score of 81.54%, and diagnosis accuracy (DIAA) of 94.06%, outperforming wav2vec2-CTC (8.53% PER, 80.40% F1) and wav2vec2-MAML (8.46% PER, 80.67% F1). In terms of efficiency, SEA-MDD adapts using only a single test sentence with a latency of 33-52 ms for all-block configurations, compared to 30 minutes and 2 hours of data required by MAML.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building computer-assisted language learning (CALL) systems for automated pronunciation assessment and diagnostic feedback.

## Limitations

Evaluated exclusively on L2 English speech from Cantonese and Mandarin speakers under specific recording conditions.

## Related

- (link related pages by id as the wiki grows)
