---
id: wen26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-149
pdf: https://www.isca-archive.org/interspeech_2026/wen26_interspeech.pdf
---

# Addressing random spatial translations in measured microphone directional responses by maximizing finite order energy

[PDF](https://www.isca-archive.org/interspeech_2026/wen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-149)

**TL;DR** — The paper introduces the finite order centroid (FOC)—a translation derived by maximizing directional response energy within finite order spatial harmonics—to eliminate spatial positioning uncertainty in measured microphone directional transfer functions.

## Problem

Directional transfer functions (DTFs) measured on real-world or irregular devices suffer from unknown spatial translations relative to their reference centers, which adds uncertainty and redistributes energy across spatial harmonic orders. This invalidates the common assumption that higher spherical harmonic orders correspond to finer spatial details, undermining downstream spatial audio algorithms. The proposed finite order centroid resolves this uncertainty by identifying an acoustically grounded reference center that maximizes finite order energy.

## Method

The paper defines the Lth-order finite order energy ratio (FOER) as the ratio of energy up to spatial harmonic order L to the total directional response energy, with the FOC defined as the translation maximizing this ratio. For discrete spherical grids, explicit orthogonalization of the spherical harmonic basis is performed via QR factorization combined with diagonal quadrature weights. To prevent noisy objectives from flat high-order landscapes, an order-dependent regularization factor (1+l)^(-beta) and a scheduled optimization procedure (coarse low-frequency search followed by a constrained full-band search) are introduced. The approach is evaluated using 2D and 3D measurements of a Samsung Galaxy S24+ mobile phone, the EasyCom glasses dataset, the Røde NT-SF1 array, and ITA/3D3A HRTF datasets.

## Results

Evaluated on measured DTFs from the Samsung Galaxy S24+, EasyCom dataset, Røde NT-SF1, and HRTF datasets (ITA and 3D3A), demonstrating practical utility across spatial interpolation, smoothing, and ambisonic encoding. Across ITA and 3D3A HRTF datasets, computed FOC distributions reveal standard deviations of 10 to 30 mm in each dimension, quantifying real-world measurement uncertainties. Using FOC translation on an ITA HRTF sample improves sagittal symmetry in relative delay patterns between left and right channels. Direction-aware ambisonic encoding using FOC-translated DTFs and microphone signals improves spatial correlation and spectral magnitude difference metrics under directional errors up to 10 degrees.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers working on spatial audio, microphone arrays, AR/VR devices, and head-related transfer function (HRTF) processing can use FOC for DTF calibration, interpolation, spatial smoothing, and robust ambisonic encoding.

## Limitations

The method is strictly limited to addressing spatial translation uncertainty and cannot correct other causes of directivity distortion.

## Related

- (link related pages by id as the wiki grows)
