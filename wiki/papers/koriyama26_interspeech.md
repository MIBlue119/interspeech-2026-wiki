---
id: koriyama26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1800
---

# Benchmarking Large Language Models for Grapheme-to-Phoneme Conversion: A Japanese Case Study

**TL;DR** — Benchmarks over 30 LLMs on Japanese grapheme-to-phoneme conversion, finding the best LLMs beat conventional morphological analyzers and that piping LLM-predicted kana into TTS improves pronunciation over end-to-end synthesis.

## Problem

Grapheme-to-phoneme conversion is essential for controllable, robust Japanese TTS, and it was unclear how well general-purpose LLMs perform on this task compared to conventional rule-based morphological analyzers.

## Method

The authors benchmark over 30 LLMs against conventional tools on 3,000 manually annotated Japanese sentences, comparing a 'parse mode' (LLM does morphological analysis, then rule-based kana conversion) against a 'direct mode' (LLM predicts kana readings directly).

## Results

The best LLMs reach a kana character error rate below 0.52%, beating the best conventional tool's 1.03%; parse mode outperforms direct mode for most models, and feeding LLM-predicted kana into a kana-input TTS yields better pronunciation than end-to-end TTS.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving pronunciation accuracy in Japanese TTS front-ends and text-normalization pipelines by using LLMs for grapheme-to-phoneme conversion.

## Related

- (link related pages by id as the wiki grows)
