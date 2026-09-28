---
id: luisi26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1222
pdf: https://www.isca-archive.org/interspeech_2026/luisi26_interspeech.pdf
---

# Smooth Formant Tracking with Differentiable Linear Prediction

[PDF](https://www.isca-archive.org/interspeech_2026/luisi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/luisi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1222)

**TL;DR** — This paper presents LP-DDSP, a differentiable all-pole linear prediction framework using log-area ratios and temporal regularization, and SMELP, an end-to-end neural formant tracker achieving competitive formant estimation accuracy on the VTR Formants Database.

## Problem

Traditional linear prediction (LP) methods for formant estimation are computationally efficient and interpretable, but they rely on restrictive assumptions like local stationarity and Gaussian residuals, leading to harmonic bias and frame independence issues. While advanced hybrid neural methods improve accuracy, their lack of differentiability prevents them from being integrated into end-to-end trainable systems.

## Method

The authors introduce LP-DDSP, which parameterizes reflection coefficients as log-area ratios (LARs) and optimizes them via Forward Levinson recursion using a novel loss function combining L1 and L2 time-domain prediction errors and a temporal smoothness regularization term across frames. Building on this, they propose SMELP (Smooth End-to-end Linear Prediction), a neural architecture consisting of a 5-layer 2D CNN feature predictor and an LSTM decoder. SMELP jointly trains on the unsupervised DDSP prediction loss, supervised coefficient matching loss against autocorrelation baselines, and ground-truth formant mean-squared error. Models are evaluated using an all-pole filter order of 16.

## Results

Evaluated on the VTR Formants Database (516 TIMIT utterances), LP-DDSP achieves an overall formant RMSE of 246 Hz, outperforming classical LP baseline (378 Hz), TV-QCP (379 Hz), and Praat (344 Hz). The neural tracker SMELP achieves a state-of-the-art overall mean RMSE of 166 Hz, beating LP-LSTM (171 Hz) and KARMA (254 Hz). SMELP records individual formant RMSEs of 100 Hz (F1), 141 Hz (F2), 195 Hz (F3), and 230 Hz (F4).

## Code

- https://github.com/brynluisi/allpole-formants.git

## Applications

Speech and machine learning engineers working on acoustic analysis, phonetic research, speech recognition, and speech synthesis who require differentiable formant tracking.

## Related

- (link related pages by id as the wiki grows)
