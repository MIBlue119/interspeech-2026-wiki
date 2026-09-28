---
id: li26g_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-582
---

# Aleatoric Style Uncertainty Augmentation with GMM for Domain Generalization in Anti-spoofing

**TL;DR** — Modeling domain-shift uncertainty with a Gaussian mixture instead of a single Gaussian, updated online with an EM-like rule, gives anti-spoofing systems better generalization to unseen spoofing attacks.

## Problem

Speech anti-spoofing systems degrade in out-of-domain settings because of varied unknown spoofing attacks, and existing style-augmentation methods for domain generalization assume a single, unimodal style distribution per batch, which doesn't hold when batches mix multiple domains.

## Method

The authors propose Gaussian mixture model (GMM) based aleatoric style uncertainty (ASU) to model within-component variability, together with an online EM-like update for the GMM trained end-to-end.

## Results

On anti-spoofing and spoofing-aware speaker verification (SASV) benchmarks, ASU significantly outperforms existing style-augmentation methods and surpasses state-of-the-art systems.

## Code

Code reported as available on GitHub by the authors — unverified by this wiki as of the `updated` date; please confirm and update this entry if you can.

## Applications

More robust anti-spoofing and spoofing-aware speaker verification for voice authentication systems facing evolving, unseen attack types.

## Related

- (link related pages by id as the wiki grows)
