---
id: huang26b_interspeech
category: applications-other
institutions: ["Chongqing University of Posts and Telecommunications", "Brunel University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-366
pdf: https://www.isca-archive.org/interspeech_2026/huang26b_interspeech.pdf
---

# GISNO: Neural Operator-based HRTF Personalization from 3D Meshes via Differentiable Helmholtz Rendering

*Chen Huang, Lei Zhou, Hongqing Liu, Lu Gan, Liming Shi*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-366)

**Category:** `applications-other`

**TL;DR** — GISNO is a neural operator-based framework for head-related transfer function (HRTF) personalization that maps 3D head meshes directly to continuous boundary pressure fields using a differentiable Helmholtz renderer, achieving a mean log-spectral distortion of 2.92 dB on the HUTUBS dataset.

## Key contributions

- Reformulates HRTF prediction from discrete regression to a continuous operator-learning problem, eliminating dependence on fixed spatial sampling grids.
- Proposes a geometrically informed spherical neural operator (GISNO) architecture combining a graph neural operator (GNO) encoder-decoder with a spherical Fourier neural operator (SFNO) latent mapper.
- Integrates a differentiable Helmholtz integral renderer to propagate boundary pressure fields to arbitrary spatial and spectral locations in a physically consistent manner.
- Demonstrates multi-dimensional zero-shot generalization across unseen spatial densities, radial distances, and frequencies without model retraining.

## Problem

Traditional deep learning models for HRTF personalization rely on fixed discrete sampling grids, which restricts their output resolution to training measurement directions and requires extra interpolation for off-grid targets. Furthermore, standard preprocessing techniques that resample irregular 3D meshes onto regular grids often smooth out fine geometric details like pinna folds that are critical for high-frequency acoustic cues. While numerical methods like the boundary element method can compute subject-specific acoustics from scans, their heavy computational cost prevents real-time use, motivating a data-driven approach that retains continuous physical fidelity.

## Method

GISNO takes an unstructured triangular mesh representing the subject's head and extracts per-vertex geometric features including the local area element, unit outward normal, and source-relative position vector. A GNO-based encoder projects these irregular features onto a regular spherical latent grid (65 x 60 equiangular grid) using an anchor-based neighborhood search where spherical latent nodes find their closest point on the mesh surface. This handles non-conforming geometries and ellipsoidal-to-spherical discrepancies. The latent space uses 3 SFNO blocks with a downsampling factor of 2 to model global acoustic scattering; by leveraging zonal kernels and spherical harmonic transforms, SFNO reduces parameter complexity from O(L^2) to O(L) and enforces rotational equivariance.

The predicted complex boundary pressure field is passed through a differentiable Helmholtz integral renderer that treats complex numbers as two-channel real tensors and applies the Helmholtz Integral Formula assuming a sound-hard rigid boundary. This allows sound pressure to be evaluated analytically at any arbitrary field location (such as the ear canal entrance) while backpropagating error directly from field points through the integral operator to train the front-end network. To optimize training efficiency, acoustic reciprocity is exploited by placing a virtual monopole source at each ear entrance, reducing the required forward passes to two per subject. The model is trained using normalized mean squared error (NMSE) on complex acoustic pressure via the AdamW optimizer with an initial learning rate of 2e-4 and a cosine annealing schedule.

## Experimental setup

Evaluated on the HUTUBS dataset containing 3D head meshes for 55 human subjects (40 for training, 15 for testing), augmented by perturbing mesh vertices with zero-mean Gaussian noise along outward normals to expand the training set to 160 meshes. Baselines include traditional anthropometry-based DNN regressions (DNN-PCA, DNN-VAE, DNN-SHT, and DNN-CAE). Evaluation metrics include log-spectral distortion (LSD) in dB and normalized mean squared error (NMSE). Zero-shot generalization is tested using a high-fidelity dataset generated via Mesh2HRTF with 1,550 evaluation points on a 1.2 m sphere (150 Hz step) for training, and 7,800 evaluation points on a 1.5 m sphere (100 Hz step) for testing.

## Results

GISNO achieves a mean log-spectral distortion of 2.92 dB (std 1.61) on the HUTUBS test set, outperforming representative anthropometric baselines such as DNN-PCA (4.78 dB), DNN-SHT (4.70 dB), DNN-CAE (5.27 dB), and DNN-VAE (4.29 dB, std 1.31). In zero-shot evaluation on an unseen 1.5 m sphere at 1 kHz, the predicted pressure distribution closely matches ground truth, yielding a normalized magnitude error mean of 0.0139 and standard deviation of 0.0264 across spatial super-resolution, radial extrapolation, and spectral refinement tasks.

| Systems / Conditions | Mean LSD (dB) | Std. LSD (dB) |
| --- | --- | --- |
| DNN-PCA [8] | 4.78 | 1.57 |
| DNN-VAE [9] | 4.29 | 1.31 |
| DNN-SHT [19] | 4.70 | 1.63 |
| DNN-CAE [20] | 5.27 | 1.98 |
| Proposed (GISNO) | 2.92 | 1.61 |

## Limitations

The evaluation relies on a relatively small dataset of 55 subjects from HUTUBS, and zero-shot generalization capabilities were validated primarily on simulated rather than real measured acoustic data. The framework currently assumes rigid sound-hard boundary conditions, omitting complex acoustic absorption properties of human skin, hair, and clothing. Additionally, computational scaling on larger multi-thousand subject cohorts remains to be demonstrated.

## Why read this

Speech and audio researchers working on spatial audio and immersive VR/AR will find this paper essential for learning how to combine continuous neural operators with classical computational acoustics to achieve mesh-independent, physics-consistent acoustic personalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Immersive VR/AR spatial audio rendering, personalized binaural synthesis, and hearing assistive devices.

## Institutions / 機構

Chongqing University of Posts and Telecommunications, Brunel University

## Related

- [SA-HRTF: A Sound-Assisted Approach to Personalized HRTF Modeling](zhao26f_interspeech.md) — same problem · relatedness 2.9/3
- [HRTF Personalization via Sim-to-Real Neural Field](masuyama26_interspeech.md) — same problem · relatedness 2.9/3
- [HRIR-Former: Grid-Free Time-Domain Reconstruction of Head-Related Impulse Responses with a Spatially Encoded Transformer](xu26c_interspeech.md) — same problem · relatedness 2.5/3
- [HRTF-guided Binaural Target Speaker Extraction with Real-World Validation](ellinson26_interspeech.md) — complementary · relatedness 1.7/3
- [Explicit Context-Driven Neural Acoustic Modeling for High-Fidelity RIR Generation](si26_interspeech.md) — shared technique · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
