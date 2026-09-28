---
id: kovalev26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1480
pdf: https://www.isca-archive.org/interspeech_2026/kovalev26_interspeech.pdf
---

# SEAM: Shortcut-Aware Real-Time Detection of Scripted vs. Spontaneous Speech for Interview Guardrails

[PDF](https://www.isca-archive.org/interspeech_2026/kovalev26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kovalev26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1480)

**TL;DR** — SEAM is a shortcut-aware framework for real-time scripted-versus-spontaneous speech detection that achieves 0.971 ROC-AUC on an external interview-domain evaluation set using a compact DistilHuBERT backbone.

## Problem

Distinguishing scripted from spontaneous speech is valuable for AI interview guardrails, but standard models often exploit spurious shortcuts like corpus identity, room acoustics, microphone characteristics, and recording seams rather than actual speaking style. Consequently, models can achieve inflated internal benchmark accuracy while failing under modest domain or channel shifts. Addressing this requires addressing channel variations, artificial recording boundaries, and cleanliness heuristics without sacrificing real-time inference capability.

## Method

The framework combines a lightweight DistilHuBERT encoder (23 million parameters) with uniform waveform preprocessing (DC removal, 70 Hz high-pass filter, -23 LUFS loudness normalization, and peak limiting), provenance-tracked seam-aware sampling, and an additive non-speech noise bank. Audio is processed in 8-second windows, and training utilizes shallow adaptation by unfreezing only the top transformer layer alongside a two-layer MLP classification head. Post-training quantization is applied to reduce the model size to 41.8 MB for deployment. The internal training dataset comprises 240 hours per class pooled from four English corpora (People's Speech, PodcastFillers, LibriSpeech, and Spoken Wikipedia).

## Results

Evaluated across three seeds on internal grouped splits and an external adversarial interview-domain set containing 740 clips across four varied acoustic conditions. Under the full-training regime, the model achieves a mean internal test accuracy of 0.9623 (0.9766 ROC-AUC) and an external interview-domain accuracy of 0.9517 (0.9713 ROC-AUC). Ablations under a fixed-budget regime demonstrate that removing shortcut-prevention components like seam-aware sampling and noise augmentation improves internal held-out metrics while causing sharp drops in external transfer accuracy, dropping external ROC-AUC from 0.8991 down to 0.7324.

## Code

- https://github.com/vsevolod-kovalev/seam

## Applications

Engineers building low-latency conversational AI systems or AI-assisted job interview guardrails to flag rehearsed or read responses for human review.

## Limitations

The current system is English-first with only partial zero-shot transfer to non-English languages, and residual genre or corpus entanglement persists.

## Related

- (link related pages by id as the wiki grows)
