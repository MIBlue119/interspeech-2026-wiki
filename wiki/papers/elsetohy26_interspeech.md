---
id: elsetohy26_interspeech
category: anti-spoofing
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2665
---

# ArFake: A Robust Framework for Multi-Dialect Arabic Speech Spoofing Detection Benchmark

**TL;DR** — ARFAKE is the first end-to-end benchmark for generating and detecting spoofed speech across eight Arabic dialects, reaching 96–97% accuracy in-domain while also testing generalization to unseen dialects.

## Problem

Detecting synthetic speech is increasingly hard, and this is especially true for low-resource Arabic dialects, where data scarcity, complex morphology, and non-standard orthography make both TTS generation and spoofing detection difficult.

## Method

ARFAKE generates spoofed Arabic speech with four TTS models across eight dialects, assesses generated audio quality via classifier-based measures, downstream ASR performance, and human MOS ratings, then curates a mixed bona fide/synthetic corpus to train a spoofing detector evaluated under standard in-domain, Leave-One-Generator-Out (LOGO), and Leave-One-Dialect-Out (LODO) protocols.

## Results

The trained detector achieves 96% and 97% accuracy under in-domain and LOGO evaluation respectively, with additional experiments characterizing how well it generalizes to entirely unseen Arabic dialects under the LODO protocol.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Benchmarking and building Arabic-dialect-aware anti-spoofing systems for voice authentication and media integrity applications across the Arabic-speaking world.

## Related

- (link related pages by id as the wiki grows)
