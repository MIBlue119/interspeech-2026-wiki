---
id: yuan26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-27
pdf: https://www.isca-archive.org/interspeech_2026/yuan26_interspeech.pdf
---

# STSR: High-Fidelity Speech Super-Resolution via Spectral-Transient Context Modeling

[PDF](https://www.isca-archive.org/interspeech_2026/yuan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yuan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-27)

**TL;DR** — STSR is an end-to-end MDCT-domain speech super-resolution framework that achieves an average Log-Spectral Distance of 0.79 by combining hierarchical spectral attention and sparse-aware regularization.

## Problem

Deterministic regression models for speech super-resolution suffer from a regression-to-the-mean effect that yields over-smoothed high frequencies, while waveform and existing MDCT approaches struggle to capture long-range harmonic dependencies and transient clarity. Compressing heavy-tailed MDCT coefficients via transforms like arcsinh removes delicate transient details, creating an unaddressed representation conflict. Solving this is critical for delivering high-fidelity 48 kHz speech restoration without prohibitive computational overhead.

## Method

The framework operates in the signed MDCT domain using pseudo-logarithmic arcsinh compression (with gain g=800) for numerical stability. The generator uses a compact U-Net architecture built with Hierarchical Spectral-Contextual Attention blocks and shifted windows to capture non-local cross-band harmonic correlations. To counteract information loss from spectral compression, a representation-driven sparse-aware loss applies a dynamic soft mask (based on the 0.8-quantile of ground-truth energy) to penalize background noise while enforcing signal fidelity. The adversarial setup combines time-domain Multi-Period (MPD) and Multi-Scale (MSD) discriminators with a novel High-Band Multi-Band Discriminator (HB-MBD) operating on MDCT magnitudes between the low-res and high-res Nyquist limits. The model contains 66.2M parameters and was trained on VCTK using an AdamW optimizer.

## Results

Evaluated on the VCTK corpus with bandwidths ranging from 4 to 24 kHz upsampled to 48 kHz, STSR achieved an average Log-Spectral Distance (LSD) of 0.79, outperforming NVSR (0.85), FLowHigh (0.81), HiFi-SR (0.82), and mdctGAN (0.89). In zero-shot cross-domain evaluation on the HiFi-TTS dataset, STSR attained an average LSD of 1.05 compared to NVSR's 1.09 and mdctGAN's 1.10. Subjective MOS evaluations demonstrated a score of 4.20 ± 0.06, approaching the ground truth of 4.25 ± 0.06. Ablations confirm performance drops when removing the high-band multi-band discriminator, the sparse-aware loss, or the attention blocks.

## Code

- https://stsr-speech-demo.vercel.app

## Applications

Speech and ML engineers building telecommunications software or enhancing legacy audio archives can use STSR for real-time, high-fidelity bandwidth extension up to 48 kHz.

## Related

- (link related pages by id as the wiki grows)
