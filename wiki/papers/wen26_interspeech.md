---
id: wen26_interspeech
category: applications-other
institutions: ["Samsung"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-149
pdf: https://www.isca-archive.org/interspeech_2026/wen26_interspeech.pdf
---

# Addressing random spatial translations in measured microphone directional responses by maximizing finite order energy

*Xue Wen*

[PDF](https://www.isca-archive.org/interspeech_2026/wen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-149)

**Category:** `applications-other`

**TL;DR** — The paper introduces the finite order centroid (FOC)—a translation derived by maximizing directional response energy within finite-order spatial harmonics—to eliminate random positioning uncertainty in measured microphone directional transfer functions (DTFs). This calibration improves downstream spatial audio tasks such as interpolation, smoothing, and direction-aware ambisonic encoding.

## Key contributions

- Formulates the finite order centroid (FOC) concept as an acoustically grounded reference centre that maximizes the finite order energy ratio (FOER) up to a chosen spherical harmonic order L.
- Proposes a robust numerical calculation method using explicit orthogonalization of sampled spherical harmonics on discrete grids, order-dependent regularization, and a scheduled optimization strategy to mitigate high-frequency spatial volatility.
- Extends the FOC formulation to multi-microphone arrays to simultaneously minimize truncation errors across all constituent elements.
- Demonstrates utility on real-world datasets (Samsung Galaxy S24+, EasyCom glasses, ITA and 3D3A HRTF datasets) showing consistent gains in DTF interpolation, smoothing, and ambisonic encoding.

## Problem

Spatial audio algorithms heavily rely on Direction Transfer Functions (DTFs) measured relative to a reference centre in space. For irregular consumer devices or human-worn gear (e.g., smart glasses), the physical measurement centre is often unknown, asymmetrical, or subject to random positioning translation during data acquisition. While spatial rotation preserves energy across spherical harmonic orders, translation redistributes energy across orders, invalidating the common assumption that higher orders represent high spatial complexity. Prior methods lack a principled way to resolve this positioning uncertainty, leading to spatial aliasing and performance degradation in spatial signal processing.

## Method

The method is built upon the plane wave model of sound fields, where a directional response h(k) is expanded into spherical harmonics (SpH) up order L. The truncation error is dictated by energy spilling past order L. The L-th order Finite Order Centroid (FOC) is defined as the spatial translation vector r that maximizes the finite order energy ratio (FOER). To compute this on a discrete spherical grid g with NI x NJ points, the authors address the lack of orthonormality in sampled spherical harmonics by applying a QR factorization on the weighted basis matrix W^(1/2)Y = QR to obtain an orthogonalized basis Y_bar = W^(-1/2)Q.

Because higher-order energy exchange is weak and objective landscapes become flat and noisy, an order-dependent regularization weight of (1+l)^(-beta) (with beta = 0.01) is applied across order boundaries. Furthermore, a two-stage scheduled optimization is used to handle high-frequency volatility: the FOC is first roughly optimized over a narrow low-frequency band up to fc, and then refined using the full frequency band within a local radius alpha*c/fc. For multi-microphone arrays, a joint objective is formulated by minimizing the maximum truncation error across all microphones simultaneously using low-frequency ranges where wavelengths exceed array dimensions.

During inference, the estimated FOC vectors for each microphone are used to translate both the DTF and captured signals via phase shifts (e.g., h_prime(k) = h(k) * exp(-j k * r)), executing downstream operations like interpolation, smoothing, or ambisonic encoding in a calibrated coordinate frame before translating the outputs back.

## Experimental setup

Evaluations use in-house measured DTFs from a Samsung Galaxy S24+ (2D and 3D grids, NI=18, NJ=9), the EasyCom glasses dataset (6 channels grouped into left, middle, right), the Røde NT-SF1 microphone array, and public HRTF corpora including the ITA HRTF dataset and the 3D3A HRTF dataset. Metrics include spatial correlation coefficients (higher is better), spectral magnitude differences/EQ error (lower is better), and relative square errors across frequency and azimuth. Implementation details include spherical grids of NI=18, NJ=9, FOC order L=1 to 5, regularization parameter beta=0.01, and low-frequency bounds matched to physical array dimensions.

## Results

FOC-based translation consistently reduces relative square errors in both off-grid linear interpolation and L-th order smoothing across the Galaxy S24+, EasyCom, and ITA HRTF test conditions. In direction-aware ambisonic encoding using linear least-squares encoders under directional error conditions (up to 10 to 20 degrees), FOC alignment improves spatial correlation and directivity scores for arrays like the Røde NT-SF1 and S24+, though spectral magnitude differences (EQ metrics) show mixed behavior on complex form factors like the EasyCom glasses. Analysis of ITA and 3D3A HRTF datasets via 1st and 3rd-order FOCs reveals natural translation standard deviations of 10 to 30 mm across dimensions, confirming that standard measurements carry substantial unintended spatial shifts that FOC normalization successfully corrects.

## Limitations

The correction capability of FOC is strictly bounded to spatial translation uncertainty; it cannot resolve other causes of directivity degradation such as non-linear transducer distortion, sensor manufacturing flaws, or acoustic scattering from complex mounting structures. The optimization relies on low-frequency approximations and spatial sampling density constraints (NI, NJ >> L) to avoid aliasing, which can limit high-frequency precision. Furthermore, performance gains on multi-microphone arrays depend on coherent low-frequency behavior across channels.

## Why read this

Speech and spatial audio researchers working with irregular microphone arrays, wearable devices, or HRTFs will find this a foundational mathematical tool for eliminating spatial measurement ambiguity. Read this to learn how to mathematically formulate spatial centroids from spherical harmonics to radically improve downstream ambisonics, interpolation, and array calibration.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Acoustic calibration of irregular consumer microphone arrays, AR/VR spatial audio rendering, HRTF preprocessing for spatial audio, and data augmentation/normalization for data-driven spatial audio models.

## Institutions / 機構

Samsung

## Related

- [Optimal Source Placement for TDoA-based Geometry Calibration of Distributed Microphone Arrays](wang26ba_interspeech.md) — same problem · relatedness 1.9/3
- [Probing Spatial Structure in Pretrained Audio Representations](chen26ba_interspeech.md) — complementary · relatedness 1.6/3
- [Spatial-Magnifier: Spatial upsampling for multichannel speech enhancement](lee26k_interspeech.md) — complementary · relatedness 1.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
