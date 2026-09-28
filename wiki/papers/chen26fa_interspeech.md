---
id: chen26fa_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3494
pdf: https://www.isca-archive.org/interspeech_2026/chen26fa_interspeech.pdf
---

# Bayesian Model-Based Assessment of Spatial and Source Priors in Sagittal-Plane Sound Localization

[PDF](https://www.isca-archive.org/interspeech_2026/chen26fa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26fa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3494)

**TL;DR** — This paper evaluates a Bayesian observer model for sagittal-plane sound localization that integrates an ecological source prior with five spatial priors, showing that model performance improves as spectral resolution increases, aligning with human data under cochlear implant-like conditions.

## Problem

Vertical or sagittal-plane sound localization is mathematically ill-posed because the listener's brain must disentangle an unknown source spectrum from direction-dependent head-related transfer functions (HRTFs). While humans solve this ambiguity by combining sensory evidence with prior knowledge, computational models typically rely on idealized source assumptions or simplified spatial priors. Addressing this gap requires a unified Bayesian framework that jointly evaluates flexible spatial priors and ecological source statistics across varying levels of perceptual reliability.

## Method

The computational model builds on a correlation-based Bayesian observer using a gammatone filterbank (28 bands spanning 0.7-18 kHz) to extract monaural spectral gradient profiles from binaural inputs. Sensory likelihood is derived by comparing feature vectors against listener-specific HRTF templates via rectified correlation, sigmoid similarity mapping, and binaural weighting. The framework incorporates an ecological source prior—constructed via a weighted multivariate Gaussian over spectral features extracted from speech (CREMA-D), environmental sounds (ESC-50), and music (FMA-small) datasets—and evaluates five candidate spatial priors along the polar dimension: Unimodal Gaussian, Symmetric Gaussian, Asymmetric Gaussian, Asymmetric Laplace, and Asymmetric von Mises. Individual listener parameters (selectivity, sensitivity, internal and motor noise) are calibrated using maximum likelihood estimation via the BADS algorithm on data from eight normal-hearing human subjects.

## Results

The models were evaluated on human localization data across broadband noise, unprocessed click trains (CL), and six channel-vocoder spectral degradation conditions (N3 through N24 simulating cochlear implant resolution). Across conditions, the models successfully replicated the human trend of decreasing polar errors and quadrant error rates as spectral resolution improved. Bayesian model selection using protected exceedance probabilities (PXP) revealed that asymmetric spatial prior configurations achieved better overall agreement with human behavioral data than symmetric baselines. Meanwhile, the ecological source prior provided limited additional benefit within the current model formulation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers, hearing aid designers, and researchers in spatial audio or cochlear implants can use these individualized auditory models to simulate human localization behavior under reduced spectral resolution.

## Limitations

The ecological source prior yielded marginal additional benefits in model selection within the tested implementation, and the evaluation was limited to static sources in the median/sagittal plane.

## Related

- (link related pages by id as the wiki grows)
