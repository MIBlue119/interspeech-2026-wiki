---
id: xu26p_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2025
pdf: https://www.isca-archive.org/interspeech_2026/xu26p_interspeech.pdf
---

# Room Impulse Response Completion Using Signal-Prediction Diffusion Models Conditioned on Simulated Early Reflections

*Zeyu Xu, Andreas Brendel, Albert G. Prinn, Emanuël A. P. Habets*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2025)

**TL;DR** — A diffusion-based room impulse response (RIR) completion model predicts full RIRs from incomplete, low-order geometric simulation conditioners without temporal discontinuities. It outperforms baselines in early RIR completion and energy decay curve reconstruction when trained with classifier-free guidance on hybrid simulated datasets.

## Key contributions

- Formulates RIR completion as a signal-prediction (x-prediction) diffusion process conditioned directly on incomplete early reflections from low-order Image Source Method (ISM) simulations.
- Introduces classifier-free guidance (CFG) trained on a hybrid dataset combining fast ISM simulations and wave-based Treble SDK simulations to bridge the reality gap without needing matched empirical inputs.
- Integrates a differentiable energy decay curve (EDC) loss evaluated directly on predicted x0 targets to enforce consistent reverberation decay profiles down to a -60 dB floor.
- Eliminates the rigid fixed-duration (e.g., 80 ms) window constraint of prior models like Echo2Reverb, handling flexible low-order ISM conditioners down to first-order reflections.

## Problem

State-of-the-art RIR completion methods, such as Echo2Reverb, require a fixed-duration input window (typically 50 ms or 80 ms) densely populated with early reflections taken from fully simulated or measured RIRs. However, fast geometric simulators like the Image Source Method (ISM) generate early reflections parameterized by a maximum reflection order, meaning low-order ISM inputs leave parts of the fixed window empty. Feeding these incomplete windows directly into existing models creates severe temporal discontinuities, while statistical reverberation models ignore early reflection windows and fail to capture complex room geometries and wave effects like furniture scattering and diffraction.

## Method

The model uses a 1D U-Net operating within a 200-step reverse diffusion process (using a cosine noise schedule) to directly predict the noise-free target RIR x0 from noisy samples xt and a conditioning signal c. The architecture applies 7 stride-2 downsamples to support inputs up to 32,768 samples (down to a bottleneck length of 256), where a 6-layer residual dilated Conv1D stack with dilations ranging from 1 to 32 captures long-range late reverberation structures. The conditioning signal c (derived from ISM simulations of varying reflection orders 1, 3, 5, or 7) is concatenated channel-wise with xt as a [c, xt] input tensor in R^(K x 2).

The training objective combines mean squared error (MSE) on the signal with an Energy Decay Curve (EDC) loss calculated via Schroeder's backward integration clamped at a -60 dB floor, combined using a scaling factor lambda = 10^-5. To handle data discrepancies between fast ISM simulations and physically realistic wave simulations, classifier-free guidance (CFG) is used by randomly replacing the conditioner c with an all-zero vector at probability p_CFG = 0.2 during training. At inference, unconditional and conditional score predictions are combined using a guidance scale s >= 1 (set to s = 1 for fully conditioned sampling), and generated 48 kHz signals are low-pass filtered at 8 kHz and downsampled to 16 kHz (K = 24,576 samples) to match evaluation requirements.

## Experimental setup

Evaluated on two 16 kHz datasets of 10,000 shoebox room RIRs each (split 8:1:1 for train/val/test): the ISM dataset (pyroomacoustics) and the Treble dataset (incorporating wave interference and furniture via Treble SDK). Experiment 1 trains solely on the ISM dataset, while Experiment 2 uses a combined hybrid dataset (80% ISM, 20% Treble) with test evaluation exclusively on the unseen Treble dataset. Baselines include Echo2Reverb and a cross-dataset discrepancy baseline (ISM vs Treble). Metrics include Early Residual Energy Ratio (RER) for the <=80 ms window, Root Mean Square Error (RMSE) for >80 ms, and Mean Absolute Error of the Energy Decay Curve (EDC-MAE) up to -60 dB.

## Results

In Experiment 2 (CFG training on the hybrid dataset), the proposed model using the hybrid loss with an order-7 conditioner achieves an EDC-MAE of 8.66 dB, outperforming the Echo2Reverb baseline (9.62 dB). For early RIR completion under an order-1 conditioner, the proposed model achieves an early RER of -1.25 dB compared to worse baseline alignment when low-order inputs are provided. In ablations, adding the EDC loss drastically reduces EDC-MAE (e.g., dropping from ~10.23 to 11.80 down to lower errors depending on configuration) compared to using MSE loss alone.

The model does not win on late-tail RMSE (>80 ms), where performance remains competitive and roughly tied with Echo2Reverb across conditions (~-22 dB). Furthermore, when using higher reflection orders (order 7) where the 80 ms window is already nearly saturated, the performance advantage for early completion narrows because little completion work remains.

| System / Condition | Order | RIR <=80 ms RER (dB) | RIR >80 ms RMSE (dB) | EDC-MAE (dB) |
|---|---|---|---|---|
| Echo2Reverb | 5 | -12.21 | -21.95 | 9.46 |
| Echo2Reverb | 7 | -12.18 | -22.06 | 9.62 |
| Proposed (M) | 1 | -1.94 | -23.92 | 10.23 |
| Proposed (M+E) | 1 | -1.25 | -21.46 | 11.80 |
| Proposed (M+E, Hybrid) | 7 | -13.00 | -22.95 | 8.66 |
| ISM vs. Treble Baseline | 7 | -14.76 | -21.86 | 10.09 |

## Limitations

Evaluated exclusively on simulated shoebox rooms rather than real measured RIRs, leaving acoustic behavior under real microphone/speaker hardware unverified. The iterative 200-step reverse diffusion process makes inference significantly slower than single-pass regression models like Echo2Reverb. Performance degrades when conditioning on extremely low-order reflections (e.g., order 1) due to the severe lack of spatial information.

## Why read this

Speech and spatial audio engineers looking to leverage fast geometric room simulators (like ISM) for large-scale data augmentation without sacrificing acoustic wave realism should read this to learn how to bypass rigid fixed-window constraints using conditional diffusion models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Immersive spatial audio rendering, acoustic data augmentation for speech processing, and acoustic signal processing in complex rooms.

## Related

- (link related pages by id as the wiki grows)
