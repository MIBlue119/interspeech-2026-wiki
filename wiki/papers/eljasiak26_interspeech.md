---
id: eljasiak26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2587
---

# Foundational speech models evaluation on multilingual dementia prediction

**TL;DR** — Benchmarks Whisper, WavLM, HuBERT, and Wav2Vec2 as acoustic feature extractors for detecting dementia from speech across multiple languages, including zero-shot transfer to unseen languages.

## Problem

Early dementia detection from speech is valuable for care, but it is unclear how well modern speech foundation models generalize to multilingual and unseen-language cognitive-impairment detection.

## Method

The authors attach custom downstream classification heads to several speech foundation models, train them in single-language and multilingual settings, and evaluate zero-shot performance on languages not seen during training.

## Results

The pipeline reaches 0.854 average F1 on combined English datasets and 0.761 F1 in the broader, harder multilingual setting.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-based cognitive-screening tools deployable across languages, potentially aiding early dementia detection in multilingual clinical or telehealth settings.

## Related

- (link related pages by id as the wiki grows)
