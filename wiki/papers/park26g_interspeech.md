---
id: park26g_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2944
---

# NaVo: Natural Voice Protection against Voice Cloning Attacks via Generative Universal Adversarial Audio

**TL;DR** — NaVo generates natural-sounding adversarial audio that, when mixed with someone's voice, defends against real-time voice cloning attacks without the perceptual distortion or high latency of prior optimization-based defenses.

## Problem

Proactive defenses against voice cloning inject adversarial perturbations to disrupt synthesis, but prior methods rely on slow iterative optimization that often distorts perceived audio quality and adds latency incompatible with real-time use.

## Method

NaVo guides a latent diffusion-based text-to-audio model with fine-tuned low-rank adaptation modules tailored to gender and acoustic categories (e.g. rain, music, babble), generating high-fidelity, speaker-independent adversarial audio that can be applied through simple audio mixing rather than gradient-based inference.

## Results

NaVo achieves a 76% defense success rate against a widely used commercial voice cloning system in a black-box setting, while supporting real-time protection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time, consumer-facing voice protection tools that guard against unauthorized voice cloning during calls or recordings.

## Related

- (link related pages by id as the wiki grows)
