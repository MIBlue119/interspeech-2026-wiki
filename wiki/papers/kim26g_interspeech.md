---
id: kim26g_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-817
---

# Latency-Configurable Streaming Speech Enhancement via Asymmetric Temporal Padding

**TL;DR** — A single speech-enhancement model that lets you dial the algorithmic latency anywhere from 12.5 ms to 75 ms with one hyperparameter, matching prior fully-causal state-of-the-art at the lowest setting.

## Problem

Streaming speech enhancement has to trade algorithmic latency against quality, but prior work treats this as a binary causal-versus-non-causal choice rather than a tunable spectrum.

## Method

LaCo-SENet uses asymmetric temporal padding to redistribute past and future context in convolutions for systematic latency configuration, plus dual-buffer streaming (state buffers for past context and lookahead buffers for future context) with selective state updates to prevent future-frame leakage.

## Results

On VoiceBank+DEMAND, a fixed 1.37M-parameter backbone yields a family of models spanning 12.5-75.0 ms latency with PESQ rising from 3.35 to 3.43; at just 12.5 ms fully causal, PESQ of 3.35 matches or exceeds prior causal state-of-the-art (3.27 at 46.5 ms).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time communication and hearing-assistance devices that need adjustable latency-quality trade-offs from a single deployed model.

## Related

- (link related pages by id as the wiki grows)
