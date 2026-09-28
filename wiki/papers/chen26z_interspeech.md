---
id: chen26z_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2447
---

# DiaMoE-TTS: A Unified IPA-Based Dialect TTS Framework with Parameter-Efficient Adaptation and Reward-Driven Optimization

**TL;DR** — DiaMoE-TTS unifies multi-dialect TTS on a Diffusion Transformer with an IPA front-end and a dialect-aware Mixture-of-Experts encoder, using GRPO reinforcement learning to lower word error rate across the target dialect and related ones.

## Problem

Building a single TTS system that covers multiple dialects is hard because dialect speech data is scarce, phonetic representations are inconsistent across dialects, and jointly modeling multiple dialects causes interference between them.

## Method

Built on the F5-TTS Diffusion Transformer framework, DiaMoE-TTS uses a unified IPA front-end to reduce cross-dialect pronunciation ambiguity, a dialect-aware Mixture-of-Experts text encoder to avoid style averaging across dialects, parameter-efficient fine-tuning for adapting to new low-resource dialects with only a few hours of data, and GRPO-based reinforcement learning to further reduce word error rate.

## Results

Experiments show that adding GRPO-based reinforcement learning reduces word error rate for both the target dialect and several related dialects, on top of the gains from the unified IPA front-end and MoE encoder.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-dialect and low-resource dialect TTS systems for cultural preservation, regional voice assistants, and dialect-aware media localization.

## Related

- (link related pages by id as the wiki grows)
