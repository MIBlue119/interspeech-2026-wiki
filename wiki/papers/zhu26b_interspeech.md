---
id: zhu26b_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2148
pdf: https://www.isca-archive.org/interspeech_2026/zhu26b_interspeech.pdf
---

# G-MaP-SE: Guided Speech Enhancement via GMM-Based Prior Matching

[PDF](https://www.isca-archive.org/interspeech_2026/zhu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2148)

**TL;DR** — G-MaP-SE refines noisy speaker embeddings using a pre-computed clean Gaussian Mixture Model (GMM) prior, improving guided speech enhancement robustness under noise and domain shift without requiring clean enrollment audio.

## Problem

Personalized speech enhancement relies on speaker embeddings from clean enrollment audio to preserve the target voice and suppress interference, but clean enrollment is frequently unavailable in practical settings. Extracting these conditioning features directly from noisy input avoids this requirement, but noise and domain shift severely distort the resulting embeddings, degrading enhancement performance. This work addresses the unreliability of noisy conditioning without requiring extra user recordings at inference time.

## Method

The framework freezes an ECAPA-TDNN feature extractor to output 192-dimensional embeddings and fits a K-component GMM with diagonal covariances on clean speech using the EM algorithm. Given a noisy waveform, its embedding is normalized and matched against the GMM means using a cosine similarity score regulated by a temperature parameter to produce a soft-weighted prior embedding. This matched prior embedding is injected into intermediate time-frequency features of an MP-SENet enhancement backbone via a lightweight gated fusion block with element-wise gating. The model is trained on VoiceBank+DEMAND using a multi-term loss combining PESQ-based GAN, STFT consistency, magnitude, complex-spectrum, phase, and time-domain losses.

## Results

Evaluated on the VoiceBank+DEMAND (in-domain) and DNS Challenge 2020 without reverberation (cross-domain) test sets, using MP-SENet as the backbone. On DNS2020, prior matching consistently improves metrics like WB-PESQ and SI-SDR over noisy conditioning and significantly narrows the performance gap toward oracle clean conditioning. Ablation studies show that setting the matching temperature to 0.2 and number of GMM components to 192 achieves optimal performance, balancing assignment sharpness and prototype coverage. Embedding analysis confirms that the GMM matching shifts cosine similarity distributions closer to clean reference embeddings.

## Code

- https://github.com/Hello3orld/G-MaP-SE

## Applications

Speech enhancement engineers and application developers deploying single-channel noise suppression systems in uncontrolled acoustic environments or cross-domain scenarios.

## Limitations

Under severe noise, some noisy embeddings may still be assigned to suboptimal GMM prototypes, failing to fully recover the underlying clean representation.

## Related

- (link related pages by id as the wiki grows)
