---
id: ulgen26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-942
---

# Rethinking Speaker Embeddings for Speech Generation: Sub-Center Modeling for Capturing Intra-Speaker Diversity

**TL;DR** — Learning multiple sub-center prototypes per speaker instead of one compact center preserves useful within-speaker vocal variation for speech generation, improving zero-shot voice conversion naturalness and pitch variability without hurting speaker recognition performance.

## Problem

Speaker embeddings used to condition personalized speech generation are typically trained for speaker recognition, an objective that suppresses intra-speaker variability and can discard vocal variation that generation tasks actually need for naturalness.

## Method

The authors propose a sub-center modeling framework where multiple sub-centers are learned per speaker during discriminative training, letting utterances align with different prototypes instead of a single compact one, preserving structured intra-speaker variability while keeping speakers discriminable.

## Results

In zero-shot voice conversion, the sub-center approach improves intelligibility, increases pitch variability, achieves higher naturalness ratings, and retains strong speaker verification performance versus standard single-center embeddings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More expressive and natural zero-shot voice conversion and personalized TTS systems that condition on speaker embeddings.

## Related

- (link related pages by id as the wiki grows)
