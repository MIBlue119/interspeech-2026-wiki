---
id: hu26g_interspeech
category: singing-voice
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2090
---

# Singing Voice Conversion via Shared Speaker Space and Min-Pooling Adversarially Enhanced Flow Matching

**TL;DR** — A singing voice conversion method that maps singers into a shared feature space via KNN and adds a min-pooling adversarial training step to fix the inconsistencies that introduces, improving naturalness and timbre similarity.

## Problem

Singing voice conversion has to trade off disentangling singer identity from content against maintaining singing quality, and prior disentanglement approaches can introduce feature inconsistencies that hurt generation quality.

## Method

MinFlow-SVC uses a KNN-based approach to project source singer features into a shared singer space (removing source timbre while keeping pitch, phonetic, and expressive content), then applies a min-pooling adversarial training strategy on top of conditional flow matching to detect and correct KNN-induced inconsistencies with harmonic awareness.

## Results

MinFlow-SVC outperforms existing state-of-the-art singing voice conversion baselines on naturalness, intelligibility, timbre similarity, and singing stability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Singing voice conversion for music production, karaoke/cover generation, and singer-identity transfer tools.

## Related

- (link related pages by id as the wiki grows)
