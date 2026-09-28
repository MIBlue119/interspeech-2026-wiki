---
id: aparin26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1989
---

# Whisper Hallucination Detection and Mitigation via Hidden Representation Steering and Sparse AutoEncoders

**TL;DR** — Whisper's own internal activations linearly encode whether it's about to hallucinate, and steering those activations (especially through a sparse autoencoder) can cut hallucination rates by 5x or more.

## Problem

Whisper produces coherent transcriptions for non-speech audio that are entirely disconnected from the input, and it is unclear whether this can be caught and fixed using the model's own internals rather than external detectors.

## Method

The authors extract Whisper's audio encoder activations and Sparse AutoEncoder (SAE) latents, show both spaces linearly separate hallucination-related information (concentrated in a sparse subset of deeper-layer features), and propose two steering strategies — activation-space steering and SAE latent-space steering — to suppress hallucinations at inference time.

## Results

SAE-based steering reduces hallucination rate from 72.63% to 14.11% on Whisper small and from 86.88% to 27.33% on Whisper large-v3 on the full non-speech test set, with only small WER degradation on real speech, approaching fine-tuning-level performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Lightweight, no-fine-tuning hallucination mitigation for deployed Whisper-based transcription services.

## Related

- (link related pages by id as the wiki grows)
