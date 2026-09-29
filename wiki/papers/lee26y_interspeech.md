---
id: lee26y_interspeech
category: asr
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3372
pdf: https://www.isca-archive.org/interspeech_2026/lee26y_interspeech.pdf
---

# Surgical-Robot Command Spotting: Safety-Aware Learning for Compositional Commands

*Jaewon Lee, Sang-Beom Lee, Bum-Hwi Kim, Kwang-Yong Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26y_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26y_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3372)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — A lightweight, factorized command-spotting model for surgical-assistant robots decomposes commands into direction, mode, and ordinal magnitude using head-wise attention and CORAL regression, achieving 95.36% joint success and a low catastrophic step error rate.

## Key contributions

- Formulates surgical-robot command spotting as a factorized prediction task dividing commands into direction, mode, and magnitude.
- Applies head-wise temporal attention pooling on a shared encoder to allow independent factor-specific evidence aggregation.
- Introduces CORAL ordinal regression and safety-aware metrics (MAE and Catastrophic Step Error rate) to penalize large-step errors more heavily than near misses.
- Demonstrates robust performance under operating-room acoustic noise and personal protective masks using cross-lingual pretraining from English to Korean.

## Problem

Voice-controlled surgical robots require closed-set command interfaces with bounded on-device latency and high safety guarantees, which free-form ASR and monolithic classification fail to provide. Monolithic approaches treat compositional instructions as independent classes, ignoring structural relationships and the ordinal nature of step magnitudes where confusing a 5-step movement with a 1-step movement is hazardous. Operating room environments further exacerbate these issues through high background noise, speech attenuation from surgical masks, and a scarcity of multi-speaker clinical training data.

## Method

The architecture takes 2-second 16 kHz audio waveforms converted to 40-bin log-mel spectrograms and processes them through a shared lightweight encoder. This encoder consists of a 2D convolutional stem followed by 1D depthwise-separable CNN blocks (DS-Conv) that downsample the time-frequency representation into a frame-level tensor $H \in \mathbb{R}^{24 \times 128}$. To capture distinct evidence for different components, separate head-wise temporal attention pooling modules aggregate feature sequences for direction, mode, and magnitude.

Direction and mode are predicted via standard softmax classifiers, while discrete step magnitude (1 to 5) is modeled using Consistent Rank Logits (CORAL) ordinal regression to enforce rank consistency. A training-only auxiliary 51-way classification head stabilizes representation learning and is discarded at inference to preserve efficiency. The objective function combines direction, mode, and CORAL magnitude losses with a per-sample masking mechanism that disables magnitude supervision for non-step functional/continuous commands, plus a 0.5-weighted auxiliary loss term.

The shared encoder is initialized via supervised keyword-spotting pretraining on Google Speech Commands v2 (English) before fine-tuning on the Korean OR dataset using the Adam optimizer at a learning rate of 0.0001 for 150 epochs with a batch size of 16. Data augmentations include ±100 ms time shifting, Gaussian-noise mixing on 80% of samples, and SpecAugment band/time masking.

## Experimental setup

Evaluated on a custom Korean operating-room command dataset comprising 7,140 pre-segmented 2-second utterances across 5 speakers (3 male, 2 female) covering 51 distinct commands, tested under four conditions (Clean/Noise × Mask/No-mask) using a leave-one-speaker-out (LOSO) cross-validation protocol. Compared against a flat 51-way classifier, factorized models with single vs. head-wise attention, and an external parameter-matched BC-ResNet-6 baseline. Metrics include joint command success (%), mean absolute error (MAE) in steps, and catastrophic step error rate (CSE) for $|\Delta| \ge 3$. Model size is 181K parameters consuming 5.99M MACs.

## Results

The full model achieves a headline joint command success of 95.36% (±4.08), outperforming the flat 51-way baseline (93.14%) and the factorized model with single attention (93.68%). On safety-oriented metrics, it reduces magnitude MAE to 0.0338 steps and catastrophic step error rate (CSE) to 0.60%, whereas using a standard softmax magnitude head instead of CORAL increases CSE to 0.83% and MAE to 0.0445 steps. Ablations show that removing English pretraining causes the most severe performance drop, crashing joint success to 88.97% and raising MAE to 0.0662 steps.

| System / Condition | Joint Success (%) | CSE (%) | MAE (steps) |
|---|---|---|---|
| Flat-51 | 93.14 ± 3.61 | 0.75 ± 0.86 | 0.0421 ± 0.0381 |
| BC-ResNet-6 | 93.65 ± 4.02 | 0.76 ± 0.52 | 0.0506 ± 0.0298 |
| Factorized-SA | 93.68 ± 4.55 | 0.75 ± 0.47 | 0.0465 ± 0.0311 |
| Factorized-HA | 94.57 ± 2.94 | 0.83 ± 0.49 | 0.0445 ± 0.0227 |
| Ours (Full) | 95.36 ± 4.08 | 0.60 ± 0.73 | 0.0338 ± 0.0359 |

## Limitations

Evaluated exclusively on pre-segmented 2-second utterances rather than an always-on streaming audio stream, bypassing voice activity detection and endpointing complexities. The dataset is limited to 5 speakers, making it susceptible to high variance from clinical outliers and atypical speech profiles. Noise conditions were artificially generated via replay-and-re-recording rather than captured from live, active surgical procedures.

## Why read this

Engineers and researchers working on safety-critical edge speech applications or robotics will learn how to formulate multi-attribute structured speech commands using ordinal regression and head-wise attention to prevent catastrophic control errors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice control of surgical robots, clinical medical assistants, and high-stakes industrial machinery where large command errors carry catastrophic physical consequences.

## Institutions / 機構

Electronics and Telecommunications Research Institute

**Funding / 經費:** Electronics and Telecommunications Research Institute, Commercialization Promotion Agency for R&D Outcomes, Korean government, Ministry of Science and ICT

## Related

- (link related pages by id as the wiki grows)
