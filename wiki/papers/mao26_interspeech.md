---
id: mao26_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1248
pdf: https://www.isca-archive.org/interspeech_2026/mao26_interspeech.pdf
---

# Neural Multichannel Distant Speaker Diarization and Source Separation with Beta Speaker Activity Prior

[PDF](https://www.isca-archive.org/interspeech_2026/mao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1248)

**TL;DR** — This paper proposes a Bayesian neural distant speaker diarization and source separation model using a beta speaker activity prior, reducing Diarization Error Rate by at least 3% (16% relatively) on the AMI corpus.

## Problem

Distant speaker diarization struggles in adverse acoustic environments with reverberation, noise, varying speaker counts, and overlapping speech. While hybrid deep learning models like neural FCASA perform joint source separation and diarization, the diarization component is traditionally trained non-Bayesianly using cross-entropy, ignoring conversational dynamics and speaker states. This limitation reduces robustness under noisy, multi-channel meeting conditions.

## Method

The authors introduce a fully Bayesian formulation for neural FCASA by placing a beta prior over speaker activity tendency, reflecting conversational habits. To make the beta distribution shape parameters tractable, they adopt a PERT reparameterization mapping mode and concentration to alpha and beta parameters, restricted to unimodal distributions. The model is trained end-to-end via variational inference by optimizing an Evidence Lower Bound (ELBO) objective where the diarization loss is computed in closed form using digamma functions. The architecture uses an encoder with minimal parameter overhead (adding only 257 parameters to the 24-million-parameter baseline) alongside joint-diagonalizable spatial covariance matrices and multichannel Wiener filtering.

## Results

Evaluated on the AMI meeting corpus (80.7 hours training, 9.7 hours development, 9.1 hours evaluation), the proposed beta neural FCASA is compared against the standard non-Bayesian neural FCASA baseline. The method achieves significant improvements, reducing the Diarization Error Rate (DER) by at least 3% (representing a 16% relative reduction) and the Jaccard Error Rate (JER) by at least 4% (representing a 20% relative reduction).

## Code

- https://github.com/alephpi/neural-fcasa

## Applications

Speech engineers and researchers building robust meeting transcription, distant automatic speech recognition front-ends, and multi-microphone speaker diarization systems.

## Limitations

The beta distribution shape parameters are restricted to unimodal forms (alpha, beta >= 1) to rule out U-shaped distributions, under the assumption that a speaker's tendency to speak or remain silent should be concentrated rather than dispersed.

## Related

- (link related pages by id as the wiki grows)
