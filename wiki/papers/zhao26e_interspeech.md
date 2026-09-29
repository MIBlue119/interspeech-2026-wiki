---
id: zhao26e_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1339
pdf: https://www.isca-archive.org/interspeech_2026/zhao26e_interspeech.pdf
---

# Decoding Order Matters in Autoregressive Speech Synthesis

*Minghui Zhao, Anton Ragni*

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1339)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper investigates how generation order affects autoregressive speech synthesis using a masked diffusion framework and scalar-quantised Mel-spectrograms. Results demonstrate that the traditional left-to-right order is suboptimal, with right-to-left and confidence-based adaptive strategies achieving significantly higher perceptual quality (MOS).

## Key contributions

- Formulates speech synthesis decoding order as a flexible modeling choice using an order-agnostic Masked Diffusion Model (MDM) operating in the one-by-one frame regime.
- Eliminates learned tokeniser confusions by applying a parameter-free shared linear scalar quantiser ($Q=100$) directly to Mel-spectrograms, remaining fully compatible with off-the-shelf HiFi-GAN.
- Shows empirically that right-to-left decoding consistently outperforms left-to-right decoding across objective metrics and MOS.
- Identifies an adaptive confidence-based strategy (top1) that achieves the highest MOS (3.91) among all trained models by naturally clustering consecutive frames with a locally right-to-left progression.

## Problem

Autoregressive speech generation has historically relied on a strict left-to-right (l2r) chain, mirroring natural speech progression. However, speech dependencies are non-causal: pauses and emphasis rely on global context while coarticulation reflects bi-directional phone interactions. Prior work relies on learned discrete tokenisers (like neural codecs) whose encodings inject unknown inductive biases, making it impossible to isolate whether synthesis bottlenecks stem from the tokeniser or the decoding order itself.

## Method

The architecture comprises a text encoder, a duration predictor, and a masked diffusion decoder. To ensure pure acoustic analysis without learned encoder biases, Mel-spectrograms are discretised using a shared linear scalar quantiser across frequency bins: $\hat{y} = \text{round}((y-a)/(b-a) \cdot (Q-1))$, with $Q=100$ bins per frame. The decoder predicts a categorical mixture of 5 logistic components per frequency bin, sampled independently across bins. During training, the model optimises an order-agnostic ELBO objective over uniformly sampled sequence lengths $t \sim \mathcal{U}(1, \dots, T)$ and permutations $\sigma \sim \mathcal{U}(S_T)$, using a single-sample Monte Carlo estimate per step.

At inference, the framework supports arbitrary decoding strategies. Alongside fixed orders like l2r and right-to-left (r2l), the authors evaluate adaptive strategies including top1 (sampling from the distribution of the highest confidence undecoded position, computed via maximum log-probabilities across frequency bins), top1* (deterministic argmax selection), duration-guided block decoding (dur), and stochastic path interpolation controlled by swap perturbation parameter $\beta$. HiFi-GAN vocodes the final output without retraining.

## Experimental setup

Evaluated on the LJSpeech dataset (13,100 single-speaker female English audio clips, split identically to Grad-TTS). Baselines include Grad-TTS trained on full utterances with fixed 100-step decoding (grad-100) and length-matched decoding (grad-L), alongside random uniform decoding (uro). Metrics include Mel-Cepstral Distortion (MCD), log $F_0$ RMSE, UTMOSv2, Word Error Rate (WER) using a HuBERT-based ASR model, and Mean Opinion Score (MOS) evaluated via Amazon Mechanical Turk using 75 Master Workers.

## Results

The top1 adaptive strategy achieved the highest MOS (3.91) among all models, narrowly beating the vocoded reference (3.99) and outperforming the baseline grad-100 (3.80). Among fixed-order strategies, r2l consistently outperformed l2r, scoring an MOS of 3.87 vs 3.78, lower MCD (5.55 vs 5.76), and lower WER (8.13 vs 8.93). Deterministic top1* achieved high intelligibility (WER 7.00) but degraded pitch naturalness due to collapsed spectral variance. The duration-guided strategy (dur) scored moderately (MOS 3.81, WER 7.56), showing that breaking directional continuity with random ordering within segments harms performance.

| System / Condition | MOS | WER (%) | MCD | log $F_0$ |
|---|---|---|---|---|
| Vocoded Reference | 3.99 | 6.64 | — | — |
| grad-100 (Baseline) | 3.80 | 8.59 | 6.23 | 0.306 |
| grad-L (Baseline) | 3.81 | 7.00 | 6.13 | 0.321 |
| l2r (Fixed) | 3.78 | 8.93 | 5.76 | 0.304 |
| r2l (Fixed) | 3.87 | 8.13 | 5.55 | 0.309 |
| top1 (Adaptive) | 3.91 | 7.79 | 5.71 | 0.300 |

## Limitations

Evaluated exclusively on a single-speaker read English corpus (LJSpeech), leaving multi-speaker generalization and diverse acoustic conditions untested. The scalar quantisation approach uses Mel-spectrograms rather than raw audio or neural audio tokens, restricting direct architectural plug-and-play with modern neural codecs. The confidence-based strategy relies on uncalibrated probabilities, and specific directional dynamics (like right-to-left dominance) are observational correlations rather than proven causal mechanisms.

## Why read this

Speech and ML engineers building autoregressive speech generators should read this to question the uncritical assumption of left-to-right generation and learn how order-agnostic masked diffusion can unlock higher perceptual quality.

## Code

- https://minghuizhao39.github.io/sample-page-order/

## Applications

High-fidelity neural text-to-speech generation, order-agnostic generative audio modeling, and speech synthesis post-processing.

## Institutions / 機構

University of Sheffield

**Funding / 經費:** UK Research and Innovation, UKRI AI Centre for Doctoral Training in Speech and Language Technologies (SLT) and their Applications

## Related

- (link related pages by id as the wiki grows)
