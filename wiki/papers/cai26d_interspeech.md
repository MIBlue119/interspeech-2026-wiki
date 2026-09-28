---
id: cai26d_interspeech
category: dataset
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2350
---

# Towards Event-Robust Acoustic Scene Classification

**TL;DR** — ESAS is a new benchmark that injects LLM-selected foreground sound events into background scenes, exposing sharp performance drops in state-of-the-art acoustic scene classifiers when unexpected sounds appear.

## Problem

Existing acoustic scene classification (ASC) datasets mostly contain clean, consistent recordings, but real environments are full of unexpected foreground sounds, and it is unclear how robust current ASC systems are to this "event shift."

## Method

The authors build the Event-Shifted Acoustic Scene (ESAS) dataset by using large language models to select and inject plausible foreground sound events into existing background scene recordings, then define construction methodology, statistics, and evaluation protocols for the benchmark.

## Results

A comprehensive evaluation of state-of-the-art ASC systems on ESAS shows significant performance degradation when facing event-shift conditions compared to standard clean benchmarks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Benchmarking and developing acoustic scene classifiers intended for real-world deployment (e.g., smart devices, environmental monitoring) where unpredictable foreground sounds are common.

## Related

- (link related pages by id as the wiki grows)
