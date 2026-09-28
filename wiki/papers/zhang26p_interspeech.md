---
id: zhang26p_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1187
---

# MultiAPI Spoof: A Multi-API Dataset and Local-Attention Network for Speech Anti-spoofing Detection

**TL;DR** — MultiAPI Spoof is a 230-hour anti-spoofing dataset built from 30 different commercial, open-source, and online synthesis APIs, paired with a local-attention detection model and a new task for tracing spoofed audio back to its source API.

## Problem

Existing speech anti-spoofing benchmarks rely on a narrow set of public synthesis models, leaving a substantial gap from real-world conditions where commercial systems use diverse, often proprietary APIs.

## Method

The authors introduce Multi-API Spoof, comprising about 230 hours of synthetic speech from 30 distinct APIs spanning commercial services, open-source models, and online platforms, and propose Nes2Net-LA, a local-attention-enhanced variant of Nes2Net for better local context modeling and fine-grained spoofing feature extraction, plus a new API tracing task for attributing spoofed audio to its source.

## Results

Nes2Net-LA achieves state-of-the-art performance on the new dataset and offers superior robustness, particularly under diverse and unseen spoofing conditions; code and dataset are released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building anti-spoofing systems robust to the wide variety of commercial and open-source voice synthesis tools actually seen in the wild, and attributing spoofed audio to its generator.

## Related

- (link related pages by id as the wiki grows)
