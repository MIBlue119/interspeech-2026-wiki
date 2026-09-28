---
id: huang26b_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-366
pdf: https://www.isca-archive.org/interspeech_2026/huang26b_interspeech.pdf
---

# GISNO: Neural Operator-based HRTF Personalization from 3D Meshes via Differentiable Helmholtz Rendering

[PDF](https://www.isca-archive.org/interspeech_2026/huang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-366)

**TL;DR** — The paper introduces a geometrically informed spherical neural operator (GISNO) for head-related transfer function (HRTF) personalization, achieving a mean log-spectral distortion of 2.92 dB on the HUTUBS dataset.

## Problem

Conventional deep learning approaches for HRTF personalization are constrained by fixed, discrete sampling grids and require regularizing mesh preprocessing that washes out fine morphological details like pinna folds. Furthermore, standard neural networks struggle to generalize across different mesh resolutions and off-grid spatial directions without additional interpolation. Addressing this is crucial for accurate binaural spatial audio rendering in immersive virtual and augmented reality environments.

## Method

The proposed GISNO framework treats HRTF prediction as a continuous operator-learning task by combining a graph neural operator (GNO) encoder-decoder, a spherical Fourier neural operator (SFNO) latent mapper, and a differentiable Helmholtz-integral renderer. The GNO maps unstructured triangular 3D head meshes to a regular spherical latent grid using anchor-based neighborhoods, while the SFNO models global acoustic scattering interactions. The predicted continuous boundary pressure field is analytically propagated to arbitrary field locations using a differentiable Helmholtz integral formula. The model is trained on the HUTUBS dataset using an AdamW optimizer, incorporating geometry-based data augmentation via vertex perturbations along local normals.

## Results

Evaluated on the HUTUBS dataset comprising 40 training and 15 testing subjects across 440 spatial directions, the model achieves a mean log-spectral distortion (LSD) of 2.92 dB (standard deviation 1.61 dB), outperforming baseline architectures such as DNN-PCA (4.78 dB), DNN-VAE (4.29 dB), DNN-SHT (4.70 dB), and DNN-CAE (5.27 dB). In zero-shot generalization experiments using simulated data, the model successfully performed spatial super-resolution from 1,550 to 7,800 points, radial extrapolation from 1.2 m to 1.5 m, and spectral refinement with a finer frequency step, yielding a mean normalized magnitude error of 0.0139.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers developing binaural audio rendering systems for virtual reality (VR), augmented reality (AR), and immersive headphone-based spatial audio applications.

## Limitations

The evaluation relies on a relatively small number of subjects from the HUTUBS dataset, and the multi-dimensional zero-shot generalization capabilities were validated primarily on simulated rather than real measured data.

## Related

- (link related pages by id as the wiki grows)
