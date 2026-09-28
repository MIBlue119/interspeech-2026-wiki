---
id: liu26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-191
pdf: https://www.isca-archive.org/interspeech_2026/liu26b_interspeech.pdf
---

# LMPAN: A Lightweight Multi-Path Alignment Network for Joint Full-Duplex Acoustic Echo Cancellation and Noise Suppression

[PDF](https://www.isca-archive.org/interspeech_2026/liu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-191)

**TL;DR** — The paper proposes a lightweight multi-path alignment network (LMPAN) for on-device joint acoustic echo cancellation and noise suppression, achieving performance comparable to state-of-the-art models with only 480K parameters and 126 MACs.

## Problem

Full-duplex spoken dialogue systems suffer severe performance degradation from hardware-induced distortions, dynamic acoustic conditions, and time-varying latencies ranging up to hundreds of milliseconds. Conventional neural networks often lack explicit mechanisms to correct temporal and energy mismatches across streams, leading to feature fusion distortion and residual artifacts that impair downstream tasks like ASR and VAD. Addressing these challenges with a compact footprint is critical for real-time mobile deployment.

## Method

LMPAN introduces three core modules: a multi-path alignment stage with soft temporal alignment and learnable energy compensation across reference, linear AEC (LAEC) output, and microphone signals; an attention-based fusion module that dynamically integrates enhanced LAEC and microphone features using a multi-scale channel attention mechanism; and a post-filtering module with a dynamic target generation strategy controlled by residual scaling factors to prevent over-suppression. The system is trained using a two-stage framework that first aligns representations with a frozen WavLM-Large model and then fine-tunes on a composite loss combining spectral, echo-aware, scale-invariant SNR, and perceptual PMSQE objectives. The final model contains 480K parameters and requires 126 MACs.

## Results

Evaluated on the AEC Challenge 2023 blind test set and a self-collected real-world mobile test set comprising 4,000 double-talk utterances across 40 smartphones, LMPAN achieves a MOSavg of 4.44 (with an EMOS of 4.59 and DMOS of 4.12 under double-talk) and an ERLE of 45.04 dB. In downstream task evaluations on real-world double-talk data, the complete method reduces ASR word error rate (WER) down to 4.34% and VAD detection cost function (DCF) to 1.55% at specific SER ranges. Ablation experiments confirm the progressive benefits of multi-path alignment, attention-based fusion, two-stage SSL training, and dynamic target adaptation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building on-device full-duplex spoken dialogue systems, voice assistants, and conversational speech agents requiring low-latency acoustic echo cancellation and noise suppression.

## Related

- (link related pages by id as the wiki grows)
