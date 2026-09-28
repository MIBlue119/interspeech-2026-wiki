---
id: tao26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-927
---

# ANCHOR: Autoregressive Non-intrusive Chunk-Ordered Refinement for Joint Multi-Resolution Speech Quality Modeling

**TL;DR** — Reformulating speech-quality prediction as a multi-resolution autoregressive task lets a single decoder estimate quality from partial (streamed) audio, cutting error by 48% on 2-second prefixes versus prior full-context predictors.

## Problem

Speech quality is typically assessed on complete utterances, but streaming and generative systems need incremental quality estimation from partial audio, and existing predictors assume full context and degrade on prefix-constrained inputs.

## Method

Extending ARECHO, the authors propose ANCHOR, which reformulates incremental quality assessment as a multi-resolution autoregressive task, modeling chunk- and utterance-level quality within a single decoder using dual-resolution tokens and a resolution-aware hierarchy for coarse-to-fine refinement.

## Results

ANCHOR shows substantial robustness under partial input, including a 48% PLCMOS error reduction on 2-second prefixes; convergence analysis reveals a 4-6 second effective perceptual context horizon, and a stress test isolates structured extrapolation biases under localized corruption.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time, incremental speech-quality monitoring for streaming TTS, voice chat, and live speech-enhancement systems.

## Related

- (link related pages by id as the wiki grows)
