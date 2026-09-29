---
id: bhosale26b_interspeech
category: enhancement-separation
labels: [low-resource]
institutions: ["Mitsubishi Electric Research Laboratories", "University of Surrey"]
code: https://github.com/merlresearch/janus-rir
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2630
pdf: https://www.isca-archive.org/interspeech_2026/bhosale26b_interspeech.pdf
---

# Dual-Geometry Manifolds for Few-shot RIR Prediction

*Swapnil Bhosale, Gordon Wichern, Yoshiki Masuyama, Moitreya Chatterjee, Christoph Boeddeker, Julius Richter, Xiatian Zhu, Jonathan Le Roux*

[PDF](https://www.isca-archive.org/interspeech_2026/bhosale26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhosale26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2630)

**Category:** `enhancement-separation` · **Labels:** `low-resource`

**TL;DR** — Janus-RIR is a temporally gated, dual-geometry aggregation model that matches latent acoustic geometry to physical room evolution, reducing late reverberation ($T_{60}$) error by 26% over Euclidean baselines.

## Key contributions

- Empirically proves using Gromov $\delta$-hyperbolicity that the acoustic manifold's geometry evolves dynamically from a hierarchical tree structure during early reflections to a flat Euclidean diffuse tail.
- Proposes Janus-RIR, featuring parallel hyperbolic (Poincaré ball) and Euclidean aggregation branches to properly model early specular paths versus late statistical reverberation.
- Introduces a context-aware dynamic signature gate conditioned on temporal embeddings, target queries, and reference-derived acoustic context to handle room-specific mixing times.
- Achieves state-of-the-art performance on the AcousticRooms dataset, improving speech clarity ($C_{50}$) and reducing error across EDT, $C_{50}$, and $T_{60}$ metrics.

## Problem

Current cross-scene few-shot room impulse response (RIR) models (such as xRIR and Few-shot RIR) rely on static, zero-curvature Euclidean latent spaces for all temporal phases. This architectural choice conflicts with the physical reality of room acoustics: early RIR portions are discrete, specular reflection paths forming an exponentially growing tree structure, while late portions form a statistically uniform diffuse tail. Forcing Euclidean geometry onto hierarchical trees causes geometric smearing, destructively interfering with early acoustic transients and degrading speech clarity metrics like $C_{50}$.

## Method

Janus-RIR aligns reference RIRs using Time-of-Flight delays relative to a target, converts them to log-magnitude spectrograms via a ResNet-18 backbone, and merges them with coordinate and temporal embeddings. The architecture splits features into two parallel branches: a Hyperbolic branch and a Euclidean branch.

The Hyperbolic branch maps Euclidean features to the Poincaré ball using the exponential map at the origin. It computes hyperbolic attention logits using scaled negative hyperbolic distances and weighted Einstein midpoints (Möbius gyromidpoints) to preserve the hierarchical geometry of early reflections. An entropy penalty mask with a time-decaying weight prevents the hyperbolic expert from over-averaging early branches. The Euclidean branch uses standard dot-product similarity and weighted sums to enable smooth statistical averaging suited for late reverberation.

A context-aware dynamic signature gate ($G_\phi$) predicts a mixture coefficient $\alpha(t)$ conditioned on the temporal embedding, target query, and an acoustic context vector obtained by max-pooling reference features. The outputs are combined via a product fusion layer, projecting back to $\mathbb{R}^F$. The network is trained end-to-end using $L_1$ spectrogram reconstruction, energy decay losses, and entropy regularization. During inference, time-domain RIR waveforms are reconstructed from predicted magnitude spectrograms using the Griffin-Lim algorithm.

## Experimental setup

Evaluated on the AcousticRooms dataset containing 260 rooms across 10 categories, utilizing $K \in \{1, 4, 8\}$ reference shots. Compared against Few-shot RIR (Euclidean cross-attention) and xRIR (visual-acoustic Euclidean baseline). Evaluated using Early Decay Time (EDT in seconds), Clarity ($C_{50}$ in dB), and Reverberation Time ($T_{60}$ percentage error). Includes both full-featured variants (with ViT-encoded depth maps) and 'NoVision' variants.

## Results

At $K=8$, the Janus-RIR (NoVision) model achieves a $T_{60}$ error of 7.75%, representing a 26% relative error reduction over the Euclidean xRIR baseline (10.53%). This is accompanied by reductions in Early Decay Time error (0.055s to 0.045s) and Clarity error (1.457 dB to 1.126 dB). In spatial extrapolation difficulty tiers, Janus-RIR maintains tight error bounds for targets farther than 2.1m from a reference, whereas Euclidean baselines degrade severely.

Ablation studies show that forcing a purely hyperbolic space ($\alpha=1$) degrades $T_{60}$ error back to 10.52%, and replacing the hyperbolic branch with a second Euclidean branch worsens $C_{50}$ error from 1.127 dB to 1.328 dB, proving that Euclidean space inherently smears early specular reflections. Removing acoustic context from the gating network degrades $T_{60}$ error from 7.75% to 9.46%.

| System / Condition | EDT (s) $\downarrow$ | $C_{50}$ (dB) $\downarrow$ | $T_{60}$ (%) $\downarrow$ |
|---|---|---|---|
| Few-shot RIR ($K=8$) [1] | 0.187 | 4.470 | 21.15 |
| xRIR ($K=8$) [4] | 0.055 | 1.450 | 10.53 |
| xRIR (NoVision, $K=8$) [4] | 0.050 | 1.490 | 11.93 |
| Janus-RIR ($K=8$) | 0.047 | 1.200 | 7.97 |
| Janus-RIR (NoVision, $K=8$) | 0.045 | 1.120 | 7.75 |

## Limitations

The evaluation is restricted to simulated environments within the AcousticRooms dataset, which may not capture all real-world acoustic anomalies or complex scattering phenomena. Inference relies on Griffin-Lim phase reconstruction from magnitude spectrograms, which can introduce phase artifacts. The approach currently relies on sparse spatial reference points and assumes adequate microphone distribution across the target room.

## Why read this

Researchers working on spatial audio, few-shot acoustic modeling, or non-Euclidean representation learning will learn how to build mixed-curvature latent spaces that respect physical dynamics rather than enforcing static Euclidean assumptions.

## Code

- https://github.com/merlresearch/janus-rir

## Applications

Spatial audio rendering, augmented reality acoustic simulation, binaural synthesis, and cross-scene room impulse response prediction.

## Institutions / 機構

Mitsubishi Electric Research Laboratories, University of Surrey

## Related

- [Blind Room Impulse Response Identification via Reverberant Speech Spectrum Reconstruction](wang26c_interspeech.md) — same problem · relatedness 2.7/3
- [Explicit Context-Driven Neural Acoustic Modeling for High-Fidelity RIR Generation](si26_interspeech.md) — same problem · relatedness 2.7/3
- [A Novel Transfer Learning Approach for Room Impulse Response Estimation and Speech Dereverberation Across Geometrically Diverse and Data-Scarce Environments](pasha26_interspeech.md) — same problem · relatedness 2.7/3
- [Echoes after Edits: Room Impulse Response Estimation for Geometry Update](bhosale26_interspeech.md) — same problem · relatedness 2.7/3
- [Room Impulse Response Completion Using Signal-Prediction Diffusion Models Conditioned on Simulated Early Reflections](xu26p_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
