---
id: lee26k_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1477
pdf: https://www.isca-archive.org/interspeech_2026/lee26k_interspeech.pdf
---

# Spatial-Magnifier: Spatial upsampling for multichannel speech enhancement

*Dongheon Lee, Ashutosh Pandey, Sanjeel Parekh, Daniel Wong, Jacob Donley, Buye Xu, Juan Azcarreta*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1477)

**TL;DR** — Spatial-Magnifier introduces a dedicated GAN-based architecture for virtual microphone estimation and spatial upsampling, paired with Spatial Audio Representation Learning (SARL) to condition downstream speech enhancement systems. It nearly recovers oracle multichannel performance from sparse physical sensors while lowering computational costs relative to prior neural-VME baselines.

## Key contributions

- Proposed Spatial-Magnifier, a GAN-based generative network tailored for spatial upsampling that decouples spatial representation learning from spectral enhancement.
- Introduced a Selection Module with pointwise convolutions and Mish gating to isolate relevant spatial features channel-wise with minimal overhead.
- Integrated a Dynamic Channel Allocation (DCA) module using dynamic convolutions to adaptively weight and compress spatial filters.
- Designed the Spatial Audio Representation Learning (SARL) framework featuring signal-level (SARL-S) and feature-level (SARL-F) conditioning for downstream neural beamforming and direct end-to-end speech enhancement (VM-SE).

## Problem

Expanding physical microphone arrays to improve spatial directivity and multi-channel speech enhancement is fundamentally constrained by the physical size of edge devices like AR glasses, earbuds, and hearing aids. Prior neural virtual microphone estimation (Neural-VME) methods often repurposed conventional speech enhancement architectures rather than specialized spatial upsampling models, leading to sub-optimal conditioning and high computational overhead. This gap prevents edge devices from effectively harvesting the spatial diversity required for high-performance noise suppression and source separation.

## Method

Spatial-Magnifier processes frequency-domain real microphone (RM) signals $R \in \mathbb{C}^{M_r \times T \times F}$ by treating microphone indices as channel dimensions and concatenating real and imaginary parts. An initial 2D convolution expands inputs to $D_1$ channels before passing through $N_b = 5$ stages of alternating up-blocks, down-blocks, and Dynamic Channel Allocation (DCA) modules. The Selection Module uses pointwise convolutions and Mish activation to construct a channel-wise gating mechanism prior to addition. The DCA module utilizes dynamic convolutions to compute attention scores, weighting a pointwise convolution that compresses dimensionality from $D_1$ down to $D_2$ (with channel schedule [128, 96, 64, 48, 32]). Group convolutions are used in down-blocks for efficiency. 

The generator is trained inside a GAN framework using the Conformant-based MetricGAN (CMGAN) discriminator, optimizing a combined loss function comprising time-domain SNR losses for Neural-VME and VM-BF alongside generator and discriminator adversarial losses weighted at 0.3:0.7:0.01:0.01. Downstream integration occurs via SARL: SARL-S concatenates explicit raw waveform estimates of virtual microphones ($\hat{v}$) with RMs ($\bar{y} = [r, \hat{v}]$) for beamforming or end-to-end processing. SARL-F extracts latent spatial embeddings $f_{\hat{v}}$ via Spatial-Magnifier and fuses them with encoded RM features $h_\phi(r)$ through element-wise addition, serving as a high-level spatial regularizer for separator-decoder backbones like SpatialNet or MC-RNN.

## Experimental setup

Evaluated on 50,000 training, 2,000 validation, and 3,000 testing 10-second clips synthesized using DNS challenge corpora and Pyroomacoustics image source method (RT60 range 0.15–1.75s, SNR/SIR [-10, 5] dB) across both omnidirectional (omni-SE) and Field-of-View (FoV-SE) settings. Baseline models include SpatialNet with MCWF/MVDR and MC Conv-TasNet with single/multi-task learning. Evaluated using SI-SDR, SNR, narrowband PESQ, and STOI metrics, trained with Adam (lr=0.001, batch size 64) for 100 epochs across 32 H100 GPUs.

## Results

In the FoV-SE task with 2ch-RM and 4ch-VM, the proposed SARL-S configuration achieves an SI-SDR of 7.10 dB and PESQ of 2.40, substantially outperforming standard unfreezed fine-tuned Neural-VME (SI-SDR: 5.30 dB, PESQ: 2.14) and trailing close to the 6ch-RM oracle MCWF (SI-SDR: 8.35 dB). In omni-SE baseline comparisons (2ch-RM/4ch-VM), Spatial-Magnifier with SARL-S reaches an SI-SDR of 8.37 dB and PESQ of 2.57, outperforming SpatialNet-VME (SI-SDR: 4.87 dB) and MC Conv-TasNet MTL (SI-SDR: 4.89 dB) while keeping parameter additions to +1.2M and compute to +19.2 GMAC/s. For end-to-end VM-SE, combining SpatialNet-small 2ch with Spatial-Magnifier yields an SI-SDR of 9.04 dB (PESQ: 2.72), outperforming a larger SpatialNet-large 2ch model (SI-SDR: 9.33 dB, PESQ: 2.62) at less than half the computational complexity (44.2 vs 110 GMAC/s).

| System / Condition | SI-SDR (dB) | SNR (dB) | PESQ | STOI (%) |
|---|---|---|---|---|
| SpatialNet + MCWF 2ch | 3.14 | 4.96 | 2.13 | 75.5 |
| + MC Conv-TasNet (MTL) [6] | 4.89 | 6.16 | 2.24 | 79.3 |
| + SpatialNet-VME | 4.87 | 6.15 | 2.23 | 79.2 |
| + Spatial-Magnifier (SARL-F) | 7.72 | 8.37 | 2.51 | 85.1 |
| + Spatial-Magnifier (SARL-S) | 8.37 | 8.98 | 2.57 | 86.5 |
| Oracle MCWF 6ch | 11.78 | 12.06 | 2.70 | 92.4 |

## Limitations

Neural-VME is intrinsically bound to fixed training array geometries, making it difficult to generalize signal generation to arbitrary or dynamically changing sensor configurations during inference. While extreme upsampling configurations (e.g., 2ch-RM to 4ch-VM or 8ch-VM) yield strong gains, performance still exhibits gaps compared to physical oracle arrays with large numbers of true physical microphones under extreme reverberation. Evaluation is constrained to simulated room geometries and a limited set of measured ATF smart glass datasets.

## Why read this

Speech and ML engineers building hardware-constrained spatial audio or multichannel speech enhancement systems should read this to learn how to decouple spatial representation learning from spectral enhancement via specialized GAN upsampling and latent feature conditioning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Augmented reality glasses, hearing aids, true wireless stereo earbuds, and multi-microphone communication edge devices.

## Related

- (link related pages by id as the wiki grows)
