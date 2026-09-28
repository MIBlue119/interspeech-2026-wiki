---
id: munyampirwa26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1375
---

# Contextual Earnings-22: A Speech Recognition Benchmark with Custom Vocabulary in the Wild

**TL;DR** — Contextual Earnings-22 is a new open benchmark built on Earnings-22 with realistic custom-vocabulary contexts, designed to reveal ASR progress on rare/context-defined terms that academic benchmarks dominated by common vocabulary can no longer distinguish.

## Problem

Speech-to-text accuracy has plateaued on academic benchmarks, yet industrial benchmarks and high-stakes adoption suggest real progress continues, and the authors hypothesize the gap is contextual conditioning: rare, custom vocabulary has outsized impact on transcript usability but lacks a standardized benchmark.

## Method

The authors introduce Contextual Earnings-22, an open dataset built on Earnings-22 with realistic custom-vocabulary contexts, and establish six strong baselines across two dominant contextual-ASR approaches: keyword prompting and keyword boosting.

## Results

Experiments show comparable and significantly improved accuracy when scaling from proof-of-concept to commercial-scale systems, fostering research into contextual speech-to-text and revealing latent progress hidden by generic benchmarks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for evaluating and improving ASR systems in domains like finance/earnings calls that are rich in specialized custom vocabulary (tickers, company names, jargon).

## Related

- (link related pages by id as the wiki grows)
