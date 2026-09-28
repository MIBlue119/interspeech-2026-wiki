---
id: udupa26_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2196
pdf: https://www.isca-archive.org/interspeech_2026/udupa26_interspeech.pdf
---

# Endpoint Anticipation for Low-Latency Spoken Dialogue

[PDF](https://www.isca-archive.org/interspeech_2026/udupa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/udupa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2196)

**TL;DR** — Endpoint Anticipation shifts spoken dialogue systems from reactive turn completion detection to proactive end-of-turn forecasting, achieving an average latency reduction of 505 ms.

## Problem

Modular, cascaded spoken dialogue systems are bottlenecked by reactive turn-taking mechanisms, forcing downstream ASR, LLM, and TTS pipelines to wait until speech fully stops before executing. This reactive setup creates an artificial processing delay of 1 to 2 seconds, preventing real-time interaction and hindering the integration of complex reasoning or tool-use capabilities. Overcoming this requires forecasting turn completions ahead of time to hide sequential computation latencies.

## Method

The framework processes dual-stream user and system audio using two independent streaming Transformer encoders operating on Mimi neural codec features at 12.5 Hz. It models endpoint anticipation as a set of independent binary classification tasks across multiple anticipation horizons ranging from 320 ms to 2560 ms. Two architectures are introduced: EPA-S, which trains independent models per horizon, and EPA-M, a multi-task variant with a shared dual-stream backbone and horizon-specific output heads. Integration into the Unmute framework uses speculative execution to fork conversation states, pre-generate text and TTS caches during ongoing user speech, and either release or discard the cache based on prediction accuracy.

## Results

Evaluated on SpokenWOZ and Switchboard datasets, the proposed models consistently outperform VAP-based baselines across continuous horizon metrics including Median Realized Anticipation, Horizon Entry Accuracy, and Premature Anticipation Rate. When integrated into the Unmute framework with a Gemma 3 4B LLM, the system achieves an average latency reduction of 505 ms with a 28.4% increase in speculative computation. Across multiple operating points, EPA-S and EPA-M maintain robust performance in balancing latency savings against redundant generation costs.

## Code

- https://github.com/bloodraven66/EndpointAnticipation

## Applications

Real-time spoken dialogue systems, conversational agents, and voice assistants requiring low-latency turn-taking and complex background reasoning.

## Limitations

Early predictions introduce a trade-off resulting in a percentage of discarded speculative computations when users continue speaking past the anticipation window.

## Related

- (link related pages by id as the wiki grows)
