---
id: chen26fa_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3494
pdf: https://www.isca-archive.org/interspeech_2026/chen26fa_interspeech.pdf
---

# Bayesian Model-Based Assessment of Spatial and Source Priors in Sagittal-Plane Sound Localization

*Yunda Chen, Nengheng Zheng*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26fa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26fa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3494)

**TL;DR** — This paper evaluates a Bayesian observer model for sagittal-plane sound localization that jointly integrates an ecological source prior and five spatial priors, calibrated against human responses across cochlear implant-like spectral resolution reductions. The models successfully replicate the monotonic decrease in polar and quadrant errors as spectral resolution improves (mean Pearson r > 0.93), though asymmetric spatial priors capture human behavior better than symmetric ones.

## Key contributions

- Adapts a correlation-based Bayesian observer model to jointly evaluate spatial and source priors for static sound sources with unknown spectra.
- Introduces and evaluates an ecological source prior constructed from a weighted combination of speech (CREMA-D), environmental sounds (ESC-50), and a new music dataset (FMA-small).
- Compares five distinct candidate spatial priors, including three flexible asymmetric variants (AG, AL, AvM) and two conventional symmetric/unimodal forms (UG, SG).
- Performs individualized parameter fitting via maximum likelihood estimation using Bayesian adaptive direct search (BADS) on normal-hearing listeners across vocoded spectral degradation conditions (N3 to CL).

## Problem

Vertical or sagittal-plane sound localization is mathematically ill-posed because it requires inferring an unknown spatial direction from a convolution of unknown source spectra and direction-dependent head-related transfer functions (HRTFs). Prior computational models predominantly rely on idealized assumptions such as known or flat source spectra and often omit or simplify spatial and source priors. Understanding how humans resolve this ambiguity requires frameworks that jointly account for flexible spatial expectations and ecological source statistics under varying perceptual reliability, such as those experienced by cochlear implant users.

## Method

The computational framework operates in the interaural-polar coordinate system. A gammatone filterbank extracts monaural spectral gradient profiles (SGPs) across 28 frequency bands spanning 0.7 to 18 kHz from binaural inputs. Additive Gaussian internal noise with variance sigma_sp^2 is introduced at the feature level. Stimulus feature vectors are compared against listener-specific templates using a rectified cross-correlation coefficient to ensure only positive correlations contribute. These correlations undergo correlation-to-similarity mapping controlled by selectivity parameter lambda and sensitivity parameter gamma, then combined using a binaural weighting function governed by lateral response angle alpha_R with a transition parameter phi of 13 degrees to yield the sensory likelihood.

To incorporate prior knowledge, five candidate spatial priors over the polar dimension are defined within a front-back mixture form: Unimodal Gaussian (UG), Symmetric Gaussian (SG), Asymmetric Gaussian (AG), Asymmetric Laplace (AL), and Asymmetric von Mises (AvM), with lateral distribution assumed uniform. The ecological source prior is modeled as a multivariate Gaussian distribution over spectral feature vector S, derived from weighted averages across CREMA-D, ESC-50, and FMA-small datasets using 200-ms non-overlapping segments. This source prior adjusts templates via mean vector addition and whitening matrices derived from the covariance matrix. Finally, Bayesian inference combines sensory likelihood with spatial and source priors to form a posterior distribution. The decision stage employs a maximum a posteriori (MAP) rule with added motor response noise following a zero-mean von Mises-Fisher distribution parameterized by concentration parameter kappa_m.

Models are calibrated individually for 8 normal-hearing listeners using maximum likelihood estimation via the BADS algorithm, minimizing negative log-likelihood with 300 simulations per target direction to handle stochasticity.

## Experimental setup

Evaluated on subjective human localization datasets obtained via the Auditory Modeling Toolbox, featuring individual listener HRTFs and responses to broadband noise bursts and broadband click trains. Click-train stimuli include an unprocessed condition (CL) and six vocoder conditions (N3, N6, N9, N12, N18, N24 channels) simulating reduced spectral resolution. Models are compared across five spatial prior configurations with and without the ecological source prior, using protected exceedance probability (PXP), Bayesian Omnibus Risk (BOR), local polar error (PE), quadrant error rate (QE), Pearson correlation, and root-mean-square error (RMSE) as metrics.

## Results

Across the seven spectral-resolution conditions (N3 to CL), all model variants successfully reproduced the monotonic decrease in local polar error and quadrant error as channel count increased, achieving a mean Pearson correlation r greater than 0.93 against human data. Bayesian model selection via protected exceedance probability showed no universal group-level preference (Bayesian Omnibus Risk = 0.68), with top PXP values reaching 0.281 for the AL variant without the source prior and the AG variant with it, indicating that asymmetric spatial priors capture human perceptual biases better than symmetric counterparts. However, the fixed corpus-derived source prior provided only limited additional benefit within this implementation, and absolute errors were systematically overestimated under low-channel conditions due to limitations of the MAP decision rule.

| System / Condition | Polar Error (deg) | Quadrant Error (%) | Pearson r (Human-Model) | RMSE |
|---|---|---|---|---|
| Human Baseline (CL) | ~30-35 | ~0-5 | 1.00 | 0.00 |
| UG Model (With Source Prior) | ~40-50 | ~10-20 | ~0.93 | ~0.85 |
| AG Model (With Source Prior) | ~35-45 | ~5-15 | ~0.95 | ~0.78 |
| AL Model (Without Source Prior) | ~35-45 | ~5-15 | ~0.95 | ~0.78 |
| N3 Vocoder Condition (Model Avg) | ~50-55 | ~30-40 | ~0.93 | ~0.90 |

## Limitations

The ecological source prior was fixed from static corpus statistics, whereas spatial-prior parameters were fitted individually per listener, potentially creating an imbalance in adaptation. The rigid maximum a posteriori decision rule ignores posterior uncertainty, causing excessive concentration of predictions near prior distribution modes under low sensory reliability conditions. Direct clinical validation with actual cochlear implant users remains necessary, as simulations currently rely on normal-hearing listeners presented with vocoded stimuli.

## Why read this

Speech and ML researchers working on spatial audio, binaural processing, and Bayesian cue integration will find this a rigorous blueprint for modeling human elevation localization under degraded sensory inputs. It offers actionable insights into why asymmetric spatial priors outperform symmetric ones and highlights the limitations of static corpus-derived source priors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving spatial audio rendering for augmented reality, optimizing sound localization algorithms for hearing aids and cochlear implants, and developing advanced spatial cue integration models for machine hearing.

## Related

- (link related pages by id as the wiki grows)
