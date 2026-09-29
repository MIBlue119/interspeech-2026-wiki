---
id: bhosale26_interspeech
category: enhancement-separation
institutions: ["Mitsubishi Electric Research Laboratories", "University of Surrey"]
code: https://github.com/merlresearch/geometry-edit-rir
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2514
pdf: https://www.isca-archive.org/interspeech_2026/bhosale26_interspeech.pdf
---

# Echoes after Edits: Room Impulse Response Estimation for Geometry Update

*Swapnil Bhosale, Yoshiki Masuyama, Moitreya Chatterjee, Christoph Boeddeker, Julius Richter, Gordon Wichern, Jonathan Le Roux*

[PDF](https://www.isca-archive.org/interspeech_2026/bhosale26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhosale26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2514)

**Category:** `enhancement-separation`

**TL;DR** — The paper introduces edit-conditioned Room Impulse Response (RIR) estimation, proposing PG-RIR to update a pre-edit RIR using simulated homogeneous proxy RIRs from 3D room meshes without requiring material annotations or post-edit acoustic measurements.

## Key contributions

- Formulates the novel task of geometry-edit-conditioned RIR estimation, updating an initial RIR to reflect room modifications like furniture removal or rearrangement.
- Introduces PG-RIR, an 11.9M-parameter proxy-guided neural network that uses pre- and post-edit proxy RIRs simulated with uniform materials as physics-grounded guidance cues.
- Constructs a large-scale simulated RIR dataset containing 143,455 valid source-receiver pairs across 14 base iGibson scenes and 264 edited variants, stratified by reverberation time differences.
- Demonstrates zero-shot generalization to unseen furniture translation edits and multi-step sequential edit chains without explicit training on translation data.

## Problem

Traditional RIR modeling splits into acoustic simulation, which requires exhaustive, difficult-to-acquire fine-grained material annotations for every object, and spatial interpolation via neural fields, which requires dense, expensive RIR measurements inside the edited scene. Real-world indoor environments experience frequent geometric edits (e.g., rearranging or removing furniture) that alter sound propagation and render prior acoustic measurements obsolete. Existing methods cannot efficiently update RIRs under geometry changes without completely re-measuring the room or performing intractable inverse rendering to estimate material parameters.

## Method

PG-RIR processes real pre-edit RIRs (r0) and simulated proxy RIRs (hm(0), hm(1)) computed across M predefined global absorption materials. The RIRs are converted to log-magnitude spectrograms via STFT and encoded using a shared ResNet-18. Trainable type embeddings (distinguishing real pre-edit, pre-proxy, and post-proxy types) and material embeddings are summed with the acoustic features and projected to obtain fused latents z. These latents are pooled by type and passed to an MLP to generate a context-aware query vector q. 

A query-modulated hypernetwork generates band-wise gating vectors that dynamically scale an octave-mapped temporal positional basis. These temporal weights modulate the reference log-spectrograms via learned attention-like weights, effectively performing adaptive frequency-dependent spectral subtraction and addition (subtractive equalization) to model non-linear reverberation decay. The network predicts a residual log-spectrogram, which is added to the real pre-edit spectrogram and converted to the time domain using the phase of r0 via inverse STFT.

The model is trained using a linear combination of a fine-grained spectral reconstruction loss (weighted at 1.0) and a band-wise energy decay curve loss (weighted at 0.1) to enforce natural reverberation decay.

## Experimental setup

Evaluated on a custom dataset of 143,455 pairs derived from 14 base iGibson scenes and 264 edited variants using the AcoustiX simulator, divided into a leave-one-scene-out cross-validation protocol. Compared against an identity baseline (r0), cross-scene RIR interpolation (xRIR with K=4, 8 references), and differentiable acoustic rendering (DiffRIR) on 9-surface and 34-surface room settings. Evaluated using absolute errors on T60 (reverberation time), C50 (clarity), and EDT (early decay time).

## Results

PG-RIR achieves state-of-the-art performance across all metrics, outperforming the identity baseline and xRIR across all room sizes and edit magnitudes. Specifically, PG-RIR achieves a T60 error of 0.0316 s (vs 0.0432 for identity and ~0.0538 for xRIR) and a C50 error of 1.407 dB (vs 2.034 for identity). Compared to DiffRIR, PG-RIR vastly outperforms it on both small and complex scenes; DiffRIR's inverse-rendering breaks down as surface counts grow (e.g., C50 error rises to 7.160 dB on a 34-surface room, whereas PG-RIR maintains 1.615 dB). In sequential multi-step translation edit chains, PG-RIR outperforms the identity baseline in early steps but accumulates spectral smoothing over repeated forward passes.

| System / Condition | T60 Error (s) ↓ | C50 Error (dB) ↓ | EDT Error (s) ↓ |
|---|---|---|---|
| Identity (r0) | 0.0432 ± 0.0073 | 2.034 ± 0.518 | 0.032 ± 0.0056 |
| xRIR (K=4) | 0.0523 ± 0.0053 | 3.548 ± 0.414 | 0.045 ± 0.0079 |
| xRIR (K=8) | 0.0538 ± 0.0058 | 3.147 ± 0.493 | 0.036 ± 0.0063 |
| PG-RIR (Ours) | 0.0316 ± 0.0076 | 1.407 ± 0.435 | 0.022 ± 0.0044 |

## Limitations

Evaluated exclusively on simulated data using ray-tracing approximations rather than real-world measured acoustic environments. Assumes access to accurate pre- and post-edit 3D room geometries (meshes), neglecting errors from consumer depth sensor scans. Sequential feedback loops cause spectral smoothing that degrades early-energy transients over multiple propagation steps.

## Why read this

Researchers working on acoustic simulation, spatial audio, and neural acoustic modeling should read this to see how combining coarse geometric proxies with deep residual learning bypasses the need for expensive material annotations or real-world RIR remeasurement.

## Code

- https://github.com/merlresearch/geometry-edit-rir

## Applications

Augmented reality, virtual reality, immersive teleconferencing, and dynamic acoustic simulation for smart home environments where furniture layouts frequently change.

## Institutions / 機構

Mitsubishi Electric Research Laboratories, University of Surrey

## Related

- [Dual-Geometry Manifolds for Few-shot RIR Prediction](bhosale26b_interspeech.md) — same problem · relatedness 2.7/3
- [Explicit Context-Driven Neural Acoustic Modeling for High-Fidelity RIR Generation](si26_interspeech.md) — same problem · relatedness 2.6/3
- [A Novel Transfer Learning Approach for Room Impulse Response Estimation and Speech Dereverberation Across Geometrically Diverse and Data-Scarce Environments](pasha26_interspeech.md) — same problem · relatedness 2.5/3
- [Blind Room Impulse Response Identification via Reverberant Speech Spectrum Reconstruction](wang26c_interspeech.md) — same problem · relatedness 2.3/3
- [Room Impulse Response Completion Using Signal-Prediction Diffusion Models Conditioned on Simulated Early Reflections](xu26p_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
