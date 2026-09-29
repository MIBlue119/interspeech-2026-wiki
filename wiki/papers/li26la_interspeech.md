---
id: li26la_interspeech
category: speaker
institutions: ["Wuhan University", "Chinese University of Hong Kong, Shenzhen"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3473
pdf: https://www.isca-archive.org/interspeech_2026/li26la_interspeech.pdf
---

# Spatially-Augmented Sequence-to-Sequence Neural Diarization for Meetings

*Li Li, Ming Cheng, Juan Liu, Ming Li*

[PDF](https://www.isca-archive.org/interspeech_2026/li26la_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26la_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3473)

**Category:** `speaker`

**TL;DR** — The paper introduces SA-S2SND, a spatially-augmented sequence-to-sequence neural diarization framework that injects direction-of-arrival (DOA) estimates into an S2SND backbone, achieving a 7.4% relative DER reduction in offline mode on the AliMeeting dataset.

## Key contributions

- Proposes SA-S2SND, integrating DNN-derived DOA cues as explicit auxiliary inputs into sequence-to-sequence neural diarization for both online and offline settings.
- Introduces a simulated DOA training strategy that pairs single-channel audio with pseudo-DOA to decouple spatial cues from specific array geometries and reduce reliance on multi-channel corpora.
- Implements a staged training schedule (Part A for single-channel + DOA, Part B for multi-channel cross-attention + DOA) for stable joint optimization.
- Demonstrates state-of-the-art offline performance (10.40% DER) on the AliMeeting test set without requiring massive self-supervised speech pretraining.

## Problem

Meeting speaker diarization struggles with overlapping speech, reverberation, and unreliable speaker embeddings when relying solely on acoustic features. While multi-channel systems use beamforming (which causes speech distortions) or blind channel attention, they lack explicit directional evidence to separate simultaneous speakers. The paper bridges this gap by combining explicit spatial localization with end-to-end neural sequence diarization to robustly disentangle overlapping talkers.

## Method

The framework builds on the S2SND backbone, consisting of a ResNet extractor with segmental statistical pooling, a Conformer encoder for long-range context, and two coupled decoders (a detection decoder predicting activity labels and a representation decoder generating target embeddings). Direction-of-arrival (DOA) estimation is handled by SRP-DNN, a lightweight (0.86M parameters) causal CRNN that predicts direct-path inter-channel phase differences (DP-IPDs) and constructs a spatial spectrum using an iterative detection-and-removal (IDL) algorithm. SRP-DNN outputs active-speaker azimuths at 5-degree resolution, which are formatted into a DOA matrix, nearest-neighbor upsampled to match frame resolution, projected to hidden dimension $D$, and fused with acoustic encoder features via residual addition.

The training process is divided into two parts across five stages. Part A trains a single-channel model guided by multi-channel DOA: Stage 1 freezes a pretrained speaker-verification ResNet extractor and trains the encoder/decoders on simulated mixtures with pseudo-DOA; Stage 2 unfreezes the extractor and trains on an 80/20 mix of simulated and real data; Stage 3 fine-tunes the single-channel setup at a reduced learning rate of 1e-5. Part B extends to multi-channel audio: Stage 4 introduces a 2-block Transformer cross-channel attention module on extractor outputs while freezing prior weights; Stage 5 jointly fine-tunes the entire multi-channel network. Optimization uses AdamW with Binary Cross-Entropy and ArcFace losses ($s=32, m=0.2$).

Inference uses a block-wise sliding-window scheme with 8s windows (2s overlap), yielding an online latency of 0.8s (0.64s chunk + 0.16s right context). A first pass performs online decoding, and accumulated embedding buffers enable a second-pass offline re-scoring step where acoustic and DOA-enhanced representations are jointly leveraged.

## Experimental setup

Evaluated on the AliMeeting dataset (104.75h training, 4h evaluation, 10h test using 8-channel far-field arrays dereverberated via NARA-WPE) alongside a compound dataset containing AliMeeting, DIHARD III, VoxConverse, and MISP2022. Baselines include S2SND, MC-S2SND, and standard modular/neural diarization architectures (Diaper, EEND-EDA, Pyannote.audio, EEND-M2F, EEND-TA). Metrics are Diarization Error Rate (DER) evaluated without oracle VAD and without collar tolerance. Experiments run on two RTX-A6000 GPUs using S2SND-Small (16.56M parameters, widths {32,64,128,256}) and S2SND-Medium (45.96M parameters, widths {64,128,256,512}).

## Results

On the AliMeeting test set, SA-S2SND consistently outperforms S2SND baselines across model sizes. For the small model variant, adding DOA features reduces total DER from 16.03% to 15.35% online and from 13.59% to 12.59% offline, with overlapping speech (2+ speakers) showing dramatic improvements (from 17.58% down to 16.10% offline). Combining channel attention with DOA yields an offline DER of 10.84% (a 15.2% relative reduction over baseline). Scaling to the medium model trained on the compound dataset with DOA achieves the best overall performance, reaching 12.92% online DER and 10.40% offline DER, outperforming prior competitors like WavLM-Large while using shorter context windows (8s vs 16s) and no large-scale speech pretraining.

| System / Condition | Online DER (%) | Offline DER (%) |
|---|---|---|
| S2SND-Small (1-Ch, Baseline) | 16.03 | 13.59 |
| SA-S2SND-Small (1-Ch + DOA) | 15.35 | 12.59 |
| S2SND-Small (8-Ch, Cross-Channel) | 14.85 | 12.79 |
| SA-S2SND-Small (8-Ch + DOA) | 12.93 | 10.84 |
| S2SND-Medium (1-Ch, Compound) | 13.94 | 11.33 |
| SA-S2SND-Medium (1-Ch + DOA, Compound) | 12.92 | 10.40 |

## Limitations

The SRP-DNN DOA module uses an iterative detection-and-removal strategy configured to track at most two speakers per frame, which can degrade when more than three speakers overlap simultaneously. The evaluation primarily relies on meeting corpora with fixed array geometries (AliMeeting) where participant elevation remains largely constant, potentially limiting generalization to highly dynamic or mobile multi-speaker environments.

## Why read this

Speech and ML engineers working on online or offline meeting diarization should read this paper to understand how explicit directional spatial cues (DOA) can be cleanly integrated into sequence-to-sequence neural architectures without relying on large multi-channel corpora or massive self-supervised audio transformers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated meeting transcription pipelines, multi-speaker conversational analytics, and real-time speech conferencing systems.

## Institutions / 機構

Wuhan University, Chinese University of Hong Kong, Shenzhen

**Funding / 經費:** National Natural Science Foundation of China, Yangtze River Delta Science and Technology Innovation Community Joint Research Project

## Related

- [Two-Level Uncertainty Suppression for Robust Meeting Diarization](asaka26_interspeech.md) — same problem · relatedness 2.7/3
- [Bidirectional Retention Network-based Segmentation Model for Speaker Diarization](you26b_interspeech.md) — same problem · relatedness 2.7/3
- [SDR-LLM: Speech-LLM Based End-to-End Speaker Diarization and Recognition with Sentence-Level Temporal Modeling](yu26g_interspeech.md) — same problem · relatedness 2.6/3
- [Neural Multichannel Distant Speaker Diarization and Source Separation with Beta Speaker Activity Prior](mao26_interspeech.md) — same problem · relatedness 2.6/3
- [Multi-Speaker Embeddings With Weakly Supervised Speaker Activity Detection For Granular Speaker Diarization](thienpondt26_interspeech.md) — same problem · relatedness 2.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
