---
id: vo26_interspeech
category: speech-emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1208
pdf: https://www.isca-archive.org/interspeech_2026/vo26_interspeech.pdf
---

# SETEAB: Multiscale approach with Squeeze-and-Excitation Temporal Enhanced Aware Block for Speech Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/vo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/vo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1208)

**TL;DR** — The paper introduces SETEAB, a lightweight speech emotion recognition framework that achieves higher intra-corpus accuracy and stronger cross-corpus generalization than recent baselines while using a fraction of their parameters and FLOPs.

## Problem

Standard lightweight speech emotion recognition (SER) models struggle with optimization instability, feature redundancy, and inadequate temporal dynamics modeling due to crude directional fusion and lack of explicit normalization. Furthermore, massive self-supervised models like Wav2Vec 2.0 carry prohibitive computational costs that hinder edge deployment, while existing efficient architectures often suffer under cross-corpus domain shifts.

## Method

SETEAB extends the TIM-Net architecture by incorporating four main components: a depthwise convolution subsampling front-end for early temporal compression (with rates R=2 or R=4), an SE-Res2Block for local multi-scale and channel-wise refinement, a stack of Temporal Enhanced Aware Blocks (TEABs) utilizing pre-normalization, depthwise temporal filtering, and sigmoid gating for bidirectional temporal modeling, and a weighted bidirectional fusion (BiF) module using global shared weights alongside hierarchical level-specific weights. The channel dimension is fixed at C=64 with an expansion factor e=4, using 8 TEABs in each direction. Training utilizes 80-dimensional log-Mel spectrograms, data augmentations (time/pitch perturbation, speed scaling, SpecAugment), and the cross-entropy loss with label smoothing.

## Results

Evaluated on EMOVO, IEMOCAP, RAVDESS, CREMA-D, and MELD under the EmoBox protocol, SETEAB (R=2) achieves the highest average unweighted accuracy (UA) of 47.69%, while SETEAB (R=4) obtains the best average macro-F1 of 45.23%, outperforming TIM-Net and MS-SENet while requiring only 0.4-0.5M parameters and 0.06-0.12 GFLOPs (compared to 95M parameters and 33.53 GFLOPs for wav2vec 2.0 base). In cross-corpus evaluations across IEMOCAP, MELD, RAVDESS, and SAVEE, SETEAB attains the highest overall mean weighted accuracy of 37.53%, outperforming all baselines and winning 7 out of 12 pairwise transfer settings. Ablation studies confirm that each proposed module—depthwise subsampling, SE-Res2Block, TEAB, and BiF—contributes positively to final accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building on-device, resource-constrained intelligent systems for healthcare monitoring, adaptive customer service, in-vehicle safety, and call-center analytics.

## Limitations

The cross-corpus evaluation reveals a higher standard deviation in weighted accuracy across disparate datasets, indicating potential sensitivity to severe domain shifts despite superior mean performance.

## Related

- (link related pages by id as the wiki grows)
