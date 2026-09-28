---
id: xue26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-105
---

# Imperceptible Voiceprint Protection via Human-Machine Perception Discrepancy Feature Disentanglement

**TL;DR** — Injecting adversarial perturbation into a disentangled speaker-embedding space, where machines are sensitive but humans are not, achieves an 87.2% defense success rate against unauthorized voice cloning while keeping audio quality high (MOS 4.18) and transferring well to unseen black-box cloning systems.

## Problem

Zero-shot voice cloning models make unauthorized speaker impersonation easy, and adversarial-perturbation defenses face a fundamental tradeoff: strong perturbations introduce audible artifacts while imperceptible ones may not transfer robustly to unseen cloning systems.

## Method

The authors exploit the human-machine perception discrepancy with a two-stage framework: first training a disentanglement network to separate content and speaker information, then injecting perturbations specifically into the speaker embedding space where machines are sensitive but humans are not.

## Results

The approach achieves an 87.2% defense success rate, surpassing state-of-the-art embedding-level defenses by 7%, while maintaining a high MOS of 4.18 and demonstrating strong transferability to black-box voice cloning systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

A practical technique for protecting individuals' voices from unauthorized cloning while the protected audio remains natural-sounding for legitimate listeners.

## Related

- (link related pages by id as the wiki grows)
