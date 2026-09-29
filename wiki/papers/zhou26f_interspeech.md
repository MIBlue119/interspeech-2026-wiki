---
id: zhou26f_interspeech
category: paralinguistics-emotion
institutions: ["Jiangnan University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2118
pdf: https://www.isca-archive.org/interspeech_2026/zhou26f_interspeech.pdf
---

# Conflict-Aware Pseudo-Labeling via Acoustic Signals for Multi-Task Speech Emotion Recognition

*Haojie Zhou, Shunfei Liang, Chengze Li, Zhizhong Bai, Yicheng Feng, Ning Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2118)

**Category:** `paralinguistics-emotion`

**TL;DR** — A conflict-aware pseudo-labeling framework for multi-task speech emotion recognition derives fine-grained frame-level supervision solely from acoustic signals, achieving state-of-the-art results across benchmark datasets without requiring text transcripts.

## Key contributions

- A multi-granularity training framework that builds frame-level auxiliary supervision from pure acoustic signals without external text transcripts or complex network modifications.
- A conflict-aware label assignment strategy using collaborative inference across diverse data subsets to segment time frames into consensus and conflict regions.
- A global back-filling mechanism that rectifies noisy pseudo-labels in conflict regions using utterance-level ground truth as a global semantic prior.
- State-of-the-art performance across acted and conversational datasets, outperforming prior text-assisted and structural SER baselines.

## Problem

Standard speech emotion recognition (SER) is typically trained with utterance-level global labels, overlooking temporal dynamics, neutral pauses, and transient emotional shifts within an utterance. Prior attempts to capture fine-grained features either rely on costly automatic speech recognition (ASR) text transcripts or employ naive pseudo-labeling that suffers from severe label noise and ambiguous frame-level predictions. Overcoming these limitations without introducing manual transcript dependencies or heavy multi-modal network architectures is critical for robust and scalable affective computing.

## Method

The framework utilizes a pretrained HuBERT-base-ls960 shared encoder to process input utterances into frame-level feature sequences, which are fed into two parallel branches: an utterance-level branch with attention pooling for macro-semantics, and a frame-level branch for fine-grained auxiliary supervision. Upstream frame-level pseudo-labels are generated via collaborative inference using K sub-models built on partitioned subsets of the training data using a frozen emotion2vec-base feature extractor (with K set to 4 for IEMOCAP, 9 for EmoDB, and 5 for MELD). During collaborative inference, the temporal sequence is split into consensus regions (where sub-models achieve a majority vote of > K/2 matching a hard pseudo-label) and conflict regions (where predictions disagree or tie). Conflict regions are rectified using a global back-filling mechanism supervised by the utterance-level ground-truth label via a masked composite loss.

The training objective combines a standard cross-entropy primary utterance loss (L_utt) with an auxiliary frame-level loss (L_frame = L_cons + alpha * L_rect). Here, L_cons enforces discriminability on consensus frames using hard pseudo-labels, while L_rect utilizes the global utterance label on conflict regions masked by indicator variables. The balance weight lambda is set to 10 and the conflict suppression coefficient alpha to 0.35. Optimization uses the AdamW optimizer with a batch size of 64 and learning rates of 2e-4 for IEMOCAP and EmoDB, and 5e-5 for MELD, running across four NVIDIA A40 GPUs.

## Experimental setup

Evaluated on three datasets: IEMOCAP (5,531 utterances across 4 categories using 5-fold LOSO cross-validation), EmoDB (535 German utterances across 7 categories using speaker-independent 10-fold LOSO cross-validation), and MELD (over 13,000 conversational utterances across 7 categories using official data splits). Baselines include recent state-of-the-art architectures like MS-SENet, DropFormer, and various ASR-assisted or uncertainty-modeling SER approaches. Metrics reported are Weighted Accuracy (WA) and Unweighted Accuracy (UA) for IEMOCAP and EmoDB, and Weighted F1 score (WF1) for MELD, implemented in PyTorch.

## Results

On IEMOCAP, the proposed method achieves 78.10% WA and 79.07% UA, outperforming previous methods such as Wan et al. (76.33% WA) and Gao et al. (77.85% WA). On EmoDB, it reaches 97.30% WA and 97.19% UA, surpassing MS-SENet (96.40% WA) by an absolute margin of 0.90%. On the highly imbalanced MELD conversational dataset, it achieves a WF1 of 55.48%, beating the second-best DropFormer by a wide margin of 6.23%. Ablation studies confirm that naive global broadcasting of utterance labels degrades performance to 71.54% UA (worse than the 73.10% baseline), consensus-only supervision reaches 76.78% UA, and the complete conflict-aware framework with global back-filling reaches the peak 79.07% UA.

| System / Condition | IEMOCAP WA (%) | IEMOCAP UA (%) | MELD WF1 (%) |
|---|---|---|---|
| Baseline (L_utt only) | 71.58 | 73.10 | - |
| Global Broadcasting | 69.07 | 71.54 | - |
| Consensus-Only | 75.25 | 76.78 | - |
| DropFormer [10] (2024) | 75.29 | 76.60 | 49.25 |
| Gao et al. [14] (2024) | 77.85 | 78.49 | - |
| **Ours (2026)** | **78.10** | **79.07** | **55.48** |

## Limitations

The framework relies on offline data partitioning and multi-model collaborative inference to generate upstream pseudo-labels, which adds a multi-stage preprocessing pipeline before final joint training. While tested on acted, scripted, and conversational corpora, performance under extreme open-world acoustic noise or heavily overlapped multi-speaker conversational speech remains bounded by the representational capacity of the underlying foundation models (emotion2vec and HuBERT).

## Why read this

Researchers and engineers tackling speech emotion recognition without textual transcripts will find this paper essential for learning how to robustly construct and leverage frame-level pseudo-labels without noise propagation. It provides a clean, elegant alternative to ASR-assisted multi-task learning that directly harnesses acoustic consensus and global priors.

## Code

- https://github.com/sfxii/CAPL-SER

## Applications

Affective computing systems, real-time empathetic conversational agents, call center sentiment monitoring, and interactive human-computer interfaces.

## Institutions / 機構

Jiangnan University

## Related

- (link related pages by id as the wiki grows)
