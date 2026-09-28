---
id: pekarekrosin26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2111
---

# MoDiCoL: A Modular Diagnostic Continual Learning Dataset for Robust Speech Recognition

**TL;DR** — MoDiCoL is a dataset and continual-learning curriculum designed to study, in a controlled way, how ASR robustness to accents, impairments, and noise is acquired, transferred, and forgotten as real-world conditions co-occur and evolve.

## Problem

ASR systems perform well on standard benchmarks but degrade under real-world distribution shift from recording conditions, accents, speech impairments, and noise, and existing datasets typically isolate these factors rather than modeling their real-world co-occurrence.

## Method

The authors introduce MoDiCoL, a Modular Diagnostic Continual Learning dataset for controlled analysis of linguistic content, speaker characteristics, and acoustic environments, paired with a real-world-inspired continual learning curriculum simulating incremental updates, and evaluate three continual learning strategies against it.

## Results

The evaluation gives detailed insight into how ASR robustness is acquired, transferred, and forgotten under evolving, co-occurring real-world conditions, framing robustness as a dynamic capability rather than a static property.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnosing and improving ASR robustness over time as systems are continually updated to handle new accents, impairments, and noise conditions.

## Related

- (link related pages by id as the wiki grows)
