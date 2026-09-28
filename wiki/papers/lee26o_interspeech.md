---
id: lee26o_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1684
---

# A Sensitivity Analysis of Multi-Event Audio Grounding in Audio LLMs

**TL;DR** — A 500K-query, large-scale test finds that Audio LLMs get steadily less reliable — more missed detections, more false alarms — as the number of overlapping sound events in a clip increases.

## Problem

Audio LLMs show strong ability to understand audio samples, but their reliability in complex, multi-event acoustic scenes is under-explored, and prior evaluations were limited in scale or query construction.

## Method

Using 71K AudioCapsV2 clips, the authors extract normalized (source, attribute) events and build present-event queries (to check ground-truth detection) and absent-event queries (to probe hallucination) via similarity-filtered negative sampling in an audio-aligned text embedding space, then evaluate four state-of-the-art Audio LLMs with 12 prompt variants over 500K yes/no queries per model.

## Results

Across models, increasing event count consistently lowers true-positive rate and raises false-positive rate, prompts induce a strong trade-off between the two, and model confidence analysis shows increasing uncertainty as audio scenes get more complex.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides more rigorous stress-testing and reliability evaluation of Audio LLMs before deployment in complex, multi-sound-event environments (e.g. surveillance, smart home).

## Related

- (link related pages by id as the wiki grows)
