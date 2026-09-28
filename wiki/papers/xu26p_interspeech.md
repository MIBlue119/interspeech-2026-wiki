---
id: xu26p_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2025
pdf: https://www.isca-archive.org/interspeech_2026/xu26p_interspeech.pdf
---

# Room Impulse Response Completion Using Signal-Prediction Diffusion Models Conditioned on Simulated Early Reflections

*Zeyu Xu, Andreas Brendel, Albert G. Prinn, Emanuël A. P. Habets*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2025)

**TL;DR** — A diffusion-based room impulse response (RIR) completion method uses signal-prediction ($x$-prediction) and classifier-free guidance to generate full RIRs from order-limited, incomplete early reflections without temporal discontinuities. It achieves superior energy decay curve (EDC) reconstruction compared to baseline methods when bridging geometric and numerical wave simulation data.

## Key contributions

- Proposes an $x$-prediction diffusion framework for RIR completion that removes the rigid requirement for fully populated or truncated fixed-duration early-reflection input windows.
- Introduces classifier-free guidance (CFG) trained on a hybrid dataset combining fast Image Source Method (ISM) and physics-rich numerical wave simulations (Treble SDK) to handle real-world acoustic wave effects and furniture scatter.
- Integrates an energy decay curve (EDC) loss function directly evaluated on the predicted RIR to enforce consistent reverberation decay characteristics down to a -60 dB floor.
- Demonstrates successful RIR completion from low-order ISM inputs (down to order 1) without creating spurious large-amplitude pulses or temporal boundary discontinuities.

## Problem

State-of-the-art RIR completion models like Echo2Reverb assume fixed-duration pre-truncated input heads (such as 50 ms or 80 ms windows) containing dense early reflections. However, many geometric simulators like the Image Source Method (ISM) naturally generate early reflections via a maximum reflection order parameter, resulting in sparse, incomplete early reflection patterns. Feeding low-order ISM responses directly into existing systems causes temporal boundary discontinuities and forces models to generate unrealistic, spurious high-amplitude pulses to match global energy decay targets.

## Method

The architecture is a 1D U-Net diffusion model operating over $T=200$ diffusion steps using a cosine noise schedule. The target noise-free RIR $\mathbf{x}_0 \in \mathbb{R}^K$ (where $K=24,576$ samples at 16 kHz) is directly predicted via $x$-prediction: $\hat{\mathbf{x}}_0 = X_\theta(\mathbf{x}_t, \mathbf{c}, t)$, where the ISM conditioning signal $\mathbf{c}$ is concatenated along the channel dimension as $[\mathbf{c}, \mathbf{x}_t] \in \mathbb{R}^{K \times 2}$. The U-Net encoder uses 7 stride-2 downsampling layers to support sequences up to 32,768 samples with a bottleneck length of 256. Inside the bottleneck, a 6-layer residual dilated Conv1D stack with dilation rates increasing exponentially from 1 to 32 captures long-range temporal structures like late reverberation.

The total training objective combines a standard Mean Squared Error (MSE) loss on the waveform with a normalized log-scale Energy Decay Curve (EDC) loss, $\mathcal{L}_{total} = \mathcal{L}_{MSE} + \lambda \mathcal{L}_{EDC}$, where $\lambda = 10^{-5}$. The EDC is computed via Schroeder's backward integration, clamped at a -60 dB dynamic range floor, and weighted uniformly where valid. Classifier-free guidance (CFG) is implemented by randomly zeroing the conditioner $\mathbf{c} = \mathbf{0}$ with a probability $p_{CFG} = 0.2$ during training. At inference, unconditional and conditional predictions are blended using a guidance scale $s$ to balance condition adherence and distribution diversity.

## Experimental setup

Datasets consist of 10,000 paired room configurations (25 random shoebox rooms, variable floor/wall materials, and randomized furniture for the numerical wave dataset) simulated using pyroomacoustics (ISM dataset) and the Treble SDK (numerical wave dataset) split 8:1:1 for training, validation, and test. Baselines include Echo2Reverb conditioned on 80 ms truncated full RIRs or order-limited ISM reflections. Evaluation metrics comprise Residual Energy Ratio (RER) for the early 80 ms window, Root Mean Square Error (RMSE) for the late tail ($>80$ ms), and Mean Absolute Error of the Energy Decay Curve (EDC-MAE) down to -60 dB.

## Results

In Experiment 2 (CFG training on an 80/20 ISM-Treble hybrid dataset tested on Treble data), the proposed method with hybrid loss achieves an EDC-MAE of 8.66 dB at maximum reflection order 7, outperforming Echo2Reverb (9.62 dB). When using an order 1 conditioner, the proposed model successfully prevents the boundary discontinuities inherent to baseline methods, which cannot natively handle sparse early reflections without creating artificial amplitude spikes.

| System / Condition | Early RIR RER (dB) ↓ | Late RIR RMSE (dB) ↓ | EDC-MAE (dB) ↓ |
|---|---|---|---|
| Echo2Reverb (Order 5) | -12.21 | -21.95 | 9.46 |
| Echo2Reverb (Order 7) | -12.18 | -22.06 | 9.62 |
| Proposed M (Order 1) | -1.94 | -23.92 | 10.23 |
| Proposed M+E (Order 1) | -1.25 | -21.46 | 11.80 |
| Proposed M+E (Order 5) | -6.64 | -22.38 | 9.30 |
| Proposed M+E (Order 7) | -13.00 | -22.95 | 8.66 |

## Limitations

The evaluation is restricted to simulated shoebox rooms and synthetic datasets without subjective human listening tests or evaluation on real measured RIRs. The iterative 200-step reverse diffusion sampling process makes inference considerably slower than single-pass deterministic baselines like Echo2Reverb. Furthermore, performance degrades at very low reflection orders (e.g., order 1) where physical conditioning cues are extremely sparse.

## Why read this

Speech and audio researchers building generative spatial audio engines or data augmentation pipelines will learn how to adapt diffusion models for conditional RIR completion from sparse geometric simulations rather than costly full-wave measurements.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Acoustic data augmentation for robust speech recognition, immersive spatial audio rendering, and virtual acoustics simulation.

## Related

- (link related pages by id as the wiki grows)
