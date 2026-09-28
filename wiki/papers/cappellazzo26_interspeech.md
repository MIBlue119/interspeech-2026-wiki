---
id: cappellazzo26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-417
pdf: https://www.isca-archive.org/interspeech_2026/cappellazzo26_interspeech.pdf
---

# Dr. SHAP-AV: Decoding Relative Modality Contributions via Shapley Attribution in Audio-Visual Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/cappellazzo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cappellazzo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-417)

**TL;DR** — The paper introduces Dr. SHAP-AV, a game-theoretic framework using Shapley values to analyze audio-visual modality contributions in speech recognition models across acoustic conditions and decoding steps.

## Problem

Audio-visual speech recognition (AVSR) models successfully combine audio and visual signals, but how they balance these modalities remains poorly understood. Models exhibit a strong audio bias in clean settings, while the distinct roles of audio and visual features during inference and under noise lack a formal, principled explanation. Understanding these dynamics is critical for diagnosing model failures and developing better multi-modal fusion mechanisms.

## Method

The framework adapts Shapley values—grounded in cooperative game theory—to evaluate feature contributions in both encoder-decoder and LLM-based AVSR architectures. It defines a characteristic function based on expected log-probabilities over subsets of masked input tokens, using Permutation and Sampling SHAP (with 2,000 sampled coalitions) to approximate attribution values. To capture fine-grained behavior, the paper introduces three novel metrics: Global SHAP for overall modality balance, Generative SHAP to monitor contributions during autoregressive decoding steps, and Temporal Alignment SHAP to track input-output correspondence. Experiments evaluate six state-of-the-art models (AV-HuBERT, Auto-AVSR, Whisper-Flamingo, Llama-AVSR, Llama-SMoP, and Omni-AVSR) across varying SNR levels and noise types.

## Results

Experiments were conducted on the LRS2 and LRS3 benchmarks across multiple SNR levels (from clean down to -10 dB). The study reveals that models progressively shift toward visual reliance under noise, yet retain a surprisingly high audio contribution of 38% to 46% even under severe -10 dB degradation. Generative SHAP shows that models like Whisper-Flamingo and Omni-AVSR increase audio reliance as decoding progresses, whereas AV-HuBERT maintains a stable balance. Furthermore, temporal alignment between input features and output tokens remains remarkably robust against acoustic noise, and acoustic conditions dominate modality weighting compared to utterance difficulty or duration.

## Code

- https://umbertocappellazzo.github.io/Dr-SHAP-AV

## Applications

Speech and ML engineers can use this framework to audit multimodal speech models, diagnose audio bias, and guide the design of balanced multi-modal fusion and weighting architectures.

## Limitations

The framework assumes token-level feature masking approximations and requires extensive Monte Carlo coalition sampling, which can be computationally demanding for large-scale models.

## Related

- (link related pages by id as the wiki grows)
