---
id: wen26d_interspeech
category: asr
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2646
pdf: https://www.isca-archive.org/interspeech_2026/wen26d_interspeech.pdf
---

# Towards Robust Ultrasound-based Silent Speech Recognition Learning Physics-Aware and Context-Rich Representations

*Hongyu Wen, Yi Su, Yudong Yang, Siwen Guo, Qisheng Xu, Kele Xu*

[PDF](https://www.isca-archive.org/interspeech_2026/wen26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wen26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2646)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — A physics-aware and context-rich representation learning framework is proposed for ultrasound tongue imaging-based silent speech recognition, achieving a relative word error rate reduction of over 50% on unseen speakers compared to strong spatiotemporal baselines.

## Key contributions

- A clustering-based temporal downsampling strategy using k-means to reduce sequence redundancy while preserving critical articulatory context.
- A physics-inspired temporal augmentation method simulating ultrasound speckle noise and probe-induced spatial displacements to enforce representation consistency.
- A hybrid network architecture combining 3D convolutional neural networks and bidirectional GRU layers to jointly capture local spatiotemporal dynamics and long-range phonetic dependencies.
- Demonstrated substantial word and character error rate improvements on the UXTD corpus across both speaker-dependent (overlap) and speaker-independent (unseen) evaluation settings.

## Problem

Ultrasound Tongue Imaging (UTI) non-invasively visualizes real-time vocal tract dynamics for silent speech recognition, but suffers from two main bottlenecks: acquisition-related physical variability (such as speckle noise and probe displacement causing identical utterances to map differently) and complex temporal dependencies driven by co-articulation. Conventional models treat frames independently or lack robustness to physical perturbations, resulting in ambiguous representations and poor generalization. Addressing these issues is essential for robust non-acoustic communication in noise-intensive or privacy-critical environments.

## Method

The framework processes raw UTI sequences captured at approximately 121.5 fps. First, offline k-means temporal clustering partitions frames based on temporal proximity, selecting a representative frame per cluster to generate a fixed-length sequence of resolution 64x128. During training, a physics-inspired augmentation applies random 2D spatial translations (Delta i, Delta j proportional to dimensions, modeling probe shifts), additive zero-mean Gaussian noise (sigma = 0.01 for speckle variability), and random temporal masking (p = 0.3) to force reliance on long-range context.

The augmented sequences feed into a hybrid spatiotemporal architecture. A 3D-CNN frontend extracts local motion dynamics from neighboring frames, followed by bidirectional GRU layers that aggregate information over time to capture long-range phonetic context. The network is trained end-to-end using Connectionist Temporal Classification (CTC) loss, optimized with the Adam optimizer at a learning rate of 1e-5, a batch size of 32, and a dropout of 0.5 on an NVIDIA RTX 4090 GPU.

## Experimental setup

Evaluated on the UXTD corpus (Type-A word-level data from 58 typically developing children speakers). Two settings are used: an overlap setting (10% test per speaker) and an unseen setting (8 disjoint test speakers, 50 train speakers). Compared against Spatiotemporal-GRU (ST-GRU), Spatiotemporal-LSTM (ST-LSTM), and Spatiotemporal-Transformer (ST-Transformer). Metrics are Word Error Rate (WER) and Character Error Rate (CER).

## Results

In the overlap setting, the method achieves a WER of 0.1595 and CER of 0.1009, reducing WER by 36.5% relative to the best baseline (ST-LSTM at 0.2512). In the challenging unseen speaker setting, WER drops to 0.0597 and CER to 0.0227, representing a 50.4% relative WER reduction over the best baseline (ST-GRU at 0.1203). ST-Transformer performs poorly (WER 0.9250 in unseen), demonstrating that low-resource ultrasound tasks benefit more from inductive biases of 3D-CNNs and GRUs than global attention. Ablations show that removing either the 3D-CNN frontend or data augmentation severely harms performance, and representation analysis confirms physics augmentation raises representation cosine similarity for identical utterances from 0.7697 to 0.9630.

| System | Overlap WER | Overlap CER | Unseen WER | Unseen CER |
|---|---|---|---|---|
| ST-GRU | 0.2610 | 0.1719 | 0.1203 | 0.0734 |
| ST-LSTM | 0.2512 | 0.1497 | 0.1321 | 0.0769 |
| ST-Transformer | 0.8403 | 0.3820 | 0.9250 | 0.5183 |
| Ours | 0.1595 | 0.1009 | 0.0597 | 0.0227 |

## Limitations

Evaluated exclusively on word-level data from a single corpus (UXTD) consisting of children speakers, leaving sentence-level generalization, cross-corpus validation, and adult speaker applicability unverified. The data scale remains relatively small (58 speakers), and the framework relies on heuristic augmentation parameters that may require retuning for different ultrasound hardware setups.

## Why read this

Researchers building silent speech recognition or ultrasound-based articulatory inversion systems should read this paper to understand how combining simple k-means temporal downsampling, physics-informed data augmentations, and lightweight 3D-CNN/GRU hybrids drastically outperforms resource-heavy Transformer architectures in low-resource settings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Silent speech interfaces for assistive healthcare, hands-free communication in high-noise environments, and secure communication systems.

## Institutions / 機構

National University of Defense Technology, Chinese Academy of Sciences

**Funding / 經費:** National Science and Technology Major Project, National University of Defense Technology

## Related

- (link related pages by id as the wiki grows)
