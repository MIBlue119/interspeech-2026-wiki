---
id: maghsoudi26_interspeech
category: speech-decoding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2836
pdf: https://www.isca-archive.org/interspeech_2026/maghsoudi26_interspeech.pdf
---

# Relating the Neural Representations of Vocalized, Mimed, and Imagined Speech

[PDF](https://www.isca-archive.org/interspeech_2026/maghsoudi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/maghsoudi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2836)

**TL;DR** — This paper investigates cross-condition speech decoding from stereotactic EEG, demonstrating that linear and nonlinear models trained on vocalized, mimed, or imagined speech can successfully generalize across these modes.

## Problem

Most speech decoding studies focus exclusively on a single production condition, leaving the relationship between neural representations of vocalized, mimed, and imagined speech largely unmapped. Understanding these cross-condition representational overlaps is critical for developing robust brain-computer interfaces (BCIs) that can assist individuals who cannot produce overt speech.

## Method

The authors evaluated models using the publicly available VocalMind dataset containing sEEG recordings from a single participant across vocalized, mimed, and imagined speech of 100 Mandarin Chinese sentences (110 electrodes, low-pass filtered at 100 Hz). They trained time-lagged linear ridge-regression decoders and a nonlinear neural network (combining convolutional feature extraction and recurrent layers optimized with MSE loss, mapped to audio via HiFi-GAN) to reconstruct acoustic spectrograms. Cross-condition generalization was assessed by training decoders on one speech production mode and testing them on held-out data from all three modes, complemented by rank-based stimulus discriminability (AUC) analyses.

## Results

Using linear correlations of speech envelopes and top-k rank AUC analyses, the authors showed that decoders trained on one condition successfully transfer to others well above null baselines (p << 0.001). Specifically, mimed-trained decoders perform similarly on mimed and vocalized data, whereas imagined-trained decoders treat imagined and mimed data similarly, supporting a hierarchical model where mimed speech occupies an intermediate representational state. Linear models consistently achieved superior stimulus-level discriminability compared to the nonlinear neural network architecture.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech neuroprosthetics and BCI engineers designing decoding algorithms for individuals who rely on silent articulation or imagined speech.

## Limitations

The study is restricted to stereotactic EEG data from a single participant.

## Related

- (link related pages by id as the wiki grows)
