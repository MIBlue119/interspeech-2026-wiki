---
id: he26f_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1766
pdf: https://www.isca-archive.org/interspeech_2026/he26f_interspeech.pdf
---

# Task-Aware Joint Pruning and Distillation for Efficient Audio Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/he26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1766)

**TL;DR** — This paper proposes a task-aware joint pruning and distillation framework for audio deepfake detection that reduces an SSL model down to 31.9M parameters and 6.3x FLOPs reduction while limiting performance drop to an average of 1.30% across multiple test datasets.

## Problem

Self-supervised learning (SSL) models for audio deepfake detection typically exceed 300M parameters, preventing their deployment on resource-constrained edge devices and forcing heavy reliance on cloud inference with accompanying network and privacy risks. Existing model compression techniques are predominantly designed for content-centric tasks like ASR and fail to maintain generalization under aggressive compression when directly adapted for deepfake detection. Consequently, current methods suffer from severe performance degradation, especially in out-of-domain evaluation scenarios.

## Method

The framework operates in three stages: task-specific fine-tuning, joint pruning and distillation, and backend optimization. First, it uses Centered Kernel Alignment (CKA) analysis on the fine-tuned XLSR model to identify three distinct layer blocks, selecting representative layers (layers 5, 14, and 24) for multi-level cross-domain knowledge distillation using unlabeled out-of-domain data. Second, it applies movement-guided structured pruning that computes an importance score based on structural parameter changes during fine-tuning to prioritize the retention of forgery-critical units across multi-head attention, feed-forward intermediates, and CNN channels. Third, it optimizes a constrained multi-objective loss function combining distillation loss, movement regularization, and an $L_0$ sparsity constraint parameterized via the Hard Concrete distribution and solved using the Augmented Lagrangian method. The compressed student model is built on top of the XLSR-AASIST architecture.

## Results

Evaluated on ASVspoof2019 LA, ASVspoof2021 LA, ASVspoof2021 DF, In-the-Wild, ASVspoof5, and FoR datasets using Equal Error Rate (EER). Compared against baselines including HJ-Pruning, Finetune-Pruning, and Hybrid-Pruning across 60%, 75%, and 90% sparsity levels. At 75% sparsity, the method achieves 8.43% EER on In-the-Wild and 17.75% on ASVspoof5, outperforming the second-best Finetune-Pruning baseline by 67% and 32% respectively. At 90% sparsity, the model shrinks to 31.9M parameters and 23.3G FLOPs (a 10x parameter and 6.3x FLOPs reduction from the 317M/146.3G uncompressed baseline) while keeping average performance degradation to 1.30%. Ablation studies confirm that removing cross-domain distillation heavily damages out-of-domain generalization (e.g., In-the-Wild EER jumps from 8.43% to 25.84%), while movement-guided pruning is essential for maintaining performance on challenging subsets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building on-device anti-spoofing systems, voice biometric security countermeasures, or real-time deepfake detectors for mobile and resource-constrained edge hardware.

## Related

- (link related pages by id as the wiki grows)
