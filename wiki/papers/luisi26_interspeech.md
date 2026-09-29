---
id: luisi26_interspeech
category: phonetics-linguistics
institutions: ["Aalto University"]
code: https://github.com/brynluisi/allpole-formants.git
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1222
pdf: https://www.isca-archive.org/interspeech_2026/luisi26_interspeech.pdf
---

# Smooth Formant Tracking with Differentiable Linear Prediction

*Bryn Luisi, Lauri Juvela*

[PDF](https://www.isca-archive.org/interspeech_2026/luisi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/luisi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1222)

**Category:** `phonetics-linguistics`

**TL;DR** — The paper introduces LP-DDSP and SMELP, differentiable linear prediction frameworks that optimize log-area ratios using a combination of L1, L2, and temporal regularization losses. This approach achieves an overall formant tracking RMSE of 166 Hz on the VTR Formants Database, outperforming classical tools like Praat and KARMA.

## Key contributions

- Formulates a differentiable all-pole filter optimization framework that avoids closed-form autocorrelation constraints by treating log-area ratios (LARs) as free optimization variables.
- Proposes a composite DDSP loss combining L1 error (accounting for Laplacian voiced speech residuals), L2 error, and temporal regularization to enforce smooth parameter tracks across frames.
- Develops SMELP, an end-to-end neural formant tracker combining a CNN feature extractor and an LSTM decoder with differentiable LP losses.
- Demonstrates state-of-the-art or competitive formant estimation accuracy against traditional baselines (Praat, LP baseline, TV-QCP) and state-space filters (KARMA) on the VTR dataset.

## Problem

Traditional linear prediction (LP) methods for formant estimation rely on least-squares autocorrelation solutions via Levinson-Durbin recursion, which suffer from harmonic bias, strict local stationarity assumptions, and independent frame processing. Furthermore, classical LP assumes Gaussian excitation residuals, whereas voiced speech residuals are better approximated by a Laplacian distribution. While hybrid neural and filtering approaches like QCP, DeepFormants, or KARMA improve accuracy, their non-differentiable components prevent end-to-end joint optimization.

## Method

The LP-DDSP method initializes reflection coefficients (RCs) as uncoupled optimization parameters represented as log-area ratios (LARs) to guarantee filter stability. RCs are mapped to direct-form LP coefficients via Forward Levinson recursion. An inverse filter extracts the time-domain residual, and gradients are backpropagated through an objective function combining L1 norm, L2 norm, and a temporal regularization term that penalizes abrupt parameter changes between adjacent frames. Optimization runs iteratively using the Adam optimizer.

SMELP adapts this formulation into an end-to-end feedforward architecture consisting of a 5-layer 2D CNN feature predictor (operating on 512-bin STFT inputs with doubling hidden channels) and a multi-layer LSTM decoder. The CNN predicts LARs, which are transformed via forward Levinson into LP coefficients to compute the unsupervised DDSP loss. Additionally, two supervised losses are incorporated: L_coeff (MSE between predicted and autocorrelation-derived LP coefficients) and L_F (MSE against ground-truth formants). The combined loss is backpropagated once per utterance without multi-epoch iterative refinement.

## Experimental setup

Evaluated on the VTR Formants Database comprising 516 utterances (324 train, 192 test) from TIMIT sampled at 16 kHz (totaling roughly 0.5 to 2.5 hours of active evaluation). Baselines include classical LP Autocorrelation, Praat, TV-QCP, KARMA, and an equivalent-complexity LP-LSTM model. Metrics use Root Mean Square Error (RMSE in Hz) across formants F1 to F4. Models are trained using NVIDIA V100 GPUs with the Adam optimizer and cosine annealing.

## Results

SMELP achieves the best overall mean formant RMSE of 166 Hz, outperforming LP-LSTM (171 Hz), KARMA (254 Hz), LP-DDSP (246 Hz), Praat (344 Hz), and the standard LP baseline (378 Hz). Specifically, SMELP yields F1, F2, F4, and overall bests at 100 Hz, 141 Hz, 230 Hz, and 166 Hz respectively, though LP-LSTM slightly edges it out on F3 (183 Hz vs 195 Hz). Ablation studies on LP-DDSP demonstrate that adding both the L1 norm and the temporal regularization term is critical, dropping the overall training RMSE from 509 Hz (L1+L2 alone) down to 239 Hz.

| Model | F1 (Hz) | F2 (Hz) | F3 (Hz) | F4 (Hz) | Overall (Hz) |
|---|---|---|---|---|---|
| LP Baseline | 163 | 299 | 389 | 662 | 378 |
| Praat | 257 | 350 | 413 | 356 | 344 |
| KARMA | 108 | 195 | 228 | 486 | 254 |
| LP-DDSP | 131 | 222 | 268 | 362 | 246 |
| LP-LSTM | 107 | 145 | 183 | 249 | 171 |
| SMELP | 100 | 141 | 195 | 230 | 166 |

## Limitations

Evaluated exclusively on clean English speech subsets (TIMIT-derived VTR database), leaving out noise robustness, cross-accent generalization, and multi-speaker scale evaluations. The formant extraction post-processing relies on heuristic bandpass filters (0–5500 Hz frequency limits and <400 Hz bandwidth thresholds), which may fail on pathological voices or extreme vocal tracts. Computational overhead during training is higher for iterative utterance-level optimization (1500 epochs for LP-DDSP).

## Why read this

Audio and speech engineers looking to integrate interpretable classical signal processing blocks (like linear prediction and all-pole filters) into differentiable deep learning architectures will find this a foundational template. It provides clear recipes for designing loss functions that marry physical constraints with neural optimization.

## Code

- https://github.com/brynluisi/allpole-formants.git

## Applications

Speech analysis, phoneme research, acoustic phonetics, and differentiable neural vocoding or speech synthesis.

## Institutions / 機構

Aalto University

## Related

- [Morphoacoustic Modeling of a Dynamic 3D Vocal Tract Using MRI-Constrained Deformations and FEM Acoustics](piyadasa26_interspeech.md) — same problem · relatedness 2.1/3
- [NewAppVoice: Tools for Visualizing and Correcting Acoustic Measures](elmerich26_interspeech.md) — same problem · relatedness 2.0/3
- [Formant-Guided Speech Repair for Enhanced Comprehension of Dysarthric Speech](chen26n_interspeech.md) — complementary · relatedness 1.9/3
- [Phy-VC: Physics-Informed Voice Conversion for Privacy-Preserving Pathological Speech](ghosh26_interspeech.md) — shared technique · relatedness 1.9/3
- [From Continuous Speech to Subglottal Resonances: Automatic Signal Generation, Estimation, and Tracking Framework](udeogu26_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
