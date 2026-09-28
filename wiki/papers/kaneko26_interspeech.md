---
id: kaneko26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1596
---

# MeanVoiceFlow2: Joint Optimization of Mean Flow and Content Encoder for Fast One-Step Zero-Shot Voice Conversion

**TL;DR** — MeanVoiceFlow2 jointly optimizes a one-step flow-matching converter with an efficient content encoder, achieving about 9x faster inference than its predecessor while keeping comparable speaker similarity.

## Problem

One-step flow-matching voice conversion models like MeanVoiceFlow are attractive for fast inference, but their reliance on a computationally intensive content encoder remains a bottleneck to full efficiency.

## Method

MeanVoiceFlow2 jointly optimizes a flow-based conversion module together with a computationally efficient content encoder, trained via conversion distillation from MeanVoiceFlow plus reconstruction of real data, and further adds diffusion-GAN training with sample mixing and teacher-guided conditioning augmentation to improve realism and disentanglement.

## Results

On zero-shot voice conversion, MeanVoiceFlow2 achieves higher perceptual quality and roughly 9x faster inference than MeanVoiceFlow, while maintaining comparable speaker similarity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time and low-latency zero-shot voice conversion for applications like live dubbing, gaming, and interactive voice assistants.

## Related

- (link related pages by id as the wiki grows)
