---
id: zhou26f_interspeech
category: speech-emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2118
pdf: https://www.isca-archive.org/interspeech_2026/zhou26f_interspeech.pdf
---

# Conflict-Aware Pseudo-Labeling via Acoustic Signals for Multi-Task Speech Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2118)

**TL;DR** — A conflict-aware pseudo-labeling method for speech emotion recognition derives frame-level acoustic supervision using collaborative sub-model inference and global back-filling, achieving state-of-the-art accuracy across benchmark datasets without requiring text transcripts.

## Problem

Speech emotion recognition traditionally relies on coarse utterance-level annotations that average out local temporal dynamics, transient shifts, and ambiguous transitions. While recent multi-task approaches incorporate automatic speech recognition to capture fine-grained alignment, they depend on expensive human transcripts and increase annotation overhead. Naive pseudo-labeling without explicit conflict handling also introduces temporal label noise because models frequently make contradictory predictions on ambiguous frames.

## Method

The framework utilizes a pretrained HuBERT encoder for downstream multi-task joint training alongside an upstream emotion2vec feature extractor. It partitions the training data into K subsets to train diverse sub-models, whose unpooled outputs are combined via collaborative inference to generate frame-level candidate predictions. A conflict-aware label assignment strategy applies hard pseudo-labels based on a majority vote in consensus regions, while a global back-filling mechanism supervises uncertain conflict regions using the utterance-level ground-truth label as a prior. The model is optimized using a composite objective combining an attention-pooling utterance-level classification loss and a masked auxiliary frame-level loss weighted by a balance parameter lambda of 10 and a rectification coefficient alpha of 0.35.

## Results

Evaluated on IEMOCAP, EmoDB, and MELD datasets using 4 NVIDIA A40 GPUs with AdamW optimization. On IEMOCAP (5-fold LOSO), the approach achieves 78.10% Weighted Accuracy (WA) and 79.07% Unweighted Accuracy (UA). On EmoDB (10-fold LOSO), it reaches 97.30% WA and 97.19% UA, outperforming MS-SENet by an absolute margin of 0.90%. On MELD, it attains a Weighted F1 score of 55.48%, surpassing DropFormer by 6.23%. Ablation studies demonstrate that a naive global broadcasting strategy degrades UA to 71.54% and a consensus-only strategy achieves 76.78% UA, both inferior to the complete proposed method.

## Code

- https://github.com/sfxii/CAPL-SER

## Applications

Speech and machine learning engineers developing robust affect recognition systems for conversational agents, customer service analytics, and interactive healthcare technologies.

## Related

- (link related pages by id as the wiki grows)
