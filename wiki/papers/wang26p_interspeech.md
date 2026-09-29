---
id: wang26p_interspeech
category: enhancement-separation
labels: [streaming-real-time]
institutions: ["Southern University of Science and Technology", "Capital Medical University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-864
pdf: https://www.isca-archive.org/interspeech_2026/wang26p_interspeech.pdf
---

# SAGE: Switch-Aware EEG-Guided Soft Gating for Target Speaker Extraction with In-Trial Switching

*Xuefei Wang, Ximin Chen, Yuting Ding, Chunlin Li, Fei Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-864)

**Category:** `enhancement-separation` · **Labels:** `streaming-real-time`

**TL;DR** — SAGE is a switch-aware EEG-guided soft gating framework for target speaker extraction that handles in-trial auditory attention shifts, achieving 8.67 dB SI-SDR and reducing average switching latency to 2.04 seconds.

## Key contributions

- A front-end speech separation module using a ConvTasNet-style architecture to generate two candidate speech streams for dynamic selection.
- A switch-aware EEG-guided soft gating module with adaptive temperature scaling and local diffusion to produce smooth fusion weights and avoid abrupt artifacts.
- A latency-compensated alignment mechanism using differentiable local time-varying soft shifts over a bounded window to bridge neural-latency gaps.
- An uncertainty-driven conservative strategy that estimates EEG reliability via Monte Carlo dropout variance to suppress aggressive, low-confidence switching.

## Problem

Target speaker extraction (TSE) using EEG assumes listeners maintain static attention throughout an entire experimental trial, failing to handle spontaneous in-trial auditory attention switching. Conventional methods (e.g., BASEN, NeuroHeed, NeuroSpex+, M3ANet) suffer from noisy, non-stationary EEG signals, inter-subject variability, and intrinsic neural latencies. This mismatch leads to delayed responses, wrong-speaker leakage, and audible discontinuities at switching points, severely degrading intelligibility.

## Method

The framework takes a mixed speech waveform and synchronized multi-channel EEG signals as input. The speech separation front-end uses a 1D convolutional encoder followed by stacked dilated 1D convolutional blocks (ConvTasNet style) to generate two candidate latent streams and reconstruct two time-domain candidate speech streams, s1(t) and s2(t).

The EEG attention regulation module extracts neural features, which are then processed by a differentiable time-alignment module computing dynamic time-shifting weights within a maximum shift D. The aligned EEG features feed into a lightweight temporal network predicting a switch probability psw(t) and attention bias logit alpha(t). These yield an intermediate temperature-controlled gate g_temp(t) using a base temperature and switch-controlled scaling. A local 1D convolution smoothing kernel with learnable width is then applied to produce the final gating signal g(t) in the range [0, 1].

To handle unreliable EEG, uncertainty u(t) is measured via the temporal variance across K stochastic forward passes with dropout enabled; this uncertainty scales a smoothness regularization term in the loss function. The model is trained via a tri-stage recipe: (1) train the audio separator with audio-only supervision, (2) freeze the separator and jointly train the EEG modules, and (3) perform end-to-end fine-tuning with a smaller learning rate using an objective combining negative SI-SDR, switch-aware relaxed smoothness penalty, and uncertainty-weighted regularization.

## Experimental setup

Evaluated on a custom spontaneous auditory attention-switching dataset comprising 18 healthy Mandarin-speaking adults (ages 18-27) with 64-channel EEG recorded at 500 Hz (downsampled to 128 Hz) and spatialized mixtures from one male and one female speaker at +90 and -90 degrees azimuths. Compared against baselines BASEN, NeuroHeed, NeuroSpex+, and M3ANet using metrics SI-SDR (dB), STOI (%), switch detection accuracy (ACC, %), and average switching latency (ASL, seconds). Implemented in PyTorch with Python 3.9 on NVIDIA V100 GPUs, using the Adam optimizer (lr = 1e-4, batch size 16) with a 12:1:1 train/validation/test split per participant.

## Results

SAGE achieves 8.67 dB SI-SDR, 88.24% STOI, and an average switching latency of 2.04 seconds, outperforming the strongest baseline M3ANet (7.13 dB SI-SDR, 84.30% STOI, 2.37 s latency) and earlier models like BASEN, NeuroHeed, and NeuroSpex+. Ablation studies demonstrate that removing individual components degrades performance: dropping soft gating lowers switch accuracy to 73.58% (from 78.02%), removing latency alignment drops accuracy to 71.34% and increases latency to 2.58 s, and removing the uncertainty strategy drops SI-SDR to 7.41 dB.

| Systems | SI-SDR (dB) | STOI (%) | ASL (s) |
|---|---|---|---|
| BASEN [25] | 4.02 | 74.83 | 2.93 |
| NeuroHeed [14] | 4.96 | 79.57 | 2.81 |
| NeuroSpex+ [26] | 6.21 | 82.84 | 2.56 |
| M3ANet [27] | 7.13 | 84.30 | 2.37 |
| SAGE (Proposed) | 8.67 | 88.24 | 2.04 |

## Limitations

Evaluated exclusively on a small, controlled dataset of 18 Mandarin-speaking participants under a specific spatial configuration (+/- 90 degrees azimuth), which limits claims regarding cross-subject generalization, multilingual robustness, and performance in complex multi-source acoustic environments with background noise and reverberation.

## Why read this

Speech and ML researchers working on neuro-steered target speaker extraction or brain-computer interfaces will find this paper essential for its practical solutions to neural latency and noisy signal uncertainty during dynamic attention switching.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart hearing aids, robust hands-free communication systems, and neuro-controlled auditory interfaces capable of tracking dynamic user attention shifts in multi-talker environments.

## Institutions / 機構

Southern University of Science and Technology, Capital Medical University

**Funding / 經費:** National Key Research and Development Program of China, National Natural Science Foundation of China

## Related

- [NeuroMultiSpEx: Neuro-Guided Target Speaker Extraction for Multi-Speaker Scenarios](silva26_interspeech.md) — same problem · relatedness 2.8/3
- [WeSep: A Modular and Cue-Composable Framework for Target Speaker Extraction](zhang26k_interspeech.md) — same problem · relatedness 2.5/3
- [Online Audio-Visual Target Speaker Extraction with Viseme-Guided Lightweight Visual Pretraining](li26n_interspeech.md) — same problem · relatedness 2.3/3
- [Breaking Shortcut Learning for Cross-Trial EEG-Guided Target Speech Extraction via Two-Stage Training](shin26_interspeech.md) — same problem · relatedness 2.3/3
- [Plug-and-Steer: Decoupling Separation and Selection in Audio-Visual Target Speaker Extraction](kwak26_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
