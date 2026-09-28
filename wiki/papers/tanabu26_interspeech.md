---
id: tanabu26_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1688
pdf: https://www.isca-archive.org/interspeech_2026/tanabu26_interspeech.pdf
---

# SSL-GMMVC: Interpretable Voice Conversion via Locally Linear GMM Transforms in Self-Supervised Representation Space

[PDF](https://www.isca-archive.org/interspeech_2026/tanabu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tanabu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1688)

**TL;DR** — SSL-GMMVC performs interpretable voice conversion by modeling paired self-supervised speech features with a Gaussian mixture model, improving speaker similarity over global linear baselines.

## Problem

Global linear transformations in self-supervised feature spaces fail to adapt to local variations across phonetic clusters, limiting expressiveness. Conversely, complex neural architectures sacrifice interpretability and require heavy training setups. This method addresses the gap by introducing locally linear, analytically tractable mappings that remain interpretable.

## Method

The system extracts 1024-dimensional frame-level features from the 6th layer of WavLM-Large and aligns source and target utterances using bidirectional cosine-similarity nearest-neighbor matching. It fits a K-component Gaussian Mixture Model (GMM) to the joint source-target vectors using the Expectation-Maximization algorithm. Conversion is computed as a posterior-weighted sum of affine transforms derived from the partitioned component means and covariances. The authors evaluate two covariance variants: Full unconstrained covariance (F) and Cross Diagonal covariance (CD) to prevent overfitting, capping mixture components up to K=4.

## Results

Evaluated on American English CMU ARCTIC data across 30 speaker pairs with training sizes ranging from 10 to 300 utterances, the method was benchmarked against LinearVC and FreeVC. Speaker similarity was measured via Equal Error Rate (EER) using ECAPA-TDNN embeddings, intelligibility via Whisper-base Word Error Rate (WER), and naturalness via UTMOS. Unconstrained SSL-GMMVC F with K=2 and K=4 surpassed LinearVC NC in speaker similarity at N >= 100 and N >= 200, respectively, and outperformed the deep learning baseline FreeVC. Constrained Cross Diagonal (CD) variants consistently outperformed LinearVC BO across all configurations while retaining high intelligibility and naturalness with small data sizes.

## Code

- https://github.com/tomoya-san/ssl-gmmvc

## Applications

Engineers and researchers building voice conversion systems, speech anonymization pipelines, or computer-assisted language learning tools that require interpretability.

## Limitations

Unconstrained models suffer from conversion artifacts and low naturalness when trained on extremely limited data (N=10), requiring at least 20 to 100 utterances for stable performance depending on mixture complexity.

## Related

- (link related pages by id as the wiki grows)
