---
id: takaki26_interspeech
category: enhancement-separation
institutions: ["University of Tokyo"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/takaki26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/takaki26_interspeech.pdf
---

# Head-Worn Dipole Microphone Array-based Speech Enhancement System for Single-Sided Deafness

*Ken Takaki, Kouei Yamaoka, Yoshihiro Kawahara*

[PDF](https://www.isca-archive.org/interspeech_2026/takaki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/takaki26_interspeech.html)

**Category:** `enhancement-separation`

**TL;DR** — This paper proposes a head-worn dipole microphone array embedded in smart glasses to enhance lateral speech intelligibility for individuals with single-sided deafness (SSD). Using an MVDR beamformer combining two dipoles and one omnidirectional microphone, the system improves lateral speech SDR by 0.78 dB and ESTOI by 0.04 over a 3-channel omnidirectional array baseline.

## Key contributions

- Designs a custom 8-channel glasses-mounted array integrating 4 MEMS omnidirectional microphones and 4 dipole microphones with side-directed directivity.
- Employs an optical ADAT digital conversion interface to suppress electrical noise in multi-channel PDM microphone recordings.
- Evaluates dummy-head transfer functions and simulated noisy acoustic scenes across various microphone combination configurations.
- Demonstrates that combining dipole and omnidirectional microphones in an MVDR beamformer improves lateral sound intelligibility (at 90°) compared to conventional front-facing omnidirectional hearing aids.

## Problem

People with single-sided deafness (SSD) struggle to converse because they cannot easily hear sounds arriving on their deaf side. Conventional hearing aids rely on forward-facing directionality and differential beamforming using omnidirectional microphones to prioritize frontal speech, completely failing to address the needs of lateral listening for SSD users. Exploring microphone topologies that specifically target side-directed directivity remains an unexplored gap in hearing assistance research.

## Method

The hardware consists of a linear array mounted on a glasses frame, featuring 4 omnidirectional elements (Infineon IM73D122V01) spaced at 12 mm (spatial aliasing at ~14.3 kHz) interleaved with 4 dipole microphones (Soundskrit SKR0610) whose ports face inwards and outwards with an 11 mm acoustic path length (aliasing at ~15.6 kHz). Fully synchronized PDM signals are converted to optical ADAT streams via a USB interface to mitigate electrical cabling noise.

Signals are processed at 16 kHz using STFT with a 512-sample window and a 128-sample hop size. A Minimum Variance Distortionless Response (MVDR) beamformer is applied in the frequency domain. The target direction steering vector is normalized against an omnidirectional front-center reference microphone head-related transfer function (HRTF), utilizing an oracle noise covariance matrix (NCM) estimated from noise-only segments.

Five distinct signal processing layouts are benchmarked: single omni, single dipole, 3-element dipole array with beamforming, 3-element omni array with beamforming, and a hybrid array using 2 dipoles and 1 omnidirectional microphone with beamforming. The hybrid and dipole-based configurations are designed to exploit the directional nulls and figure-eight lobes of dipoles to capture side arrivals while attenuating front-to-back interfering speech-shaped noise.

## Experimental setup

Evaluations used TIMIT speech corpora played around a SAMAR HATS Type 4700M dummy head in an anechoic chamber with transfer functions measured every 7.5° in azimuth. Speech-shaped noise was played from four diagonal directions (±45° and ±135°). Metrics include Signal-to-Distortion Ratio (SDR), Extended Short-Time Objective Intelligibility (ESTOI), and Perceptual Evaluation of Speech Quality (PESQ). Forty 10-second clips (5s noise-only, 5s speech+noise) were tested per condition.

## Results

At the lateral 90° azimuth, the hybrid configuration of 2 dipole + 1 omni microphones achieved an SDR of 3.06 dB, an ESTOI of 0.495, and a PESQ of 1.278, outperforming the 3-omnidirectional beamformer baseline which scored 2.28 dB SDR, 0.453 ESTOI, and 1.247 PESQ. The 3-dipole configuration achieved 3.24 dB SDR and 0.484 ESTOI at 90°.

In ablation across look directions, pure omnidirectional arrays remain superior for frontal sounds (-45° to 45°), whereas dipole-inclusive beamformers dominate lateral angles (90°). However, the single dipole microphone alone suffers in overall quality metrics compared to multi-mic beamformed setups due to lack of adaptive noise cancellation.

| System Configuration | SDR (dB) @ 90° | ESTOI @ 90° | PESQ @ 90° |
|---|---|---|---|
| 3 Omni Mics (BF) | 2.28 | 0.453 | 1.247 |
| 3 Dipole Mics (BF) | 3.24 | 0.484 | 1.282 |
| 2 Dipole + 1 Omni (BF) | 3.06 | 0.495 | 1.278 |

## Limitations

The evaluation relies on simulated acoustic scenarios using static dummy head measurements in an anechoic chamber rather than dynamic real-world environments with moving listeners and reverberation. The study uses an oracle noise covariance matrix, omitting the performance degradation introduced by real-time learning-based voice activity detection and noise tracking. Testing is restricted to speech-shaped stationary noise without evaluating competing conversational speech or complex cocktail-party interference.

## Why read this

Speech and hardware engineers building assistive listening devices or smart glasses for hearing impairments will learn how to integrate acoustic dipole sensors into wearable frames to solve lateral deafness challenges.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart glasses and specialized hearing aids for single-sided deafness (SSD) rehabilitation.

## Institutions / 機構

University of Tokyo

**Funding / 經費:** JSPS KAKENHI

## Related

- [Multi-Channel Differential ASR for Robust Wearer Speech Recognition on Smart Glasses](yang26_interspeech.md) — same problem · relatedness 1.9/3
- [Joint Learning of Covariance Estimation and White Noise Gain for Robust MVDR Beamforming](deng26d_interspeech.md) — shared technique · relatedness 1.9/3
- [RT-Tango: Real-Time Distributed Binaural Speech Enhancement for Low-Power Hearing Aid Devices](benslimane26_interspeech.md) — same problem · relatedness 1.9/3
- [AV-SNINet: A multi-channel audio-visual speech-noise interaction network for Target Speaker Extraction with cross-beam attention](tu26c_interspeech.md) — shared technique · relatedness 1.7/3
- [Towards Array-Invariant Speech Enhancement via Geometry-Aware Dynamic Convolution](liu26d_interspeech.md) — same problem · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
