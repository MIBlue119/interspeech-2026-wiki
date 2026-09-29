---
id: ellinson26_interspeech
category: enhancement-separation
institutions: ["Bar-Ilan University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-807
pdf: https://www.isca-archive.org/interspeech_2026/ellinson26_interspeech.pdf
---

# HRTF-guided Binaural Target Speaker Extraction with Real-World Validation

*Yoav Ellinson, Sharon Gannot*

[PDF](https://www.isca-archive.org/interspeech_2026/ellinson26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ellinson26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-807)

**Category:** `enhancement-separation`

**TL;DR** — This paper introduces an HRTF-guided binaural target speaker extraction framework that conditions a deep source separation backbone on measured Head-Related Transfer Functions to extract speech while preserving spatial cues. Evaluated on 1,600 training hours/simulations and HATS real-world recordings, it achieves an SI-SDR improvement of 15.770 dB and a PESQ of 3.03, outperforming direction-of-arrival-based baselines.

## Key contributions

- Proposes a cross-listener binaural Target Speaker Extraction (TSE) framework conditioned on direct-path HRTFs as an explicit spatial prior rather than subject-specific tuning or spectral enrollment.
- Adapts a multi-channel deep narrow-band speech separation backbone (NBSS) with _P=8_ NBC2 self-attention blocks to modulate latent features via element-wise multiplication with encoded HRTFs.
- Combines 789 measured HRTFs from 7 distinct public databases (ARI, SONICOM, RIEC, SADIE, SS2, Viking, HRIR CIRC360) during training to ensure cross-listener generalization.
- Validates real-world robustness using head and torso simulator (HATS) recordings in a reverberant room (T60 = 0.37s) across varying angular distances and discretization mismatches.

## Problem

Traditional target speaker extraction methods rely either on direction of arrival (DOA) estimation or spectral enrollment signals. Spectral enrollment approaches degrade when interfering speakers share vocal characteristics, leading to acoustic leakage or target distortion. Conversely, standard spatial extraction baselines often distort binaural cues (Interaural Time and Level Differences), causing a mismatch between auditory and visual localization that impairs speech intelligibility and listener comfort. This work addresses the need for a framework that simultaneously cleans reverberant mixtures, suppresses interfering speakers, and preserves the natural spatial orientation of the target source for wearable or binaural devices.

## Method

The model operates in the Short-Time Fourier Transform (STFT) domain using a 512-point window with a 75% overlap (257 frequency bins). The inputs consist of the dual-channel binaural mixture and the direct-path HRTF corresponding to the target azimuth and elevation, with real and imaginary parts concatenated. Separate convolutional encoders project these inputs into a shared latent space, where the encoded HRTF features are replicated along the time dimension and used to modulate the mixture representation through element-wise multiplication.

The modulated latent features are processed by a stack of P = 8 NBC2 self-attention blocks (based on the NBSS-small architecture) designed to capture frequency-band correlations and emphasize spectral components matching the target spatial configuration. A linear decoder maps the latent features back to complex-valued spectral estimates. Radial distance is absorbed into the propagation scale factor under the far-field assumption.

The training regimen utilizes the AdamW optimizer for 260 epochs with a learning rate of 1e-3, followed by 30 fine-tuning epochs at 1e-4. The loss function combines Scale Invariant Signal-to-Distortion Ratio (SI-SDR) computed across both channels and Mean Absolute Error (MAE) in the STFT domain during initial training, while the MAE loss is disabled in the final 30 epochs to maximize SI-SDR.

## Experimental setup

Simulated training and evaluation data are built using the WSJ0 speech corpus and SofaMyRoom for reverberant BRIRs with T60 drawn from U[0.2, 0.8] s and SIR from U[-5, 5] dB. Measured HRTFs are sourced from 7 databases totaling 789 subjects for training, with 7 unseen subjects reserved for testing, yielding datasets of 16k, 4k, and 2k utterances. Baselines include the DOA-BDE method (NBSS-small guided by DOA). Evaluation metrics include SI-SDR improvement (SI-SDRi), PESQ, non-intrusive NISQA MOS scores for real-world recordings, and spatial consistency metrics (deviation in dominant ITD and ILD histogram peaks, denoted as ΔITD and ΔILD). Real recordings use a HATS mounted on a turntable inside a quarter-circular loudspeaker array (T60 = 0.37 s) with speaker separations from 20° to 90°.

## Results

On the simulated test set of 1,000 mixtures (2,000 samples), the proposed HRTF-guided framework achieves an SI-SDRi of 15.770 dB and a PESQ of 3.03, outperforming the mixture baseline (PESQ 1.18) and the DOA-BDE baseline (SI-SDRi 13.881 dB, PESQ 2.74). It also preserves spatial consistency drastically better, yielding a ΔITD of 0.044 ms and ΔILD of 0.349 dB, compared to DOA-BDE's 0.982 ms and 0.479 dB. In real-world HATS evaluations across angular distances from 20° to 90°, the proposed method achieves superior average NISQA scores (3.22 vs. 3.14 for DOA-BDE and 2.14 for the raw mixture), demonstrating resilience to nearest-neighbor HRTF discretization mismatches caused by the database's finite 6° azimuth and 3° elevation grid resolution.

| Method | SI-SDRi (dB) ↑ | PESQ ↑ | ΔITD (ms) ↓ | ΔILD (dB) ↓ |
|---|---|---|---|---|
| Mixture | – | 1.18 | 1.464 | 0.417 |
| DOA-BDE [11] | 13.881 | 2.74 | 0.982 | 0.479 |
| Proposed | 15.770 | 3.03 | 0.044 | 0.349 |

## Limitations

The framework's spatial resolution is constrained by the angular sampling density of the available HRTF database, resulting in inevitable nearest-neighbor discretization errors (up to ±3° in azimuth and ±1.5° in elevation). Evaluation is restricted to two-speaker fully-overlapped mixtures in static reverberant environments, omitting dynamic moving sources, cocktail party scenarios with more than two concurrent speakers, and arbitrary non-individualized everyday acoustic enclosures beyond the tested HATS setup.

## Why read this

Speech and audio researchers building binaural speech enhancement or target speaker extraction systems should read this paper to see how incorporating measured HRTFs as spatial priors prevents phase distortions and cue mismatches common in DOA- or enrollment-based models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Hearing aids, hearables, augmented reality headsets, and multi-microphone communication devices requiring spatial-aware target speaker extraction in noisy, reverberant environments.

## Institutions / 機構

Bar-Ilan University

**Funding / 經費:** Israel Science Foundation, German Research Foundation

## Related

- [SPOT-TSE: Spatial Point-Guided Target Speech Extraction](ryu26c_interspeech.md) — same problem · relatedness 2.6/3
- [Sweep-RSE: Streaming Region-of-Interest Speech Extraction in Multi-Talker Scenarios via Explicit Spatial Sweeping](yu26d_interspeech.md) — same problem · relatedness 2.6/3
- [MeanFlow-TSE: One-Step Generative Target Speaker Extraction with Mean Flow](shimizu26_interspeech.md) — same problem · relatedness 2.4/3
- [Multi-View Based Audio Visual Target Speaker Extraction](yang26m_interspeech.md) — same problem · relatedness 2.4/3
- [WeSep: A Modular and Cue-Composable Framework for Target Speaker Extraction](zhang26k_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
