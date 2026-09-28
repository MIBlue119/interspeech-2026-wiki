---
id: xu26e_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-843
---

# SCNet: Enhancing GAN-based Speech Generation with Subband Condition Network and Magnitude-aware Phase Loss

**TL;DR** — SCNet augments a GAN-based vocoder with a lightweight subband condition network that supplies Fourier-coefficient prior knowledge, plus a magnitude-aware phase loss to reduce phase wrapping errors, improving speech generation quality over black-box GAN vocoders.

## Problem

GAN-based vocoders driving high-quality waveform synthesis from mel-spectrograms often operate as black-box models, losing inherent spectral information in the process.

## Method

SCNet augments a GAN-based vocoder with a Subband Condition Network that predicts a subband signal as prior knowledge, transformed via STFT into Fourier coefficients integrated into the backbone for enhanced reconstruction, plus a magnitude-aware phase loss that weights instantaneous phase errors by corresponding magnitude to emphasize high-energy regions and mitigate phase wrapping.

## Results

Experimental results demonstrate SCNet achieves superior performance in both objective and subjective evaluations for high-quality speech generation compared to baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to TTS vocoder pipelines seeking higher-fidelity waveform synthesis with better-preserved spectral/phase detail.

## Related

- (link related pages by id as the wiki grows)
