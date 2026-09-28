---
id: choi26b_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1269
---

# ZeSTA: Zero-Shot TTS Augmentation with Domain-Conditioned Training for Data-Efficient Personalized Speech Synthesis

**TL;DR** — A lightweight domain-embedding trick that lets zero-shot TTS-generated speech augment tiny personal voice datasets without degrading how much the fine-tuned voice still sounds like the target speaker.

## Problem

Using zero-shot TTS output to pad out limited real recordings for personalized speech synthesis is appealing for diversity, but naively mixing synthetic and real speech during fine-tuning degrades speaker similarity.

## Method

ZeSTA tags real and synthetic speech with a lightweight domain embedding so the model can distinguish their statistics during training, and combines this with oversampling of the limited real data to stabilize adaptation, all without changing the base TTS architecture.

## Results

On LibriTTS and an in-house dataset with two zero-shot TTS sources, ZeSTA improves speaker similarity over naive synthetic augmentation while keeping intelligibility and perceptual quality intact.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Personalized voice cloning and assistive communication systems where only a small amount of a target speaker's real recordings is available.

## Related

- (link related pages by id as the wiki grows)
