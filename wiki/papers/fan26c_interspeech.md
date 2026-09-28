---
id: fan26c_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2750
pdf: https://www.isca-archive.org/interspeech_2026/fan26c_interspeech.pdf
---

# Bayesian Generalized Additive Multilevel Models for Accurate ERP Latency Estimation under Moderate Downsampling

[PDF](https://www.isca-archive.org/interspeech_2026/fan26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fan26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2750)

**TL;DR** — This study evaluates how temporal downsampling affects Bayesian Generalized Additive Multilevel Model (GAMM) event-related potential (ERP) latency estimates, showing that early components remain stable under moderate downsampling while later, more dispersed components and extreme downsampling lose temporal precision and model reliability.

## Problem

Fitting single-trial Bayesian GAMMs to high-resolution electroencephalography (EEG) data is computationally burdensome, prompting researchers to use temporal downsampling. However, the cost-accuracy trade-offs of downsampling remain poorly understood, especially regarding how differently it impacts early versus late ERP components with varying temporal variability.

## Method

The authors analyze single-trial EEG data from a passive auditory oddball paradigm involving 20 native Mandarin speakers (600 standard and 100 deviant trials of a 400 ms syllable at 70 dB, recorded via a 64-channel cap at 1000 Hz). Data are downsampled to mild (500 Hz), moderate (250 Hz), and extreme (100 Hz) resolutions, preserving the 0.5-30 Hz band-pass filter and satisfying the Nyquist criterion. Bayesian GAMMs are fitted using the neurogam and brms packages with participant-level summary multilevel options, thin-plate regression splines ($k=20$), four chains, and 2,000 iterations per chain. Latency onset, offset, and duration are extracted from deviant-minus-standard contrasts at the Fz electrode using 95% posterior credible intervals and a minimum contiguous cluster duration of 40 ms.

## Results

Models at 1000 Hz, 500 Hz, and 250 Hz achieved acceptable sampling stability with R-hat values of 1.00 and 0% divergences, whereas the extreme 100 Hz model exhibited poorer convergence with R-hat up to 1.04, 5% divergences, and severely reduced bulk/tail effective sample sizes. For the mismatch negativity (MMN) component, onset timing remained largely stable from 1000 Hz down to 250 Hz, whereas the later discriminative negativity (LDN) component exhibited larger shifts in onset and shorter durations as the sampling rate decreased. At 100 Hz, both MMN and LDN components remained detectable but suffered from reduced temporal precision and unreliable posterior estimates.

## Code

- https://osf.io/fcgbk/overview?view_only=f13dacbe9bde4658a8f8c6660774117c

## Applications

Speech and neuroscience researchers using Bayesian GAMMs for single-trial electroencephalography (EEG) and event-related potential (ERP) analysis to balance computational efficiency against temporal accuracy.

## Limitations

Conclusions are based solely on analyses from the Fz electrode and may not capture full scalp distribution, and the observation window may not have fully encompassed the late discriminative negativity (LDN) effect.

## Related

- (link related pages by id as the wiki grows)
