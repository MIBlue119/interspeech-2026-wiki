---
id: wang26ca_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2069
---

# FreqGuard: Leveraging Frequency-Domain Feature Priors for Universal Proactive Voice Defense

**TL;DR** — A proactive voice-cloning defense that adds imperceptible, frequency-domain-crafted perturbations to speech, degrading black-box voice synthesis attacks while keeping the protected audio sounding normal.

## Problem

Rapidly advancing voice deepfakes threaten privacy and security, and a proactive defense needs to disrupt malicious speech synthesis attacks without degrading perceived audio quality.

## Method

FreqGuard uses learnable frequency-domain feature priors, rather than random noise, to generate imperceptible perturbations that degrade speaker embeddings while minimizing perceptual distortion, training the model to target the shared subspace between verification and synthesized features via jointly optimized losses.

## Results

Reduces attack success rates against black-box TTS voice cloning systems while preserving speech quality, achieving favorable cross-model generalization and perceptual quality compared with existing defenses.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Proactive protection of a person's voice recordings against unauthorized voice cloning before they are ever posted online.

## Related

- (link related pages by id as the wiki grows)
