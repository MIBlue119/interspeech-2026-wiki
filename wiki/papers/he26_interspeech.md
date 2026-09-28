---
id: he26_interspeech
category: audio-captioning
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-602
---

# TTBA: Spatial Prompted Text to Binaural Audio Generation Using Transformer

**TL;DR** — A text-to-audio model that generates directionally controllable binaural (spatial) audio, not just flat mono or stereo, from a text prompt plus an explicit spatial cue.

## Problem

Text-to-audio models generate high-fidelity sound but struggle to produce binaural audio with accurate directional control and spatial perception, which matters for immersive VR, gaming, and creative content.

## Method

TTBA combines a cross-arranged discrete audio representation with a transformer autoregressive backbone, plus a spatial prompt encoder fused with text features to guide binaural token generation, using a monaural generation model as guidance for content accuracy.

## Results

On the BEWO-1M dataset, TTBA generates binaural audio with spatial awareness and controllable directionality.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Immersive audio generation for VR/AR, games, and spatial content production.

## Related

- (link related pages by id as the wiki grows)
