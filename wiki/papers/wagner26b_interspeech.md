---
id: wagner26b_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2817
---

# Content is What Remains: Invariant Speech Tokenization from Parallel Utterances

**TL;DR** — Fine-tuning an SSL encoder to align parallel utterances of the same words spoken by different speakers strips out speaker, prosody, and channel variation, nearly eliminating speaker leakage from discrete speech tokens.

## Problem

Discrete speech tokenizers aim to disentangle semantic from acoustic content, but SSL targets like HuBERT retain non-linguistic variation — speaker identity, prosody, channel conditions — that leaks into tokens and inflates entropy.

## Method

The authors propose PINT (Parallel INvariant Tokenization), fine-tuning an SSL encoder with alignment losses across parallel utterances and augmentations, exploiting the insight that when many speakers say the same words under varying conditions, linguistic content is the only shared factor, so alignment distills out that shared residual while preserving frame-level temporal grounding.

## Results

PINT collapses identical words onto consistent token sequences, giving a 98.7% relative reduction in speaker-probe accuracy (93.1% to 1.2%), a 42% lower ABX error rate, and 27-30% lower language-model perplexity versus baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Semantic speech tokenization for LLM-based speech generation/understanding pipelines and audio codecs that need drop-in, speaker-invariant semantic targets.

## Related

- (link related pages by id as the wiki grows)
