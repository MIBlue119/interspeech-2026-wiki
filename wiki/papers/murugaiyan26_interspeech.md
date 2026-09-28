---
id: murugaiyan26_interspeech
category: prosody
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3236
---

# WhiSSDapt: Adaptive Fusion of Whisper Layer Embeddings for Sentence Stress Detection

**TL;DR** — A weighted-layer-fusion method over Whisper's encoder and decoder that learns which layers carry the most useful prosodic information for detecting stressed words in a sentence.

## Problem

Automatic sentence stress detection needs to model context-dependent, relative word prominence, but prior work uses a single fixed layer of pretrained models like Whisper, which doesn't optimally capture prosodic cues spread across different layers.

## Method

WhiSSDapt learns an optimal weighted combination of Whisper encoder and decoder layer representations for sentence stress detection.

## Results

Improves sentence stress detection by up to 4.48% on naturally spoken and 6.09% on synthetic datasets compared to single fixed-layer baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Human-computer interaction systems and language-learning tools that need to detect prosodic emphasis in spoken utterances.

## Related

- (link related pages by id as the wiki grows)
