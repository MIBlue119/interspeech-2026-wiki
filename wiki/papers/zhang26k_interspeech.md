---
id: zhang26k_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-784
pdf: https://www.isca-archive.org/interspeech_2026/zhang26k_interspeech.pdf
---

# WeSep: A Modular and Cue-Composable Framework for Target Speaker Extraction

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-784)

**TL;DR** — WeSep is a modular and cue-composable framework that reformulates target speaker extraction as a heterogeneous cue-conditioned learning problem, supporting flexible multi-modal integration and missing-cue training.

## Problem

Target speaker extraction systems are typically engineered around specific cue modalities like speaker enrollment or spatial directions, making it difficult to combine cues or adapt when certain modalities are missing. In real-world environments, cues can be unreliable, degraded, or entirely absent due to acoustic conditions, occlusion, or speaker state mismatches. Developing a unified architecture that handles arbitrary combinations of heterogeneous cues without redesigning the core separation network is an important open challenge.

## Method

WeSep decouples cue frontends from separator backbones via standardized feature injection interfaces, allowing plug-and-play composition of audio enrollment, spatial directions, visual streams, and text keywords. The framework supports time-domain and frequency-domain backbones such as BSRNN, ConvTasNet, TF-GridNet, and NBC2, and features a sample-level heterogeneous data pipeline. During training, missing cues are handled via zero-valued placeholders under a shared optimization objective using negative scale-invariant signal-to-noise ratio. Causal configurations are also implemented to achieve a theoretical streaming latency of 32 ms.

## Results

Evaluated primarily on Libri2Mix-100 and a multi-channel reverberant dataset with simulated room acoustics (RT60 between 0.1 and 0.5 s), performance is measured using SI-SDR improvement (SI-SDRi) and accuracy percentage for SI-SDRi > 1 dB. Combining spectral/frame-level speaker features (USEF + Contextual embedding) achieves 16.56 dB SI-SDRi and 98.05% accuracy on Libri2Mix, outperforming utterance-level embeddings (13.17 dB). Handcrafted spatial features (CDF+SDF+IPD+∆STFT) yield 14.24 dB with BSRNN and 17.49 dB with NBC2, outperforming latent spatial embedding priors. Keyword-guided text cues achieve competitive performance at 16.45 dB, while joint audio-spatial multi-cue conditioning further improves performance to 14.67 dB (99.05% accuracy).

## Code

- https://github.com/wenet-e2e/WeSep

## Applications

Speech and ML engineers building robust real-time communication systems, smart speakers, hearing aids, or transcription pipelines that must extract target speakers under dynamic, multi-modal conditions.

## Related

- (link related pages by id as the wiki grows)
