---
id: wang26h_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-432
pdf: https://www.isca-archive.org/interspeech_2026/wang26h_interspeech.pdf
---

# GMOD: Voice-Face Association Learning via Graph Mining and Orthogonal Disentanglement

[PDF](https://www.isca-archive.org/interspeech_2026/wang26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-432)

**TL;DR** — The paper introduces GMOD, an unsupervised voice-face association framework leveraging global graph mining and orthogonal feature disentanglement, achieving a state-of-the-art verification AUC of 87.73% on VoxCeleb1.

## Problem

Unsupervised voice-face association learning suffers from false-negative conflicts, where speech utterances from identical speakers across different videos are mistakenly treated as negatives during instance-level contrastive learning. Additionally, modality heterogeneity causes identity embeddings to become entangled with modality-private noise, degrading cross-modal alignment. Existing methods relying on rigid clustering or coarse prototypes fail to capture complex local identity distributions during early training stages.

## Method

GMOD combines an intra-modal orthogonal disentanglement module with a graph-guided positive mining strategy. Parallel encoders separate input features into shared identity and modality-private subspaces, regulated by a soft orthogonality constraint and a self-reconstruction mean squared error loss. A global cross-modal similarity graph is constructed using video-level L2-normalized average prototypes to discover latent positive samples via voice-to-face correlations with reverse filling. A curriculum learning strategy linearly decays the k-NN neighborhood size $k$ from 20 to 8 over the first 20 epochs to transition from broad recall to fine-grained precision. Optimization utilizes a multi-positive InfoNCE loss combined with the disentanglement constraints using ECAPA-TDNN and FaceNet feature extractors.

## Results

Evaluated on the VoxCeleb1 dataset comprising 901 training, 100 validation, and 250 test identities without utilizing ground-truth labels during training. GMOD achieves an AUC of 87.73% for cross-modal verification, 87.04% matching accuracy for 1:2 evaluation, and mAP scores of 7.14% (V2F) and 7.59% (F2V) for retrieval tasks, outperforming prior unsupervised and supervised baselines. Ablation experiments confirm that voice-led graph construction and curriculum-guided neighbor decay are essential for balancing robust exploration and precise alignment.

## Code

- https://github.com/BKB00001/GMOD

## Applications

Engineers and researchers building open-set biometric matching, cross-modal retrieval, and audio-visual person recognition systems without relying on identity annotations.

## Limitations

The framework relies on the assumption that voice embeddings provide stable cross-video anchors, and performance depends on the initial graph mining phase.

## Related

- (link related pages by id as the wiki grows)
