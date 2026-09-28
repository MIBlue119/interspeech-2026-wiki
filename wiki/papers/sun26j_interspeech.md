---
id: sun26j_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3344
---

# MSU-Bench: Towards Understanding the Conversational Multi-Speaker Scenarios

**TL;DR** — MSU-Bench is a diagnostic benchmark of 16 speaker-centric tasks and 2,300 QA instances for evaluating multi-speaker conversational understanding in large audio language models, revealing that even leading closed-source systems still struggle with complex speaker grounding and reasoning.

## Problem

Spoken Language Understanding is moving from task-specific pipelines toward large audio language models that generate natural-language responses, but existing speech benchmarks mainly cover single-speaker settings or isolated subtasks, leaving realistic multi-speaker conversational understanding under-evaluated.

## Method

MSU-Bench covers 16 speaker-centric tasks and 2,300 QA instances in a two-tier framework spanning speaker grounding to dialogue reasoning, built via a Gemini-assisted annotation and QA generation pipeline with human-in-the-loop verification, and analyzes speaker-referencing schemes and diagnostic error types.

## Results

The benchmark achieves high QA validity and strong human-verified label agreement, revealing clear gaps across model families, with closed-source systems leading overall but all models still facing challenges in complex speaker grounding and multi-speaker reasoning; annotations, metadata, and evaluation scripts are released on GitHub.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

A diagnostic tool for developers building multi-speaker-aware conversational AI assistants (e.g. for meeting summarization or multi-party call analysis) to identify current model weaknesses.

## Related

- (link related pages by id as the wiki grows)
