---
id: pizarro26_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1361
pdf: https://www.isca-archive.org/interspeech_2026/pizarro26_interspeech.pdf
---

# Lightweight Detection and Model Attribution of Synthetic Speech via Residual Statistical Fingerprints

[PDF](https://www.isca-archive.org/interspeech_2026/pizarro26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pizarro26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1361)

**TL;DR** — The paper introduces Residual Statistical Fingerprints (RSFs) for training-free synthetic speech detection and source model attribution using Mahalanobis distance scoring in the spectral residual space.

## Problem

Current deepfake detection methods only perform binary classification, failing to identify which specific generation model or system created a forged audio sample. Attribution is critical for forensic investigations, legal evidence chains, and threat intelligence, but existing attribution techniques rely on closed-world supervised classifiers that require retraining and fail to generalize to unseen architectures. This lack of attribution leaves investigators and organizations blind to the exact tools and APIs exploited in voice cloning attacks.

## Method

The framework maps variable-length audio waveforms to fixed-length representations using time-averaged log-magnitude STFT spectra. To isolate generative artifacts from semantic content, it applies content-preserving filters via either a pretrained EnCodec neural audio compressor (operating at 24 kHz) or spectral Finite Impulse Response (FIR) equiripple filters designed with the Parks-McClellan algorithm. Residual embeddings are computed by subtracting the filtered spectrum from the original spectrum, and model-specific Residual Statistical Fingerprints (RSFs) are estimated as the empirical mean of these residuals using only target model samples. Classification, open-world single-model attribution, closed-world multi-model attribution, and out-of-domain detection are then formulated as distance-based decisions using the Mahalanobis distance relative to the training residual covariance matrix.

## Results

The approach is evaluated across multiple synthesis systems, architectures, languages, and noise conditions, demonstrating robust performance on open-world single-model attribution, closed-world multi-model attribution, real versus synthetic classification, and out-of-domain detection tasks. The framework operates in a training-free manner for the attribution targets, requiring only samples from the specific target model during construction. It effectively captures model-specific artifacts across diverse generative families including GAN-based, diffusion-based, flow-based, and neural codec generators without needing access to model weights or architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Digital forensics investigators, cybersecurity teams, and legal experts can use this tool to attribute fake audio evidence to specific commercial or open-source speech synthesis generators.

## Limitations

The text does not state any specific limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
