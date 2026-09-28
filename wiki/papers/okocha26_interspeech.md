---
id: okocha26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2909
---

# Reasoning Beyond Transcription: Audio Language Models on Child Stuttering Speech

**TL;DR** — Tests whether audio-language models can semantically reason about stuttered child speech in mixed-speaker recordings, finding their reasoning degrades sharply as disfluency and adult-speaker interference increase.

## Problem

Audio-language models show strong semantic reasoning from speech, but their ability to reason about disfluent child speech mixed with adult speakers — relevant for clinical and educational settings — remains unexplored.

## Method

Evaluates Audio-Language Models on two tasks, child-focused semantic summarization and speech entailment, using recordings of children who stutter in mixed-speaker interviews without explicit speaker separation, with models instructed to focus on the child, preserve clinically relevant disfluencies, and avoid adult-speech leakage; evaluation combines LLM-based judges and reference-based metrics anchored by transcript-oracle baselines.

## Results

ALMs can extract high-level meaning from stuttered child speech, but reasoning quality degrades significantly as disfluency and speaker interference increase.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical and educational tools that need to reason about disfluent child speech, such as stuttering assessment or speech-language therapy support.

## Related

- (link related pages by id as the wiki grows)
