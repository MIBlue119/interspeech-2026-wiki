---
id: anand26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3015
---

# ParA-LLM: A Unified Approach to Paralinguistic and Acoustic Speech Understanding

**TL;DR** — A speech-LLM training recipe and benchmark that pushes audio models beyond transcription to jointly reason about speaker traits, expressive style, and acoustic conditions.

## Problem

Audio LLMs transcribe speech at near-human levels but poorly capture paralinguistic information like speaker traits, expressive variation, and environmental acoustics; frontier models score far below human level on a new paralinguistic benchmark.

## Method

Defines a framework of 22 paralinguistic features, builds a 1.2M-pair audio-QA dataset, and trains ParA-LLM with a two-stage curriculum — first single-attribute questions to build foundational knowledge, then multi-attribute questions for joint reasoning.

## Results

ParA-LLM beats prior audio LLMs by 7.5% on the new ParA-Bench (6,000 multiple-choice questions where GPT-4o-Audio only reaches 36%), with additional gains on MMAU-Pro Speech and MMAR Speech.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice assistants and call-center analytics that need to reason jointly about who is speaking, how they're speaking, and in what acoustic environment.

## Related

- (link related pages by id as the wiki grows)
