---
id: wang26u_interspeech
category: paralinguistics-emotion
institutions: ["Beijing University of Posts and Telecommunications", "Li Auto"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1219
pdf: https://www.isca-archive.org/interspeech_2026/wang26u_interspeech.pdf
---

# Multi-Loss Learning for Speech Emotion Recognition with Energy-Adaptive Mixup and Frame-Level Attention

*Cong Wang, Yizhong Geng, Yuhua Wen, Qifei Li, Yingming Gao, Ruimin Wang, Chunfeng Wang, Hao Li, Wei Chen, Ya Li*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26u_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26u_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1219)

**Category:** `paralinguistics-emotion`

**TL;DR** — This paper proposes a speech emotion recognition framework integrating energy-adaptive mixup, frame-level attention, and a quadruple multi-loss strategy, achieving a state-of-the-art 79.14% unweighted accuracy on IEMOCAP.

## Key contributions

- Energy-Adaptive Mixup (EAM): An SNR-based augmentation method that incorporates speech energy dynamics into sample mixing to simulate complex emotional interferences.
- Frame-Level Attention Module (FLAM): A 16-head multi-head self-attention pooling mechanism with a learnable projection vector that dynamically weighs salient emotional frames.
- Multi-Loss Learning (MLL) Strategy: A unified optimization scheme combining Kullback-Leibler divergence, focal loss, center loss, and supervised contrastive loss to handle label distributions, hard samples, and feature separability.
- State-of-the-Art Generalization: Achieves top-tier performance across four benchmark datasets (IEMOCAP, MSP-IMPROV, RAVDESS, and SAVEE) under speaker-independent evaluations.

## Problem

Speech emotion recognition (SER) suffers from performance degradation due to the intrinsic complexity of human emotions and severe data scarcity caused by expensive manual annotation costs. Prior data augmentation techniques like label-adaptive mixup (LAM) ignore acoustic energy dynamics by mixing speech segments uniformly, missing critical emotional nuances. Furthermore, standard pooling approaches either dilute salient emotional cues or discard important contextual details, while single-loss training fails to simultaneously maximize intra-class compactness and inter-class separability.

## Method

The model takes raw speech waveforms and extracts frame-level emotional feature sequences using a pre-trained WavLM Large encoder, producing features F in R^{T x D}. For data augmentation, the Energy-Adaptive Mixup (EAM) dynamically extracts random segments with length constrained to less than half the total utterance length. Instead of direct mixing, the interfering segment's energy is scaled using a random signal-to-noise ratio (SNR) sampled between -5 and 10 dB, and a soft label is computed using instantaneous energy and temporal coverage ratios.

The extracted feature sequence is then passed into the Frame-Level Attention Module (FLAM), which applies a 16-head Multi-Head Self-Attention (MSA) followed by a residual connection. A learnable projection vector aggregates the temporal frames into a single utterance-level vector via weighted attention pooling, prioritizing emotionally discriminative frames over uniform mean or max pooling.

Finally, the Multi-Loss Learning (MLL) strategy optimizes the network using four losses: Kullback-Leibler divergence for soft label alignment against EAM targets, focal loss to handle hard-to-classify samples, center loss operating in a 64-dimensional space to minimize intra-class variance, and supervised contrastive (SupCon) loss combined with a context broadcasting mechanism over frame features to maximize inter-class distance. The total objective is a weighted sum where scaling factors normalize each component into the [0, 1] range.

## Experimental setup

Evaluated on four SER datasets: IEMOCAP (12 hours, 4 classes, 5-fold CV), MSP-IMPROV (8,438 clips, 4 classes, 6-fold CV), RAVDESS (1,440 clips, 8 classes, 6-fold CV), and SAVEE (480 clips, 7 classes, 4-fold CV). Compared against multiple audio-only and multi-modal baselines including LAM, Hubert, and prior SOTA models. Metrics include Unweighted Accuracy (UA) and Weighted Accuracy (WA). Implemented using an NVIDIA RTX 3090 GPU with batch size 16, initial learning rates of 1e-4 for the model and 5e-3 for center updates decaying by 7/8 per epoch for 20 epochs.

## Results

On IEMOCAP, the method achieves 78.47% WA and 79.14% UA, outperforming the audio-only LAM baseline (75.37% WA, 76.04% UA) and recent multi-modal approaches. On MSP-IMPROV, it scores 58.55% WA and 58.34% UA, beating top baselines by 3.04% UA. On RAVDESS, it reaches 93.40% WA and 92.28% UA, surpassing strong audio-only and multi-modal models. On SAVEE, it achieves a mean UA of 72.3%.

| System / Condition | WA (%) | UA (%) |
|---|---|---|
| Kang et al. (LAM Baseline, IEMOCAP) | 75.37 | 76.04 |
| Wang et al. (IEMOCAP) | 73.37 | 74.18 |
| Ours (IEMOCAP) | 78.47 | 79.14 |
| Liu et al. (MSP-IMPROV) | 55.80 | 55.30 |
| Ours (MSP-IMPROV) | 58.55 | 58.34 |
| Ours (RAVDESS) | 93.40 | 92.28 |

## Limitations

The evaluation is restricted to English-language datasets and predominantly clean or acted studio conditions, leaving open how EAM and FLAM perform under severe real-world acoustic noise or multi-lingual setups. The framework relies heavily on a frozen pre-trained WavLM Large backbone, tying performance and compute constraints to large self-supervised speech models. Additionally, tuning the four separate loss scaling weights requires empirical validation.

## Why read this

Speech and machine learning researchers working on representation learning, data augmentation, or loss engineering for paralinguistic tasks should read this paper to see how to integrate energy-aware mixup with multi-loss contrastive optimization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated conversational agents, affective computing in healthcare, customer service quality monitoring, and online education platforms.

## Institutions / 機構

Beijing University of Posts and Telecommunications, Li Auto

**Funding / 經費:** National Key R&D Program of China, National Natural Science Foundation of China, National Language Commission, National Social Science Fund of China

## Related

- [Segment-wise Embedding based Graph Attention Network for Effective Speech Emotion Recognition](song26c_interspeech.md) — same problem · relatedness 3.0/3
- [MSMC: Multi-Scale Masked Convolution network for Robust Speech Emotion Recognition](song26b_interspeech.md) — same problem · relatedness 3.0/3
- [SISER: Speaker-Invariant Speech Emotion Recognition with Entropy-Based Adversarial Training](choi26e_interspeech.md) — same problem · relatedness 2.9/3
- [SETEAB: Multiscale approach with Squeeze-and-Excitation Temporal Enhanced Aware Block for Speech Emotion Recognition](vo26_interspeech.md) — same problem · relatedness 2.9/3
- [Progressive Weak Supervision for Speech Emotion Recognition](ta26b_interspeech.md) — same problem · relatedness 2.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
