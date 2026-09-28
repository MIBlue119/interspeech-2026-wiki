---
id: liu26g_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-836
pdf: https://www.isca-archive.org/interspeech_2026/liu26g_interspeech.pdf
---

# Dual-Granularity Orthogonal Disentanglement for Generalizable Audio Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/liu26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-836)

**TL;DR** — This paper proposes a dual-granularity orthogonal disentanglement framework to prevent implicit identity leakage in audio deepfake detection, achieving competitive generalization across datasets with only 2.1M parameters.

## Problem

Audio deepfake detectors often fail to generalize to real-world scenarios because they memorize speaker-specific identities rather than learning robust synthesis artifacts, a phenomenon known as implicit identity leakage. Existing techniques that attempt to fix this issue either rely on unstable adversarial training or introduce heavy architectural complexities like auxiliary networks. Without explicit disentanglement, models exploit spurious speaker-label correlations, resulting in severe performance drops on unseen domains.

## Method

The framework utilizes a shallow shared convolutional encoder branching into a content branch with multi-head self-attention and an identity branch with mean statistics pooling. It enforces feature independence via a dual-granularity approach: sample-level cosine orthogonality removes directional alignment between embedding pairs, while batch-level cross-covariance regularization eliminates second-order linear correlations across dimensions. A curriculum disentanglement schedule progressively ramps up the orthogonality constraint using a cosine warm-up to prevent representation collapse. The overall architecture is lightweight, containing 2.1M parameters and requiring 0.89 GFLOPs per inference, trained with binary cross-entropy for detection and additive angular margin softmax for speaker supervision.

## Results

Evaluated on ASVspoof 2019 LA, ASVspoof 2021 DF, and In-the-Wild datasets, the method achieves equal error rates (EER) of 1.35%, 7.88%, and 21.58%, respectively. It outperforms gradient reversal adversarial training by 2.60% absolute on cross-dataset transfer to In-the-Wild. Ablations show that removing the identity branch or AAM-Softmax causes major performance drops (+4.30% and +4.04% EER), and combining both cosine and cross-covariance constraints outperforms either used alone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and security systems developers building robust audio deepfake detectors and anti-spoofing countermeasures that must maintain high accuracy across diverse, unseen speakers and real-world synthesis engines.

## Limitations

The text does not state any specific limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
