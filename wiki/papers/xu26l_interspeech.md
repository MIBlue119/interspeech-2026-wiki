---
id: xu26l_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1173
---

# Audio-Language Prompt Learning for Few-Shot Audio Classification

**TL;DR** — Learning separate audio-specific, text-specific, and shared prompts — instead of only text prompts — lets audio-language models adapt better with few examples, beating CoOp by 7.21% and CoCoOp by 4.80% on average.

## Problem

Audio-language models generalize well on standard audio classification, but their few-shot adaptation is constrained by text-centric prompt learning, which under-adapts the audio encoder and struggles to distinguish acoustically similar classes, leading to imbalanced optimization across modalities.

## Method

The authors propose MALP, a multi-modal prompt learning framework that jointly optimizes audio-specific, text-specific, and shared prompts: modality-specific prompts first capture complementary audio/text characteristics, then shared prompts strengthen cross-modal alignment while preserving modality-specific discriminability.

## Results

Across eleven benchmark datasets, MALP achieves consistent improvements over strong baselines, with average gains of 7.21% over CoOp, 4.80% over CoCoOp, and 1.77% over PALM; ablations confirm both audio-specific and shared prompts contribute.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Few-shot audio classification for new sound categories with limited labeled examples, e.g. custom event detection or niche acoustic monitoring.

## Related

- (link related pages by id as the wiki grows)
