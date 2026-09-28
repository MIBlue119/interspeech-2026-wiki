---
id: bhosale26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2630
pdf: https://www.isca-archive.org/interspeech_2026/bhosale26b_interspeech.pdf
---

# Dual-Geometry Manifolds for Few-shot RIR Prediction

[PDF](https://www.isca-archive.org/interspeech_2026/bhosale26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhosale26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2630)

**TL;DR** — Janus-RIR is a temporally gated, dual-geometry few-shot room impulse response (RIR) prediction model that combines a hyperbolic branch for early reflections with a Euclidean branch for late reverberation, reducing T60 error by 26% compared to Euclidean baselines.

## Problem

Current few-shot RIR estimation models fuse references in a static Euclidean space, assuming zero-curvature latent geometry. However, RIRs are temporally heterogeneous: early reflections form a sparse, hierarchical tree-like topology, whereas late tails form a diffuse, statistically uniform field. Euclidean spaces inherently fail to embed trees without severe distortion, leading to geometric smearing that ruins early acoustic transients and degrades speech clarity metrics like C50.

## Method

Janus-RIR uses a feature backbone based on ResNet-18 encoders and time-of-flight alignment to process K reference RIRs. It routes features to two parallel branches: a hyperbolic branch (Poincaré ball) using exponential maps, distance-based attention, and Einstein midpoints to preserve early-reflection hierarchies, and a Euclidean branch using dot-product attention for smooth late-tail averaging. A context-aware dynamic signature gate predicts a mixing coefficient conditioned on temporal embeddings, target coordinates, and max-pooled reference features. The model is trained using an entropy regularization penalty on the hyperbolic attention weights, alongside L1 spectrogram reconstruction and energy decay losses.

## Results

Evaluated on the AcousticRooms dataset across K in {1, 4, 8} reference shots, Janus-RIR without vision features achieves a T60 error of 7.75% at K=8, compared to 10.53% for the Euclidean xRIR baseline. It also improves Early Decay Time error from 0.055s to 0.045s and absolute Clarity (C50) error from 1.457dB to 1.126dB at K=8. Ablation studies confirm that forcing a static hyperbolic-only space degrades T60 error back to 10.52%, replacing the hyperbolic branch with a second Euclidean branch worsens C50, and removing acoustic context features from the gate increases T60 error to 9.46%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers working on spatial audio rendering, augmented reality, and acoustic simulation for unseen target positions using sparse reference measurements.

## Limitations

The current framework reconstructs magnitude spectrograms and relies on Griffin-Lim for time-domain waveform recovery.

## Related

- (link related pages by id as the wiki grows)
