---
id: ham26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-963
---

# Continuous 2D Spectral—Temporal Transformer for Speaker Verification

**TL;DR** — A speaker verification transformer that keeps the spectral-temporal grid intact throughout the network instead of collapsing it early, reaching strong VoxCeleb accuracy with a very small parameter count.

## Problem

Hybrid speaker verification architectures like ReDimNet collapse the spectral-temporal grid into a purely temporal representation before global modeling, discarding explicit spectral-temporal structure that could help.

## Method

C2D-ST performs global dependency modeling directly on the 2D spectral-temporal grid throughout most of the backbone, only reducing to temporal-only modeling in a final stage.

## Results

On VoxCeleb, C2D-ST reaches 0.507% average EER with just 6.9M parameters, competitive with larger models while being far more parameter-efficient.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Resource-constrained speaker verification for voice authentication and biometrics on mobile or embedded devices.

## Related

- (link related pages by id as the wiki grows)
