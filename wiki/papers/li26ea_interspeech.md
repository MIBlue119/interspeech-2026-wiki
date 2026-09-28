---
id: li26ea_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2390
pdf: https://www.isca-archive.org/interspeech_2026/li26ea_interspeech.pdf
---

# U2A-Net: Physically Motivated Ultrasound‑to‑Audio Neural Modeling for Parametric Array Loudspeakers

*Mengtong Li, Yu Sun, Jia-Xin Zhong, Jing Lu*

[PDF](https://www.isca-archive.org/interspeech_2026/li26ea_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ea_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2390)

**TL;DR** — U2A-Net is a physics-motivated multi-rate neural framework that maps modulated ultrasonic driving signals directly to purified audible outputs for parametric array loudspeakers (PALs). It achieves an average nonlinear distortion modeling error below 1.62%, significantly outperforming audio-to-audio networks and Volterra filters.

## Key contributions

- Reformulates parametric array loudspeaker identification from an audio-to-audio (A2A) or ultrasound-to-ultrasound (U2U) setup to a physical ultrasound-to-audio (U2A) paradigm based on the Westervelt equation.
- Introduces a multi-rate WaveNet architecture featuring learnable downsampling modules (using consecutive 1D convolutions with stride 2 and kernel size 64) to bridge the 4x temporal resolution gap between 192 kHz ultrasonic input and 48 kHz audible output.
- Eliminates the need to implicitly learn complex modulation mechanisms and high-energy ultrasonic carriers, allowing model capacity to concentrate fully on intrinsic nonlinear self-demodulation.
- Demonstrates robust distortion tracking (THD and IMD) across varying excitation amplitudes, maintaining high fidelity under large-signal regimes where baseline models degrade.

## Problem

Parametric array loudspeakers (PALs) generate directional sound via airborne ultrasonic self-demodulation, but their strong nonlinear behavior introduces severe harmonic and intermodulation distortion. Conventional audio-to-audio (A2A) deep learning approaches entangle modulation, transducer responses, and demodulation into a single black-box mapping, leading to high training complexity. Meanwhile, ultrasonic-to-ultrasonic Volterra filters (U2U-VF) are dominated by high-energy ultrasonic carrier reconstruction and suffer from rapid coefficient explosion at higher orders, failing to capture subtle audio-band nonlinear distortions.

## Method

U2A-Net processes an upper sideband amplitude modulation (USBAM) ultrasonic driving signal sampled at 192 kHz and predicts the secondary audible output at 48 kHz. The backbone adapts a 16-layer WaveNet architecture with residual blocks utilizing dilated causal convolutions (dilation pattern dk = {1, 2, 4, ..., 2^15}, kernel size M=6, and channel number C=16 for pointwise convolutions). To bridge the 4x resolution gap between input and output, learnable downsampling modules consisting of two consecutive Conv1d layers with stride 2 and kernel size 64 are inserted before the final linear mixing stage.

The training relies on a joint time-frequency loss function comparing target waveforms and spectrograms against model predictions. By inputting the modulated ultrasonic signal directly into the network and restricting the output target to the audible band (guided by the Westervelt equation's description of quadratic acoustic interactions), U2A-Net bypasses the need to model the forward modulation mechanism or reconstruct high-energy primary ultrasonic waves. This leaves the network's capacity fully dedicated to resolving the complex nonlinear self-demodulation dynamics.

## Experimental setup

The dataset comprises approximately 3 hours of synchronized input-output data recorded in an anechoic chamber at a 1.8 m on-axis distance from a PAL prototype containing 576 circular ultrasonic emitters (Murata MA40S4S) arranged in a 24x24 cm square array. Excitation signals include diverse baseband speech, music, and environmental sounds, divided into 70% training, 20% validation, and 10% test splits using 1.37 s fixed-length clips. Baselines include an A2A single-rate WaveNet (48 kHz) and a second-order U2A-Volterra filter (U2A-VF) with memory lengths N1=480 and N2=240. Evaluation metrics include absolute deviation of total harmonic distortion (THD) and intermodulation distortion (IMD) across 1/12-octave step-sine bands from 500 Hz to 7550 Hz.

## Results

U2A-Net consistently achieves the lowest average distortion modeling error across all excitation levels (0.3, 0.5, 0.7, and max level 1.0). In quantitative THD/IMD deviation metrics, U2A-Net heavily outperforms the A2A-Net baseline and second-order U2A-VF, particularly at high input amplitudes where nonlinearities dominate (e.g., yielding average IMD errors around 1.02% to 1.26% compared to A2A-Net's 2.54% to 8.86% and VF's up to 22.40%). 

Ablations and comparisons reveal that while the U2A task formulation is beneficial, conventional second-order Volterra filters (U2A-VF) fail completely (predicting near-zero distortion) due to insufficient expressiveness to handle cascaded high-order PAL nonlinearities without severe coefficient explosion. U2A-Net's advantage is narrower at very weak input levels (e.g., 0.3), where mild nonlinearity makes baseline variations less pronounced.

| Input Level | U2A-Net THD (%) | A2A-Net THD (%) | VF THD (%) | U2A-Net IMD (%) | A2A-Net IMD (%) | VF IMD (%) |
|---|---|---|---|---|---|---| n| 0.3 | 0.17 | 0.94 | 1.82 | 1.62 | 1.66 | 7.11 |
| 0.5 | 0.28 | 1.07 | 3.14 | 1.02 | 2.54 | 11.26 |
| 0.7 | 0.40 | 1.35 | 4.37 | 1.04 | 3.63 | 15.69 |
| 1.0 | 0.52 | 1.86 | 5.89 | 1.26 | 8.86 | 22.40 |

## Limitations

The evaluation is restricted to a single upper sideband amplitude modulation (USBAM) parametric array loudspeaker prototype containing 576 emitters, leaving multi-transducer topologies and alternative modulation schemes untested. The dataset is limited to 3 hours of recordings gathered under fixed anechoic conditions at a single 1.8 m distance, omitting real-world acoustic reverberation, multi-path reflections, and variable propagation distances. Furthermore, the multi-rate WaveNet architecture requires handling high-rate 192 kHz ultrasonic streams, increasing preprocessing and compute overhead compared to conventional 48 kHz audio models.

## Why read this

Speech and audio hardware engineers working on directional acoustics or parametric array loudspeakers will find a principled alternative to black-box A2A models. Researchers will take away a clear demonstration of how incorporating physical acoustic governing equations (the Westervelt equation) into multi-rate neural network design resolves cross-domain sampling mismatches and improves large-signal distortion modeling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Private speech communication systems, directional sound domes, spatial audio reproduction, and active acoustic control.

## Related

- (link related pages by id as the wiki grows)
