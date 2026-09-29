---
id: fan26c_interspeech
category: applications-other
institutions: ["Macquarie University"]
code: https://osf.io/fcgbk/overview?view_only=f13dacbe9bde4658a8f8c6660774117c
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2750
pdf: https://www.isca-archive.org/interspeech_2026/fan26c_interspeech.pdf
---

# Bayesian Generalized Additive Multilevel Models for Accurate ERP Latency Estimation under Moderate Downsampling

*Zixia Fan, Ronny Kurniawan Ibrahim, Joshua Penney, Felicity Cox*

[PDF](https://www.isca-archive.org/interspeech_2026/fan26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fan26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2750)

**Category:** `applications-other`

**TL;DR** — This study evaluates how temporal downsampling affects Bayesian Generalized Additive Multilevel Model (GAMM) estimates of event-related potential (ERP) latencies, showing that moderate downsampling preserves early component (MMN) timing while extreme downsampling (100 Hz) causes MCMC convergence failure and wide credible intervals.

## Key contributions

- Quantified the exact impact of temporal downsampling (1000 Hz, 500 Hz, 250 Hz, and 100 Hz) on single-trial Bayesian GAMM ERP onset, offset, and duration estimates.
- Demonstrated component-dependent sensitivity: early Mismatch Negativity (MMN) onset remained stable within 5 ms from 1000 Hz to 250 Hz, whereas later Late Discriminative Negativity (LDN) exhibited larger timing shifts and shortened duration under moderate downsampling.
- Identified practical limits of extreme downsampling (100 Hz), showing a 5% divergence rate, R-hat up to 1.04, and severely reduced effective sample sizes.
- Provided an open-source R workflow using the neurogam and brms packages with summary multilevel specifications to reduce computational burden.

## Problem

Estimating ERP onset and offset timing is crucial for understanding neural processing dynamics, but fitting Bayesian GAMMs to high-resolution trial-level EEG data is computationally demanding. Traditional grand-averaging smooths away individual and trial-level temporal variability, while Bayesian GAMMs resolve this but require repeated model fitting that strains compute. Although temporal downsampling is commonly deployed as a practical workaround, its cost-accuracy trade-offs remain poorly understood across ERP components with differing latency dispersions, such as early sensory MMN and later cognitive LDN.

## Method

EEG data from 20 native Mandarin speakers performing a passive auditory oddball paradigm (600 standards, 100 deviants, /ia/ Tone 3 syllables with/without creaky voice) were recorded at 1000 Hz using a 64-channel SynAmps 2 setup. Preprocessing via FieldTrip involved mastoid re-referencing, 0.5-30 Hz bandpass filtering, ICA for blink/eye movement correction, and epoching from -200 to 600 ms, rejecting trials with amplitudes exceeding ±75 µV. Temporal resampling was applied to cleaned single-trial data to create 1000 Hz, 500 Hz, 250 Hz, and 100 Hz datasets by bin averaging, satisfying the Nyquist criterion given the 30 Hz lowpass filter.

Bayesian GAMMs were fitted on Fz electrode data using the neurogam package with a brms backend. To balance compute and memory, the summary multilevel option was utilized, fitting participant-level summaries (means and SDs) with 4 chains, 2,000 iterations per chain (1,000 warm-up, 1,000 posterior). The models incorporated a fixed condition effect (DEV vs. STD), participant-level random intercepts and slopes, and condition-specific thin-plate regression spline smooths of time with basis dimension k = 20 (selected via WAIC across resolutions). Condition differences were coded as STD minus DEV to capture negative deflections. Sustained temporal clusters required a minimum contiguous duration threshold of 40 ms at 1000 Hz (scaled down to 20 ms at 500 Hz, 10 Hz at 250 Hz, and 4 ms at 100 Hz), evaluated using 95% posterior credible intervals.

## Experimental setup

Evaluated on 20 participants' passive oddball EEG data (>420 standards and >70 deviants per participant). Compared four sampling rates: 1000 Hz (Dt=1 ms), 500 Hz (Dt=2 ms), 250 Hz (Dt=4 ms), and 100 Hz (Dt=10 ms). Evaluated metrics include R-hat, MCMC divergence rate, Bulk_ESS, Tail_ESS, estimated ERP onset, offset, persistence duration, and WAIC. Implemented in R using brms and neurogam.

## Results

For the MMN cluster (227-345 ms at 1000 Hz), onset varied by only 5 ms across 1000 Hz, 500 Hz, and 250 Hz (227 ms, 230 ms, and 232 ms respectively), demonstrating high stability for early components under moderate downsampling. Conversely, the LDN-related cluster (512-577 ms at 1000 Hz) exhibited larger onset shifts and shorter detected durations under moderate downsampling (44 ms at 500 Hz, 32 ms at 250 Hz vs 65 ms at 1000 Hz). At the extreme 100 Hz resolution, MMN span widened drastically to 240-460 ms (220 ms duration) and models suffered from severe convergence breakdown with R-hat values up to 1.04, a 5% divergence rate (217/4000 divergent transitions), and reduced effective sample sizes (Bulk_ESS >= 88, Tail_ESS >= 16).

| Model | R-hat range | Divergence rate | Bulk_ESS (min) | Tail_ESS (min) |
|---|---|---|---|---|
| 1000 Hz model | 1.00 | 0% | >1000 | >900 |
| 500 Hz model | 1.00 | 0% | >1500 | >2300 |
| 250 Hz model | 250 Hz | 1.00 | 0% | >1000 |
| 100 Hz model | 1.00 - 1.04 | 5% (217/4000) | >=88 | >=16 |

## Limitations

The study relies exclusively on data from a single electrode site (Fz) and a single linguistic paradigm (Mandarin Tone 3 creaky voice perception). The summary multilevel approximation trades away full trial-level random smooths to manage computation, and the analysis window may truncate broader late components like the LDN.

## Why read this

Speech and cognitive neuroscientists utilizing Bayesian GAMMs for time-series EEG/ERP analysis should read this to understand how temporal downsampling safely reduces computational burdens up to 250 Hz without sacrificing early component precision.

## Code

- https://osf.io/fcgbk/overview?view_only=f13dacbe9bde4658a8f8c6660774117c

## Applications

Optimizing computational workflows for single-trial EEG/ERP latency estimation, statistical parametric mapping of neural time courses, and automated ERP component analysis.

## Institutions / 機構

Macquarie University

**Funding / 經費:** China Scholarship Council, Macquarie University, Australian Research Council

## Related

- [Modelling diphthong dynamics: A GAMM-based analysis of Australian English diphthongs](gnevsheva26_interspeech.md) — shared technique · relatedness 1.7/3
- [Reconciling Dynamic Data Analysis with Linguistic Reality: Comparing Legendre Polynomial Modelling and GAMM Applied to Prosodic Contact](dian26_interspeech.md) — shared technique · relatedness 1.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
