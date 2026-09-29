---
id: li26da_interspeech
category: enhancement-separation
institutions: ["Nanjing University", "Samsung Electronics", "Horizon Robotics"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2170
pdf: https://www.isca-archive.org/interspeech_2026/li26da_interspeech.pdf
---

# Carrier-Aware Sound Zone Control for Parametric Array Loudspeakers

*Mengtong Li, Tao Zhuang, Yu Sun, Shaozhe Li, Xuxiang Wu, Jia-Xin Zhong, Jing Lu*

[PDF](https://www.isca-archive.org/interspeech_2026/li26da_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26da_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2170)

**Category:** `enhancement-separation`

**TL;DR** — This paper introduces a carrier-aware sound zone control framework for parametric array loudspeakers (PALs) that treats the ultrasonic carrier as an active control variable alongside sidebands, achieving an 11.2 dB improvement in acoustic contrast and a 7.0 dB boost in target-zone sound pressure level.

## Key contributions

- Formulates a carrier-aware sound zone control (SZC) framework for PAL arrays by incorporating the ultrasonic carrier as an explicit, optimizable control dimension.
- Derives a carrier-conditioned transfer function and a phase-conjugation mapping rule to link optimized carrier weights back to the audio modulation domain.
- Proposes a practical, finite-stage alternating re-linearization and optimization strategy to sequentially update sideband and carrier excitations.
- Demonstrates through k-space simulations and anechoic chamber experiments that joint carrier-sideband control significantly improves acoustic contrast and demodulation efficiency over sideband-only control.

## Problem

Conventional sound zone control relies on linear acoustics using electrodynamic loudspeaker arrays, but applying this to parametric array loudspeakers (PALs) is complicated by nonlinear self-demodulation and inter-channel acoustic coupling. Prior linearization techniques by Zhuang et al. require intractable pairwise channel characterizations, while Zhu et al.'s effective transfer function approach treats the ultrasonic carrier as a fixed background. Fixing the carrier restricts control degrees of freedom, causing compromised sound leakage suppression in dark zones and poor low-frequency demodulation efficiency.

## Method

The system utilizes an upper-sideband amplitude modulation scheme emitted by a PAL array, where the total sound field depends on nonlinear interactions between ultrasonic carriers and audio sidebands across multiple channels. Because the modulation equations exhibit mathematical symmetry between carrier and sideband components, the authors introduce a carrier-conditioned transfer function matrix (Gc) measured by having the target channel emit a full modulated signal while remaining channels emit sideband signals. The intermediate weight vector from Gc is mapped to the actual carrier weights via complex conjugation (q = w^c,*), exploiting the interchange of roles between carrier and audio signals.

To solve this without excessive re-measurements, a finite-stage alternating optimization strategy is implemented: (1) Initial Sideband Optimization fixes carriers to uniform weights (q = 1) and optimizes sideband weights w using the sideband-conditioned transfer function Gs; (2) Carrier Optimization freezes the optimized sideband weights w, measures Gc, and updates carrier weights q for a target frequency (1 kHz); (3) Sideband Re-alignment re-optimizes sideband weights w using Gs(q) to ensure perfect matching with the newly refined carrier background across the broadband spectrum. This framework naturally encapsulates environmental reflections through empirical transfer function measurements.

Hardware setup and signal processing involve generating control filters via windowing the inverse discrete Fourier transform of optimal weights, applied to white noise audio signals across 500 Hz to 4 kHz under identical total electrical power constraints (w^H w).

## Experimental setup

Simulations are executed using the k-space approach, and physical experiments are conducted inside an anechoic chamber using a PAL array of 24 columns (each with 24 circular emitters of 5 mm radius spaced at 8.7 mm). Symmetric channel pairing merges 2 columns about the central axis into 1 channel, operating at a 40 kHz ultrasonic carrier frequency. The bright zone consists of two clusters of 9 points on a 3x3 grid (1 cm spacing) centered at (0.5 m, +/-0.1 m), and the dark zone contains 25 points along a 24 cm line centered at (1.5 m, 0). Measurements employ a CY-407 condenser microphone covered with a thin plastic film to suppress spurious sound, scanned across a 2 m x 1 m plane with a 3 cm spatial resolution.

## Results

In broadband experiments from 500 Hz to 4 kHz, carrier-aware acoustic contrast control (ACC) achieves a total acoustic contrast (AC) of 23.6 dB compared to 12.4 dB for sideband-only control, representing an 11.2 dB improvement. Furthermore, the carrier-aware method yields a 7.0 dB increase in total bright-zone sound pressure level (SPL), confirming markedly higher demodulation efficiency. Across individual frequency evaluations at 500 Hz, 1 kHz, 2 kHz, and 4 kHz, the carrier-aware approach consistently suppresses sound leakage into the dark zone while concentrating energy in the bright zone, overcoming the spatial mismatch inherent in fixed-carrier systems.

| System / Condition | Acoustic Contrast (AC) | Bright-Zone SPL Increase | Dark-Zone Leakage Suppression |
|---|---|---|---|
| Sideband-Only ACC | 12.4 dB | Baseline (0 dB) | Baseline |
| Carrier-Aware ACC (Ours) | 23.6 dB (+11.2 dB) | +7.0 dB | Significantly Reduced |

## Limitations

The framework relies on empirical measurements of transfer functions (Gs and Gc), which incurs high experimental and temporal costs and restricts full iterative convergence to a pragmatic finite-stage procedure. The carrier optimization stage is tuned to a single frequency (1 kHz), which requires a subsequent sideband re-alignment stage to handle broadband audio. Furthermore, evaluation is currently restricted to a single controlled anechoic setup and static listener positions.

## Why read this

Read this paper if you work on spatial audio reproduction or parametric array loudspeakers and need to break through the acoustic contrast limits imposed by traditional fixed-carrier control. The takeaway is a rigorous, mathematically grounded formulation for treating the ultrasonic carrier as an active optimization variable.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Private personal audio systems, directional sound beaming, and spatial acoustic zone control in shared environments.

## Institutions / 機構

Nanjing University, Samsung Electronics, Horizon Robotics

## Related

- (link related pages by id as the wiki grows)
