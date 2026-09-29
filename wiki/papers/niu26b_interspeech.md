---
id: niu26b_interspeech
category: enhancement-separation
labels: [robustness-noise]
institutions: ["University of Science and Technology of China", "iFLYTEK Research"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1539
pdf: https://www.isca-archive.org/interspeech_2026/niu26b_interspeech.pdf
---

# MCA-DCF-DS: An Adaptive Framework for Unified Diarization and Separation with Spatial Information

*Shutong Niu, Ruo-Yu Wang, Gao-Bin Yang, Ya Jiang, Tian Gao, Jia Pan, Jun Du*

[PDF](https://www.isca-archive.org/interspeech_2026/niu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/niu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1539)

**Category:** `enhancement-separation` · **Labels:** `robustness-noise`

**TL;DR** — MCA-DCF-DS integrates spatial information at both the system and data adaptation levels into a unified diarization and separation framework, outperforming the CHiME-8 Task 2 champion system with a tcpWER of 17.86% on the NOTSOFAR-1 evaluation set.

## Key contributions

- Extends single-channel DCF-DS to multi-channel MC-DCF-DS by incorporating Interchannel Phase Difference (IPD) features and mask-based MVDR beamforming.
- Proposes an SI-SSD based data adaptation module to tackle the fundamental miss-confusion trade-off in speaker diarization.
- Introduces a knowledge distillation (KD) fine-tuning recipe using soft labels from a pre-trained teacher model to filter out noisy overlapped regions in simulated adaptation data.
- Achieves new state-of-the-art results on the NOTSOFAR-1 multi-channel dataset, surpassing the CHiME-8 Task 2 champion system under the same ASR backend.

## Problem

Joint diarization and separation frameworks like DCF-DS rely predominantly on spectral cues, which degrade severely in heavily overlapped conversational regions and complex acoustic environments. Existing multi-channel pipelines encounter a persistent trade-off between speaker confusion (CF) errors and speaker miss (MI) errors—where re-clustering approaches reduce confusion at the cost of higher misses, and neural diarization does the reverse. Overcoming this CF-MI dilemma is critical for robust downstream automatic speech recognition (ASR) in multi-speaker meetings.

## Method

The architecture builds upon DCF-DS by extending it to multi-channel inputs (MC-DCF-DS) and adapting it with spatial information (MCA-DCF-DS). For MC-DCF-DS, Interchannel Phase Difference (IPD) features are calculated between each non-reference channel and a reference channel (64 ms frame length, 16 ms shift). These are concatenated with reference-channel magnitude spectrograms and NSD-MS2S time masks, then fed into a Conformer-based separation model to estimate time-frequency masks. These masks drive spatial covariance matrices for Minimum Variance Distortionless Response (MVDR) beamforming on multi-channel STFT features.

To resolve the CF-MI trade-off during training, the authors introduce an SI-SSD based adaptation module. Long-term spatial clustering (LSC) via cACGMM on long windows (90 s) provides spatial clustering masks that yield low confusion errors, but suffer from high misses. The model uses NSD-MS2S outputs to detect and filter out overlapping regions in the SI-SSD output, preserving high-confidence non-overlapping segments. These clean segments are time-shifted and overlap-added across all channels to simulate ~4 hours of multi-channel adaptation data per session while preserving inter-channel spatial geometry.

Finally, a knowledge distillation (KD) fine-tuning framework is applied to the NSD-MS2S diarization model. A pre-trained teacher model provides soft target probabilities to guide the student model on the simulated adaptation data, combining binary cross-entropy and distillation losses ($\alpha = 5 \times 10^{-3}$). The entire MC-DCF-DS model contains ~59.91M parameters and requires approximately $66.4 \times 10^9$ FLOPs per 12.8-second window. Training uses the NOTSOFAR-1 simulated 1000-hour clean set plus ~700 hours of near-field simulated data.

## Experimental setup

Evaluated on the NOTSOFAR-1 multi-channel evaluation set (official CHiME-8 Task 2 benchmark containing 4-8 speakers per session recorded via 4 multi-mic devices). Baselines include the official NOTSOFAR-1 multi-channel baseline, single-channel DCF-DS, and the CHiME-8 Task 2 champion system. Metrics include Diarization Error Rate (DER) broken into Miss (MI), False Alarm (FA), and Confusion (CF), along with time-constrained minimum-permutation word error rate (tcpWER) using Whisper-large-v3 as the ASR backend with a 5-second tolerance window. MC-DCF-DS is trained for 20 epochs with a 1e-4 learning rate; adaptation uses 5 epochs with a 1e-5 learning rate.

## Results

On the NOTSOFAR-1 evaluation set, the base MC-DCF-DS system reduces tcpWER from the official baseline of 28.28% down to 21.68% (3s window) and 20.83% (12.8s window). Adding GSS-based re-clustering further improves MC-DCF-DS to 20.17 tcpWER, vastly outperforming single-channel DCF-DS (31.72%). 

Integrating the proposed spatial adaptation and knowledge distillation (MCA-DCF-DS) reduces DER from 14.75% to 13.83% and pushes tcpWER down to 17.86%, improving upon the CHiME-8 Task 2 champion system's tcpWER of 18.74% under the same Whisper-large-v3 backend. Ablations show that fine-tuning without knowledge distillation causes miss errors to spike (MI=10.4% vs 8.2% with KD) due to noise in simulated adaptation data, proving that teacher-guided distillation is essential.

| System | MI (%) | FA (%) | CF (%) | DER (%) | tcpWER (%) |
|---|---|---|---|---|---|
| Baseline [20] | - | - | - | - | 28.28 |
| Single-Channel DCF-DS [12] | - | - | - | - | 31.72 |
| MC-DCF-DS (12.8s) | - | - | - | - | 20.83 |
| MC-DCF-DS + GSS Re-clustering | - | - | - | - | 20.17 |
| CHiME-8 Champion [19] | 8.9 | 3.0 | 2.5 | 14.43 | 18.74 |
| MCA-DCF-DS (Student + KD) | 8.2 | 3.9 | 1.7 | 13.83 | 17.86 |

## Limitations

The framework relies on a fixed multi-channel array geometry and assumes reliable reference channels for IPD extraction and MVDR beamforming, which may falter under severe reverberation or mobile device movement. The data simulation pipeline depends heavily on pre-segmentation heuristics and clean source separation, limiting generalizability to arbitrary unconstrained acoustic environments without matching near-field simulation data.

## Why read this

Speech and ML researchers working on front-end processing for multi-speaker conversational ASR should read this to understand how to effectively fuse spatial beamforming cues with neural diarization and separation. It provides a blueprint for resolving the persistent miss-confusion trade-off in diarization via targeted knowledge distillation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-speaker meeting transcription, multi-channel automatic speech recognition systems, smart speakers, and automated conference room recording analysis.

## Institutions / 機構

University of Science and Technology of China, iFLYTEK Research

**Funding / 經費:** National Natural Science Foundation of China

## Related

- [Semi-Supervised Joint Separation and Diarization for Multichannel Noisy Speech Mixtures](nozaki26_interspeech.md) — same problem · relatedness 2.8/3
- [Speaker Separation via Audio Language Modeling](lanzendoerfer26b_interspeech.md) — same problem · relatedness 2.5/3
- [Latent Flow Matching Based Speech Separation Using Speaker Diarization](rubenchik26_interspeech.md) — same problem · relatedness 2.4/3
- [Position-Aware Target Speaker Extraction for Long-Form Multi-Party Conversations: A Diarization-Free Framework for ASR](wang26m_interspeech.md) — same problem · relatedness 2.4/3
- [Neural Multichannel Distant Speaker Diarization and Source Separation with Beta Speaker Activity Prior](mao26_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
