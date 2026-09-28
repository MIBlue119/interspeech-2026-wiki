---
id: xuan26_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-36
pdf: https://www.isca-archive.org/interspeech_2026/xuan26_interspeech.pdf
---

# Disentangling Speaker Traits for Deepfake Source Verification via Chebyshev Polynomial and Riemannian Metric Learning

[PDF](https://www.isca-archive.org/interspeech_2026/xuan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xuan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-36)

**TL;DR** — This paper proposes a speaker-disentangled metric learning framework using Chebyshev polynomial approximation and Riemannian geometry to improve speech deepfake source verification robustness.

## Problem

Speech deepfake source verification aims to identify whether two synthetic speech utterances originate from the same generator, but current models suffer from shortcut learning driven by entangled speaker traits. Because speaker identity dominates the embedding space, performance degrades when speaker cues are non-discriminative. This work investigates and addresses this entanglement to ensure source verification relies on genuine synthesis traces rather than speaker characteristics.

## Method

The paper introduces a speaker-disentangled metric learning (SDML) dual-branch architecture, pairing a trainable source encoder with a frozen pre-trained speaker verification model (ReDimNet-B6) to extract speaker embeddings. To suppress speaker information during optimization, the framework proposes two loss functions: ChebySD-AAM, which uses Chebyshev polynomial approximations to stabilize gradients and incorporates an adaptive speaker margin penalty, and RiemannSD-AAM, which projects embeddings onto the Poincaré ball in hyperbolic space to model hierarchical source-speaker relationships via Riemannian distances. The method is implemented across four distinct neural architectures (ECAPA-TDNN, ResNet34, AASIST, and Mamba) and evaluated on four specialized source-speaker disentanglement protocols.

## Results

Experiments conducted on the MLAAD v8 dataset across four evaluation protocols demonstrate that both proposed losses consistently outperform the standard AAM-Softmax baseline. For instance, using the AASIST encoder, the baseline achieves an overall average EER of 9.54% and AUC of 0.928, whereas ChebySD-AAM improves the EER to 6.68% and AUC to 0.951, and RiemannSD-AAM further pushes the performance to 4.59% EER and 0.964 AUC. The gains are especially prominent in challenging cross-scenario setups involving unseen sources and different speakers. Ablation studies confirm the effectiveness of the introduced polynomial degree and hyperbolic curvature hyperparameters.

## Code

- https://github.com/xxuan-acoustics/RiemannSD-Net

## Applications

Speech and ML engineers building forensic countermeasures, audio forensics tools, and source-tracing systems for synthetic speech abuse detection.

## Related

- (link related pages by id as the wiki grows)
