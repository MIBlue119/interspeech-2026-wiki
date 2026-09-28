---
id: lu26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-998
---

# PolyBench: Benchmarking LLM-based TTS Systems for Chinese Polyphone Disambiguation

**TL;DR** — PolyBench is a new benchmark covering 494 polyphonic characters and 88 polyphonic words across categories, revealing that even the best of 17 tested LLM-TTS systems only reaches 82.02% pronunciation accuracy on Chinese polyphones, with sizable gaps in dialectal and literary categories.

## Problem

LLM-based TTS systems have advanced rapidly, but their ability to correctly disambiguate Chinese polyphonic characters (characters with multiple pronunciations depending on context) had not been systematically evaluated.

## Method

The authors construct PolyBench, three test sets covering 494 polyphonic characters and 88 polyphonic words across diverse categories, explore automatic pronunciation labeling using Large Audio Language Models, and benchmark 17 open-source LLM-TTS systems.

## Results

Even the best system achieves only 82.02% pronunciation accuracy on polyphonic characters, with significant performance gaps in dialectal, colloquial, and literary categories.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Gives TTS developers a targeted benchmark for improving Chinese pronunciation correctness, particularly for dialect-sensitive and stylistically varied text.

## Related

- (link related pages by id as the wiki grows)
