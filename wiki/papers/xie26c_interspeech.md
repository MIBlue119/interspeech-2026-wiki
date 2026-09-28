---
id: xie26c_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1757
---

# VoiceTTA: Enhancing Zero-Shot Text-to-Speech via Reinforcement Learning-Based Test-Time Adaptation

**TL;DR** — Optimizing learnable prefixes at inference time with RL-based rewards for pitch/energy variation, speaker similarity, and intelligibility lets a pretrained zero-shot TTS model imitate uncommon speaking styles like crosstalk or dialects, without any retraining.

## Problem

Zero-shot TTS achieves high-fidelity, expressive synthesis but often fails to imitate unseen speaking styles from uncommon scenarios (e.g. crosstalk, dialects), and fine-tuning pretrained models for such cases requires large, high-quality datasets that limit rapid personalization.

## Method

The authors propose VoiceTTA, a reinforcement-learning-based test-time adaptation method that introduces two style rewards based on coefficient-of-variation differences of F0 and energy, combined with speaker similarity and intelligibility (WER from a pretrained Whisper model), optimizing learnable prefixes via group relative preference optimization (GRPO) in a flow-matching-based TTS model at inference time.

## Results

Extensive experiments show substantial improvements on uncommon speech prompts, outperforming state-of-the-art baselines.

## Code

Audio samples reported as available at https://voicetta.pages.dev/ — no training/inference code confirmed; unverified by this wiki as of the `updated` date. If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Rapid personalization/style-imitation for zero-shot TTS systems without needing large fine-tuning datasets for each new style.

## Related

- (link related pages by id as the wiki grows)
