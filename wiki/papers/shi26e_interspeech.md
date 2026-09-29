---
id: shi26e_interspeech
category: paralinguistics-emotion
institutions: ["Nagoya University", "City University of Macau"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2076
pdf: https://www.isca-archive.org/interspeech_2026/shi26e_interspeech.pdf
---

# Leveraging Modality-Specific Label Distributions for Enhanced Multimodal Emotion Recognition

*Xiaohan Shi, Xingfeng Li, Tomoki Toda*

[PDF](https://www.isca-archive.org/interspeech_2026/shi26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2076)

**Category:** `paralinguistics-emotion`

**TL;DR** — MoLD is a multimodal emotion recognition framework that explicitly models modality-specific label distributions alongside cross-modal fusion and similarity losses, achieving a multimodal UAR of 58.96% and F1 of 59.67% on the EmotionTalk corpus.

## Key contributions

- Proposes the MoLD framework, which incorporates modality-specific label distributions using label distribution learning to handle emotional ambiguity.
- Introduces a modality similarity loss based on temperature-scaled InfoNCE contrastive learning to enforce semantic consistency between modality-specific fused representations and the joint multimodal representation.
- Employs a Cross-Modality Fusion (CMF) module leveraging sequential cross-attention operations across speech, text, and video features.
- Conducts comprehensive evaluations under unimodal, bimodal, and multimodal settings demonstrating consistent gains over standard baselines.

## Problem

Multimodal emotion recognition (MER) systems typically fuse representations from heterogeneous modalities like speech, text, and video into a single unified emotion label. Prior architectures—such as early/late fusion MLPs, multitask setups, and standard cross-attention models—overlook modality-specific label distributions, which capture the inherent ambiguity and distinct emotional tendencies of individual modalities. This limitation hinders the model's ability to fully exploit cross-modal complementarity, especially given that empirical data analysis shows only 24.5% of utterances are fully aligned across all modalities.

## Method

The MoLD architecture processes speech, text, and video inputs through pretrained self-supervised encoders: HuBERT-large for speech, RoBERTa-wwm-ext for text, and a frozen DINOv2-giant model for video. The resulting representations are refined using Mamba blocks configured with a state expansion size of 16 and a convolution width of 4 to capture long-range dependencies. Modality-specific emotion label distributions are generated via average pooling and fully connected layers. A Cross-Modality Fusion (CMF) module then updates each target modality representation by performing sequential cross-attention with the other two modalities, followed by average pooling.

The training objective uses a composite loss combining standard cross-entropy emotion classification loss, Kullback-Leibler (KL) divergence loss for the label distributions across modalities, and an InfoNCE-based modality similarity contrastive loss mapping projected multimodal representations to modality-specific fused outputs. Loss weights are dynamically determined via a softmax over learnable scalar parameters. The model is trained using the Adam optimizer with a learning rate of 1e-4, a batch size of 32, and dropout of 0.5 on the final prediction layer for 30 epochs.

## Experimental setup

Experiments are conducted on the EmotionTalk corpus, a large-scale interactive Chinese multimodal dataset comprising 19,250 utterances across 744 dialogues totaling 23.6 hours, using official seven-class splits. Baselines include non-parametric predictors (majority class, random, oracle bounds), MLP (early fusion), Multitask learning, and Cross-Attention fusion. Evaluation metrics are Unweighted Average Recall (UAR) and Macro-F1 score. Training runs on an Intel Xeon Gold 6248 CPU with 32GB RAM and an NVIDIA Tesla V100 GPU using Python 3.7 and PyTorch 1.11.0.

## Results

MoLD achieves a multimodal UAR of 58.96% and an F1 of 59.67%, outperforming the Cross-Attention baseline (56.05% UAR, 57.25% F1) and standard MLP multimodal baseline (54.08% UAR, 53.66% F1). In unimodal evaluations on individual label predictions, MoLD improves speech UAR to 53.45% (vs 52.81% baseline), text UAR to 28.66% (vs 27.34%), and video UAR to 44.66% (vs 39.03% for MLP). Ablation studies confirm that removing the label distribution loss drops UAR to 57.04% and F1 to 57.03%, removing the modality similarity loss drops UAR to 57.06% and F1 to 58.59%, and removing the CMF module reduces UAR to 57.63% and F1 to 56.36%.

| Systems / Conditions | UAR (%) | F1 (%) |
|---|---|---|
| Majority-Class Baseline | 14.29 | 8.44 |
| MLP (Speech + Video + Text) | 54.08 | 53.66 |
| Multi-task | 55.24 | 55.95 |
| Cross-Attention | 56.05 | 57.25 |
| MoLD (Full Model) | 58.96 | 59.67 |
| MoLD w/o CMF Module | 57.63 | 56.36 |

## Limitations

The evaluation is restricted to a single Chinese language dataset (EmotionTalk), leaving cross-lingual and low-resource scalability unverified. The video encoder is frozen during training, which may limit the adaptation of visual representations to nuanced emotional dynamics. Furthermore, compute constraints limited testing to a single GPU setup on a medium-scale dataset.

## Why read this

Speech and ML researchers working on multimodal emotion recognition will find this paper a clear blueprint for integrating label distribution learning with cross-attention and contrastive consistency losses. It offers actionable insights into handling cross-modal label misalignment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Intelligent dialogue systems, mental health assessment tools, and social media analytics platforms requiring robust multimodal emotion understanding.

## Institutions / 機構

Nagoya University, City University of Macau

**Funding / 經費:** JST CREST, JSPS KAKENHI

## Related

- (link related pages by id as the wiki grows)
