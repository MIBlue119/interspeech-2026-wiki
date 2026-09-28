---
id: shridhar26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-550
---

# Lung-SRAD: Spectral-Aware Regularized Audio DASS with Dual-Axis Patch-Mix Contrastive Learning for Respiratory Sound Classification

**TL;DR** — Swaps the transformer backbone in respiratory sound classification for a state space model, then adds spectral-aware regularization and a new contrastive learning scheme, beating the AST baseline by 5% on ICBHI.

## Problem

Respiratory sound classification commonly relies on CLS-token self-attention architectures like AST, but these show a low-pass filtering behavior that may reduce sensitivity to localized abnormal breathing patterns.

## Method

Investigates a Distilled Audio State Space model as an alternative backbone, analyzing its spectral response curves to find stronger preservation of mid-to-high spatial-frequency components, then introduces spectral-aware layer regularization via Gaussian convolution and a Dual-Axis Patch-Mix contrastive learning scheme tailored to SSM-based audio models.

## Results

On the ICBHI benchmark, achieves a 64.48% score, outperforming the AST baseline by 5%.

## Code

Released. See https://github.com/RSC-Toolkit/Lung-SRAD

## Applications

Automated stethoscope-based screening for respiratory conditions such as wheezes and crackles in clinical or telehealth settings.

## Related

- (link related pages by id as the wiki grows)
