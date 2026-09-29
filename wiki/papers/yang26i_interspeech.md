---
id: yang26i_interspeech
category: enhancement-separation
labels: [efficient-on-device]
institutions: ["Nanjing University", "Horizon Robotics", "Samsung Electronics"]
code: https://muefy.github.io/D-SKD-Audio-Demo
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1524
pdf: https://www.isca-archive.org/interspeech_2026/yang26i_interspeech.pdf
---

# A Dynamic Knowledge Distillation Framework for Mitigating Spatial Ambiguity in Lightweight Dual-Channel Speech Enhancement

*Yifei Yang, Zheng Wang, Yu Sun, Wentao Hua, Xiaobin Rong, Kai Chen, Jing Lu*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1524)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`

**TL;DR** — The paper introduces Dynamic Spatial-aware Knowledge Distillation (D-SKD), a training framework that uses a single-channel teacher model to mitigate spatial ambiguity in lightweight dual-channel speech enhancement without adding inference overhead. D-SKD improves PESQ and STOI for closely-spaced sources (0°-15°) while preserving performance elsewhere.

## Key contributions

- Proposes a Dynamic Spatial-aware Knowledge Distillation (D-SKD) framework to resolve spatial ambiguity in dual-channel speech enhancement for closely-spaced sources.
- Introduces a Dynamic Arbitrator Module (DAM) that evaluates sample difficulty per instance during training, gating distillation weights dynamically without requiring explicit source-angle supervision.
- Operates exclusively during training, ensuring zero additional parameters, memory footprint, or computational complexity during inference on edge devices.
- Demonstrates robust generalization across multiple network scales of DC-GTCRN (hsize 16, 32, 64) and alternative lightweight architectures (LiSenNet, UL-UNAS).

## Problem

Lightweight dual-channel speech enhancement models exploit spatial cues to outperform single-channel systems on edge devices, but their performance drops sharply when target and interfering speakers are closely spaced (0°-15°). Under such conditions, unconstrained reliance on spatial cues results in spatial ambiguity, frequently causing multi-channel models to underperform single-channel counterparts. Prior solutions either require multi-task distance estimation models that add memory overhead or demand explicit direction-of-arrival (DOA) tracking and auxiliary geometry information that is rarely available in real-world deployments.

## Method

The framework builds upon a U-Net backbone (GTCRN), which takes the magnitude spectrum of the reference microphone and the sine/cosine of the inter-channel phase difference (sin/cos IPD) concatenated along the channel dimension. The training setup utilizes a pre-trained single-channel teacher (SC-GTCRN) alongside a dual-channel student (DC-GTCRN). During training, independent forward passes compute a hybrid loss (combining SI-SNR and complex spectral losses with weights alpha=0.01 and beta=0.3) for both teacher and student. 

The Dynamic Arbitrator Module (DAM) calculates the instance-wise performance gap delta-L between student and teacher losses. A hyperbolic tangent function scaled by a sensitivity coefficient gamma maps this gap to a range, and a ReLU function turns it into a [0, 1) gating value. Distillation is suppressed when the student already outperforms the teacher (delta-L <= 0), and scales toward 1 when the teacher outperforms the student. This instance-wise dynamic weighting prevents the distillation process from destroying the student's intrinsic multi-channel spatial separation capability in normal spatial separation conditions.

The final training loss sums the primary hybrid loss of the student with the dynamically weighted distillation loss, scaled by a global weight mu=1.0. During inference, both the single-channel teacher and the DAM are completely stripped away, leaving only the dual-channel student model with identical runtime footprint as the baseline.

## Experimental setup

Evaluated on a simulated 16 kHz dataset generated using DNS-3 speech and noise corpora processed through RIRs simulated via the image method for a 2-element microphone array with a 4 cm spacing (room dimensions 3-10m length/width, 2.5-3m height, RT60 0.1-0.4s, SNR -5 to 5 dB). Training uses 50,000 10-second pairs over 200 epochs with batch size 8, optimized via Adam (initial lr 0.001 with 20-epoch linear warmup and cosine annealing). Baselines include SC-GTCRN, unguided DC-GTCRN, Hard Arbitrator Module (HAM), and un-arbitrated distillation (w/o DAM), alongside alternative lightweight architectures LiSenNet and UL-UNAS, measured using PESQ and STOI.

## Results

On the 0°-15° segmented-angle test set, DC-GTCRN with D-SKD improves PESQ from 1.742 to 1.793 and STOI from 71.80% to 72.96% (hsize=16), nearly matching the single-channel teacher's 1.858 PESQ while outperforming it across wider spatial separations. Ablations demonstrate that replacing DAM with a Hard Arbitrator Module (HAM) yields localized 0°-15° improvements (PESQ 1.802) at the expense of degrading performance across wider angular bins, whereas removing DAM entirely causes severe degradation in spatial utilization (Avg PESQ dropping to 2.072 vs 2.316 for D-SKD). Across scaling experiments (hsize 16, 32, 64) and alternative architectures like LiSenNet and UL-UNAS, D-SKD consistently boosts closely-spaced source intelligibility and quality without harming wider angle processing.

| Systems & Conditions | 0°-15° PESQ | 0°-15° STOI (%) | Avg PESQ | Avg STOI (%) |
|---|---|---|---|---|
| Noisy Mixture | 1.285 | 66.28 | 1.273 | 65.83 |
| SC-GTCRN (Teacher) | 1.858 | 74.58 | 1.855 | 74.41 |
| DC-GTCRN (Baseline) | 1.742 | 71.80 | 2.314 | 81.18 |
| D-SKD (Proposed) | 1.793 | 72.96 | 2.316 | 81.28 |
| D-SKD w/ HAM | 1.802 | 73.32 | 2.284 | 80.92 |
| D-SKD w/o DAM | 1.834 | 73.56 | 2.072 | 77.82 |

## Limitations

The evaluation relies entirely on simulated RIRs and synthetic mixtures using DNS-3 data rather than real-world recorded array data with complex acoustic phenomena. The framework is currently validated specifically for dual-channel arrays and assumes a single moving interferer scenario, leaving multi-source or higher-order array configurations unproven. Furthermore, sensitivity coefficient gamma requires manual tuning across different network widths and architectures.

## Why read this

Researchers and engineers building edge-deployed multi-channel speech enhancement systems will find this essential reading for solving the persistent degradation of dual-channel models under closely-spaced angles without incurring runtime overhead. It offers a clean blueprint for instance-gated knowledge transfer between single- and multi-channel paradigms.

## Code

- https://muefy.github.io/D-SKD-Audio-Demo

## Applications

Real-time edge speech enhancement for teleconferencing hardware, smart glasses, hearing aids, and front-end acoustic noise suppression for ASR systems.

## Institutions / 機構

Nanjing University, Horizon Robotics, Samsung Electronics

**Funding / 經費:** National Natural Science Foundation of China, AI & AI for Science Project of Nanjing University

## Related

- [Sweep-RSE: Streaming Region-of-Interest Speech Extraction in Multi-Talker Scenarios via Explicit Spatial Sweeping](yu26d_interspeech.md) — same problem · relatedness 2.2/3
- [Neural Directional Coding: Joint Spatial Coding and Filtering with Configurable Directivity Patterns](huang26o_interspeech.md) — same problem · relatedness 2.1/3
- [Cloud-Boosted Low-Compute Multi-Channel Speech Enhancement](fan26d_interspeech.md) — same problem · relatedness 2.1/3
- [RT-Tango: Real-Time Distributed Binaural Speech Enhancement for Low-Power Hearing Aid Devices](benslimane26_interspeech.md) — same problem · relatedness 2.1/3
- [Neuromorphic Speech Enhancement with Dual-Branch Spiking Neural Networks](meng26d_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
