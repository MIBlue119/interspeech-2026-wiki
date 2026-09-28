---
id: nozaki26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3308
pdf: https://www.isca-archive.org/interspeech_2026/nozaki26_interspeech.pdf
---

# Semi-Supervised Joint Separation and Diarization for Multichannel Noisy Speech Mixtures

[PDF](https://www.isca-archive.org/interspeech_2026/nozaki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nozaki26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3308)

**TL;DR** — This paper presents a semi-supervised framework for joint multichannel speech separation and speaker diarization that integrates clean speech mixtures with environmental noise to achieve substantial separation improvements over neural FCASA baselines.

## Problem

Neural full-rank spatial covariance analysis with speaker activity (FCASA) performs joint separation and diarization using blind source separation, but its heavy reliance on spatial statistics causes performance degradation in diffuse or non-stationary noisy conditions. While fully supervised models trained on simulated data mitigate this, they suffer from severe domain mismatch when deployed on real-world recordings. This work bridges that gap by proposing a semi-supervised approach that avoids requiring isolated individual source signals.

## Method

The method extends neural FCASA by combining an unsupervised generative model for noisy mixtures with supervised probabilistic criteria computed from clean speech mixtures and separate environmental noise recordings. Specifically, the training objective incorporates a soft-thresholded SNR term, a clean speech mixture log-likelihood criterion (estimated via Monte Carlo approximation), and a multichannel Itakura-Saito distance (MISD) posterior constraint. These terms are optimized alongside a standard variational inference objective and binary cross-entropy diarization loss. The neural architecture uses a multi-task framework to jointly estimate latent source power spectral densities, jointly-diagonalizable spatial covariance matrices, and speaker activity posteriors.

## Results

Experiments on a 4-channel simulated meeting dataset derived from LibriSpeech and DEMAND noise (with SNRs sampled between 2 to 6 dB) demonstrate that the proposed semi-supervised objectives yield substantial improvements in speech separation performance compared to standard neural FCASA. Additionally, the approach provides modest performance gains on speaker diarization metrics. The evaluation relies on reference-aware separation metrics over test sets comprising roughly 4.7 hours of audio.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building distant-microphone automatic recognition systems or meeting transcription pipelines for noisy acoustic environments can use this technique to improve front-end separation and diarization.

## Related

- (link related pages by id as the wiki grows)
