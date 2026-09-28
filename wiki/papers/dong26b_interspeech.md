---
id: dong26b_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-966
---

# English Vowel Perceptual Training under Multitalker Babble: A Comparison of Humans and Large Language Models

**TL;DR** — A speech LLM (Qwen2.5-Omni-7B) tracks human L2-listener perceptual-training trends more closely than Whisper or Wav2Vec2, suggesting it could serve as a cheaper proxy for costly human studies.

## Problem

Running human perceptual-training experiments to find the optimal number of babble talkers for second-language (L2) listener training is time-consuming and costly, motivating a search for computational proxies for L2 listeners.

## Method

Extending prior Wav2Vec2-based comparisons, the authors test multilingual Whisper and a speech LLM (Qwen2.5-Omni-7B) on the same multitalker-babble vowel perceptual-training paradigm previously used with human L2 listeners, comparing model behavior to human results.

## Results

The speech LLM not only improves accuracy from babble training but shows trends more similar to L2 listeners than Whisper or Wav2Vec2, and achieves accuracy closer to humans under speech-shaped noise conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Using speech LLMs as low-cost computational proxies to pilot-test L2 perceptual-training study designs before running expensive human experiments.

## Related

- (link related pages by id as the wiki grows)
