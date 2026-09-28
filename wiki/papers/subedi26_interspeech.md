---
id: subedi26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2966
pdf: https://www.isca-archive.org/interspeech_2026/subedi26_interspeech.pdf
---

# BiMamba2 Masked Discrete-Unit Prediction for Multilingual Speech Representation for Unsupervised Speech in the Wild Challenge

[PDF](https://www.isca-archive.org/interspeech_2026/subedi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/subedi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2966)

**TL;DR** — This paper presents BiMamba2, a bidirectional state-space model trained with masked discrete-unit prediction for multilingual unsupervised speech representation, achieving an Adjusted Rand Index of 0.735 on speaker clustering for the Interspeech 2026 UPS Challenge.

## Problem

Unsupervised speech representation learning across diverse, low-resource multilingual environments remains difficult because most models exhibit performance imbalances and rely heavily on computationally expensive transformer architectures. Standard local holdout validation often fails to reliably predict challenge-level generalization performance across unseen downstream probe tasks. Addressing this gap matters for building scalable, label-efficient speech representations that generalize across varied acoustic conditions and languages.

## Method

The system employs a 47.88M-parameter BiMamba2 backbone consisting of 12 layers with a model dimension of 768, state dimension of 16, and depthwise convolution width of 7. Each BiMamba2 layer combines a forward state-space model, a time-reversed backward state-space model, and a linear residual path. The network is trained using HuBERT-style masked discrete-unit prediction over offline MiniBatchKMeans clusters (k = 200), supplemented by VICReg regularization and a language identification auxiliary loss. The model is trained on a 250-hour, 67-language subset of the MLCommons Unsupervised People's Speech dataset utilizing a shard-based pipeline with language-aware batch sampling.

## Results

Evaluated on the official Dynabench benchmark for the UPS Challenge, the intermediate step-19,500 checkpoint achieved an Adjusted Rand Index (ARI) of 0.735, a language identification macro-F1 of 0.073, and a character error rate (CER) of 0.870. The ARI score surpasses four comparison baselines, outperforming wav2vec 2.0 by 0.105 and XLSR by 0.635. A late-stage checkpoint at step 48,000 exhibited degraded phonetic generalization with a CER of 0.998, and a smaller configuration (d=512, 8 layers) underperformed the primary model across all three tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers working on unsupervised multilingual speech representation, speaker recognition, and downstream acoustic probing in low-resource environments.

## Limitations

The model demonstrates poor language identification and automatic speech recognition performance compared to supervised alternatives, alongside noticeable performance degradation in late-stage training checkpoints.

## Related

- (link related pages by id as the wiki grows)
