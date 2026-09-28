---
id: shi26e_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2076
pdf: https://www.isca-archive.org/interspeech_2026/shi26e_interspeech.pdf
---

# Leveraging Modality-Specific Label Distributions for Enhanced Multimodal Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/shi26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2076)

**TL;DR** — The paper introduces MoLD, a framework that leverages modality-specific label distributions and a contrastive similarity loss to enhance multimodal emotion recognition, achieving state-of-the-art results on the EmotionTalk corpus.

## Problem

Existing multimodal emotion recognition (MER) approaches typically optimize toward a unified multimodal label while overlooking modality-specific label distributions that capture inherent emotional ambiguity and variations across modalities. The authors show that only 24.5% of samples in interactive dialogues are fully aligned across modalities, making independent unimodal labeling insufficient for modeling cross-modal complementarity.

## Method

The framework uses pretrained self-supervised encoders (HuBERT for speech, RoBERTa for text, and DINOv2 frozen for video) to extract features, subsequently refined via Mamba blocks with a state expansion size of 16 and a convolution width of 4. Each modality branch independently generates a modality-specific label distribution via average pooling and log-softmax layers, while a Cross-Modality Fusion (CMF) module uses bidirectional cross-attention to aggregate complementary cues. Modality-aware representations combine the fused features with their respective label distributions, and a composite loss function optimizes emotion cross-entropy, Kullback–Leibler divergence for label distributions, and InfoNCE-based modality similarity.

## Results

Evaluated on the Chinese EmotionTalk dataset comprising 19,250 utterances across 744 dialogues, MoLD achieves 58.96% Unweighted Average Recall (UAR) and 59.67% Macro-F1, outperforming a Cross-Attention baseline by 2.91% UAR and 2.42% F1. Ablation studies confirm the contribution of each component, showing performance drops to 57.04% UAR without the label distribution loss, 57.06% UAR without the modality similarity loss, and 57.63% UAR without the CMF module. In unimodal settings, MoLD also consistently improves robustness over baselines, notably boosting video modality UAR from 39.03% to 44.66%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building intelligent dialogue systems, mental health monitoring tools, or social media analysis applications involving human-computer interaction and affective computing.

## Related

- (link related pages by id as the wiki grows)
