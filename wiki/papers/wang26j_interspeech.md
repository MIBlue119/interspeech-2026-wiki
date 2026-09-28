---
id: wang26j_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-465
pdf: https://www.isca-archive.org/interspeech_2026/wang26j_interspeech.pdf
---

# Layer-wise Multi-factor Adaptive Disentanglement for Cross-corpus Speech Depression Detection

[PDF](https://www.isca-archive.org/interspeech_2026/wang26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-465)

**TL;DR** — The paper introduces a layer-wise multi-factor adaptive disentanglement framework (LMAD) to suppress nuisance speaker and corpus factors while preserving depression cues across deep network layers, improving cross-corpus speech depression detection macro-F1 by up to 18 percentage points over baselines.

## Problem

Speech-based depression detection models often suffer from severe performance drops during cross-corpus transfer due to domain shifts from speaker, language, and recording condition variations. Conventional disentanglement methods typically apply constraints only at the final encoder output, failing to stop nuisance factors from accumulating and amplifying across earlier intermediate layers.

## Method

LMAD uses the Hilbert-Schmidt Independence Criterion (HSIC) to measure statistical dependence between intermediate layer representations and speaker identity, corpus factors, and depression labels. Disentanglement and preservation constraints are applied across multiple key encoder layers (4 layers for DepAudioNet, 7 layers for ECAPA-TDNN). An adaptive weighting scheme combines inter-layer/intra-layer dependence proportions with gradient direction agreement (cosine similarity between main task and disentanglement gradients) to dynamically scale factor-specific penalties. Training uses a 1:1 mixture of labeled source corpus (DAIC-WoZ) and unlabeled target corpus (Androids) under an unsupervised domain adaptation setup with binary cross-entropy for the main depression classification task.

## Results

Evaluated on bidirectional transfer between DAIC-WoZ and Androids corpora using DepAudioNet and ECAPA-TDNN backbones. Using ECAPA-TDNN, LMAD with adaptive weighting achieves 0.62 macro-F1 on DAIC-to-Androids (compared to 0.39 for baseline and 0.51 for MDFA) and 0.76 on Androids-to-DAIC (compared to 0.44 for baseline). Within-corpus performance remains competitive (0.68 on DAIC-WoZ and 0.76 on Androids). Ablations confirm that both layer-wise constraints and gradient-aware adaptive weighting progressively increase depression-dependent information in deeper layers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech-based mental health screening and clinical decision support systems operating across diverse acoustic environments and recording devices.

## Limitations

Requires multi-source unlabelled target data during training for unsupervised domain adaptation and relies on coarse corpus and speaker categorical proxies.

## Related

- (link related pages by id as the wiki grows)
