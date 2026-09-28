---
id: quamer26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2741
---

# Privacy and quality trade-off in real-time speaker anonymization via editing of age and sex attributes

**TL;DR** — A systematic analysis of a streaming speaker-anonymization system showing privacy degrades faster than quality as age/sex attribute edits increase, revealing a moderate-edit "sweet spot" for anonymization.

## Problem

Speaker anonymization hides identity by modifying speech attributes, but these modifications often degrade synthesized speech quality, and the precise privacy-quality trade-off for specific attributes was unclear.

## Method

Isolates two key attributes, age and sex, in a streaming speech synthesis system, using speaker cosine similarity (privacy proxy) and DNS-MOS (quality proxy) with linear regression to quantify how attribute shifts affect privacy and quality, validated with perceptual listening tests.

## Results

Privacy degrades faster than quality as attribute modifications increase, revealing an optimal anonymization region where moderate changes achieve effective identity suppression with minimal naturalness loss.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Practical tuning guidance for real-time, attribute-based speaker anonymization systems balancing privacy and speech quality.

## Related

- (link related pages by id as the wiki grows)
