---
id: lin26k_interspeech
category: sound-event-detection
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2019
pdf: https://www.isca-archive.org/interspeech_2026/lin26k_interspeech.pdf
---

# BG-CRNN: Boundary-Guided Dynamic Attention for Sound Event Detection in Complex Scenarios

*Zongmu Lin, Zhongxin Bai, Jisheng Bai, Zhenru Li, Ting Dang, Gongping Huang, Jingdong Chen, Jacob Benesty*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2019)

**TL;DR** — BG-CRNN introduces a boundary-guided dynamic attention mechanism for sound event detection (SED) that restricts self-attention to within event segments and uses boundary features for gating weights, achieving a PSDS1 of 0.191 under an extreme -5 dB noise condition.

## Key contributions

- Proposed a Dynamic Boundary Transformer (DBT) featuring a dual-branch structure that simultaneously predicts event boundaries and constructs segment-specific dynamic attention masks.
- Designed a Boundary-Guided Attention (BGA) module to leverage predicted boundary embeddings for generating gating weights that adaptively enhance active event regions via residual connections.
- Integrated a weighted boundary loss function with a positive sample weight factor to counteract the extreme sparsity of boundary frames in time-series audio.
- Demonstrated consistent performance gains over robust baselines (ATST-CRNN) across a wide range of signal-to-noise ratios (10 dB down to -5 dB) on the WildDESED benchmark.

## Problem

Mainstream sound event detection (SED) systems experience severe performance degradation in complex, dynamic, real-world noisy environments where background interference contaminates target sound features. Prior techniques rely on large-scale strongly labeled data, domain adaptation, or external Large Language Models for noise augmentation and source separation, but they frequently struggle with precise temporal localization under low signal-to-noise ratios. Without explicit temporal boundaries, self-attention mechanisms inappropriately propagate acoustic interference across adjacent background noise and distinct event segments. This matters because robust smart city, surveillance, and health monitoring deployments require reliable onset/offset boundary detection despite heavy ambient noise.

## Method

The BG-CRNN framework takes 16 kHz audio converted into 128-dimensional log-mel spectrograms (128 ms frame length, 16 ms hop size). The front-end feature extractor combines a 7-layer CNN with a frozen, pre-trained 768-dimensional ATST-Frame model, aligning temporal resolutions via adaptive pooling and concatenation.

Following feature extraction, the Dynamic Boundary Transformer (DBT) applies six Dynamic Boundary Attention Blocks (DBABs). Three DBABs drive a boundary detection branch that uses a linear layer and Sigmoid activation to predict frame-level boundary probabilities, binarized with a threshold of tau = 0.7. Multi-head attention heads are cyclically assigned to classes to create segment IDs via cumulative summation, generating dynamic attention masks that force the self-attention calculation to operate strictly within identical event segments.

Simultaneously, a Boundary-Guided Attention (BGA) module processes boundary features through a gating network of two linear layers with Layer Normalization, ReLU, and Sigmoid activations. This computes temporal attention masks applied to original features via a residual connection scaled by a learnable parameter alpha (initialized to 0). The total multi-task loss combines supervised SED Binary Cross-Entropy, Mean Teacher consistency loss (MSE) on unlabeled data under Mixup perturbations, and a weighted boundary loss utilizing a positive sample weight factor to address boundary sparsity.

## Experimental setup

Evaluated on the DESED dataset (1,000 synthetic strongly labeled, 3,470 real strongly labeled, 1,578 weakly labeled, and 14,412 unlabeled clips) and the WildDESED dataset (extended with LLM-selected AudioSet noise types). Models are optimized using Adam with cosine annealing, a 5,000-step warm-up, and Mixup augmentation (p=0.5). Baselines include standard CRNN, ATST-CRNN, EADSED, and LLM-based SED frameworks. Primary evaluation metrics are Polyphonic Sound Detection Scores PSDS1 (strict temporal localization constraint) and PSDS2 (class distinction sensitivity).

## Results

When trained on the noisy WildDESED dataset, the fine-tuned BG-CRNN achieves a PSDS1 of 0.483 and PSDS2 of 0.742 at 10 dB, outperforming the fine-tuned ATST-CRNN baseline (0.472 PSDS1, 0.739 PSDS2). Under extreme -5 dB noise, BG-CRNN reaches a PSDS1 of 0.191 and PSDS2 of 0.417, demonstrating robust handling of severe acoustic interference compared to EADSED (0.154 PSDS1 at -5 dB) and LLM-based approaches (0.103 PSDS1 at -5 dB). Ablations on clean DESED show that adding boundary encoding and prediction alone raises PSDS1 from 0.502 to 0.544, while the full proposed pipeline reaches 0.566 PSDS1 and 0.791 PSDS2.

| System | 10 dB (PSDS1/2) | 5 dB (PSDS1/2) | 0 dB (PSDS1/2) | -5 dB (PSDS1/2) |
|---|---|---|---|---|
| ATST-CRNN (Baseline) | 0.392 / 0.662 | 0.315 / 0.582 | 0.218 / 0.446 | 0.123 / 0.300 |
| BG-CRNN (Proposed) | 0.401 / 0.677 | 0.318 / 0.595 | 0.228 / 0.472 | 0.137 / 0.352 |
| ATST-CRNN (Finetuned) | 0.472 / 0.739 | 0.385 / 0.657 | 0.282 / 0.539 | 0.183 / 0.415 |
| BG-CRNN (Finetuned) | 0.483 / 0.742 | 0.394 / 0.662 | 0.288 / 0.544 | 0.191 / 0.417 |
| EADSED | 0.332 / 0.634 | 0.270 / 0.567 | 0.216 / 0.487 | 0.154 / 0.397 |

## Limitations

The evaluation is restricted to domestic environmental audio categories represented in DESED and WildDESED, leaving performance unverified across broader acoustic domains like speech-heavy multi-speaker environments or industrial music. The framework depends on high-quality frame-level strong labels or reliable semi-supervised teacher-student propagation to accurately locate sparse boundary frames. Furthermore, incorporating dual dynamic attention branches and transformer blocks increases architectural complexity relative to vanilla CRNN models.

## Why read this

Researchers working on noise-robust acoustic modeling and sound event localization should read this paper to see how explicit boundary modeling and intra-segment dynamic attention masks can block noise propagation without relying on external large language models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart city acoustic surveillance, automated home health monitoring, and noise-resilient environmental audio event detection.

## Related

- (link related pages by id as the wiki grows)
