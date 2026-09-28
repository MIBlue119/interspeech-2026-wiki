---
id: ji26_interspeech
category: source-separation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-190
---

# Automatic Curation of Large-Scale, High-Quality, Multi-Category Music Source Separation Dataset

**TL;DR** — An automated four-step pipeline — fine-grained instrument taxonomy, single-source detectors, web crawling, and automatic cleaning — builds a large, high-quality, multi-category music source separation dataset that measurably improves SOTA model performance.

## Problem

Dataset scale, audio quality, and instrument-category granularity limit music source separation performance, but web-crawled data introduces label noise and instrument mismatches that need cleaning.

## Method

The pipeline (1) designs a fine-grained 7-category instrument taxonomy, (2) trains instrument-specific single-source detectors to find segments containing only the target instrument, (3) retrieves large volumes of raw audio from public platforms via multilingual keyword search, and (4) automatically cleans the raw data using the detectors.

## Results

The detector reaches 97.14% average accuracy across seven instrument categories, and training state-of-the-art separation models on the cleaned data yields an average 1.16 dB SDR improvement on standard benchmarks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Provides a scalable recipe for building better-labeled, larger training data for music source separation and related MIR systems.

## Related

- (link related pages by id as the wiki grows)
