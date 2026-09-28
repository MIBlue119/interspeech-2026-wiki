---
id: lopez26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2503
---

# Robustness Assessment of Large Audio Language Models in Multiple-choice Evaluation

**TL;DR** — A systematic study across four audio-LLMs and three benchmarks shows multiple-choice audio evaluation scores are inflated by language bias and are sensitive to choice ordering and paraphrasing, not just audio understanding.

## Problem

Large audio language models (LALMs) are mainly assessed with multiple-choice question answering, but subtle changes like reordering choices give very different results, and textual questions/options often carry linguistic hints letting models answer correctly without using the audio at all; existing MCQA frameworks ignore this and report just one accuracy number.

## Method

The authors conduct a systematic study across three benchmarks (MMAU, MMAR, MMSU) and four models (Audio Flamingo 2, Audio Flamingo 3, Qwen2.5-Omni-7B-Instruct, Kimi-Audio-7B-Instruct), probing sensitivity to choice ordering, language bias, and paraphrasing, and propose a simpler evaluation protocol and metric to account for these variations.

## Results

Language bias is present across all tested benchmarks, and models are sensitive not just to choice ordering but also to paraphrasing of questions and options, motivating a more detailed evaluation protocol.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More reliable benchmarking practice for researchers and practitioners evaluating large audio language models via multiple-choice tests.

## Related

- (link related pages by id as the wiki grows)
