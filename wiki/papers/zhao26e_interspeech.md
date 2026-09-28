---
id: zhao26e_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1339
pdf: https://www.isca-archive.org/interspeech_2026/zhao26e_interspeech.pdf
---

# Decoding Order Matters in Autoregressive Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1339)

**TL;DR** — This paper demonstrates that standard left-to-right decoding is suboptimal for autoregressive speech synthesis, and introduces an order-agnostic masked diffusion framework where adaptive confidence-based generation achieves the highest perceptual quality.

## Problem

Traditional speech synthesis models strictly rely on a left-to-right autoregressive generation order, mimicking the natural unidirectional progression of speech. However, human speech contains bidirectional dependencies, such as coarticulation and global prosodic cues, that do not fit neatly into a causal chain. Because evaluating every possible permutation is computationally intractable, the field has lacked a unified framework to systematically analyze how decoding order impacts synthesis fidelity.

## Method

The authors employ a masked diffusion model operating in a one-by-one decoding regime to evaluate arbitrary generation orders without retraining. To isolate modeling choices from learned encoder biases, the framework operates directly on scalar-quantised Mel-spectrograms (using $Q=100$ bins) that remain compatible with off-the-shelf HiFi-GAN vocoders. The model architecture follows standard non-autoregressive text-to-speech pipelines containing a text encoder, duration predictor, and a decoder predicting a mixture of 5 logistic components. Training optimizes an efficient order-agnostic evidence lower bound objective in parallel across random permutations, while inference explores fixed orders (left-to-right, right-to-left), stochastic path interpolations, and adaptive strategies like confidence-based top-K and duration-guided chunking.

## Results

Evaluated on the LJSpeech dataset using metrics including Mel-Cepstral Distortion (MCD), log F0 RMSE, UTMOSv2, Word Error Rate (WER), and Mean Opinion Score (MOS). Preliminary scalar quantisation at $Q=100$ yields minimal acoustic degradation with an MCD of 2.40, log F0 of 0.19, and WER of 5.22. Experiments comparing decoding orders show that the reverse right-to-left (r2l) order consistently outperforms conventional left-to-right generation, while the adaptive confidence-based top1 strategy achieves the highest MOS among all evaluated configurations. Analysis of adaptive generation paths reveals that high-performing models naturally favor maintaining local clusters of consecutive frames to balance long-range temporal context with local acoustic coherence.

## Code

- https://minghuizhao39.github.io/sample-page-order/

## Applications

Speech synthesis engineers and researchers looking to improve acoustic naturalness and flexibility in autoregressive text-to-speech model architectures.

## Limitations

The study evaluates single-speaker read English speech (LJSpeech) using frame-level scalar quantisation, leaving multi-speaker generalization and large-scale zero-shot multi-lingual evaluations to future work.

## Related

- (link related pages by id as the wiki grows)
