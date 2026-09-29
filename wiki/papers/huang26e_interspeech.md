---
id: huang26e_interspeech
category: paralinguistics-emotion
institutions: ["National Tsing Hua University", "National Yang Ming Chiao Tung University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1262
pdf: https://www.isca-archive.org/interspeech_2026/huang26e_interspeech.pdf
---

# Stress Detection Across Daily Activities: A Context-Aware Multimodal Framework with Trajectory and Ambient Speech

*Wei-Heng Huang, Woan-Shiuan Chien, Chi-Chun Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1262)

**Category:** `paralinguistics-emotion`

**TL;DR** — This paper proposes a context-aware multimodal framework (Trajectory Speech Embedding, TSE) that integrates daily acoustic features and indoor mobility trajectories to detect occupational stress in hospital workers. It improves F1 score by 9.32% and MCC by 0.038 compared to audio-only baselines.

## Key contributions

- Proposes a multimodal stress detection framework (TSE) combining daily audio representations and session-based indoor mobility trajectories.
- Utilizes a self-supervised next-location prediction pre-training objective on auxiliary trajectory-only data to learn intrinsic spatial relationships across hospital areas.
- Formulates daily acoustic features via openSMILE LLDs aggregated through 15 statistical functionals to form 360-dimensional daily vectors.
- Demonstrates through mobility-stratified analysis how spatial trajectory data and acoustic signals symbiotically recover unimodal classification failures in high-dynamic and low-mobility regimes.

## Problem

Occupational stress detection in healthcare is predominantly reliant on intrusive physiological wearables tracking heart rate variability (HRV), which limits real-world scaling and continuous monitoring. While speech offers a non-intrusive alternative, acoustic models lack environmental and situational context essential for interpreting stress in high-pressure clinical settings. Prior approaches fail to capture spatial dynamics, such as how stress levels vary across hospital rooms, ward types, and activity routines.

## Method

The framework processes daily audio by extracting 24 low-level descriptors (LLDs: 8 prosodic, 16 spectral) using openSMILE, computing 15 statistical functionals per descriptor to yield a 360-dimensional vector. This sequence is passed through a 2-layer Transformer encoder with GELU activations prepended with a learnable [REP] token to generate a daily acoustic embedding. For mobility, indoor Wi-Fi/Bluetooth RSSI signals from 243 devices across 21 nursing units yield minute-level trajectories (1440 mins/day), merged into sessions of location tokens and durations, combined with sinusoidal periodic temporal embeddings.

The trajectory encoder is a 2-layer Transformer pre-trained via self-supervised next-location prediction on 2,426 extra trajectory-only days (achieving 38.85% top-1 and 60.40% top-3 accuracy). The spatial and acoustic daily embeddings are concatenated via a late-fusion strategy into a joint representation vector passed to an MLP classifier. The model is trained end-to-end using a joint objective combining fusion cross-entropy loss and auxiliary supervised classification losses for each modality branch weighted by lambda = 0.5.

## Experimental setup

Evaluated on the TILES-2018 dataset containing real-world data from hospital workers over 10 weeks (166 participants with audio, 2,878 days with audio/trajectory, plus 2,426 trajectory-only days). Binarized global mean self-reported stress labels (31.9% positive). Compared against Bi-LSTM, multi-similarity loss (MSLoss), unimodal acoustic Transformer, and unimodal trajectory Transformer baselines. Metrics include Accuracy, Balanced Accuracy (BACC), F1-score, and Matthews Correlation Coefficient (MCC). Implemented with subject-independent 80/10/10 splits, batch size 32, up to 500 epochs with early stopping, AdamW optimizer (trajectory encoder learning rate 1e-5, others 1e-4).

## Results

Coordinate TSE achieves the best performance with an MCC of 0.147, BACC of 58.91%, and F1 of 38.81%, compared to the Bi-LSTM baseline MCC of 0.109, audio-only Transformer MCC of 0.074, and MSLoss MCC of 0.051. Stratified mobility analysis reveals peak fusion performance in high-mobility conditions (F1-score 51.5%), where frequent contextual transitions complement acoustics, and in low-mobility conditions where structured location patterns offer robust behavioral cues.

| Systems / Conditions | Acc | F1 | BACC | MCC |
| --- | --- | --- | --- | --- |
| MSLoss [21] | 58.70 | 28.97 | 53.18 | 0.051 |
| Bi-LSTM [22] | 70.11 | 29.49 | 55.86 | 0.109 |
| Transformer (Audio) | 54.64 | 34.20 | 54.45 | 0.074 |
| Transformer (Trajectory) | 55.36 | 35.23 | 55.49 | 0.091 |
| TSE | 54.64 | 38.65 | 58.59 | 0.142 |
| Coordinate TSE | 56.07 | 38.81 | 58.91 | 0.147 |

## Limitations

The evaluation is restricted to a single hospital dataset (TILES-2018) limiting generalized demographic and environmental scope. Indoor location tracking relies heavily on hospital-specific infrastructure (RSSI from Wi-Fi/Bluetooth beacons), which may not transfer smoothly to settings lacking dense positioning setups. Day-level aggregation and binary label thresholds discard fine-grained short-term emotional fluctuations.

## Why read this

Researchers building ambient intelligence or occupational health monitoring systems will find a clear blueprint for fusing spatial trajectories with speech representations. It provides practical insights into how multi-modal architectures recover from unimodal failures under varying behavioral dynamics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated mental health monitoring, continuous occupational stress tracking for healthcare personnel, and context-aware workplace wellness systems.

## Institutions / 機構

National Tsing Hua University, National Yang Ming Chiao Tung University

## Related

- [Automatic Detection of Stress from Speech in the Trier Social Stress Test](drimalla26_interspeech.md) — same problem · relatedness 2.0/3
- [WhiSSDapt: Adaptive Fusion of Whisper Layer Embeddings for Sentence Stress Detection](murugaiyan26_interspeech.md) — same problem · relatedness 1.9/3
- [Daily Affect Inference from Longitudinal Speech-based Journals: A Comparison of Acoustic and Linguistic Models](schlicher26_interspeech.md) — same problem · relatedness 1.8/3
- [Modality Importance is Not Static: Temporal Dynamics via Gating in Multimodal Emotion Recognition](ryu26_interspeech.md) — same problem · relatedness 1.8/3
- [ProWhistress: An Enhanced Dual-Stream Transcription Architecture for Prosody-Aware Sentence Stress Detection](gu26b_interspeech.md) — same problem · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
