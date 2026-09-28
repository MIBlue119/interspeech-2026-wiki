---
id: joshi26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3272
---

# IndicContextEval: A Benchmark for Evaluating Context Utilisation in Audio Large Language Models Across 8 Indic Languages

**TL;DR** — A new 56-hour, 8-language benchmark that tests whether audio LLMs actually use the contextual prompts they're given (domain notes, entity lists) or just fall back on memorized knowledge.

## Problem

Audio LLMs can take contextual prompts like domain descriptions or entity lists, but it is unclear whether they genuinely use that context or rely on parametric pretraining knowledge, and existing benchmarks can't distinguish the two.

## Method

Introduces IndicContextEval, a 56-hour multilingual benchmark of natural speech from 555 speakers across 8 Indian languages and 23 professional domains, with a 7-level prompting framework that progressively adds contextual signals, including adversarial prompts with incorrect entities.

## Results

Evaluating five models reveals substantial differences in how well they actually utilize provided context, highlighting a gap current benchmarks fail to expose.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnosing and improving context-grounding for multilingual voice assistants and domain-adapted speech recognition in Indic languages.

## Related

- (link related pages by id as the wiki grows)
