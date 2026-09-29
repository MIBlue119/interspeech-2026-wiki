---
id: yuan26_interspeech
category: speech-coding
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-27
pdf: https://www.isca-archive.org/interspeech_2026/yuan26_interspeech.pdf
---

# STSR: High-Fidelity Speech Super-Resolution via Spectral-Transient Context Modeling

*Jiajun Yuan, Xiaochen Wang, Yulin Wu, Chenhao Hu, Xueyang Lv*

[PDF](https://www.isca-archive.org/interspeech_2026/yuan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yuan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-27)

**Category:** `speech-coding` · **Labels:** `generative-model`

**TL;DR** — STSR is a vocoder-free, single-stage MDCT-domain speech super-resolution framework that combines hierarchical spectral-context attention and a sparse-aware regularization strategy, achieving superior 48 kHz reconstruction quality with fewer parameters than prior models.

## Key contributions

- A spectral-transient aware MDCT framework that jointly addresses envelope reconstruction and transient preservation without needing a downstream vocoder.
- A hierarchical spectral-contextual attention mechanism utilizing shifted windows to capture non-local dependencies along the frequency axis.
- A high-band-focused hybrid discriminator (HB-MBD) operating on MDCT magnitudes to concentrate adversarial pressure on generated high frequencies without destabilizing low bands.
- A representation-driven sparse-aware regularization strategy tailored to compressed MDCT representations that mitigates transient over-smoothing.

## Problem

Prior deep speech super-resolution models rely heavily on regression loss functions (L1/L2) that yield over-smoothed high-frequency outputs, or require heavy two-stage generative pipelines (such as flow matching models with cascaded vocoders like BigVGAN) that introduce massive parameter overhead and feature mismatch. Alternative time-domain models lack explicit representations of frequency structures and struggle to capture vertical correlations between fundamentals and distant high-band harmonics. Meanwhile, existing MDCT-based models utilize local convolutions that fail to maintain long-range harmonic consistency, and their reliance on range compression (arcsinh) to handle heavy-tailed MDCT coefficients inadvertently destroys fragile transient energy.

## Method

STSR operates in the signed MDCT domain using inverse hyperbolic sine (arcsinh) compression with a gain factor of g=800 to regularize heavy-tailed distributions while preserving invertibility. The generator uses a compact U-Net architecture built upon Hierarchical Spectral-Contextual Attention Blocks (H-SAB) with alternating shifted windows across the frequency axis to model non-local cross-band harmonic correlations and formant transitions.

To ensure perceptual quality, STSR combines a least-squares adversarial loss using time-domain discriminators (MPD, MSD) alongside a frequency-domain High-Band Multi-Band Discriminator (HB-MBD). The HB-MBD restricts PatchGAN adversarial heads exclusively to the unobserved high-frequency band [flo, fhi) to prevent low-band degradation. Additionally, a sparse-aware transient constraint uses a dynamic soft mask (computed via a sigmoid function with a dynamic threshold set at the 0.8-quantile of absolute coefficient values) to re-weight the optimization landscape, simultaneously enforcing fidelity in active spectral regions and penalizing spurious background artifacts.

The system was trained on 44-hour VCTK data using an AdamW optimizer (learning rate 2e-4, exponential decay 0.999) on a single NVIDIA A100 GPU for 200k iterations with a batch size of 16. It employs a dynamic degradation strategy, stochastically sampling cutoff frequencies between 4 and 32 kHz on-the-fly during training, and uses an MDCT window size of 1024 with a 512 hop length (KBD window, alpha=6).

## Experimental setup

Evaluated on the VCTK corpus (44 hours, 48 kHz, 100 speakers for training, 8 for evaluation) and zero-shot generalized on the HiFi-TTS dataset (resampled to 48 kHz). Compared against baseline systems FLowHigh, NVSR, HiFi-SR, and mdctGAN. Evaluated using Log-Spectral Distance (LSD), ViSQOL, and Mean Opinion Score (MOS) listening tests.

## Results

STSR achieves an average LSD of 0.79 across 4 to 24 kHz input bandwidths upscaled to 48 kHz, outperforming FLowHigh (0.81), NVSR (0.85), HiFi-SR (0.82), and mdctGAN (0.89), while using only 66.2M parameters compared to FLowHigh's 147.4M. On the unseen HiFi-TTS cross-dataset zero-shot evaluation, STSR attains the best average LSD of 1.05 compared to NVSR (1.09) and mdctGAN (1.10). Ablation studies show that removing HB-MBD degrades average LSD to 0.83, removing the sparse regularization degrades it to 0.81, and replacing attention with pure CNNs degrades it to 0.93. In subjective MOS evaluations, STSR scores 4.20, closely approaching the ground truth of 4.25 and outperforming NVSR (4.15) and mdctGAN (4.05).

| Model | Voc. | Params | 4→48kHz LSD | 8→48kHz LSD | 16→48kHz LSD | 24→48kHz LSD | AVG LSD |
|---|---|---|---|---|---|---|---|
| FLowHigh | ✓ | 147.4M | 0.97 | 0.84 | 0.75 | 0.67 | 0.81 |
| NVSR | ✓ | 99.0M | 0.98 | 0.91 | 0.81 | 0.70 | 0.85 |
| HiFi-SR | ✓ | 101.0M | 0.95 | 0.86 | 0.77 | 0.68 | 0.82 |
| mdctGAN | ✗ | 101.0M | 1.09 | 0.93 | 0.83 | 0.71 | 0.89 |
| **STSR** | ✗ | **66.2M** | **0.95** | **0.84** | **0.73** | **0.65** | **0.79** |

## Limitations

The evaluation is restricted to clean, high-resource English datasets (VCTK and HiFi-TTS) and does not explore robustness against heavy background noise, acoustic reverberation, or low-bitrate compression artifacts. The model relies on clean low-resolution downsampled inputs during training, leaving its performance under real-world telephone or VoIP transmission anomalies unexplored.

## Why read this

Speech and audio researchers building efficient, high-sampling-rate generative restoration systems should read this to see how frequency-domain attention and sparse-aware regularization can eliminate the need for cascaded vocoders while outperforming larger flow-matching and regression baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Bandwidth extension for legacy archival audio recordings, telecommunication speech intelligibility enhancement, and single-stage 48 kHz audio upsampling for voice assistants and streaming.

## Institutions / 機構

Wuhan University, Jianghan University, Xiaomi Corporation

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
