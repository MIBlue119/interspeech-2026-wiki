---
id: park26_interspeech
category: audio-understanding
institutions: ["Korea University"]
code: https://github.com/honeysleep/sed
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-130
pdf: https://www.isca-archive.org/interspeech_2026/park26_interspeech.pdf
---

# Sleep Sound Event Detection Powered by Learnable Multi-Resolution Adaptive Line Enhancer

*Chanwoo Park, Chanwoo Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/park26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-130)

**Category:** `audio-understanding`

**TL;DR** — ACF-SED proposes a framework that injects per-frame confidence maps from a Multi-Resolution Adaptive Line Enhancer (MRAB) directly into Transformer attention and feature modulation for sleep sound event detection, achieving a state-of-the-art Event-F1 of 0.7105 on the APSAA dataset.

## Key contributions

- Introduces ALE-Confidence Fusion Sound Event Detection (ACF-SED), integrating adaptive filter states directly into deep learning attention and feature modulation rather than treating filtering as mere preprocessing.
- Proposes a Multi-Resolution ALE Bank (MRAB) combining three parallel Normalized Least-Mean-Square (NLMS) filters at distinct decorrelation delays to capture short-, medium-, and long-term acoustic periodicities.
- Develops a Confidence-Guided Cross-Path Block (CCP) featuring Symmetric Confidence-Biased Multi-Head Attention (Sym-CB-MHA) and gated cross-attention to couple event and noise streams.
- Demonstrates end-to-end Apnea-Hypopnea Index (AHI) estimation and OSA severity classification solely from ambient audio predictions.

## Problem

Conventional polysomnography (PSG) and polygraphy (PG) for diagnosing obstructive sleep apnea (OSA) are costly, clinically demanding, require specialized facilities with electrodes, and suffer from long waiting times, making them impractical for large-scale or remote screening. While microphone-only sound event detection (SED) offers a noninvasive alternative, existing deep learning models like CRNNs, Conformers, and AST treat adaptive signal enhancement as a static preprocessing step, discarding internal filter confidence states and struggling to distinguish pseudo-periodic snoring from aperiodic apnea and hypopnea events. This leads to false positives and poor temporal localization at ambiguous event boundaries.

## Method

The ACF-SED architecture operates on raw waveforms downsampled to 4,000 Hz, extracting STFT representations using a 25 ms window and 10 ms hop length. The Multi-Resolution ALE Bank (MRAB) applies three parallel NLMS filters on a shared STFT with parameter sets (tau=1, L=8), (tau=3, L=15), and (tau=6, L=24) to isolate event and noise streams alongside per-filter confidence maps. Each filter's step size mu is parameterized as a learnable logit activated via a sigmoid function, making the classical ALE fully differentiable and jointly optimized via backpropagation.

Two independent 3-stage convolutional encoders (Event CNN and a lighter Noise CNN) map the stacked enhanced mel spectrograms and noise mel spectrograms into 128-dimensional frame sequences. A Learnable Confidence Pooler collapses the multi-resolution and frequency axes into a scalar confidence trace using softmax-normalized weights. The Confidence-Guided Cross-Path Block (CCP) processes event and noise streams through asymmetric parallel paths. The event path uses Symmetric Confidence-Biased Multi-Head Attention (Sym-CB-MHA), adding learnable per-head confidence biases to dot-product attention scores to reinforce intra-event dependencies, followed by ALE-Aware Feature Modulation (AFM) which uses the confidence trace to scale channel dimensions. The noise path employs a lightweight feed-forward sub-layer to supply contextual background breathing cues. Both streams are fused via scaled dot-product cross-attention and a learned frame-wise gating mechanism, and final per-class probabilities for snoring, hypopnea, and OSA are produced by a two-layer MLP with dropout and sigmoid activation.

## Experimental setup

Evaluated on the Audio-Polygraphy Dataset for Sleep Apnea Analysis (APSAA) comprising full-night recordings from 32 participants split 8:1:1 into train (25 subjects), validation (3 subjects), and test (4 subjects) sets. Compared against baselines including CRNN, Conformer, BEATs-augmented Conformer, and Audio Spectrogram Transformer (AST). Evaluated using Event-F1, Segment-F1, Error Rate, and Polyphonic Sound Detection Score (PSDS). Trained using AdamW optimizer with an initial learning rate of 1e-4, OneCycleLR scheduler, batch size 32, gradient clipping norm of 1.0, and dropout for 100 epochs on an NVIDIA GeForce RTX 5090 GPU.

## Results

ACF-SED achieves state-of-the-art performance on the APSAA evaluation set with an Event-F1 of 0.7105, Segment-F1 of 0.6930, and PSDS of 0.7633. It outperforms the strongest baseline, AST (Event-F1 0.6710, Segment-F1 0.6746, PSDS 0.7435), as well as plain Conformer (PSDS 0.5015) and CRNN (Event-F1 0.6148, PSDS 0.7175). Qualitative evaluations demonstrate that ACF-SED produces contiguous event boundaries and substantially suppresses false activations during background breathing compared to AST.

Ablations on the multi-resolution delay parameter show that assigning heterogeneous delays (tau = 1, 3, 6) achieves the highest PSDS (0.7633) compared to uniform settings like tau=1 (0.7487) or tau=6 (0.7229), confirming that multi-resolution filtering captures complementary spectral dynamics across short-term snoring and long-term apnea events.

| System | Event-F1 | Segment-F1 | PSDS |
|---|---|---|---|
| CRNN | 0.6148 | 0.6169 | 0.7175 |
| Conformer | 0.5975 | 0.6109 | 0.5015 |
| BEATs + Conformer | 0.6364 | 0.6071 | 0.6949 |
| AST | 0.6710 | 0.6746 | 0.7435 |
| ACF-SED (Ours) | **0.7105** | **0.6930** | **0.7633** |

## Limitations

The evaluation is restricted to a small cohort of 32 participants from a single clinical center, limiting demonstrated cross-hospital and demographic generalizability. The framework currently targets only three distinct event classes (snoring, hypopnea, obstructive apnea) and relies on single-microphone audio downsampled to 4,000 Hz, which discards higher-frequency acoustic details that might aid finer classification. Clinical utility is evaluated on estimated AHI for only four test subjects, lacking large-scale validation against multi-night real-world home environments.

## Why read this

Researchers and engineers building audio-based biomedical screening or adaptive front-ends should read this to see how classical digital signal processing blocks like adaptive line enhancers can be made fully differentiable and injected directly into Transformer attention matrices.

## Code

- https://github.com/honeysleep/sed

## Applications

Noninvasive, low-cost home screening for obstructive sleep apnea and automated acoustic front-end for multimodal neurocognitive or sleep-disordered breathing monitoring systems.

## Institutions / 機構

Korea University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, National Research Foundation of Korea, Ministry of Science and ICT, Ministry of SMEs and Startups, Supreme Prosecutor's Office

## Related

- (link related pages by id as the wiki grows)
