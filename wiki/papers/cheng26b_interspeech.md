---
id: cheng26b_interspeech
category: enhancement-separation
institutions: ["Chongqing University of Posts and Telecommunications"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2202
pdf: https://www.isca-archive.org/interspeech_2026/cheng26b_interspeech.pdf
---

# Active Noise Control With a Gain Constraint for Micro-Loudspeakers

*Zhenhua Cheng, Yi Zhou, Yin Liu, Yu Zhao, Liming Shi*

[PDF](https://www.isca-archive.org/interspeech_2026/cheng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cheng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2202)

**Category:** `enhancement-separation`

**TL;DR** — This paper proposes a fixed-filter active noise control (ANC) method with frequency-response gain constraints (ANC-FRC) to prevent mechanical over-excursion in micro-loudspeakers without introducing the group delay associated with cascaded filters. The approach achieves superior noise reduction across frequency bands compared to unconstrained Wiener filters and traditional high-pass cascading methods.

## Key contributions

- Identifies that unconstrained fixed-filter ANC methods cause mechanical over-excursion and nonlinear distortion when deployed on resource-constrained micro-loudspeakers.
- Proposes an ANC method with low-frequency frequency-response constraints (ANC-LF-FRC) using an infinity norm bound to limit low-frequency gain without adding electronic latency or group delay.
- Demonstrates that strict low-frequency-only constraints induce the Gibbs phenomenon at band discontinuities, degrading noise reduction performance.
- Introduces the ANC-FRC method combining low-frequency infinity norm constraints with an L2-norm regularization term toward the unconstrained Wiener optimum across target bands, forming a convex optimization problem with guaranteed global convergence.

## Problem

Compact smart devices like smartphones and smart glasses utilize micro-loudspeakers with severely limited low-frequency reproduction capability. Traditional unconstrained fixed-filter ANC methods, such as the standard Wiener-Hopf solution, apply excessively high gain at low frequencies to cancel high-energy disturbances, leading to mechanical over-excursion, hardware overload, and signal distortion. While cascading high-pass filters can suppress low-frequency output power, the induced group delay increases electronic latency and lowers the upper bound of effective noise reduction. This work addresses the trade-off between hardware safety and noise reduction efficiency without sacrificing latency.

## Method

The single-channel feedforward ANC system processes a reference signal x(n) through a control filter w to generate anti-noise y(n), which propagates through secondary path s(n) to cancel disturbance d(n) at the error microphone. The unconstrained optimal Wiener filter minimizes mean squared error (MSE) E{e^2(n)}, but fails for micro-loudspeakers. To prevent saturation, the ANC-LF-FRC method enforces a hard infinity-norm constraint ||F_h w||_inf <= delta_th on low-frequency bins (DC to h) via a DFT matrix F_h. Because sharp rectangular constraints in the frequency domain trigger the Gibbs phenomenon and oscillations in unconstrained bands, the proposed ANC-FRC method introduces a soft L2-norm regularization term lambda ||F_{H} (w - w_opt)||_2 over the remaining frequency bins (h+1 to Nyquist).

The final objective function combines the MSE cost function with this regularization term, resulting in a convex optimization problem with a linear inequality constraint that guarantees a unique global minimum solved via standard convex solvers like CVX. The regularization factor lambda is set to 0.2 and the low-frequency gain limit delta_th is 10 dB. This structure restricts low-frequency gains to protect the micro-loudspeaker while forcing the unconstrained band's filter response to closely track the optimal unconstrained Wiener filter, preserving phase and magnitude characteristics without adding electronic group delay.

## Experimental setup

Experiments were performed in an anechoic chamber using a Brühl & Kjær 4100-D dummy head placed 0.75m away from a KEF X300A primary loudspeaker. Noise signals included stationary white noise from the Noisex-92 database and non-stationary real-world train noise, captured via an error microphone in the artificial ear and a reference smartphone microphone sampled at 48 kHz (16 kHz in simulations). Baselines compared include the unconstrained ANC-Wiener method, a traditional High-pass method (first-order Butterworth with a 400 Hz cutoff), and the intermediate ANC-LF-FRC method. Evaluation uses noise reduction (NR) levels measured via power spectral densities (PSD) across specific frequency bands over 10 independent Monte Carlo runs.

## Results

The proposed ANC-FRC method consistently outperforms traditional high-pass filtering and unconstrained configurations. For train noise, the ANC-FRC method achieves average noise reduction levels of 1.54 dB (100-500 Hz), 13.96 dB (500-1000 Hz), and 18.55 dB (1000-2000 Hz), compared to the high-pass method which yields negative attenuation (-1.85 dB) in the 100-500 Hz band due to destructive phase distortion and group delay. For white noise, ANC-FRC achieves 1.54 dB, 14.06 dB, and 19.23 dB across the same respective frequency bands. While the unconstrained Wiener filter achieves higher low-frequency reduction (4.08 dB), it does so by demanding illegal physical excursions that exceed micro-loudspeaker hardware limits. Ablations comparing ANC-LF-FRC against ANC-FRC prove that adding the L2-norm regularization eliminates the Gibbs phenomenon, lifting mid-band performance from 11.01 dB up to 13.96 dB on train noise.

| Method | Noise type | 100-500 Hz | 500-1000 Hz | 1000-2000 Hz |
|---|---|---|---|---|
| ANC-Wiener method | Train noise | 4.08 | 17.77 | 20.66 |
| High-pass method | Train noise | -1.85 | 6.05 | 18.61 |
| ANC-LF-FRC method | Train noise | -0.13 | 11.01 | 15.68 |
| ANC-FRC method | Train noise | **1.55** | **13.96** | **18.55** |
| ANC-FRC method | White noise | **1.54** | **14.06** | **19.23** |

## Limitations

The evaluation is limited to a single-channel feedforward ANC setup tested in controlled anechoic conditions with simulated and playback loudspeaker setups. The approach relies on a fixed-filter pre-training regime, meaning it assumes static or slowly varying secondary paths and acoustic environments rather than tracking highly dynamic real-time plant changes via fully adaptive algorithms. Performance bounds depend heavily on precisely identifying the secondary transfer function and selecting appropriate constraint thresholds delta_th and regularization parameters lambda for specific hardware.

## Why read this

Read this paper if you design audio firmware or hardware-constrained active noise control systems for portable devices like smartphones and wearables and need to circumvent micro-loudspeaker clipping and over-excursion without adding latency-inducing high-pass filters.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Active noise control systems for smartphones, smart glasses, portable audio devices, and consumer electronics utilizing compact micro-loudspeakers.

## Institutions / 機構

Chongqing University of Posts and Telecommunications

**Funding / 經費:** National Key Research and Development Program of China, National Natural Science Foundation of China, Natural Science Foundation of Chongqing

## Related

- (link related pages by id as the wiki grows)
