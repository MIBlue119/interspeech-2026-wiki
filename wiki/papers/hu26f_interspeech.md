---
id: hu26f_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1660
pdf: https://www.isca-archive.org/interspeech_2026/hu26f_interspeech.pdf
---

# ABSE-NET: A Lightweight Neural Model for Active Binaural Speech Enhancement in Open-Fit Hearing Aids

[PDF](https://www.isca-archive.org/interspeech_2026/hu26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1660)

**TL;DR** — ABSE-NET integrates active noise control with binaural speech enhancement for open-fit hearing aids using a lightweight neural network that eliminates the need for an in-ear error microphone.

## Problem

Open-fit hearing aids use physical vents to relieve ear canal pressure and prevent the occlusion effect, but this design inevitably causes external noise and speech to leak into the ear canal. Existing active binaural speech enhancement schemes rely on adaptive filtering that requires an error microphone placed deep inside the narrow ear canal for real-time feedback, which is impractical for comfortable long-term wear. Furthermore, traditional beamformers suffer from spatial covariance matrix estimation errors and acoustic transfer function mismatches that distort target speech.

## Method

The framework cascades a binaural minimum variance distortionless response beamformer for coarse enhancement with a lightweight neural network (LNN) that simultaneously cancels acoustic leakage and compensates for beamformer-induced distortion. The LNN features an encoder, a decoder, and a repeated feature augmentation module comprising a frequency-time dependency learning block and a convolutional attention block. The frequency-time dependency learning block uses separate frequency dependency learning and time dependency learning sub-blocks built with bottleneck linear layers, SiLU activations, and residual 1D convolutional layers. The network is trained using a composite loss function combining scale-invariant signal-to-distortion ratio and short-time objective intelligibility.

## Results

Experiments demonstrate that ABSE-NET outperforms baseline state-of-the-art approaches in both speech quality and computational efficiency across simulated open-fit hearing aid acoustic environments. The method successfully removes acoustic leakage without requiring physical error microphone feedback during deployment. Quantitative evaluations confirm superior performance on perceptual speech quality metrics compared to conventional model-driven and data-driven baselines.

## Code

- https://github.com/Bream101/ABSE-NET

## Applications

Engineers and researchers developing open-fit hearing aids, wearable audio devices, and real-time assistive listening systems.

## Related

- (link related pages by id as the wiki grows)
