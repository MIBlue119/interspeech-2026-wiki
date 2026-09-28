---
id: takaki26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/takaki26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/takaki26_interspeech.pdf
---

# Head-Worn Dipole Microphone Array-based Speech Enhancement System for Single-Sided Deafness

*Ken Takaki, Kouei Yamaoka, Yoshihiro Kawahara*

[PDF](https://www.isca-archive.org/interspeech_2026/takaki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/takaki26_interspeech.html)

**TL;DR** — This paper presents a head-worn dipole microphone array integrated into glasses to improve speech intelligibility for individuals with single-sided deafness (SSD) by enhancing lateral sounds. Combining two dipole and one omnidirectional microphone with MVDR beamforming improves SDR by 0.78 dB and ESTOI by 0.04 at the lateral direction compared to a standard 3-channel omnidirectional baseline.

## Key contributions

- Proposes a custom MEMS dipole and omnidirectional microphone array embedded into glasses frames specifically targeting lateral sound enhancement for single-sided deafness.
- Measures comprehensive head-related transfer functions (HRTFs) for the hybrid dipole-omni array on a dummy head (HATS) across 7.5° azimuth increments in an anechoic chamber.
- Evaluates multiple microphone configurations using an MVDR beamformer under directional speech-shaped noise scenarios.
- Demonstrates that hybrid configurations (e.g., 2 dipole + 1 omni mics) outperform traditional omnidirectional beamformers at lateral incidence (90°) without sacrificing front-hemisphere performance.

## Problem

Traditional hearing aids and smart glasses rely primarily on forward-facing directionality via omnidirectional microphone arrays, which fail to address the needs of individuals with single-sided deafness (SSD) who struggle specifically to hear sounds arriving laterally on their deaf side. Prior differential beamforming approaches target front intelligibility and ignore side-directed directivity. This leaves an architectural gap in assistive hardware for lateral spatial awareness, a critical domain for social participation and communication in SSD users.

## Method

The hardware consists of a linear array mounted on glasses featuring four Infineon IM73D122V01 omnidirectional microphones spaced at 12 mm intervals (spatial aliasing ~14.3 kHz) and four Soundskrit SKR0610 dipole microphones placed at the midpoints. The dipoles are oriented outward and inward with an 11 mm acoustic path length (spatial aliasing ~15.6 kHz). PDM outputs are converted to optical ADAT signals via a custom interface to eliminate electrical cable noise before reaching a PC.

Signal processing is executed at a 16 kHz sampling rate using STFT with a 512-sample window and a 128-sample hop size. The core algorithm is a Minimum Variance Distortionless Response (MVDR) beamformer operating in the frequency domain. The multi-channel observation vector combines an anechoic source spectrum scaled by an array steering vector—normalized relative to a reference front-center omnidirectional microphone transfer function—alongside a noise covariance matrix (NCM).

Various subsets of the 8-channel hardware are evaluated, with the 2 dipole + 1 omnidirectional configuration emerging as a optimal sweet spot between hardware complexity and spatial selectivity. An oracle NCM is utilized in simulation evaluations, while the live hardware demonstration incorporates a choice of manual or learning-based voice activity detection (VAD) to dynamically update the NCM in real-time.

## Experimental setup

Simulations use TIMIT speech material paired with speech-shaped noise played from four diagonal directions (±45° and ±135°). Each evaluation clip is 10 seconds long (first 5 s noise-only, last 5 s noise plus speech) with 40 clips generated per condition, adjusting target speech to 0 dB SDR at a single omnidirectional mic at 90°. Five configurations are benchmarked: 1 omni, 1 dipole, 3 omni (w/ MVDR BF), 3 dipole (w/ MVDR BF), and 2 dipole + 1 omni (w/ MVDR BF). Evaluation metrics include Signal-to-Distortion Ratio (SDR), Extended Short-Time Objective Intelligibility (ESTOI), and Perceptual Evaluation of Speech Quality (PESQ).

## Results

At the critical 90° lateral direction, the 3-omni, 3-dipole, and (2 dipole + 1 omni) MVDR beamformers achieve SDR values of 2.28 dB, 3.24 dB, and 3.06 dB respectively, outperforming front-directed setups. For ESTOI at 90°, the configurations score 0.453, 0.484, and 0.495, while PESQ scores reach 1.247, 1.282, and 1.278. The dipole-inclusive beamformers also surpass the 3-omni baseline in the −45° to 0° azimuth span.

In terms of limitations where it does not win, single omnidirectional microphones and front-omnidirectional arrays naturally maintain an advantage for front-facing sounds (−45° to 45° range), confirming that purely lateral arrays must be carefully balanced with omnidirectional elements to preserve frontal comprehension.

| System / Condition | SDR (dB) at 90° | ESTOI at 90° | PESQ at 90° |
|---|---|---|---|
| 3 Omnidirectional Mics (BF) | 2.28 | 0.453 | 1.247 |
| 3 Dipole Mics (BF) | 3.24 | 0.484 | 1.282 |
| 2 Dipole + 1 Omni Mics (BF) | 3.06 | 0.495 | 1.278 |

## Limitations

The study relies entirely on static anechoic chamber HRTF measurements and simulated directional speech-shaped noise rather than real-world dynamic multi-talker or reverberant acoustic environments. The evaluation uses a fixed dummy head (SAMAR HATS), leaving real-world user head movements and individualized acoustic morphology unexplored. Furthermore, the simulation dataset is limited to TIMIT passages without multilingual or real-time computational latency evaluations.

## Why read this

Speech and ML engineers building wearable assistive hearing devices should read this to understand how acoustic dipole sensors can physically complement traditional omnidirectional arrays for lateral sound enhancement. It provides concrete baseline numbers and hardware spacing constraints for integrating MEMS dipoles into smart glasses.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Assistive hearing aids, smart glasses, and spatial audio enhancement systems targeted at users with single-sided deafness or lateral hearing impairments.

## Related

- (link related pages by id as the wiki grows)
