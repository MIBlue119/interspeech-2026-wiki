---
id: liang26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-342
pdf: https://www.isca-archive.org/interspeech_2026/liang26_interspeech.pdf
---

# DNSMOS-C: Improving End-to-end Speech Quality Models via Contrastive Learning

[PDF](https://www.isca-archive.org/interspeech_2026/liang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-342)

**TL;DR** — DNSMOS-C integrates a MOS-guided triplet contrastive loss into an efficient end-to-end speech quality assessment framework, improving cross-domain generalization and correlation metrics compared to DNSMOS Pro.

## Problem

Non-intrusive speech quality assessment models like DNSMOS Pro are computationally efficient and suitable for real-time applications, but they struggle to generalize to unseen distortions or recording conditions. While contrastive learning approaches like SCOREQ can organize latent spaces along a continuous quality manifold for better generalization, they rely on heavily parameterized self-supervised learning models and multi-stage training pipelines that hinder real-time deployment.

## Method

The paper introduces DNSMOS-C, which extends the DNSMOS Pro architecture (four convolutional layers followed by global max-pooling to output a 64-dimensional embedding, and a fully connected head predicting Gaussian posterior mean and variance) with an adapted SCOREQ triplet-based contrastive loss applied directly to intermediate embeddings. The network is trained jointly using a combination of Gaussian negative log-likelihood (GNLL) loss and the MOS-guided contrastive loss with a margin of zero and a weighting factor lambda set to 1. It takes 16 kHz log-magnitude spectrograms with 20 ms Hann windows and 10 ms hop sizes as input, padded or cropped to 10 seconds, and is optimized using the Adam optimizer for 500 epochs.

## Results

Evaluated on BVCC, Tencent, NISQA SIM, and various unseen test sets (NISQA TEST FOR, P501, LIVETALK, TCD-VoIP, LibriAugmented1600, ESC50), DNSMOS-C consistently achieves higher linear correlation coefficient (LCC) and Spearman rank correlation coefficient (SRCC) than DNSMOS Pro across training domains. For example, on the Tencent dataset, DNSMOS-C achieves an LCC of 0.921 and SRCC of 0.925 compared to DNSMOS Pro's 0.917 and 0.920. Latent space analyses on TCD-VoIP show that principal components explain substantially more variance in MOS scores after contrastive learning, with the multiple correlation coefficient R increasing from 0.40 to 0.51 (using NISQA SIM trained models).

## Code

- https://github.com/Hope-Liang/DNSMOS-C

## Applications

Speech and ML engineers developing real-time audio technologies, streaming services, VoIP deployments, and generative speech monitoring systems.

## Limitations

The MOS-guided contrastive loss creates a trade-off, leading to a slight degradation in separating specific distortion types in the latent space on distortion-heavy datasets like LibriAugmented1600.

## Related

- (link related pages by id as the wiki grows)
