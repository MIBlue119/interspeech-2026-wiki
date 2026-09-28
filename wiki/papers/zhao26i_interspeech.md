---
id: zhao26i_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2564
pdf: https://www.isca-archive.org/interspeech_2026/zhao26i_interspeech.pdf
---

# Towards Robust Generative Speech Enhancement Using Vector Quantisation-Based Neural Audio Codec

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2564)

**TL;DR** — The paper introduces continuous and discrete latent-space neural audio codec speech enhancement frameworks (cNAC-SE and dNAC-SE), with the fully fine-tuned cNAC-SE model achieving leading performance on DNS-MOS metrics while operating at a lower computational cost.

## Problem

Discriminative speech enhancement struggles to balance noise suppression and signal preservation, while existing generative models often lack structured regularisation or rely solely on discrete token classification. Furthermore, prior work has not thoroughly compared continuous versus discrete latent modeling strategies or isolated the specific regularizing effects of vector quantization in neural audio codecs.

## Method

The proposed cNAC-SE and dNAC-SE architectures process latent representations extracted via the Descript Audio Codec (DAC), configured with 12 residual vector quantizers, a codebook size of 1024, and an embedding dimension of 1024. The enhancer module consists of 6 sequential transformer blocks featuring relative position bias, multi-head attention with 8 heads using 1-second causal trapezoidal masking, and feed-forward layers. Training utilizes a latent-space distance loss combined with a multi-resolution phase-aware reconstruction loss, alongside stage-wise or soft/hard fine-tuning strategies for the frozen or jointly optimised codec encoder and decoder.

## Results

Evaluated on the DNS3 Challenge dataset spanning 140 hours of training data and three test subsets (synthetic with/without reverberation, and real-world recordings), the fully fine-tuned cNAC-SE model outperforms dNAC-SE variants and established generative baselines like CDiffuSE, SGMSE, StoRM, SE-CE, and SELM across most DNS-MOS metrics (SIG, BAK, OVL). For instance, on synthetic data with reverberation, cNAC-SE achieves an overall DNS-MOS of 3.59 compared to noisy inputs of 1.76 and baseline generative scores around 2.95–3.24. The enhancer module of cNAC-SE requires 2.58 G MAC/s compared to 3.84 G MAC/s for the joint-modeling dNAC-SE variant.

## Code

- https://aspire.ugent.be/demos/INTERSPEECH2026HZ/

## Applications

Speech and audio engineers building robust generative speech enhancement systems for telephony, conferencing, or cloud-based audio processing pipelines.

## Limitations

The substantial computational overhead of the full neural audio codec pipeline may restrict deployment in strictly resource-constrained or on-device scenarios.

## Related

- (link related pages by id as the wiki grows)
