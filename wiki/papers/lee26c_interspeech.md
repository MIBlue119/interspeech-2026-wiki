---
id: lee26c_interspeech
category: speech-translation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-540
---

# NaturalFlow: Reducing Disruptive Pauses for Natural Speech Flow in Simultaneous Speech-to-Speech Translation

**TL;DR** — A fluency-aware framework finds the sweet spot between low-latency simultaneous translation and the natural, pause-free flow of consecutive translation.

## Problem

Simultaneous speech-to-speech translation minimizes latency for near-real-time communication, but pushing latency too low fragments the output into disjointed chunks with frequent pauses, increasing listener cognitive load.

## Method

NaturalFlow is a fluency-aware optimization framework that minimizes inter-chunk silences by leveraging model-internal signals, including linguistic diversity and induced temporal variability in speech durations, to balance low latency against natural flow.

## Results

On short- and long-form benchmarks, the framework produces more natural speech flow while maintaining competitive latency and translation quality compared to standard simultaneous translation approaches.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech-to-speech translation systems (live interpretation, video conferencing) where listener comfort and natural pacing matter alongside latency.

## Related

- (link related pages by id as the wiki grows)
