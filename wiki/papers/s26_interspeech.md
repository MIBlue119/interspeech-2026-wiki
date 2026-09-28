---
id: s26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3047
---

# Gender Bias in ASR: A Controlled Study of Gender Composition Across Training Paradigms

**TL;DR** — Shows that fine-tuning pretrained ASR models on gender-balanced data does not reliably reduce gender-based word-error disparities, because large-scale pretraining masks an effect that is clearly present when training an ASR model from scratch.

## Problem

Gender disparities in ASR performance are commonly blamed on imbalanced training data, but it was untested whether adjusting the gender composition of fine-tuning data actually produces a predictable change in the resulting disparity.

## Method

The authors fine-tune three pretrained ASR models plus one model trained entirely from scratch across 11 gender-composition splits ranging from 0-100% female representation, tracking male and female WER under identical conditions.

## Results

For the pretrained models, male and female WERs fluctuate with no consistent directional relationship to training composition, but the from-scratch model (used as a controlled reference) shows a clear, consistent directional disparity shift with composition, revealing that pretraining representations mask a real effect rather than eliminating it.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informs fairness auditing and bias-mitigation strategy for ASR development, showing that balancing fine-tuning data alone is not sufficient to fix gender disparities inherited from large-scale pretraining.

## Related

- (link related pages by id as the wiki grows)
