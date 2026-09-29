---
id: hu26e_interspeech
category: deepfake-security
institutions: ["National Taiwan University", "NVIDIA"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1614
pdf: https://www.isca-archive.org/interspeech_2026/hu26e_interspeech.pdf
---

# Joint Fullband-Subband Modeling for High-Resolution SingFake Detection

*Chia-Yu Hu, Xuanjun Chen, Sung-Feng Huang, Haibin Wu, Hung-yi Lee, Jyh-Shing Roger Jang*

[PDF](https://www.isca-archive.org/interspeech_2026/hu26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1614)

**Category:** `deepfake-security`

**TL;DR** — Sing-HiResNet introduces a joint fullband-subband modeling framework operating on 44.1 kHz high-resolution audio to detect singing voice deepfakes, achieving state-of-the-art Equal Error Rates (EER) of 1.58% on Test A and 7.45% on Test B.

## Key contributions

- Conducted the first systematic analysis of high-resolution (44.1 kHz) audio for Singing Voice Deepfake Detection (SVDD), revealing that subband artifacts are non-uniformly distributed and that simple subband fusion fails without global fullband guidance.
- Proposed Sing-HiResNet, a joint fullband-subband framework combining a global fullband expert with specialized frequency subband models via ResNet18 backbones.
- Evaluated four distinct joint fusion strategies—decision-level aggregation, feature-level concatenation, cross-expert interaction, and cross-expert distillation.
- Demonstrated state-of-the-art performance on the WildSVDD dataset, achieving relative EER reductions of 31.6% (Test A) and 30.9% (Test B) over re-implemented high-resolution baselines.

## Problem

Prior singing voice deepfake detection (SVDD) systems heavily rely on speech-centric models operating at 16 kHz, which discard high-frequency spectral components above the 8 kHz Nyquist limit. Because professional singing incorporates complex pitch variations, extended harmonics, and breath textures stretching into ultra-high frequencies, 16 kHz sampling misses vital acoustic "fingerprints." Furthermore, while subband analysis can isolate localized artifacts, existing integration methods are limited to narrowband speech and often suffer from information loss or uninformative noise in ultra-high bands.

## Method

The Sing-HiResNet framework is structured into two phases: expert feature extraction and joint fullband-subband fusion. In Phase 1, audio sampled at 44.1 kHz is converted into log-power spectrograms and processed by a fullband ResNet18 backbone alongside non-overlapping subband expert models (partitioned into N = 1, 2, 4, 8 segments, equating to bands such as SBL: 0.0–11.03 kHz and SBM: 11.03–16.5 kHz). Each ResNet18 backbone replaces its final classification layer with a projection block outputting a 32-dimensional embedding and a projection head for logit prediction.

In Phase 2, the framework evaluates four integration strategies: (1) Decision-Level Aggregation (parameter-free late fusion of unweighted or weighted expert logits); (2) Feature-Level Concatenation (concatenating 32-d embeddings through a 2-hidden-layer MLP with 256 and 128 units); (3) Cross-Expert Interaction (using Multi-Head Self-Attention to dynamically model dependencies across fullband and subband embeddings); and (4) Cross-Expert Distillation (transferring knowledge from specialized subband teacher experts into a single fullband student model using Kullback-Leibler divergence for soft logits at temperature tau = 3.0 and Mean Squared Error for latent embeddings, balanced by coefficients alpha = 0.5 and beta = 0.2).

Models are trained using Sigmoid Focal Loss and optimized with AdamW and a CosineAnnealingLR scheduler on 4-second audio snippets. Distillation weights for dual-teacher setups prioritize the low-frequency band (w1 = 0.6) over the mid/high-frequency band (w2 = 0.4), completely omitting the noisy ultra-high SBH band (11.0–22.05 kHz) to avoid acoustic aliasing and psychoacoustic irrelevance.

## Experimental setup

Evaluated on the WildSVDD dataset containing 27,879 training utterances (15,364 deepfake, 12,515 bonafide) across 97 singers, with Test A featuring unseen singers in the training language (5,623 samples) and Test B featuring out-of-domain Persian singers (327 samples). Performance is measured via pooled Equal Error Rate (EER) and 95% confidence intervals. Backbones are ImageNet-pretrained ResNet18 models modified for single-channel log-power spectrogram inputs.

## Results

Sing-HiResNet variants consistently outperform the re-implemented 44.1 kHz UNIBS baseline (2.31% Test A, 10.79% Test B). The proposed FBFSA-D-LM (distillation-enhanced fullband-subband aggregation) achieves the top score on Test A with an EER of 1.58% (a 31.6% relative reduction), while the FBI-LM interaction/aggregation model achieves the best score on Test B with an EER of 7.45% (a 30.9% relative reduction). 

Ablations demonstrate that partitioning the spectrum into too many narrow bands (e.g., N = 8) degrades performance severely due to information scarcity (e.g., SB[8.3–11.0] reaches 35.17% EER on Test B). Moreover, including the ultra-high subband SBH (11.0–22.05 kHz) yields no incremental performance gains during fusion because generative artifacts in that range lack consistent forensic signatures.

| Systems / Conditions | Test A EER (%) | Test B EER (%) |
|---|---|---|
| Baseline1 (Wav2vec, 16 kHz) | 6.09 | 24.09 |
| IMS-SCU (WavLM ensemble, 16 kHz) | 2.70 | 12.95 |
| UNIBS (ResNet18, 44.1 kHz) | 2.38 | 9.81 |
| Re-implemented UNIBS (44.1 kHz) | 2.31 | 10.79 |
| Sing-HiResNet (FBD-LM, Distillation) | 1.65 | 9.06 |
| Sing-HiResNet (FBFSA-D-LM, Best) | 1.58 | 8.77 |

## Limitations

The framework is restricted to vocal-only singing voice detection, omitting instrumental accompaniment handling. The evaluation is bound to the WildSVDD dataset and its specific language distribution (Test B remains limited to a single out-of-distribution language, Persian). Furthermore, finding a single configuration that simultaneously dominates both in-domain (Test A) and cross-lingual/out-of-domain (Test B) test sets remains an unresolved challenge.

## Why read this

Speech and ML engineers building anti-spoofing systems should read this to understand why downsampling to 16 kHz discards essential singing synthesis artifacts, and how multi-scale subband distillation can inject high-frequency forensic awareness into a compact student model without increasing inference footprint.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Singing voice deepfake detection for content moderation, copyright protection, and media authenticity verification in music streaming platforms.

## Institutions / 機構

National Taiwan University, NVIDIA

**Funding / 經費:** Ministry of Education of Taiwan, Taiwan Centers of Excellence in Artificial Intelligence

## Related

- (link related pages by id as the wiki grows)
