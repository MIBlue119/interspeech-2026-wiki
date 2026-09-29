---
id: zhang26k_interspeech
category: enhancement-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-784
pdf: https://www.isca-archive.org/interspeech_2026/zhang26k_interspeech.pdf
---

# WeSep: A Modular and Cue-Composable Framework for Target Speaker Extraction

*Ke Zhang, Xiaoyang Yu, Haoyu Li, Shuai Wang, Shuhan Zhang, Haizhou Li*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-784)

**Category:** `enhancement-separation`

**TL;DR** — WeSep is a modular and cue-composable framework that reformulates target speaker extraction (TSE) into a heterogeneous cue-conditioned learning problem, unifying single- and multi-modal cues under a shared separation backbone. It achieves 16.56 dB SI-SDRi on Libri2Mix using combined speaker features and supports dynamic missing-cue training.

## Key contributions

- Formulates target speaker extraction (TSE) as a generalized heterogeneous cue-conditioned learning problem supporting sample-level varying cue availability.
- Proposes a decoupled architecture separating modality-specific cue frontends from backbones (like BSRNN, NBC2, TF-GridNet) via standardized injection interfaces.
- Enables structured intra-modal and cross-modal cue composition (enrollment, spatial, visual, textual) without architectural redesign.
- Implements a heterogeneous sample-level training pipeline capable of handling missing or dynamically absent cues via zero-padding.

## Problem

Target Speaker Extraction (TSE) isolates a desired voice using auxiliary cues, but existing solutions are tightly coupled to a single specific modality (e.g., only speaker enrollment or only spatial localization), restricting flexibility. In real-world applications, auxiliary cues are dynamic and often unreliable due to acoustic mismatch, visual occlusion, or device failure. Prior multi-modal efforts rely on rigid, independent pipelines rather than a generalized architecture, preventing systematic study of cue composition, modality interaction, and missing-data robustness.

## Method

WeSep treats cue extraction and source separation as decoupled modules linked via uniform top-level interfaces. The framework uses specialized frontends for each modality: spectral and frame-level representations (e.g., USEF, TF-Map, contextual embeddings) for speaker enrollment; uncompressed time-frequency representations (IPD, delta STFT, CDF, SDF) for spatial cues; MuSE-style viseme embeddings for visual streams; and Transformer phoneme encoders for keyword-guided text cues. Separator backbones such as BSRNN (composed of 32 subbands, feature dimension 128, and a 6-layer 192-dim bidirectional LSTM) and NBC2 process the mixture while accepting feature fusion and state-injection at standardized anchor points.

During training, mix-target pairs are dynamically batched with auxiliary cues indexed via speaker or mixture IDs. Modalities can be dropped or selectively masked on a per-sample basis, allowing the network to handle missing cues gracefully using zero-valued placeholders. The system is optimized end-to-end using negative scale-invariant signal-to-noise ratio (SI-SNR) loss on 3-second audio segments with the Adam optimizer for 150 epochs.

## Experimental setup

Experiments use Libri2Mix-100 (13,900 training mixtures, 3,000 validation/test pairs), a multi-channel simulated reverberant dataset (4-channel ULA, RT60 from 0.1 to 0.5s, SINR -10 to 10 dB via gpuRIR), and VoxCeleb2-mix. Baselines include single-cue variants of BSRNN, NBC2, DPCCN, ConvTasNet, TF-GridNet, and prior single-modality systems like MuSE and DAE-TSE. Evaluation metrics are SI-SDR improvement (SI-SDRi in dB) and Extraction Accuracy (% of samples with SI-SDRi > 1 dB).

## Results

On clean Libri2Mix, combining USEF and Contextual speaker features with BSRNN yields 16.56 dB SI-SDRi (98.05% accuracy), outperforming utterance-level speaker embeddings (13.17 dB). Keyword-guided text cues (DAE-TSE) achieve comparable performance at 16.45 dB SI-SDRi. Under multi-channel spatial conditions, NBC2 with handeraft spatial features (CDF+SDF+IPD+dSTFT) hits 17.49 dB SI-SDRi, substantially outperforming compressed embedding-based spatial methods like Multiply-emb (14.86 dB). Cross-modal composition of speaker and spatial cues further lifts performance to 14.67 dB SI-SDRi (99.05% accuracy) on the reverberant setup compared to 11.59 dB for speaker-only.

In heterogeneous training evaluations with 30% missing speaker cues, 30% missing spatial cues, and 9% joint absence, the zero-padded model maintains stable performance (13.51 dB SI-SDRi when both are available, 12.61 dB spatial-only, and 10.01 dB speaker-only), proving resilience to incomplete data.

| System / Condition | Features | SI-SDRi (dB) | Accuracy (%) |
|---|---|---|---|
| BSRNN (Libri2Mix) | Speaker Emb. | 13.17 | 92.08 |
| BSRNN (Libri2Mix) | USEF + Context. | 16.56 | 98.05 |
| BSRNN (Libri2Mix) | Textual Keywords | 16.45 | 98.98 |
| NBC2 (Reverberant) | Spatial (Handcraft) | 17.49 | 98.13 |
| BSRNN (Reverberant) | Speaker + Spatial | 14.67 | 99.05 |

## Limitations

The framework's spatial and visual evaluations rely heavily on simulated room acoustics (gpuRIR) and specific multi-channel array geometries, which may not capture all real-world acoustic anomalies. Causal variants incur a performance drop (dropping USEF+Context causal to 14.15 dB from 16.56 dB non-causal), indicating a latency-accuracy trade-off for streaming applications. Furthermore, handling missing modalities via zero-padding works well for partial absence but can degrade when critical modalities are entirely missing for extended durations.

## Why read this

Speech researchers and audio engineers building multi-modal target speaker extraction or robust cocktail-party processors should read this paper to learn how to decouple cue encoders from separator backbones for unified training. It offers clear empirical proof that uncompressed spatial/spectral cue representations outperform compressed latent embeddings.

## Code

- https://github.com/wenet-e2e/WeSep

## Applications

Real-time hearing aids, multi-modal video conferencing isolation systems, smart home speaker tracking, and robust speech recognition frontends under dynamic acoustic environments.

## Institutions / 機構

Chinese University of Hong Kong, Shenzhen, Nanjing University, Shenzhen Loop Area Institute

**Funding / 經費:** National Natural Science Foundation of China, Yangtze River Delta Science and Technology Innovation Community Joint Research Project, Shenzhen Science and Technology Program, Program for Guangdong Introducing Innovative and Enterpreneurial Teams, Shenzhen Stability Science Program

## Related

- (link related pages by id as the wiki grows)
