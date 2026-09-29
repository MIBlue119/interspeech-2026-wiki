---
id: wan26_interspeech
category: paralinguistics-emotion
institutions: ["Harbin Institute of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-868
pdf: https://www.isca-archive.org/interspeech_2026/wan26_interspeech.pdf
---

# Enhancing Visual Paralinguistics: Motion-Guided Spatial Denoising for Non-Verbal Interaction Analysis

*Junjie Wan*

[PDF](https://www.isca-archive.org/interspeech_2026/wan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-868)

**Category:** `paralinguistics-emotion`

**TL;DR** — A dual-stream micro-gesture recognition framework uses multi-order motion differences to suppress background noise in pose heatmaps and a class-level fusion strategy to optimize modality weights, achieving 67.02% Top-1 accuracy on the MA-52 dataset.

## Key contributions

- Proposes the Motion-Guided Spatial Refinement Module (MG-SRM) as a plug-and-play component that filters spatial noise and background artifacts from pose heatmaps using explicit multi-order temporal differences.
- Introduces Class-Learnable Fusion (CLF) to optimize category-specific modality preference weights via backpropagation, avoiding the instability and overfitting typical of instance-wise dynamic attention.
- Achieves state-of-the-art performance on the MA-52 dataset with minimal computational overhead, adding only 0.08M parameters and 1.8G FLOPs over the baseline.

## Problem

Spoken communication relies heavily on non-verbal cues like micro-gestures, but recognizing them in unconstrained environments suffers from severe visual clutter, such as furniture resembling limbs acting as spatial noise. Existing Graph Convolutional Networks and Video Transformers lack explicit spatial denoising and are prone to overfitting on noisy pose inputs or failing due to fixed late-fusion weights. This work addresses the degradation of the signal-to-noise ratio in pose heatmaps, which is critical for empathetic and responsive human-computer interaction systems.

## Method

The framework employs a dual-stream architecture with an RGB stream using a standard ResNet-18 backbone for global appearance context, and a pose stream handling keypoint heatmaps. The Motion-Guided Spatial Refinement Module (MG-SRM) extracts explicit first-order velocity ($\Delta X_t^{(1)}$) and second-order acceleration ($\Delta X_t^{(2)}$) temporal differences to construct a raw motion tensor ($M_{raw}$), which is processed by lightweight heads to generate pixel-wise affine scale ($\gamma_s, \gamma_t$) and shift ($\beta_s, \beta_t$) parameters that recalibrate spatial and temporal branches. A gated aggregation mechanism with soft attention weights ($G_s, G_t, G_m$) and a zero-initialized residual connection scaled by a learnable parameter $\alpha$ merges the refined features while maintaining stable optimization.

For modality combination, the Class-Learnable Fusion (CLF) head optimizes a global scalar parameter $p_c$ for each action category $c$ via backpropagation, bounding the modulation factor with a tanh function. This bypasses instance-wise dynamic attention, which is sensitive to sample noise. The design choices were driven by the empirical observation that different micro-gestures have intrinsic, semantic dependencies on appearance versus motion cues, and that explicit motion subtraction acts as a data-efficient structural inductive bias compared to self-attention transformers.

## Experimental setup

Evaluated on the MA-52 dataset for spontaneous micro-action recognition in naturalistic HCI environments. Compared against baselines including TSN, TSM, ST-GCN, CTR-GCN, MMN, PoseConv3D, ViViT, VideoMAE, and PCAN. Metrics reported are Top-1 Accuracy (%) and F1-Mean score. Implemented in PyTorch on a single RTX 3090 GPU, trained for 30 epochs using SGD (momentum 0.9, weight decay $10^{-4}$, batch size 10) with an initial learning rate of 0.0075 decayed via MultiStepLR at epochs 10 and 20, sampling 8 RGB frames and 32 Pose frames per clip with standard 224x224 augmentations.

## Results

The full framework (MG-SRM + CLF) achieves a headline Top-1 Accuracy of 67.02% and an F1-Mean of 0.6993 on the MA-52 dataset, outperforming the previous published state-of-the-art PCAN (66.40% reproduction) and the baseline MMN (62.71%). Ablation studies show that adding CLF alone yields 66.42% accuracy, adding MG-SRM alone yields 66.43%, and their combination achieves the peak 67.02%, demonstrating strong complementarity. Replacing CLF with instance-wise attention drops performance to 66.72% Top-1, and replacing MG-SRM with a Transformer encoder yields 66.04%. Reversing video playback drops accuracy to 65.68%, confirming the model captures causal temporal dynamics rather than static artifacts.

| System / Condition | Top-1 Acc (%) | F1-Mean |
|---|---|---|
| TSN [10] | 60.52 | 0.4367 |
| MMN [8] | 62.71 | 0.6534 |
| PoseConv3D [12] | 63.52 | 0.6666 |
| PCAN* [19] | 66.40 | 0.6950 |
| Baseline | 65.88 | 0.6904 |
| Ours (MG-SRM + CLF) | 67.02 | 0.6993 |

## Limitations

The evaluation is restricted to a single dataset (MA-52) focused primarily on micro-gestures, leaving broader multi-domain generalization untested. The framework relies on pre-extracted 2D/3D pose heatmaps, meaning errors or missed detections from the underlying pose estimator can still bottleneck downstream accuracy. Furthermore, compute and scalability bounds are evaluated on fixed 8-frame RGB and 32-frame pose clips on a single consumer-grade GPU.

## Why read this

Multimodal speech and HCI researchers building conversational frontends or visual paralinguistics systems should read this to learn how signal-processing-inspired temporal differencing and class-level fusion outperform heavy transformer or graph attention architectures on noisy spatial data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multimodal conversational agents, responsive robotic systems, and empathetic human-computer interaction interfaces requiring robust non-verbal intent analysis.

## Institutions / 機構

Harbin Institute of Technology

## Related

- (link related pages by id as the wiki grows)
