---
id: yoshinaga26_interspeech
category: phonetics-linguistics
institutions: ["Osaka University", "Louisiana State University Health Sciences Center", "University of Arizona"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-559
pdf: https://www.isca-archive.org/interspeech_2026/yoshinaga26_interspeech.pdf
---

# Noise Scaling Factor for the One-Dimensional Voice Production Model

*Tsukasa Yoshinaga, Takeshi Ikuma, Brad H. Story*

[PDF](https://www.isca-archive.org/interspeech_2026/yoshinaga26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yoshinaga26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-559)

**Category:** `phonetics-linguistics`

**TL;DR** — This study evaluates the turbulence noise scaling factor in 1D acoustic voice production models by benchmarking them against 3D compressible computational fluid dynamics (CFD) simulations for vowels /a/ and /u/. The results demonstrate that the conventional 1D noise scaling factor ($4 \times 10^{-6}$) is valid for normal phonation of /a/ with complete glottal closure, but fails for incomplete closures or constricted vocal tracts like /u/, requiring values up to $14 \times 10^{-6}$ or zero.

## Key contributions

- Quantified the validity of Fant's 1D turbulence noise model scaling factor ($\alpha$) by direct comparison against 3D compressible Navier-Stokes simulations incorporating fluid-structure interaction.
- Identified that the conventional noise scaling factor ($\alpha = 4 \times 10^{-6}$) accurately matches 3D aeroacoustic spectra for normal vowel /a/ phonation with full glottal closure.
- Discovered that incomplete glottal closure in breathy phonation of /a/ requires an optimal scaling factor of $\alpha = 0$, as the baseline 1D model already aligns with 3D noise levels without additive noise.
- Proved that vowels with supraglottal constrictions like /u/ demand a substantially higher scaling factor ($\alpha = 14 \times 10^{-6}$) due to secondary jet turbulence in the oral cavity.

## Problem

While one-dimensional (1D) acoustic voice production models efficiently simulate vocal tract acoustics, they conventionally rely on simplified aerodynamic noise formulations (such as Fant's Reynolds-number-based model using arbitrary constants derived from fricatives) that neglect spatial dimensions. Prior research has largely assumed a single global scaling parameter across all phonation types and vowel geometries, failing to account for pulsating flow conditions, breathy gaps, or supraglottal constrictions. This unverified parameterization limits the reliability of 1D speech synthesizers when simulating pathological voices, breathiness, or diverse phonetic configurations where turbulent noise critically shapes voice quality.

## Method

The study couples a 3D voice production framework using compressible Navier-Stokes equations with a volume penalization (VP) method for immersed boundary-based fluid-structure interaction, driven by a two-mass vocal fold model. The 3D simulations feature an inflow pressure of 1200 Pa, a subglottal trachea based on human anatomical area functions, and vocal tract geometries for vowels /a/ and /u/ discretized across approximately $1.8 \times 10^7$ grid points with a 0.025 mm minimum grid spacing near the glottis. Time-stepping was maintained at $0.25 \times 10^{-6}$ s for $3.2 \times 10^5$ iterations.

The resulting 3D glottal flow rate ($U_{3D}$) was then fed into a 1D waveguide model (“Tube Talker”) consisting of 44 sections (each ~4 mm long) implementing viscous wall losses and infinite baffle radiation impedance. To model aerodynamic noise, an additive noise flow component ($U_{noise} = \alpha \frac{L_g}{\nu} \max(Re - Re_c, 0) N_b$) was superimposed on the glottal flow, where $Re_c = 1200$ and $N_b$ is a 300–3000 Hz bandpass filtered random noise signal. The scaling factor $\alpha$ was systematically swept to minimize the mean spectral difference between 1D and 3D mouth pressure spectra derived via discrete Fourier transform (DFT).

Key design choices include varying the initial glottal opening area ($A_{g0}$) from 0 to 8.2 mm² to induce normal versus breathy phonation regimes. This setup isolates whether 1D discrepancies stem from global parameter misspecification or missing localized oral cavity noise sources.

## Experimental setup

Simulations modeled vocal tract area functions for vowels /a/ and /u/ derived from human anatomical measurements, with initial glottal opening areas ($A_{g0}$) spanning 1.0 to 8.2 mm² for /a/ and 0 to 1.0 mm² for /u/. The 3D flow model ran on the Fugaku supercomputer, while the 1D waveguide model evaluated scaling factor sweeps across $\alpha \in [0, 20] \times 10^{-6}$. The primary evaluation metric was the mean spectral difference (dB) and standard deviation across eight random noise realizations between 1D and 3D oral exit pressure spectra up to 5000 Hz.

## Results

For the vowel /a/ under normal phonation with complete glottal closure ($A_{g0} = 1.0$ mm²), the optimal noise scaling factor was $\alpha = 6 \times 10^{-6}$ (closely aligning with the conventional literature value of $4 \times 10^{-6}$), successfully capturing the 2000–5000 Hz noise band. However, for breathy /a/ phonation without full glottal closure ($A_{g0} = 8.2$ mm²), the optimal scaling factor dropped to $\alpha = 0$, because the baseline flow rate already produced sufficient high-frequency energy to match the 3D model without added noise.

For the vowel /u/, which features a palatal-lingual constriction accelerating flow to ~30 m/s, the optimal scaling factor shifted dramatically upward to $\alpha = 14 \times 10^{-6}$ across both tested opening sizes ($A_{g0} = 0$ and $1.0$ mm²). A notable limitation where the 1D model falls short is in capturing jet-induced modifications to acoustic resonance: for /u/, the 3D model placed the second formant at 1600 Hz compared to 1300 Hz in the 1D model due to local flow-acoustic interactions.

| Phonation Condition & Vowel | Optimal Scaling Factor ($\alpha$) | Min Mean Spectral Difference vs 3D |
|---|---|---|
| Vowel /a/ ($A_{g0} = 1.0$ mm², full closure) | $6 \times 10^{-6}$ | ~4.5 dB |
| Vowel /a/ ($A_{g0} = 5.0$ mm², full closure) | $4 \times 10^{-6}$ | ~5.0 dB |
| Vowel /a/ ($A_{g0} = 8.2$ mm², incomplete closure) | $0$ | ~5.5 dB |
| Vowel /u/ ($A_{g0} = 0$ mm², constricted) | $14 \times 10^{-6}$ | ~9.5 dB |
| Vowel /u/ ($A_{g0} = 1.0$ mm², constricted) | $14 \times 10^{-6}$ | ~9.5 dB |

## Limitations

The study is strictly scoped to two static vowel geometries (/a/ and /u/) and a simplified two-mass vocal fold model, omitting dynamic articulatory movements and wider phoneme coverage. The 3D-to-1D coupling strategy feeds a precomputed 3D flow rate that inherently contains pre-existing turbulence disturbances, potentially confounding pure 1D noise attribution. Furthermore, localized oral cavity turbulence sources—such as those created by supraglottal constrictions in /u/—are lumped into the glottal noise term rather than modeled spatially.

## Why read this

Speech production researchers and physical modelers should read this paper to understand the breakdown limits of classical 1D aerodynamic noise formulations. It provides concrete numerical evidence that 1D voice synthesizers require phonation- and vowel-dependent scaling parameters rather than a universal constant.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Physically-informed text-to-speech synthesis, pathological voice simulation (e.g., breathy voice disorders), and computationally efficient digital waveguide speech models.

## Institutions / 機構

Osaka University, Louisiana State University Health Sciences Center, University of Arizona

**Funding / 經費:** JSPS KAKENHI

## Related

- (link related pages by id as the wiki grows)
