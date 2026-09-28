---
id: ye26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-21
---

# Which Speech Representation Better Matches Text-Native Reasoning? A Study of Speech-Text Alignment on Frame Rate and Representation

**TL;DR** — Sweeping speech token frame rate down to about 4.17Hz with a factorized FSQ tokenizer and intermediate-layer alignment finds a clear sweet spot where spoken-dialogue reasoning best matches a frozen text LLM's native reasoning dynamics.

## Problem

Spoken dialogue models built on text LLM backbones often reason worse when conditioned on speech than on text, and the authors attribute part of this gap to a temporal-granularity mismatch: speech tokens are far longer and more temporally redundant than text under matched meaning, diluting semantic density per token.

## Method

The authors treat speech token design as a representation-selection problem, sweeping frame rates under a frozen LLM backbone with fixed information rate, and introduce factorized FSQ plus a lightweight non-autoregressive audio LM head to make very low frame rates (down to 2.08Hz) feasible while scaling capacity to nearly 300 bits/frame.

## Results

With the bottleneck removed, sweeping frame rate from 50Hz down to 2.08Hz along with alignment depth reveals a consistent best regime for speech QA at 4.17Hz using intermediate-layer representation alignment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Designing speech tokenizers for spoken dialogue and speech-LLM systems that need reasoning quality close to native text-LLM performance.

## Related

- (link related pages by id as the wiki grows)
