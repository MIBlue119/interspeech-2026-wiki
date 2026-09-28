---
id: chen26ea_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3369
---

# SFL-MTSC: Leveraging Semantic Frame-Level Multi-Task Self-Consistency for Robust Multi-Intent Spoken Language Understanding

**TL;DR** — Instead of majority-voting whole LLM outputs, decomposing multi-intent SLU predictions into semantic frames and clustering them at the slot level gives more reliable results under decoding randomness.

## Problem

Prompt-based spoken language understanding with LLMs often produces inconsistent intent-slot structures because of decoding stochasticity, an issue that is worse in multi-intent scenarios where output-level majority voting breaks down.

## Method

The authors propose SFL-MTSC, a structured aggregation framework that decomposes predictions into intent-specific semantic frames, applies domain-intent grouping and slot-level clustering, scores cluster reliability with a path support score, and re-integrates the reliable frames into the final prediction.

## Results

In zero-shot experiments on the MAC-SLU benchmark, SFL-MTSC improves slot F1 and overall accuracy over single-path inference, while intent accuracy stays largely stable across settings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More reliable multi-intent understanding for voice assistants and conversational agents handling compound user requests.

## Related

- (link related pages by id as the wiki grows)
