---
id: hu26b_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-494
---

# OmniCodec: Low Frame Rate Universal Audio Codec with Semantic–Acoustic Disentanglement

**TL;DR** — A universal low-frame-rate audio codec that decouples semantic and acoustic information using a pretrained understanding model's encoder, giving both better reconstruction and more useful tokens for downstream generation than Mimi.

## Problem

Most neural audio codecs used with LLMs focus on speech and prioritize reconstruction fidelity, overlooking unified low-frame-rate modeling across speech, music, and general sound, and high reconstruction quality doesn't guarantee semantically informative tokens for downstream generation.

## Method

The authors propose OmniCodec, a universal codec with a hierarchical multi-codebook design that decouples semantic and acoustic information by leveraging the audio encoder of a pretrained understanding model, plus a self-guidance strategy to improve codebook utilization and reconstruction.

## Results

Compared with Mimi at the same bitrate, OmniCodec delivers superior reconstruction quality while producing more semantically informative representations that benefit downstream generation tasks.

## Code

Model and code reported as planned open-source by the authors — unverified by this wiki as of the `updated` date; please confirm and update this entry if you can.

## Applications

Tokenization backbone for LLM-based audio, music, and speech generation systems that need compact, semantically rich discrete tokens.

## Related

- (link related pages by id as the wiki grows)
