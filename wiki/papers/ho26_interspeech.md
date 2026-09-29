---
id: ho26_interspeech
category: enhancement-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-621
pdf: https://www.isca-archive.org/interspeech_2026/ho26_interspeech.pdf
---

# An Investigation on Combining Geometry and Consistency Constraints into Phase Estimation for Speech Enhancement

*Chun-Wei Ho, Pin-Jui Ku, Hao Yen, Sabato Marco Siniscalchi, Yu Tsao, Chin-Hui Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/ho26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ho26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-621)

**Category:** `enhancement-separation`

**TL;DR** — The paper introduces the multi-source Griffin-Lim algorithm (MSGLA), an iterative speech enhancement framework that combines complex STFT consistency constraints with geometric relations (laws of sines and cosines) to resolve phase sign ambiguities, achieving competitive or superior performance over direct phase estimation and neural sign predictors.

## Key contributions

- Proposes NM-MSGLA and NP-MSGLA, two iterative phase reconstruction variants that alternate Griffin-Lim-style consistency projections between speech and noise spectrogram estimates.
- Formulates a novel phase candidate derivation using the law of sines based on estimated speech magnitude and noise phase, exploiting the empirical observation that noise phase is easier to estimate in low-energy regions.
- Demonstrates through oracle experiments that accurate noise magnitude or phase acts as a powerful cue for constraining clean speech phase reconstruction.
- Achieves consistent matching or slight outperformance against direct phase estimators, traditional GLA, and DNN-based sign predictors on benchmark speech enhancement datasets, especially in background noise suppression.

## Problem

Estimating clean speech phase under additive noise is difficult due to the unstructured nature of phase spectrograms. Prior geometry-based methods use the law of cosines to calculate absolute phase differences but reduce the task to a binary sign classification problem (adding or subtracting the difference), which is highly prone to errors and large phase deviations when signs are misclassified. Existing neural sign predictors and direct phase regression models struggle with consistency and mapping random target distributions, motivating a principled approach that unifies signal domain consistency with geometric relations.

## Method

The framework utilizes TF-GridNet as the backbone neural network to predict component magnitudes or phases from noisy input spectrograms (M=number of time frames, N=frequency bins). For NM-MSGLA, the network predicts speech magnitude Â_X and noise magnitude Â_Z using two real-valued masks C_1, C_2 in [0, 1]^(M×N). For NP-MSGLA, the network predicts speech magnitude Â_X via mask C_1, and noise phase P̂_Z via two channels C_2, C_3 mapped through arctan(C_3/C_2). These estimates are fed into an iterative refinement loop (typically 5 iterations) initialized with noisy phase P_Y. NM-MSGLA alternates clean speech and noise GLA updates while enforcing the additive noise model (H_Y = H_X + H_Z), which implicitly resolves the sign ambiguity of the cosine-derived phase difference after a few steps. NP-MSGLA leverages the law of sines to generate clean speech phase candidates from estimated speech magnitude and noise phase.

Models are trained on 32-second input segments for 160 epochs using the Adam optimizer with an initial learning rate of 1×10^(-3) decaying to 1×10^(-5) via cosine annealing. The STFT uses a 512-sample Hann window with a 256-sample hop size, and magnitude compression uses parameters a=0.5 and b=1. Training loss combines L1 loss for magnitudes and a cosine distance loss with phase derivative terms for phase estimates.

## Experimental setup

Evaluated on VoiceBank-DEMAND (VB-DMD) and WSJ0-CHiME3 datasets using standard training/validation/testing splits with Remix and BandMask data augmentation. Baselines include Noisy Speech, a direct phase estimator, traditional GLA, and a DNN-based sign predictor utilizing an auxiliary TF-GridNet. Metrics include PESQ, ESTOI, SI-SNR, and CBAK (background distortion rating). The backbone TF-GridNet uses D=64, H=128, I=J=1, and B=3 (~1.3M parameters).

## Results

On the VB-DMD dataset, NP-MSGLA achieves top performance with 3.46 PESQ, 0.89 ESTOI, 19.61 dB SI-SNR, and 3.18 CBAK, outperforming the direct phase estimator (3.44 PESQ, 19.13 dB SI-SNR) and sign predictor (3.41 PESQ, 19.16 dB SI-SNR). On WSJ0-CHiME3, NM-MSGLA and NP-MSGLA achieve competitive SI-SNR (14.77 dB and 15.57 dB respectively) while tying for best background suppression (CBAK of 2.51). Traditional GLA scores high on perceptual quality (PESQ 3.10 on WSJ0-CHiME3) but lags significantly in signal fidelity (SI-SNR 13.58 dB), proving that standalone GLA sacrifices waveform alignment.

| Algorithm | PESQ | ESTOI | SI-SNR | CBAK |
|---|---|---|---|---|
| Noisy Speech | 1.97 | 0.72 | 8.40 | 2.55 |
| Direct Phase Estimator | 3.44 | 0.89 | 19.13 | 3.13 |
| GLA | 3.45 | 0.88 | 18.68 | 3.13 |
| Sign Predictor | 3.41 | 0.89 | 19.16 | 3.11 |
| NM-MSGLA | 3.44 | 0.88 | 19.25 | 3.17 |
| NP-MSGLA | 3.46 | 0.89 | 19.61 | 3.18 |

## Limitations

The framework relies on the additive noise assumption, which may degrade in reverberant or multi-talker environments where nonlinear acoustic paths or interference sources violate simple linear summation. The iterative nature of MSGLA introduces computational overhead during inference compared to single-pass direct regression models. Evaluation is restricted to two benchmark datasets (VB-DMD and WSJ0-CHiME3) under moderate noise conditions.

## Why read this

Researchers working on speech enhancement and phase reconstruction will find this paper valuable for understanding how to combine iterative signal-domain consistency constraints with geometric mixture models. It provides a blueprint for bypassing unstructured binary sign prediction through multi-source alternating projections.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time communication systems, hearing aids, and speech preprocessing front-ends for automatic speech recognition in noisy environments.

## Institutions / 機構

Georgia Institute of Technology, Universita degli Studi di Palermo, Academia Sinica

## Related

- (link related pages by id as the wiki grows)
