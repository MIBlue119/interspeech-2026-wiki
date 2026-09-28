---
id: lin26i_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1739
---

# RAISE: Resolving Ambiguity in Audio Understanding with Imagination and Selective Extraction

**TL;DR** — Without any retraining, giving an Audio LLM two "listening strategies" — isolating the target sound and imagining candidate references to compare against — cuts hallucination and boosts accuracy by up to 12.4%.

## Problem

Audio LLMs are prone to perceptual hallucination under acoustic interference or fine-grained ambiguity, and even state-of-the-art reasoning models hallucinate when forced to decode ambiguous internal representations without active verification.

## Method

The authors introduce RAISE, a training-free framework equipping Audio LLMs with two cognitively motivated strategies: Selective Extraction, which isolates target signals from noise, and Auditory Imagination, which synthesizes candidate references for comparative reasoning, so predictions are grounded in explicit acoustic evidence instead of ambiguous internal states.

## Results

On the MMAR and MMAU benchmarks, RAISE delivers consistent gains of up to 12.4% without any parameter updates.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Drop-in, training-free reliability improvement for deployed Audio LLMs facing noisy or ambiguous real-world audio.

## Related

- (link related pages by id as the wiki grows)
