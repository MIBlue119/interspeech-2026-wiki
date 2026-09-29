---
id: tian26b_interspeech
category: speech-coding
institutions: ["Beijing University of Posts and Telecommunications", "Fanvil Link Technology Co., Ltd"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1295
pdf: https://www.isca-archive.org/interspeech_2026/tian26b_interspeech.pdf
---

# DDSN: A Physics-Aware Decoupled Dual-Stream Network for Speech Packet Loss Concealment

*Hao Tian, Yonghui Liu, Jianbing Liu, Kai Niu, Zhiqiang He*

[PDF](https://www.isca-archive.org/interspeech_2026/tian26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tian26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1295)

**Category:** `speech-coding`

**TL;DR** — The paper proposes DDSN, a packet loss concealment network that decouples magnitude and phase modeling to prevent phase misalignment, achieving superior perceptual quality and robustness during burst losses.

## Key contributions

- Designed a decoupled dual-stream U-Net architecture that separately models spectral energy via magnitude and temporal alignment via phase.
- Proposed the Scaled Asymmetric Residual Guidance (SARG) mechanism using a residual strategy (1 + alpha * Mask) to let magnitude priors guide phase reconstruction without unnatural attenuation.
- Employed a continuous trigonometric representation (cos theta, sin theta) with a unit-norm constraint and analytic SVD orthogonalization to resolve the phase wrapping problem.
- Integrated power-law magnitude compression (beta = 0.5) to enhance recovery of weak high-frequency and low-energy speech components.

## Problem

Real-time communication over wireless networks frequently suffers from packet loss and jitter, requiring packet loss concealment (PLC) systems to operate under strict algorithmic latency constraints. Traditional frequency-domain methods process real and imaginary spectra jointly, forcing a coupled optimization that heavily biases the network toward easily converging magnitude features at the expense of phase recovery. Furthermore, standard feature-modulation gates (like in PHASEN) severely attenuate phase details in lost or low-energy regions during long burst losses, disrupting complex-plane topology and causing structural artifacts.

## Method

DDSN employs parallel causal U-Net encoders where the magnitude stream uses a local (3, 3) convolution kernel to capture harmonic structures, and the phase stream uses a frequency-extended (3, 5) kernel for group delay estimation. A shared Temporal Convolutional Network (TCN) bottleneck with 4 stacked causal depthwise separable convolution modules (exponentially increasing dilation factor d = 2^k, k in {1, 2, 4, 8}) captures global temporal context across both streams to bridge missing gaps during burst losses. Decoders reconstruct magnitude and phase independently, interacting through the SARG module where magnitude features pass through a 1x1 convolution and Sigmoid activation, scaled by a learnable factor alpha and added as a residual to the phase features.

To map the phase cleanly, the target is represented as a continuous bivariate trigonometric vector (cos theta, sin theta). During training, L2 normalization maintains gradient stability, while during inference, 2x2 Singular Value Decomposition (SVD) orthogonalization projects predicted vectors onto the valid trigonometric manifold via closed-form quadratic roots and trigonometric identities to avoid iterative overhead. The magnitude stream applies power-law compression (beta = 0.5) to simulate human loudness perception. The composite training loss combines manifold-constrained reconstruction loss (Lmcr weighted at 3.0), multi-resolution STFT loss (LMR), anti-wrapping phase consistency loss (Lpha weighted at 0.1), and a perceptual quality loss (LPQE) optimizing Bark-scale Zwicker loudness.

## Experimental setup

Evaluated on the VCTK corpus downsampled to 16 kHz (split into non-overlapping sets with online dynamic masking at 10%-50% PLR) and the INTERSPEECH 2022 PLC Challenge Blind Test Set. Compared against TFGAN, FRN, cplx-bin2bin, and LPCNet. Evaluated using PESQ, STOI, PLCMOS, DNSMOS (SIG, BAK, OVRL), Word Error Rate (WER via faster-whisper), and Speaker Similarity (Resemblyzer). Models used a 32 ms Hann window (512 points) with 4 ms hop length, Dense Blocks with 16 hidden channels, trained for 150 epochs using Adam (lr = 5e-3 to 1e-3, batch size 16) with 15.37M parameters.

## Results

On the VCTK synthetic test set at 40% packet loss rate (PLR), DDSN achieves a PESQ of 2.17, STOI of 0.84, PLCMOS of 3.94, and an OVRL DNSMOS of 3.17, outperforming cplx-bin2bin (PESQ 1.95, PLCMOS 2.84, OVRL 2.99) and TFGAN (PESQ 1.56, PLCMOS 2.65). On the Interspeech 2022 PLC Challenge Blind Test Set, DDSN outperforms all baselines with a PESQ of 3.25, STOI of 0.93, PLCMOS of 4.08, and OVRL of 3.25 (compared to cplx-bin2bin's 3.16 PESQ and LPCNet's 2.76 PESQ). Ablation studies show that adding the SARG module on top of the dual-stream setup provides the largest performance boost, increasing PESQ from 2.04 to 2.17 and PLCMOS from 2.93 to 3.94 at 40% PLR. DDSN does require a larger parameter footprint (15.37M) than FRN (9.1M) or cplx-bin2bin (12.58M).

| Model | PESQ | STOI | PLCMOS | BAK | SIG OVRL |
|---|---|---|---|---|---|
| Lossy (40%) | 1.14 | 0.63 | 1.59 | 3.41 | 1.60 1.63 |
| TFGAN | 1.56 | 0.76 | 2.65 | 3.98 | 3.16 2.87 |
| cplx-bin2bin | 1.95 | 0.82 | 2.84 | 3.98 | 3.29 2.99 |
| DDSN | 3.25 | 0.93 | 4.08 | 4.02 | 3.52 3.25 |

## Limitations

The current model prioritizes restoration fidelity over model compactness, resulting in a heavier parameter footprint (15.37M) that requires lightweight adaptations like pruning and distillation for resource-constrained edge deployment. Evaluation is limited to single-speaker English datasets (VCTK and the challenge set), leaving multilingual generalization and multi-speaker acoustic interactions largely unverified. The framework currently relies exclusively on magnitude guiding phase, omitting potential reverse feedback loops from phase to refine unvoiced speech spectra.

## Why read this

Researchers working on real-time speech enhancement or packet loss concealment will find this paper essential for its novel treatment of phase-magnitude decoupling and analytical SVD manifold projection. It provides a blueprint for resolving phase-wrapping and gradient attenuation issues in low-energy spectral regions during severe burst packet losses.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice over IP (VoIP) systems, real-time audio communication platforms, and teleconferencing hardware experiencing network packet jitter and loss.

## Institutions / 機構

Beijing University of Posts and Telecommunications, Fanvil Link Technology Co., Ltd

## Related

- (link related pages by id as the wiki grows)
