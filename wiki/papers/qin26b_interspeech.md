---
id: qin26b_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1778
pdf: https://www.isca-archive.org/interspeech_2026/qin26b_interspeech.pdf
---

# Domain-Adaptive Dual-Gating Mixture of Experts for Generalizable Speech Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/qin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/qin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1778)

**TL;DR** — The paper introduces a domain-adaptive dual-gating mixture of experts (DADGMoE) framework for speech deepfake detection, achieving up to a 40.8% relative EER reduction on challenging out-of-domain benchmarks.

## Problem

State-of-the-art speech deepfake detection systems often fail to generalize to unseen attack types, varied acoustic environments, or novel codecs because they represent distinct domains. Existing mixture-of-experts gating networks typically rely on generic feed-forward networks that overlook critical low-level acoustic signals and high-level temporal artifacts. Without domain-aware routing, detectors perform well on controlled data but degrade severely on in-the-wild or cross-dataset evaluations.

## Method

The DADGMoE framework pairs an SSL frontend (XLSR) and an AASIST classification backend with an added mixture of N lightweight affine experts implemented as Batch Normalization layers. The dual-gating mechanism uses two parallel branches: a waveform branch processing raw audio with Sinc-layer band-pass filters, and an SSL feature branch processing representations through a depthwise Sinc layer followed by ResNet blocks and attentive pooling. Routing weights combine content logits from concatenated gating embeddings and prototype logits computed via cosine similarity against learnable domain prototypes. A top-k routing strategy (with k=2) dynamically assigns inputs to specialized experts, adding only 0.17M parameters.

## Results

Evaluated on ASVspoof 2019 LA for training, and tested on ASVspoof 2021 Deepfake (21DF), In-the-Wild (ITW), and Fake-or-Real (FoR) datasets using Equal Error Rate (EER) as the metric. DADGMoE reduces EER on 21DF from 3.69% to 2.54% (31.2% relative), on ITW from 10.46% to 6.35% (39.3% relative), and on FoR from 7.47% to 4.42% (40.8% relative) compared to the strong XLSR-AASIST baseline. Ablations show that removing either the raw waveform gating branch, SSL gating branch, or domain prototypes increases error rates, especially on cross-domain datasets like FoR and ITW.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building robust speech deepfake detectors and speaker verification security systems that must operate reliably under unseen acoustic conditions and spoofing attacks.

## Related

- (link related pages by id as the wiki grows)
