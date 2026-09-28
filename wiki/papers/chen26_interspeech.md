---
id: chen26_interspeech
category: speech-translation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-42
---

# MoVE: Translating Laughter and Tears via Mixture of Vocalization Experts in Speech-to-Speech Translation

**TL;DR** — A mixture-of-LoRA-experts architecture that lets speech-to-speech translation preserve laughter, crying, and other emotional vocalizations that current systems typically strip out.

## Problem

Speech-to-speech translation systems translate meaning accurately but discard non-verbal vocalizations like laughter and crying, losing pragmatic and emotional intent that matters for real-world use.

## Method

The authors build a synthesis pipeline to generate scalable expressive training data, introduce MoVE, a mixture of expressive-specialized LoRA adapters with a soft-weighting router that blends experts for hybrid expressive states, and show pretrained AudioLLMs need only about 30 minutes of curated data to adapt well.

## Results

On English-Chinese speech-to-speech translation, MoVE reproduces target non-verbal vocalizations in 76% of cases and earns the highest human-rated naturalness and emotional fidelity, versus at most 14% vocalization preservation for existing systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Emotionally faithful speech-to-speech translation and dubbing, where laughter, crying, and similar cues carry meaning that plain semantic translation would erase.

## Related

- (link related pages by id as the wiki grows)
