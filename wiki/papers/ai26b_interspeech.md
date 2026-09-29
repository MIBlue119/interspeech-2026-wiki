---
id: ai26b_interspeech
category: tts
labels: [generative-model]
institutions: ["University of Sheffield"]
code: https://anonymousinterpseech.github.io/TTS_Demo/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2875
pdf: https://www.isca-archive.org/interspeech_2026/ai26b_interspeech.pdf
---

# Beyond Two-stage Diffusion TTS: Joint Structure and Content Refinement via Jump Diffusion

*Jiabao Ai, Minghui Zhao, Anton Ragni*

[PDF](https://www.isca-archive.org/interspeech_2026/ai26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ai26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2875)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper proposes a jump-diffusion framework for text-to-speech that unifies discrete temporal alignment jumps and continuous spectral diffusion, achieving a 3.37% WER compared to 4.38% for Grad-TTS on LJSpeech.

## Key contributions

- A joint jump-diffusion framework that integrates discrete temporal structural changes and continuous spectral modeling in a unified iterative process.
- An Upsample-Diffuse-Downsample (UDD) strategy that reconciles variable-length structural jumps with fixed-dimensional pretrained U-Net diffusion backbones without retraining.
- A classification-based Location Predictor for duration modeling that replaces MSE regression, capturing multi-modal speech timing and avoiding mean prosody collapse.
- Empirical demonstration of adaptive prosody generation (autonomous silence insertion) in out-of-distribution slow speech without uniform mechanical stretching.

## Problem

Diffusion and flow-matching TTS models struggle with a fundamental tension: discrete temporal structure (alignment/rhythm) versus continuous spectral modeling. Two-stage models predict phone durations and upsample frames first, leading to mean collapse and mechanical uniform stretching under length constraints. Single-stage attention-based models forgo explicit alignment entirely but suffer from training and inference instability. Trans-Dimensional Diffusion (TDD) directly alters network dimensionality at each step, causing severe learning instability and poor performance due to architectural limitations.

## Method

The framework models speech generation by coupling structural corruption (frame deletion based on forced alignments) and spectral corruption (Gaussian noise addition relative to encoder outputs) in the forward process. The reverse process interleaves structural jumps (using a Location Predictor and a Content Predictor) with continuous spectral diffusion steps. The Location Predictor is a 4-layer Transformer encoder that scores insertion slots using cross-entropy loss over possible deletion positions, while the Content Predictor is an 8-layer bidirectional Transformer encoder that predicts residual content for newly inserted frames given in-place masked inputs.

To bridge variable-length states and standard fixed-dimensional networks, the UDD strategy expands the sequence to a target length canvas via location and content predictors, runs a reverse diffusion step on the full-length representation, and then downsamples by retaining original columns before the next iteration. In its one-shot degenerate form, UDD reduces to an upsample-and-diffuse operation where all structural expansion occurs at the start, entirely replacing Grad-TTS's duration regression with categorical classification.

## Experimental setup

Evaluated on LJSpeech using standard partitions from Grad-TTS. Baselines include Grad-TTS, Trans-Dimensional Diffusion (TDD) variants, and UDD variants (evaluated via sampling or argmax). Metrics include Word Error Rate (WER) using Whisper medium, UTMOSv2 for naturalness, Mel-Cepstral Distortion (MCD), and Log-F0 RMSE. Jump predictors are optimized using the Adam optimizer with a learning rate of 1e-4, freezing the pretrained Grad-TTS text encoder and U-Net diffusion backbone.

## Results

The one-shot variant achieves a 3.37% WER and 4.050 UTMOSv2, outperforming the Grad-TTS baseline (4.38% WER, 4.024 UTMOSv2) and proving the superiority of classification-based duration modeling over regression. TDD performs poorly with high WERs (6.31% to 7.66%) due to unstable dimensionality changes and lack of scale invariance in convolutions. The iterative UDD (Argmax) achieves the best MCD (5.830) and competitive Log-F0 RMSE (0.332). In out-of-distribution slow speech evaluation (0.75x speed), UDD (Argmax) adaptively inserts pauses, reaching a 9.63% silence ratio and 4.09% WER, compared to 6.38% silence and 4.29% WER for Grad-TTS.

| System | WER (%) ↓ | MCD ↓ | Log-F0 RMSE ↓ | UTMOSv2 ↑ |
|---|---|---|---|---|
| Grad-TTS | 4.38 | 5.872 | 0.330 | 4.024 |
| One-shot | 3.37 | 5.914 | 0.332 | 4.050 |
| TDD (Sample) | 6.31 | 6.057 | 0.341 | 3.867 |
| UDD (Sample) | 4.55 | 5.860 | 0.344 | 3.989 |
| UDD (Argmax) | 4.71 | 5.830 | 0.332 | 4.003 |

## Limitations

Evaluated exclusively on single-speaker read speech (LJSpeech) and lacks multi-speaker or spontaneous conversational evaluation. Jumps currently operate only on the temporal/structural domain, leaving spectral refinement purely to continuous diffusion without discrete spectral corrections. The approach relies on external forced alignments during training.

## Why read this

Speech researchers and developers working on generative TTS, prosody modeling, or alignment-free diffusion will find this a compelling bridge between explicit duration control and continuous diffusion. It offers a clear blueprint for replacing regression-based duration predictors with classification-based jump processes that prevent mean collapse.

## Code

- https://anonymousinterpseech.github.io/TTS_Demo/

## Applications

Expressive text-to-speech synthesis, speech generation under varying time constraints, and audiobook narration requiring natural adaptive pausing.

## Institutions / 機構

University of Sheffield

**Funding / 經費:** UK Research and Innovation, UKRI AI Centre for Doctoral Training in Speech and Language Technologies (SLT) and their Applications

## Related

- (link related pages by id as the wiki grows)
