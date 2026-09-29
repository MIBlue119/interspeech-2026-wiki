---
id: kim26c_interspeech
category: speaker
labels: [robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-364
pdf: https://www.isca-archive.org/interspeech_2026/kim26c_interspeech.pdf
---

# Mixture Consistency Learning for Robust Speaker Verification in Noisy Environments

*Seung-bin Kim, Chan-yeong Lim, Jungwoo Heo, Hyun-seo Shin, Kyo-Won Koo, Jisoo Son, Kyung-Wha Kim, Ha-Jin Yu*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-364)

**Category:** `speaker` · **Labels:** `robustness-noise`

**TL;DR** — The Mixture Consistency Learning–based Speaker Verification (MCL-SV) system eliminates the need for predefined clean reference signals in front-end speech enhancement by using a dual-decoder architecture governed by a mixture consistency loss, reducing average EER on noisy VoxCeleb1 to 1.19% (a 12.5% relative drop vs. baselines).

## Key contributions

- Proposes a Dual-Decoder Speech Enhancement (DDSE) frontend sharing a single U-Net encoder branched into parallel speech and noise paths.
- Formulates a self-supervised Mixture Consistency (MC) loss enforcing that the sum of the dual decoder outputs matches the original noisy input spectrogram.
- Directly couples the downstream speaker verification (SphereFace2) loss to the enhanced speech path output to force the retention of speaker-discriminative cues.
- Demonstrates robust out-of-domain generalization across unseen noise sources (Nonspeech100, VoxSRC23, VC-Mix) without requiring large-margin fine-tuning or score normalization.

## Problem

Standard noise-robust speaker verification systems use speech enhancement (SE) frontends trained with reconstruction losses (like MSE) against predefined clean reference targets (e.g., ExUNet, NA-ExUNet). However, these reference targets still contain recording artifacts, channel variability, and background traits. When supervised SE models learn to reconstruct these flawed targets, they inadvertently preserve non-discriminative nuisance factors that propagate into downstream speaker embeddings and degrade verification accuracy.

## Method

The MCL-SV frontend takes a complex spectrogram (real and imaginary components stacked as 2 channels) processed through a U-Net encoder-decoder structure. The encoder uses a 2D convolution layer followed by four encoder blocks containing GroupNorm, SiLU, 3x1 convolutions, squeeze-and-excitation (SE) layers, and residuals. The decoder diverges into two parallel, identically structured paths: a Speech Enhancement (SE) path and a Noise Extraction (NE) path.

Instead of minimizing distance to ground-truth clean references, training is driven by two objectives: a Mixture Consistency ($L_{MC}$) loss and a task-driven speaker verification ($L_{SV}$) loss. The $L_{MC}$ loss computes the $L_2$ distance between the original noisy input mixture $X$ and the sum of the estimated speech $\hat{S}$ and estimated noise $\hat{N}$, expressed as $L_{MC} = ||X - (\hat{S} + \hat{N})||_2$. This regularization provides a target-free decomposition constraint.

To prevent routing ambiguity and force the SE path to isolate speaker-relevant cues while pushing nuisance variables into the NE path, the SE output $\hat{S}$ is converted into log mel-spectrograms, fed into a ReDimNet-B2 backend, and optimized using SphereFace2 loss. The complete objective combines mixture consistency and speaker verification losses, discarding traditional target-dependent supervision on the enhancement module entirely.

## Experimental setup

Evaluated using VoxCeleb1 and VoxCeleb2 for clean utterances and training data, with MUSAN dataset noises mixed uniformly at 0–20 dB SNR alongside room impulse response (RIR) reverberation. Out-of-domain testing utilized Nonspeech100, VoxSRC23, and VC-Mix datasets. The backend uses ReDimNet-B2 (7.2M parameters for the combined system), optimized via the Adam optimizer and cosine-annealing learning rate schedule, with SphereFace2 hyperparameters set to $\lambda=0.7$, $t=3$, margin=0.2, and scale=32 (for Vox2). Metrics are reported in Equal Error Rate (EER % ).

## Results

When trained on VoxCeleb2, the proposed MCL-SV achieves an average EER of 1.19% across MUSAN SNRs (0–20 dB), representing a 12.5% relative improvement over the baseline (1.36%) and outperforming the vanilla ReDimNet-B2 backend (1.42%). In the most challenging 0 dB SNR conditions, MCL-SV achieves 1.94% EER compared to the baseline's 2.16% under music noise conditions and 2.12% vs 2.49% under babble noise. Ablation studies confirm that replacing target-based SE/NE losses with the mixture consistency loss drops the average EER from 1.36% (baseline) to 1.19%. On out-of-domain Nonspeech100 noise, MCL-SV achieves an average EER of 3.17%, beating WavLM + NAW-SV (3.29%).

| System | Clean | Noise (Avg) | Music (Avg) | Babble (Avg) | Overall Avg |
|---|---|---|---|---|---|
| Baseline (ReDimNet-B2 + SE) | 0.97 | 1.41 | 1.24 | 1.49 | 1.36 |
| Exp #3 (SE + NE Target Loss) | 0.99 | 1.36 | 1.24 | 1.44 | 1.33 |
| Exp #5 (NE + MC Loss) | 0.91 | 1.35 | 1.18 | 1.34 | 1.27 |
| MCL-SV (Proposed, Exp #7) | 0.83 | 1.25 | 1.10 | 1.28 | 1.19 |

## Limitations

The current evaluation focuses primarily on additive environmental noises and simulated RIR reverberation; extreme channel mismatches such as severe telephone band-limiting or heavy codec artifacts remain underexplored. The model size is constrained to a lightweight 7.2M parameters, which limits the capacity to handle heavily overlapping multi-speaker scenarios. Additionally, language and accent diversity are bounded by the VoxCeleb dataset distribution.

## Why read this

Researchers and engineers building noise-robust speaker verification systems should read this to learn how to bypass the limitations of supervised clean-target speech enhancement through self-supervised mixture consistency learning.

## Code

- https://github.com/kimho1wq/MCL-SV

## Applications

Robust speaker verification and biometric authentication systems deployed in harsh acoustic environments such as smart home devices, in-car voice assistants, and forensic audio analysis.

## Institutions / 機構

University of Seoul, Supreme Prosecutor’s Office

**Funding / 經費:** Supreme Prosecutors' Office

## Related

- (link related pages by id as the wiki grows)
