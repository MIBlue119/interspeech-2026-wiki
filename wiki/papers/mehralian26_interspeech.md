---
id: mehralian26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3333
pdf: https://www.isca-archive.org/interspeech_2026/mehralian26_interspeech.pdf
---

# Predict-Then-Adapt: Inferring Coordinates from Speech for Continuous Geo-Conditioned Dialectal ASR

*Pouya Mehralian, Hugo Van hamme*

[PDF](https://www.isca-archive.org/interspeech_2026/mehralian26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mehralian26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3333)

**Category:** `asr`

**TL;DR** — This paper introduces Predict-Then-Adapt, a two-pass inference pipeline that removes the requirement for speaker coordinate metadata in geo-conditioned ASR by appending a lightweight Coordinate Regression Head to a frozen encoder. On Dutch dialect data, the combined CRH+GLoRIA system achieves an average Word Error Rate (WER) of 32.62% using 10-second utterances, outperforming rank-matched LoRA by 3.05% and closely approaching oracle-coordinate adaptation performance within 0.58% absolute WER.

## Key contributions

- Proposes a two-pass inference architecture consisting of coordinate inference (GLoRIA off) followed by geo-conditioned ASR decoding (GLoRIA on).
- Attaches a lightweight Coordinate Regression Head (CRH) using K-head attentive pooling and a compact MLP that adds less than 0.1% parameters and under 3% inference latency.
- Demonstrates that CRH achieves 15-25 km mean great-circle localization error using 10-30 seconds of speech.
- Shows that continuous geo-conditioning is robust to spatial perturbations within a 15-25 km radius, matching the typical error range of the CRH.
- Outperforms rank-matched LoRA across Dutch dialect test sets while preserving the interpretability of coordinate-gated low-rank components.

## Problem

Dialectal automatic speech recognition struggles due to heavy phonetic variation and sparse annotated data per regional variety. While continuous geo-conditioned adaptation methods like GLoRIA effectively capture gradual dialect shifts better than categorical labels, they fundamentally assume that precise speaker coordinates are available at test time. This dependency makes them impractical for real-world deployment where speaker metadata is missing, noisy, or private. Removing this restriction while maintaining parameter efficiency and interpretability is necessary for robust dialectal ASR.

## Method

The system utilizes a 180M-parameter Cascaded Encoder Dual Features backbone comprising a 12-layer Conformer encoder (512 hidden dimension, 2048 feed-forward dimension, 8 heads) and a 6-layer Transformer decoder, trained via a hybrid CTC and weighted cross-entropy objective. GLoRIA adapts the Conformer feed-forward layers and cross-attention modules using rank-r low-rank factors multiplied by diagonal gating coefficients derived from coordinate vectors. To operate without metadata, a lightweight Coordinate Regression Head (CRH) is stacked on top of the frozen encoder to map sequence representations to latitude/longitude estimates. CRH employs 2-head attentive pooling over time frames to produce an utterance-level vector, followed by a 64-hidden-dimension MLP with a tanh output scaled to [-1, 1].

During training, the backbone is frozen, and CRH is trained separately using the SmoothL1 robust regression loss. Inference is executed in two passes: first, GLoRIA is disabled to run a forward pass through the encoder, and the CRH predicts speaker coordinates from the resulting sequence. Second, GLoRIA is activated using the predicted coordinates to decode the transcription. This design adds minimal computational overhead, executing only one extra encoder pass while keeping the beam search decoder running once.

## Experimental setup

Experiments are conducted on the GCND corpus comprising 411 hours of spontaneous Dutch dialect speech across 9 regions, strictly partitioned to prevent speaker or coordinate leakage between train, validation, and test splits. The models are implemented in ESPnet and optimized using Adam (lr=0.001) with WarmupLR (1500 warmup steps) and gradient accumulation of 128 for 50 epochs. Baselines include rank-matched LoRA, oracle-coordinate GLoRIA, Whisper large-v3, and OWSM-CTC-V4 1B, evaluated using Mean Great-Circle Error (km) and Word Error Rate (WER %).

## Results

On 10-second test utterances, the CRH+GLoRIA system achieves an average WER of 32.62%, outperforming standard rank-matched LoRA (35.67% average WER) by 3.05% absolute and closely approaching oracle-coordinate GLoRIA (32.04% average WER) with a gap of only 0.58%. In comparison, large general-purpose models perform much worse on this dialectal task, with Whisper large-v3 averaging 67.74% WER and OWSM averaging 78.75% WER. CRH localization error improves significantly with utterance duration, dropping from 49.82 km at 3 seconds to 23.72 km at 30 seconds and 23.01 km at 60 seconds, with interpolation sets reaching 15.44 km and extrapolation sets remaining harder at 38.17 km.

| System | Brabants | Oost-Vlaams | West-Vlaams | Limburgs | Average WER (%) |
|---|---|---|---|---|---|
| Oracle GLoRIA | 24.65 | 27.42 | 24.45 | 46.90 | 32.04 |
| LoRA | 28.35 | 30.19 | 27.73 | 49.74 | 35.67 |
| CRH+GLoRIA (10s) | 25.06 | 28.35 | 25.06 | 44.46 | 32.62 |
| Whisper large-v3 | 71.69 | 68.30 | 62.91 | 68.56 | 67.74 |
| OWSM-CTC-V4 1B | 78.32 | 80.54 | 76.25 | 76.78 | 78.75 |

## Limitations

The evaluation is restricted to the Dutch dialect continuum (GCND corpus), leaving multilingual and cross-lingual generalizability unproven. Coordinate regression struggles significantly on out-of-domain extrapolation ranges (averaging ~38 km error at 30s) compared to interpolation regions (~15 km error). Utterances shorter than 10 seconds yield high localization uncertainty with regression-to-the-mean collapse, limiting the system's effectiveness on very brief conversational turns.

## Why read this

Researchers and engineers building speech recognition systems for dialect-rich or low-resource languages will learn how to bypass missing geographical metadata using parameter-efficient regression heads. This paper provides a blueprint for combining location estimation with parameter-efficient fine-tuning without sacrificing model interpretability or incurring heavy inference latency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Dialect-aware automatic speech transcription, regional voice assistants, geographic spoken language understanding, and sociolinguistic analysis tools.

## Institutions / 機構

KU Leuven

**Funding / 經費:** Flemish Government

## Related

- (link related pages by id as the wiki grows)
