---
id: ploujnikov26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2784
pdf: https://www.isca-archive.org/interspeech_2026/ploujnikov26_interspeech.pdf
---

# HybridCodec: Modeling Discrete and Continuous Representations For Efficient Speech Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/ploujnikov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ploujnikov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2784)

**TL;DR** — The paper introduces HybridCodec and HybridLM, combining temporally compressed discrete tokens with continuous residuals to restore acoustic details in speech language models while cutting autoregressive steps.

## Problem

Purely discrete neural audio codecs suffer from an inherent rate-distortion trade-off, where low bitrates sacrifice fine-grained acoustic information like micro-prosody and speaker timbre for semantic intelligibility. While discrete tokens simplify LLM integration, this information bottleneck leads to noticeable degradation in downstream generation and recognition tasks. Re-integrating continuous features typically results in task-specific models that forfeit the unified framework advantages of standard speech LLMs.

## Method

The framework extends FocalCodec into a dual-path HybridCodec that extracts discrete tokens using Binary Spherical Quantization (BSQ) alongside a secondary focal encoder/decoder pathway for continuous residuals. HybridLM is a 12-layer GPT-style decoder-only Transformer ($d_{model}=512$, 4 attention heads) that unifies autoregressive discrete token generation with a single-step non-autoregressive (NAR) continuous residual prediction. It employs Adaptive Layer Normalization (AdaLN) conditioned on mode embeddings (AR vs. NAR) and incorporates pre-trained ECAPA-TDNN speaker embeddings. The models are trained on the 960-hour LibriTTS dataset using a combination of negative log-likelihood (NLL) for discrete targets and mean squared error (MSE) for continuous residuals.

## Results

Evaluated on the LibriTTS clean test set, HybridCodec resynthesis achieves competitive performance across various frame rates, maintaining high UTMOS (up to 4.22) and strong speaker similarity (SpkSim ~0.97). In generative text-to-speech (TTS) tasks at ultra-low frame rates like 12.5 Hz and 6.25 Hz, the hybrid approach massively outperforms discrete-only baselines, raising UTMOS from 1.99 to 4.10 (at 12.5 Hz) and from 1.44 to 3.08 (at 6.25 Hz). Cascaded inference reduces the required autoregressive steps significantly (e.g., a 10-second audio sample at 12.5 Hz requires only 126 steps instead of 500). Code usage remains high (96-99%) across configurations, demonstrating efficient vocabulary exploitation.

## Code

- https://speechbrain.github.io/

## Applications

Speech and ML engineers building zero-shot text-to-speech, voice cloning, and multimodal speech language models that require high acoustic fidelity at low compute costs.

## Related

- (link related pages by id as the wiki grows)
