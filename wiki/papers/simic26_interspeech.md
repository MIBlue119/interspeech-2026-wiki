---
id: simic26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2081
---

# Adaptive AVSR: Integrating Speaker and Environmental Embeddings for Robust Audio-Visual Speech Recognition

**TL;DR** — Injecting speaker (X-Vector) and custom noise-scenario embeddings into a Whisper-based audio-visual ASR system, at different fusion points, cuts WER by up to 13.4% relative to AV-HuBERT.

## Problem

Audio-Visual Speech Recognition (AVSR) needs to be robust to varying noise conditions and speakers, but standard AVSR pipelines don't explicitly adapt to speaker- or environment-specific characteristics.

## Method

The authors extend a Whisper ASR model with an AV fusion module and incorporate speaker and noise-scenario-specific embeddings extracted from the audio input, using a custom attention-based model for noise-embedding generation and X-Vector embeddings for speaker adaptation, evaluating three integration strategies (prefix concatenation, additional cross-attention layers, gated weighting) with noise embeddings injected at the AV fusion module and speaker embeddings at the pre-decoder level.

## Results

On LRS3 across various noise conditions, the approach gains 3.5% from noise adaptation and 3.2% from speaker adaptation over the baseline, and achieves relative WER reductions of up to 13.4% compared to the SOTA AV-HuBERT approach.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust audio-visual speech recognition for noisy real-world environments, e.g. video conferencing or in-car voice interfaces.

## Related

- (link related pages by id as the wiki grows)
