---
id: kaffeza26_interspeech
category: multimodal-learning
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2556
pdf: https://www.isca-archive.org/interspeech_2026/kaffeza26_interspeech.pdf
---

# The Illusion of Balanced Multimodal Sentiment Analysis: Beyond the Limits of Optimization-Based Methods

[PDF](https://www.isca-archive.org/interspeech_2026/kaffeza26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kaffeza26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2556)

**TL;DR** — A unified evaluation of optimization-based modality balancing methods for multimodal sentiment analysis reveals that none consistently outperform simple late concatenation because training loss and gradients fail to measure true discriminative utility.

## Problem

Multimodal sentiment analysis models frequently suffer from modality imbalance, where one dominant modality (typically text) drives optimization while others are undertrained. The field relies on optimization-based interventions like gradient modulation or loss reweighting to restore balance, operating on the flawed premise that training loss or gradients reflect modality importance. This category error causes these methods to fail to generalize or reliably outperform basic late fusion baselines.

## Method

The authors implement a unified comparative evaluation framework testing two gradient-based strategies (OGM-GE, AGM) and two loss-based strategies (PMR, ReconBoost) using a fixed architecture of unidirectional LSTMs with late fusion. They perform controlled experiments across CMU-MOSI and CMU-MOSEI under three distinct modality dominance setups (Audio-Video, Text-Video, and Audio-Text-Video). To test method limits, they decouple ratio estimation by computing modality-specific ratios on a separate development set rather than training batches, and test sensitivity to training configurations like optimizer choice (Adam versus SGD) and training duration.

## Results

Across CMU-MOSI and CMU-MOSEI datasets, absolute accuracy changes (Delta) for balancing methods relative to the Late Concatenation baseline remain negligible and fall within seed variance, indicating no consistent improvement. For instance, in the A-T-V setup on CMU-MOSI, Late Concatenation achieves 74.87% accuracy while OGM-GE achieves 74.67% and ReconBoost achieves 74.79%. Sensitivity analysis shows balancing methods fluctuate significantly depending on optimizer choices, such as ReconBoost under Adam versus SGD. A structural headroom analysis demonstrates a performance gap of up to +8.70% on MOSI between global and per-sample oracles, proving that sample-level modality variation is crucial.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building multimodal classification and sentiment analysis systems, guiding them away from ineffective training-time gradient/loss balancing toward validation-based fusion.

## Limitations

The study focuses specifically on late-fusion LSTM architectures for multimodal sentiment analysis rather than complex cross-modal attention transformers or end-to-end multi-stream pretraining.

## Related

- (link related pages by id as the wiki grows)
