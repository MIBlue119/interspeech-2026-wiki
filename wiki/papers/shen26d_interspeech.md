---
id: shen26d_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2414
pdf: https://www.isca-archive.org/interspeech_2026/shen26d_interspeech.pdf
---

# Iterate to Differentiate: Enhancing Discriminability and Reliability in Zero-Shot TTS Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/shen26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shen26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2414)

**TL;DR** — The paper introduces Iterate to Differentiate (I2D), a recursive evaluation framework for zero-shot text-to-speech that amplifies performance gaps and raises system-level Spearman correlation with human judgments from 0.118 to 0.464 for UTMOSv2.

## Problem

State-of-the-art zero-shot text-to-speech (TTS) models have advanced to the point where traditional single-turn objective metrics suffer from severe score saturation, failing to distinguish subtle quality differences. Subjective tests like MOS are expensive, lack reproducibility, and scale poorly, while neural MOS predictors and LLM-as-a-judge baselines struggle with out-of-domain robustness. This prevents reliable automated benchmarking of top-tier generative speech systems.

## Method

The paper proposes Iterate to Differentiate (I2D), a recursive evaluation framework where a TTS model's synthesized output is repeatedly fed back as the reference audio and text for subsequent generation rounds up to a maximum of 10 iterations. Weaker models accumulate intelligibility and speaker consistency errors faster under this self-conditioning, creating differential degradation trajectories that expose model robustness. The authors evaluate 11 open-source AR, NAR, and hybrid TTS models (including Qwen3-TTS, CosyVoice series, F5-TTS, and MaskGCT) across three datasets: Chinese (Seed-TTS-Eval), English (LibriTTS), and Emotion (CV3-Eval). To aggregate performance across steps, they evaluate Arithmetic Mean, Linearly Weighted Average (LWA), Exponentially Weighted Average (EWA), and Area Under Curve (AUC) computed via the trapezoidal rule, using WER/CER, SIM, DNSMOS, and UTMOSv2.

## Results

Evaluated on 11 open-source models using Chinese, English, and emotion datasets, I2D significantly improves objective metric reliability and human alignment. For UTMOSv2, aggregating multi-turn trajectories increases system-level Spearman's Rank Correlation Coefficient (SRCC) with human evaluation from 0.118 in single-turn evaluation to 0.464. The framework successfully differentiates robustness across autoregressive, non-autoregressive, and hybrid architectures by tracking error propagation trajectories across up to 10 synthesis cycles.

## Code

- https://ssf-1103.github.io/I2D-Bench/

## Applications

Speech and machine learning engineers developing zero-shot text-to-speech models can use this framework for automated, human-aligned, and reproducible benchmarking of SOTA systems.

## Limitations

The framework requires running text-to-speech inference iteratively up to 10 times per test sample, which increases the computational overhead of the evaluation pipeline compared to single-turn objective scoring.

## Related

- (link related pages by id as the wiki grows)
