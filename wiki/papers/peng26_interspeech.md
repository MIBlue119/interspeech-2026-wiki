---
id: peng26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-401
---

# Do Machines Listen Like Humans? A Temporal Benchmark for Phonological Competition in End-to-End ASR

**TL;DR** — Comparing ASR internal activation trajectories to human eyetracking data shows causal ASR models replicate the human pattern of early onset-competitor activation, while look-ahead models fail to show this human-like timing.

## Problem

Human speech perception is incremental, with listeners activating and suppressing candidate words in real time, and while some researchers treat modern ASR models as models of human speech recognition, it was unclear whether ASR models actually process speech with human-like incremental timing dynamics.

## Method

The authors propose a benchmark that quantitatively compares the time course of human speech recognition and ASR by point-wise comparison of internal model activation trajectories against human eyetracking data, defining metrics to trace word activation profiles across architectures.

## Results

Causal ASR models successfully replicate the hallmark human pattern of early onset-competitor activation and later, weaker rhyme competition, whereas non-causal models with look-ahead mechanisms fail to capture these temporal dynamics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides the choice of ASR architecture (causal vs. non-causal) for applications treating ASR as a cognitive model of human speech perception, and cautions against over-interpreting non-causal ASR as human-like.

## Related

- (link related pages by id as the wiki grows)
