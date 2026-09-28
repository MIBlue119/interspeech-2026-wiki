---
id: cappellazzo26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-417
pdf: https://www.isca-archive.org/interspeech_2026/cappellazzo26_interspeech.pdf
---

# Dr. SHAP-AV: Decoding Relative Modality Contributions via Shapley Attribution in Audio-Visual Speech Recognition

*Umberto Cappellazzo, Stavros Petridis, Maja Pantic*

[PDF](https://www.isca-archive.org/interspeech_2026/cappellazzo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cappellazzo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-417)

**TL;DR** — Dr. SHAP-AV introduces a Shapley-value attribution framework to analyze modality contributions in Audio-Visual Speech Recognition (AVSR) across six state-of-the-art architectures, revealing a persistent audio bias even under severe noise.

## Key contributions

- Adapts Shapley value attribution (Global, Generative, and Temporal Alignment SHAP) from vision-language tasks to both LLM-based and cross-attention-based AVSR architectures.
- Systemematically evaluates modality balance across 6 state-of-the-art models (AV-HuBERT, Auto-AVSR, Whisper-Flamingo, Llama-AVSR, Llama-SMoP, Omni-AVSR) under controlled SNR shifts.
- Exposes a persistent audio bias where models maintain 38-46% audio reliance even at -10 dB SNR where visual dominance would be expected.
- Uncovers generative and temporal dynamics showing that some models (Whisper-Flamingo, Omni-AVSR) progressively increase audio reliance during decoding while preserving strong input-output temporal alignment.

## Problem

Audio-Visual Speech Recognition systems integrate audio and lip-movement video to handle acoustic noise, but how these models actually balance the two modalities remains opaque. Prior works focused purely on minimizing Word Error Rate (WER) or used heuristics without formal mathematical attribution. This lack of diagnostic tooling obscures why AVSR models often exhibit heavy audio bias and collapse when audio is absent in clean conditions.

## Method

Dr. SHAP-AV adapts cooperative game theory Shapley values to AVSR, treating audio and visual features as players and the expected log-probability of generating target token yt as the characteristic function. To handle high dimensions and varying model layouts, Permutation/Sampling SHAP is used with M = 2000 Monte Carlo coalitions, masking features by setting them to zero. For LLM-based models (Llama-AVSR, Llama-SMoP, Omni-AVSR), features are masked after projection into the LLM space; for cross-attention models (AV-HuBERT, Auto-AVSR, Whisper-Flamingo), features are masked prior to fusion or cross-attention. Grouped audio masking is applied to balance temporal resolution differences between audio (50 Hz) and video (25 fps).

The framework measures attribution via three metrics: (1) Global SHAP, which computes overall absolute magnitude contributions across all features and tokens; (2) Generative SHAP, which tracks modality reliance across sequential token generation windows (W = 5); and (3) Temporal Alignment SHAP, which evaluates whether early/middle/late input features correspond to early/middle/late output tokens using K x W normalized heatmaps.

## Experimental setup

Evaluated on the LRS2 (225 hours, BBC) and LRS3 (433 hours, TED talks) benchmarks using babble noise (NOISEX, MUSAN) and MUSAN noise types (music, environmental sound, speech) across SNR levels from clean (infinity) to -10 dB. Evaluates 6 models: LLM-based (Llama-AVSR, Llama-SMoP, Omni-AVSR using Whisper-medium audio, AV-HuBERT Large video, and Llama-3.2-1B backbone) and cross-attention-based (AV-HuBERT, Auto-AVSR, Whisper-Flamingo). Metrics include Global SHAP values, Generative SHAP trajectories, and Temporal Alignment scores.

## Results

At -10 dB SNR with babble noise, models shift toward visual reliance but still maintain 39-46% audio contribution (dropping from 63-73% in clean settings). Auto-AVSR shows almost flat adaptation (~57% audio across all SNRs) due to its fixed MLP fusion, whereas AV-HuBERT and Whisper-Flamingo show wide shifts of 30-34 percentage points. Generative SHAP reveals that Whisper-Flamingo and Omni-AVSR exhibit a U-shaped or rising audio reliance toward the end of generation, whereas AV-HuBERT maintains a stable balance. Temporal alignment heatmaps confirm that both modalities maintain robust diagonal correspondence between input features and output tokens even at -10 dB.

| System / Condition | Clean Audio SHAP (%) | -10 dB Audio SHAP (%) | Clean WER (%) | -10 dB WER (%) |
|---|---|---|---|---|
| Llama-AVSR | 65.4 | 46.0 | -- | -- |
| Omni-AVSR | 59.9 | 42.7 | -- | -- |
| Auto-AVSR | 56.5 | 55.3 | -- | -- |
| Whisper-Flamingo | 94.7 | 88.3 | -- | -- |

## Limitations

The framework relies on zero-masking to simulate feature absence, which may introduce out-of-distribution artifacts into encoder representations. Experiments are restricted to English datasets (LRS2, LRS3) and specific noise configurations (babble and MUSAN categories). The computational cost of approximating Shapley values with 2000 Monte Carlo coalitions prevents real-time diagnostic deployment during training.

## Why read this

Researchers and engineers building multimodal speech systems should read this to understand why current AVSR architectures fail to fully exploit visual cues. It provides a drop-in diagnostic framework to audit model fusion dynamics rather than relying blindly on WER metrics.

## Code

- https://umbertocappellazzo.github.io/Dr-SHAP-AV

## Applications

Auditing and diagnosing multimodal speech recognition models, guiding the design of adaptive modality-weighting mechanisms, and improving robustness in noisy audio-visual conversational agents.

## Related

- (link related pages by id as the wiki grows)
