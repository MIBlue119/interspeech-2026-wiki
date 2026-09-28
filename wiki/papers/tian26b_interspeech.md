---
id: tian26b_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1295
pdf: https://www.isca-archive.org/interspeech_2026/tian26b_interspeech.pdf
---

# DDSN: A Physics-Aware Decoupled Dual-Stream Network for Speech Packet Loss Concealment

[PDF](https://www.isca-archive.org/interspeech_2026/tian26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tian26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1295)

**TL;DR** — The paper introduces a wrapped-phase-aware decoupled dual-stream network (DDSN) for speech packet loss concealment, achieving superior perceptual quality and speech intelligibility across packet loss rates from 10% to 50%.

## Problem

Traditional frequency-domain packet loss concealment methods process real and imaginary spectra jointly, forcing a coupled modeling that overlooks distinct magnitude and phase characteristics. This joint optimization causes phase misalignment, structural artifacts, and a failure to recover fine phase details during long continuous burst losses.

## Method

DDSN uses independent parallel encoders to model spectral energy and temporal alignment separately, combined with a shared TCN bottleneck for global context. Magnitude is compressed using a power-law strategy to preserve low-energy components, while phase is mapped to a manifold-constrained continuous trigonometric representation (cos theta, sin theta). A Scaled Asymmetric Residual Guidance (SARG) mechanism uses magnitude priors to guide phase reconstruction via an additive residual connection (1 + alpha * Mask) rather than standard multiplicative gating. The model contains 15.37M parameters and is trained using a composite loss function penalizing manifold constraint errors, multi-resolution STFT discrepancies, phase consistency violations, and perceptual loudness differences.

## Results

Evaluated on the VCTK synthetic test set (10%-50% PLR) and the Interspeech 2022 PLC Challenge blind test set, DDSN is compared against TFGAN, FRN, cplx-bin2bin, and LPCNet baselines. On the VCTK set at 40% PLR, DDSN achieves a PESQ of 2.17, STOI of 0.84, and PLCMOS of 3.94, outperforming cplx-bin2bin's PESQ of 1.95 and TFGAN's PESQ of 1.56. Ablation studies confirm that replacing standard gating with the SARG module yields the largest performance boost across metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building real-time communication systems, Voice over IP (VoIP) software, and wireless audio transmission pipelines.

## Limitations

The current model prioritizes restoration fidelity over computational efficiency, resulting in a parameter count of 15.37M that requires future lightweight adaptations for edge deployment.

## Related

- (link related pages by id as the wiki grows)
