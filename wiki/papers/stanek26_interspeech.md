---
id: stanek26_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-123
pdf: https://www.isca-archive.org/interspeech_2026/stanek26_interspeech.pdf
---

# What Do Deepfake Speech Detectors Actually Hear?

[PDF](https://www.isca-archive.org/interspeech_2026/stanek26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stanek26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-123)

**TL;DR** — The paper investigates the decision logic of self-supervised deepfake speech detectors using an audio-native adaptation of Integrated Gradients, revealing that models with similar performance rely on entirely different acoustic cues.

## Problem

Modern deepfake speech detectors built on self-supervised learning pipelines typically output a single black-box score without explaining which parts of the audio signal or what cues drive their decisions. This opacity makes it difficult for forensic analysts to justify scores, diagnose system failures, or design robust counter-measures against advanced synthetic speech.

## Method

The authors propose an audio-native explainability pipeline using Integrated Gradients (IG) to localize decision evidence over time across transformer layers of WavLM Base+-based detectors. To construct a meaningful attribution path, they compute a model-specific baseline using the bona fide feature centroid averaged across training samples and timesteps, avoiding out-of-distribution artifacts or attack-specific dataset biases. They evaluate three representative architectures—AASIST, CA-MHFA, and SLS—fine-jointly trained on ASVspoof 5 with stochastic data augmentations, and analyze a curated subset of 100 recordings through a structured human annotation protocol.

## Results

Evaluated on the ASVspoof 5 dataset where individual detectors achieve Equal Error Rates between 3.98% and 5.26%, the attribution analysis shows distinct specialization among models: AASIST predominantly relies on non-speech and environmental cues (such as flagging clean silence and abrupt noise changes), CA-MHFA focuses on highly localized phonemes, sibilants, and articulation bursts, while SLS concentrates on global spectral integrity and word boundaries. High-confidence errors across all models were heavily dominated by aggressive compression artifacts and the A28 YourTTS attack. Causal masking of the identified primary cue regions confirmed performance degradation corresponding to each detector's assigned semantics.

## Code

- https://github.com/Security-FIT/IG_for_SSL_detectors

## Applications

Speech forensic analysts and machine learning engineers working on audio security, deepfake detection, and model interpretability.

## Limitations

The analysis is scoped specifically to self-supervised learning models operating on time-frame representations using WavLM backbones.

## Related

- (link related pages by id as the wiki grows)
