---
id: mohapatra26_interspeech
category: phonetics-linguistics
institutions: ["University of British Columbia"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2325
pdf: https://www.isca-archive.org/interspeech_2026/mohapatra26_interspeech.pdf
---

# Influence of Vocal Tract Curvature on Speech Acoustics: A Three-Dimensional FEM Analysis

*Debasish Ray Mohapatra, Sidney Fels*

[PDF](https://www.isca-archive.org/interspeech_2026/mohapatra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mohapatra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2325)

**Category:** `phonetics-linguistics`

**TL;DR** — A 3D finite element analysis reveals that vocal tract curvature has a negligible effect on uniform tubes but excites higher-order transverse modes and induces noticeable anti-resonances above 8 kHz in non-uniform vocal tracts (like vowel [A]).

## Key contributions

- Evaluated the isolated impact of vocal tract curvature on speech acoustics using a 3D finite element wave solver up to 14 kHz.
- Systematically varied geometry across uniform vs. non-uniform cross-sections (using Story's vowel [A] area function), low vs. high curvature intensity, and bending angles of 60°, 90°, and 120°.
- Demonstrated that uniform cross-section ducts maintain plane-wave dominance regardless of bending, whereas non-uniform curved tracts generate curvature-induced anti-resonances between 8-12 kHz.
- Mapped midsagittal acoustic pressure distributions to confirm that transverse mode excitation requires both area non-uniformity and geometric curvature.

## Problem

Many physics-based acoustic models approximate the vocal tract as a straight 3D tube or rely on 1D/2D solvers using longitudinal area functions that inherently cannot capture duct curvature. While realistic 3D vocal tract models derived from MRI/CT incorporate natural curvature, they entangle it with irregular cross-sections, side cavities, and mouth radiation, making curvature-specific acoustic effects impossible to isolate. Understanding this gap is essential for accurate articulatory speech synthesis, as traditional straight-tube assumptions fail to capture high-frequency wave propagation phenomena.

## Method

The study models vocal tracts with a fixed centerline length of L = 17 cm, discretized into 44 uniform cylindrical tube segments representing an adult male speaker articulating the vowel [A]. Geometries are divided into four categories based on cross-sectional area uniformity (constant vs. Story's [A] area function) and curvature intensity: low-curvature arcs (radii R0 between 8-16 cm, bending angles θ = 60°, 90°, 120°) and high-curvature configurations combining straight cylindrical segments (lengths L1, L3) with an intermediate toroidal segment (length L2, fixed radius R0 = 3 cm).

The 3D acoustic wave propagation is simulated in the time domain using a Finite Element (FE) solver on tetrahedral mesh elements with a uniform size h = 2.5 mm, a sampling frequency fs = 200 kHz (satisfying the CFL condition), speed of sound c = 350 m/s, and air density ρ = 1.14 kg/kg/m³. Wall losses are modeled via a semi-reflective Robin boundary condition to simulate viscous and thermal diffusion, while a homogeneous Dirichlet boundary condition (p = 0) is applied at the mouth termination. A Gaussian pulse volume velocity is injected at the glottal end, and transfer functions are computed as the frequency-dependent ratio of mouth pressure to glottal volume velocity up to 14 kHz.

Inference analysis extracts transfer functions and 2D midsagittal acoustic pressure distributions. These pressure maps identify higher-order transverse modes when systems are excited using specific resonance or anti-resonance frequencies, isolating how bent air columns disrupt standard longitudinal plane-wave propagation.

## Experimental setup

Simulations use synthetic vocal tract geometries based on a 17 cm centerline length (vowel [A] area function) evaluated across bending angles of 60°, 90°, and 120°. The setup compares straight-tube approximations against low-curvature (R0 = 8-16 cm) and high-curvature (R0 = 3 cm) variants with both uniform and non-uniform cross-sections. Metrics include frequency transfer functions up to 14 kHz and 2D acoustic pressure distributions, executed at a 200 kHz sampling rate via a 3D FE solver.

## Results

For uniform cross-section tubes, transfer functions for both low- and high-curvature configurations match straight-tube baselines identically across the full 0–14 kHz range, exhibiting purely plane-wave pressure distributions. For non-uniform cross-sections representing vowel [A], transfer functions align closely with straight tubes below 8 kHz, but systematically deviate above 8 kHz by spawning distinct anti-resonances in the 8–10 kHz and 11–12 kHz bands. The precise frequencies of these anti-resonances shift as a function of the bending angle (60°, 90°, 120°) and curvature intensity, confirming that curvature-induced transverse mode excitation only manifests when combined with area non-uniformity.

| System / Condition | Cross-Section | Curvature Intensity | Frequencies < 8 kHz | Frequencies > 8 kHz (Antiresonances) |
|---|---|---|---|---|
| Uniform Straight | Uniform | None | Plane-wave dominance | No higher-order modes |
| Uniform Bent (Low/High) | Uniform | Low / High (R0=3-16cm) | Matches straight baseline | Negligible curvature effect |
| Non-Uniform Straight | Non-uniform ([A]) | None | Standard formants | No transverse modes |
| Non-Uniform Bent (Low) | Non-uniform ([A]) | Low (R0=8-16cm) | Aligns with straight | Anti-resonances emerge (8-12 kHz) |
| Non-Uniform Bent (High) | Non-uniform ([A]) | High (R0=3cm) | Aligns with straight | Pronounced anti-resonances (8-12 kHz) |

## Limitations

The study is restricted to circular cross-sections to eliminate non-circular geometric eigenmode confounds, omitting elliptical or natural irregular shapes. Lip radiation effects are neglected via an open-end Dirichlet boundary condition (p = 0), and the evaluation is limited to a single vowel ([A]) geometry at a fixed 17 cm length. Physical validation via 3D-printed models and perceptual evaluation of the high-frequency formant shifts remain future work.

## Why read this

Speech production modelers and articulatory synthesis researchers should read this to understand precisely when and why traditional 1D/2D straight-tube approximations break down at high frequencies. It provides definitive proof that tract curvature alone is acoustically benign unless coupled with cross-sectional non-uniformities.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

High-fidelity articulatory speech synthesis, physics-based acoustic simulators, and advanced voice production modeling.

## Institutions / 機構

University of British Columbia

**Funding / 經費:** Natural Sciences and Engineering Research Council of Canada, UBC Graduate and Postdoctoral Studies

## Related

- (link related pages by id as the wiki grows)
