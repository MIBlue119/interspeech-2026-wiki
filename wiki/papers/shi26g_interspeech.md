---
id: shi26g_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3135
---

# Speech Codec Probing from Semantic and Phonetic Perspectives

**TL;DR** — Probing widely used speech tokenizers shows the "semantic" information they claim to encode is mostly phonetic, not lexical-semantic like text — a mismatch that matters for designing speech tokens meant to connect to LLMs.

## Problem

Speech tokenizers are meant to connect speech to LLMs while preserving both semantic and acoustic information, but emerging evidence suggests the term "semantic" in speech processing doesn't actually align with linguistic lexical-semantic meaning, creating a mismatch between speech and text modalities.

## Method

The authors systematically analyze the information encoded by several widely used speech tokenizers, evaluating their lexical-semantic and phonetic content through three probing tasks.

## Results

Current speech tokenizers primarily capture phonetic rather than lexical-semantic structure, with practical implications for designing next-generation speech tokenization methods.

## Code

Code reported as released at https://github.com/Alexuan/codec_probing_release — unverified by this wiki as of the `updated` date; please confirm and update this entry if you can.

## Applications

Guides the design of speech tokenizers/codecs used as inputs to speech LLMs, especially for tasks needing true lexical-semantic (not just phonetic) grounding.

## Related

- (link related pages by id as the wiki grows)
