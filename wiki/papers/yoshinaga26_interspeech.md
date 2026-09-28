---
id: yoshinaga26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-559
pdf: https://www.isca-archive.org/interspeech_2026/yoshinaga26_interspeech.pdf
---

# Noise Scaling Factor for the One-Dimensional Voice Production Model

[PDF](https://www.isca-archive.org/interspeech_2026/yoshinaga26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yoshinaga26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-559)

**TL;DR** — This paper evaluates and calibrates the turbulence noise scaling factor in one-dimensional (1D) voice production models by benchmarking them against three-dimensional (3D) compressible Navier-Stokes flow simulations.

## Problem

One-dimensional acoustic models are widely used for computational voice synthesis because of their low cost, but they rely on simplified empirical noise scaling factors (such as Fant's formulation) that were originally derived for static fricatives rather than pulsating vocal fold flows. Because aerodynamic noise strongly influences voice quality—particularly in pathological or non-modal phonations like breathy voice—it is critical to test whether these conventional 1D noise scaling parameters accurately match high-fidelity aerodynamic simulations. Without proper calibration, 1D models fail to reliably capture turbulence-induced spectral characteristics under varying glottal configurations and vocal tract shapes.

## Method

The study couples a two-mass vocal fold model with 3D compressible Navier-Stokes equations using the volume penalization immersed boundary method to capture Level 2 fluid-structure interactions under a constant lung pressure of 1200 Pa. The 3D flow simulations model the subglottal pressure chamber, vocal folds (with glottal length of 17 mm and varying initial opening areas Ag0 from 0 to 8.2 mm2), and idealized vocal tract geometries for vowels /a/ and /u/. The resulting glottal flow waveforms from the 3D simulations are then fed into a 1D waveguide model consisting of 44 sections (each ~4 mm long) incorporating wall viscous losses and radiation impedance. To model turbulence, an additive noise component based on the Reynolds number and a tunable scaling factor alpha is introduced into the 1D flow rate, and alpha is optimized by minimizing the mean spectral difference between the 1D mouth pressure output and the 3D simulation results.

## Results

For normal phonation of vowel /a/ with complete glottal closure (Ag0 = 1.0 to 7.0 mm2), the conventional scaling factor alpha around 4 to 6 × 10^-6 yielded good spectral agreement between the 1D and 3D models up to 5000 Hz. However, for breathy phonation of /a/ where the vocal folds failed to close (Ag0 = 8.2 mm2), the optimal scaling factor dropped to zero because the intrinsic flow profile already produced sufficient noise without added terms. For the vowel /u/ configuration featuring a supraglottal oral constriction, the optimal scaling factor surged to 14 × 10^-6, reflecting significantly stronger localized aerodynamic turbulence generated in the oral cavity. Ablations over varying initial glottal areas and vowel shapes demonstrate that a single global scaling factor is insufficient, necessitating vowel-dependent or spatially distributed noise modeling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers developing efficient, rule-based or physical parameter-based voice synthesis systems and pathological speech simulators.

## Limitations

The study is restricted to axisymmetric approximations of specific vowel geometries (/a/ and /u/) and relies on a simplified two-mass vocal fold model.

## Related

- (link related pages by id as the wiki grows)
