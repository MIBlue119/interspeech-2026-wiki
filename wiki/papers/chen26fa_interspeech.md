---
id: chen26fa_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3494
---

# Bayesian Model-Based Assessment of Spatial and Source Priors in Sagittal-Plane Sound Localization

**TL;DR** — A Bayesian model of human sound localization finds that the choice of spatial prior, more than any source-spectrum prior, best explains how listeners cope with reduced spectral resolution like that of cochlear implants.

## Problem

Localizing sounds in the sagittal (polar) plane is inherently ambiguous, since listeners must disentangle an unknown source spectrum from head-related transfer functions, and it's unclear which internal priors humans use to resolve this, particularly under cochlear-implant-like spectral degradation.

## Method

The authors build a Bayesian observer model with an ecological source-spectrum prior and five candidate spatial priors, calibrating predictions against human localization data collected under simulated reductions in spectral resolution.

## Results

The model reproduces the human decline in polar and quadrant errors as spectral resolution improves; the source prior adds limited benefit, spatial-prior choice matters more, and no single spatial prior wins consistently, though asymmetric variants fit human data best overall.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informs individualized modeling of spatial hearing and localization-support algorithm design for cochlear implant users.

## Related

- (link related pages by id as the wiki grows)
