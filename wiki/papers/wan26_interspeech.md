---
id: wan26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-868
pdf: https://www.isca-archive.org/interspeech_2026/wan26_interspeech.pdf
---

# Enhancing Visual Paralinguistics: Motion-Guided Spatial Denoising for Non-Verbal Interaction Analysis

[PDF](https://www.isca-archive.org/interspeech_2026/wan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-868)

**TL;DR** — This paper proposes a signal processing-inspired framework with motion-guided spatial denoising and class-learnable fusion to improve micro-gesture recognition, achieving a state-of-the-art Top-1 accuracy of 67.02% on the MA-52 dataset.

## Problem

Recognizing visual micro-gestures and non-verbal cues in unconstrained environments suffers from severe visual clutter, such as background objects resembling human limbs that generate false-positive heatmaps. Existing Graph Convolutional Networks and Video Transformers rely on heavy backbones without explicit denoising, making them computationally intensive and prone to overfitting on noisy data. Furthermore, standard multimodal fusion schemes use a one-size-fits-all compromise or unstable instance-wise attention that fails to respect the intrinsic class-dependent reliability of visual modalities.

## Method

The framework uses a dual-stream architecture combining an RGB stream with a ResNet-18 backbone for global context and a motion-aware Pose stream. The Pose stream incorporates a Motion-Guided Spatial Refinement Module (MG-SRM) that calculates multi-order temporal differences to extract raw motion tensors, functioning as a dynamic spatial filter to suppress static background noise via affine parameter modulation and gated aggregation with a zero-initialized residual connection. Additionally, a Class-Learnable Fusion (CLF) head optimizes global scalar weights per action category rather than per sample, providing stable regularization for modality combination. Trained using SGD on a single RTX 3090 GPU for 30 epochs with batch size 10, the model adds only 0.072M parameters and 1.794G FLOPs over the baseline.

## Results

Evaluated on the challenging MA-52 dataset for micro-action recognition, the approach achieves a Top-1 Accuracy of 67.02% and an F1-Mean of 0.6993, outperforming prior published methods like PCAN (66.74%) and the dataset baseline MMN (62.71%). Ablation studies demonstrate that adding CLF alone yields 66.42% Top-1 accuracy, MG-SRM alone yields 66.43%, and their combination reaches 67.02%. Testing with reversed video sequences shows a performance drop to 65.68%, confirming temporal causality capture, while replacing MG-SRM with a Transformer encoder drops accuracy to 66.04%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building multimodal conversational systems, empathetic human-computer interaction agents, and affective computing platforms can use this approach to reliably capture subtle non-verbal user intents from video.

## Related

- (link related pages by id as the wiki grows)
