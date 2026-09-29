---
id: tran26c_interspeech
category: paralinguistics-emotion
labels: [dataset-or-benchmark-release]
institutions: ["Hanoi University of Science and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3458
pdf: https://www.isca-archive.org/interspeech_2026/tran26c_interspeech.pdf
---

# From Single to Multi-Label SER: Dataset and Mamba-Based Fusion Model

*Vu Long Tran, Long Duc Do, Vinh Quang Nguyen, Ngoc Minh Nguyen, Quang Minh Le Pham, Hieu Trung Nguyen, Trang Thu Thi Nguyen*

[PDF](https://www.isca-archive.org/interspeech_2026/tran26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tran26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3458)

**Category:** `paralinguistics-emotion` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — This paper introduces a reproducible multi-label speech emotion recognition (SER) benchmark derived from the MSP-Podcast V2.0 corpus alongside a dual-branch Mamba-based fusion model. The proposed Fusion-Gate model achieves a micro-F1 of approximately 0.50 on both held-out test partitions while maintaining a lightweight parameter footprint of 3.07M.

## Key contributions

- A transparent dataset construction pipeline that translates crowd-sourced MSP-Podcast emotion votes into multi-hot labels via reliability filtering and deterministic vote thresholds.
- A long-tail combination control protocol (n_min = 2 final) that reduces the label combination space down to 18 classes and applies train-only time-shift augmentation to balance frequencies.
- A dual-branch Mamba fusion architecture processing parallel 100-dim log-mel spectrograms and 40-dim MFCCs with linear-time O(T) sequence modeling.
- A rigorous, standardized evaluation protocol using validation-only global threshold sweeps and a fixed evaluation threshold of t = 0.45.

## Problem

Traditional speech emotion recognition treats affect as a single-label problem using majority votes, which discards natural perceptual ambiguity and subjective annotator disagreement. Existing multi-label datasets are either private, designed for multimodal dialogue, or improperly standardized. Furthermore, modern Transformer and SSL backbones are computationally heavy for long audio sequences, calling for efficient linear-time sequence models.

## Method

The pipeline processes MSP-Podcast V2.0 segments after filtering out utterances with fewer than 3 ratings or an out-of-scope ratio of 0.5 or greater. Multi-hot labels are constructed by taking the majority vote plus up to 2 secondary emotions that meet relative thresholds (tau_rel = 0.20, tau_maj = 0.40) with a maximum label cardinality of L_max = 3. To handle long-tail distributions, rare combinations are pruned and frequency-aware right-shift time augmentation is applied strictly to the training split.

The architecture relies on dual parallel Mamba state-space encoders. The MFCC branch employs a lightweight 1D convolutional frontend followed by Mamba blocks, whereas the log-mel branch uses a patch projection and positional embedding before deeper Mamba blocks. Utterance-level embeddings are extracted via masked mean pooling.

The fusion module applies LayerNorm to each pooled embedding, scales them using learnable scalar gates, concatenates them, and passes them through a bottleneck linear-GELU layer. Training optimizes binary focal loss with a batch size of 8 over 100 epochs using the AdamW optimizer, gradient clipping (max-norm 1.0), and an inverse-frequency weighted sampler.

## Experimental setup

Experiments use the official speaker-independent Train, Dev, and Test partitions of MSP-Podcast V2.0. The training variant n_min = 2 final contains 186,353 samples and 18 target label combinations. Baselines include reimplemented models like VQF-DNN, MFCC-LSTM, ViT-LogMel, Fuse-KR, and audio-only Transformers like MulT and WavLM. Evaluation metrics include micro-F1, macro-F1, Hamming loss (HL), Jaccard similarity (Jac), Exact Match Accuracy (ExAcc), and binary accuracy (BiAcc).

## Results

On Test1, the proposed Fusion-Gate achieves a micro-F1 of 0.510, macro-F1 of 0.305, Jaccard index of 0.412, and Hamming loss of 0.179, outperforming unimodal branches and standard baselines like Fuse-KR (0.447 micro-F1). On Test2, Fusion-Gate reaches 0.514 micro-F1 and 0.258 macro-F1. While overall aggregate performance is strong, tail classes such as Disgust (F1: 0.0257 on Test1) and Fear (F1: 0.0260 on Test1) suffer from severe underperformance due to extreme dataset class imbalance.

| System | Params (M) | Test1 miF1 | Test1 maF1 | Test2 miF1 | Test2 maF1 |
|---|---|---|---|---|---|
| ViT-LogMel [9] | 1.08 | 0.475 | 0.264 | 0.510 | 0.226 |
| Fuse-KR (MFCC+LogMel) [9] | 1.13 | 0.447 | 0.270 | 0.452 | 0.235 |
| MFCC-Mamba (Ours) | 2.26 | 0.489 | 0.299 | 0.481 | 0.246 |
| LogMel-Mamba (Ours) | 0.99 | 0.500 | 0.283 | 0.505 | 0.248 |
| Fusion-Gate (Ours) | 3.07 | 0.510 | 0.305 | 0.514 | 0.258 |
| Fusion-Stack (Ours) | 3.02 | 0.501 | 0.304 | 0.503 | 0.254 |

## Limitations

The benchmark relies on a restricted subset of eight primary emotions after pruning 78% of the initial long-tail combinations down to 18 classes, limiting generalization to rare affect blends. Performance on minority tail emotions remains exceptionally weak under the fixed decision threshold. The dataset is currently restricted to English speech from the MSP-Podcast corpus.

## Why read this

Researchers and engineers building scalable, resource-efficient multi-label SER systems should read this paper to adopt its reproducible MSP-Podcast benchmark protocol and learn how linear-time Mamba state-space models compare against heavier Transformer backbones.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Affect-aware conversational agents, customer service monitoring, mental health screening, and multimedia analytics requiring simultaneous detection of multiple emotional states.

## Institutions / 機構

Hanoi University of Science and Technology

## Related

- [SETEAB: Multiscale approach with Squeeze-and-Excitation Temporal Enhanced Aware Block for Speech Emotion Recognition](vo26_interspeech.md) — same problem · relatedness 2.5/3
- [Multi-Loss Learning for Speech Emotion Recognition with Energy-Adaptive Mixup and Frame-Level Attention](wang26u_interspeech.md) — same problem · relatedness 2.4/3
- [ACR-Net: Mitigating Semantic Dominance via Contrastive Acoustic-Semantic Decoupling](zhang26ca_interspeech.md) — same problem · relatedness 2.3/3
- [Lightweight Emotion Recognition with Disjoint Modality Fusion](sulun26_interspeech.md) — same problem · relatedness 2.2/3
- [MSMC: Multi-Scale Masked Convolution network for Robust Speech Emotion Recognition](song26b_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
