---
id: yang26f_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-821
---

# Geometry-Informed Distributed Acoustic Scene Understanding

**TL;DR** — A distributed multi-room acoustic scene understanding system fuses spatio-temporal audio features across several microphones with a frozen LLM and room geometry, letting it infer plausible missing events and generate a physically consistent narrative even when walls block sound.

## Problem

Acoustic scene understanding in multi-room environments is hard for single centralized microphone-array systems because walls and doors block sound, causing them to miss events happening in other rooms.

## Method

The proposed geometry-informed distributed framework uses distributed microphones with an audio spectrogram transformer and a topology-aware graph neural network to fuse spatio-temporal acoustic features, decodes these into discrete semantic triplets, and combines them with environmental geometry via a frozen large language model to perform spatial reasoning and narrative generation.

## Results

On a custom multi-room simulator, the framework outperforms centralized baselines and improves spatial consistency under simulated occlusion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart building and ambient monitoring systems that need to understand and narrate activity across multiple rooms despite acoustic occlusion.

## Related

- (link related pages by id as the wiki grows)
