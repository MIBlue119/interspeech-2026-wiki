---
id: li26d_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-476
pdf: https://www.isca-archive.org/interspeech_2026/li26d_interspeech.pdf
---

# CAQA-Net: Continual Audio Quality Assessment Across Speech and Music Domains

[PDF](https://www.isca-archive.org/interspeech_2026/li26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-476)

**TL;DR** — The paper introduces CAQA-Net, a continual learning framework for audio quality assessment across speech and music domains that matches joint-learning performance within 0.036 SRCC.

## Problem

Static audio quality assessment (AQA) models fail to keep pace with newly introduced audio domains, generative models, and distortions, creating a cross-task AQA challenge. While joint retraining is computationally expensive, naive fine-tuning causes catastrophic forgetting of previously acquired domains. Audio continual learning is uniquely difficult due to large acoustic feature shifts from speech to music, continuous perceptual score regression, and inconsistent dataset scoring standards.

## Method

CAQA-Net utilizes a dual-branch, multi-head architecture featuring a trainable raw waveform encoder (M2D) for plasticity and a frozen spectrogram-based encoder (BEATS) acting as a semantic anchor. Features from both branches are fused and fed into independent linear regression prediction heads assigned to each individual task. To mitigate catastrophic forgetting, the training process employs a knowledge-distillation regularizer combined with a relative ranking-based fidelity loss mapped via Thurstone's Case V model. At inference time, a prototype-based adaptive gating mechanism uses K-means clustering over the frozen branch's features to compute task weights in a task-agnostic manner.

## Results

Evaluated on a sequential stream of five speech and music datasets including TCD-VOIP, NISQA-SIM, Tencent Corpus, SingMOS, and MusicEval. The complete CAQA-Net with LwF regularization achieves an average Spearman Rank Correlation Coefficient (mSRCC) close to the joint-learning upper bound. It outperforms naive fine-tuning and parameter-importance baselines like EWC and MAS across average performance, plasticity, and stability metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers deploying automated quality assessment systems for evolving audio generation and processing pipelines that handle both speech and music domains.

## Related

- (link related pages by id as the wiki grows)
