---
id: chen26h_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1037
pdf: https://www.isca-archive.org/interspeech_2026/chen26h_interspeech.pdf
---

# Geometrically Constrained Decentralized Independent Vector Analysis for Distributed Microphone Arrays

*Changda Chen, Yichen Yang, Wei Liu, Bing Zhu, Gongping Huang, Shoji Makino, Shuai Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1037)

**TL;DR** — The paper introduces Geometrically Constrained Decentralized Independent Vector Analysis (GC-Dec-IVA), a blind source separation method for distributed microphone arrays that integrates direction-of-arrival (DOA) priors and a sub-frequency-band source model to eliminate cross-array permutation mismatches. Under noisy conditions with 4 arrays, the proposed GC-Dec-IVA II method improves SDRi to 3.41 dB (compared to 1.18 dB for standard Dec-IVA I) and achieves near-perfect permutation consistency.

## Key contributions

- Formulates a MAP-based optimization framework integrating direction-of-arrival (DOA) geometric constraints into decentralized independent vector analysis to enforce cross-array source alignment.
- Proposes a novel sub-frequency-band source model that treats frequency bins per array independently to weaken the overly strong cross-array dependency of prior methods and enhance noise robustness.
- Demonstrates robust recovery of permutations even for distributed arrays that completely lack local DOA information by leveraging knowledge transferred from other DOA-informed arrays.
- Provides extensive experimental validation across 2 to 8 distributed arrays in both noiseless and noisy environments, showing consistent gains in SDRi, SIRi, permutation accuracy, and permutation consistency.

## Problem

Blind source separation using distributed microphone arrays is often handled by running local BSS independently per array, which causes output permutation inconsistencies, or via centralized processing that creates severe communication overhead and privacy risks. A recent alternative, Decentralized Independent Vector Analysis (Dec-IVA), exchanges only power-related statistics but often yields negligible gains over local processing because its globally shared source activity measure misguidance updates when different arrays assign different source indices to the same speaker. Furthermore, Dec-IVA's strong cross-array dependency source model amplifies permutation mismatch errors in background noise environments. These failures prevent reliable multi-array speech enhancement in practical smart spaces and meeting rooms.

## Method

The paper formulates the decentralized separation task using an auxiliary-function-based framework where mixture signals at $P$ arrays (each with $M$ microphones, focused on determined case $M=N$) are transformed into the STFT domain with an extended frequency index $f' = f + (p-1)F$. To resolve permutation ambiguities across arrays, a maximum a posteriori (MAP) cost function is constructed by adding a geometric spatial constraint based on direction-of-arrival (DOA) priors. Specifically, for the $n$-th demixing vector, directional responses are constrained via steering vectors $\mathbf{d}_{f',\theta_{p,i}}$ to enforce spatial nulls toward interfering directions ($c_{n,i}=0$ for $i \neq n$), while weight $\lambda_{p,n,i}$ is initialized to 8000 and exponentially decayed by 0.8 per iteration.

To decouple the rigid cross-array dependency found in the original spherical Laplace source model, the authors propose a new sub-frequency-band source model that treats the frequency bins corresponding to each array as an individual sub-band. This explicitly splits source activity measures across arrays, heavily penalizing local array permutations that conflict with the global consensus without requiring additional communication overhead or array ordering. The optimization alternates between updating the auxiliary weighted covariance variable $V$ and updating the demixing matrices $W$ using vector-wise coordinate descent (VCD) for a total of 50 fixed iterations, with projection back used to resolve scale ambiguity.

## Experimental setup

Experiments use 100 ten-second two-speaker mixtures sampled at 16 kHz generated from CMU ARCTIC (male speaker rms and female speaker clb). Room impulse responses are simulated in a 9m x 7m x 3m room with $T_{60} = 200$ ms using 2 to 8 two-microphone arrays spaced 4 cm apart. Additive background noise combines diffuse and white Gaussian noise with SNRs uniformly sampled from [15, 25] dB. Baselines include Loc-IVA, Dec-IVA I, GC-Loc-IVA, alongside proposed variants Dec-IVA II, GC-Dec-IVA I, and GC-Dec-IVA II. Evaluation metrics are average Signal-to-Distortion Ratio improvement (SDRi), Signal-to-Interference Ratio improvement (SIRi), permutation accuracy, and permutation consistency.

## Results

In noiseless settings across 2 to 8 arrays, GC-Dec-IVA II achieves strong performance, recording an SDRi of 4.65 dB and SIRi of 10.21 dB for 2 arrays (compared to 3.98 dB SDRi for Loc-IVA). In noisy conditions, standard Dec-IVA I degrades severely (dropping to 0.29 dB SDRi with 8 arrays), whereas the proposed Dec-IVA II and GC-Dec-IVA II maintain robust performance, with GC-Dec-IVA II achieving an SDRi of 3.41 dB and SIRi of 8.30 dB on 4 arrays. In missing-DOA ablation tests where arrays 3–4 lack spatial information, GC-Dec-IVA II still maintains high performance with 2.79 dB SDRi and 95.50% permutation accuracy by leveraging shared stats from informed arrays. GC-Dec-IVA I does not consistently outperform GC-Loc-IVA, underscoring that the new source model is vital for realizing gains from geometric constraints.

| System | 2-Array SDRi (dB) | 4-Array SDRi (dB) | 6-Array SDRi (dB) | 8-Array SDRi (dB) |
|---|---|---|---|---|
| Loc-IVA | 2.61 | 2.51 | 2.46 | 2.44 |
| Dec-IVA I | 2.04 | 1.18 | 0.80 | 0.29 |
| Dec-IVA II (prop.) | 2.85 | 2.45 | 2.25 | 2.35 |
| GC-Loc-IVA | 3.21 | 3.19 | 3.03 | 2.97 |
| GC-Dec-IVA II (prop.) | 3.32 | 3.41 | 3.37 | 3.34 |

## Limitations

The evaluation is restricted to simulated RIRs in a single room geometry (9x7x3 m) with only two speakers and identical two-microphone arrays. The approach assumes that arrays are perfectly synchronized with zero sampling-rate offsets and relies on known relative array geometries or explicit local DOA estimates for constraint setup.

## Why read this

Researchers working on distributed acoustic sensor networks and blind source separation will find this paper valuable for its principled integration of spatial geometry into decentralized optimization. It provides a blueprint for eliminating block-permutation failures without transmitting raw multi-channel audio.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart space audio processing, multi-room teleconferencing systems, and distributed meeting transcription.

## Related

- (link related pages by id as the wiki grows)
