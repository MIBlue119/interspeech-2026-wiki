---
id: gonzalez26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-659
pdf: https://www.isca-archive.org/interspeech_2026/gonzalez26_interspeech.pdf
---

# Absorbing Discrete Diffusion for Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/gonzalez26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gonzalez26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-659)

**TL;DR** — The paper introduces ADDSE, a non-autoregressive speech enhancement framework using absorbing discrete diffusion over neural audio codec latent spaces, achieving competitive objective performance with fast sampling.

## Problem

Continuous-time STFT-domain diffusion models suffer from high computational demands due to large dimensionality, while autoregressive discrete code modeling leads to slow inference. Addressing these bottlenecks is critical for deploying high-quality generative speech enhancement models efficiently in real-world scenarios.

## Method

The proposed ADDSE framework employs a frozen neural audio codec with residual vector quantization (RVQ) configured with 4 codebooks of 1024 entries at 2 kbps to obtain discrete latent codes from 16 kHz audio. To capture the hierarchical RVQ structure non-autoregressively, the authors introduce RQDiT, which combines separate frame-wise and depth-wise diffusion Transformer blocks equipped with rotary position embeddings and adaptive layer normalization. The model is trained using denoising cross-entropy over continuous-time absorbing discrete diffusion processes, utilizing codec codebook lookups instead of learned input embedding layers for enhanced stability and efficiency.

## Results

Evaluated on the Libri-TUT and Clarity-FSD50K test datasets containing 1000 mixtures each, ADDSE demonstrates competitive performance against baselines like Conv-TasNet, BSRNN, and SGMSE+ using non-intrusive objective evaluation metrics. The approach excels particularly in low signal-to-noise ratio regimes and requires very few sampling steps compared to conventional iterative score-based alternatives. Model scaling is explored across five size configurations (ADDSE-XS to ADDSE-XL) utilizing hidden dimensions from 96 up to 1152.

## Code

- https://philgzl.com/addse-demo

## Applications

Speech/ML engineers can deploy ADDSE for low-latency, high-fidelity speech enhancement, noise suppression, and front-end preprocessing in communication systems or hearing assistive devices.

## Limitations

The text does not state explicit limitations or failure modes.

## Related

- (link related pages by id as the wiki grows)
