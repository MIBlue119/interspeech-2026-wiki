---
id: kang26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3192
---

# Beyond Short Segments: Expanding Speaker Embeddings with Vector Archives

**TL;DR** — A speaker-verification module that maps information-scarce short-utterance features against a learnable archive of canonical speaker traits, cutting error on 1-second clips by more than half.

## Problem

State-of-the-art speaker verification systems degrade severely on short utterances because there isn't enough speaker-specific information in a brief clip.

## Method

Proposes VAM-ECAPA, built around a Transformer-based Vector Archive Mapping with Statistical Pooling (TVAMSP) module that enriches sparse short-segment features by mapping them against a learnable archive of canonical speaker traits, integrated into a WavLM+ECAPA-TDNN baseline.

## Results

On VoxCeleb1, VAM-ECAPA reaches 8.334% EER on 1-second test segments, a 54.8% relative error reduction versus a conventionally trained baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice authentication and speaker ID systems that must work reliably from very short audio snippets, such as smart-speaker wake interactions.

## Related

- (link related pages by id as the wiki grows)
