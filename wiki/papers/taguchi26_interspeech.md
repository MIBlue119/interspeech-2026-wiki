---
id: taguchi26_interspeech
category: low-resource
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2848
---

# Pretrained self-supervised speech models can recognize unseen consonants

**TL;DR** — Fine-tuning Wav2Vec2 and HuBERT on two click-rich Khoisan languages shows the models recognize click consonants, a typologically rare sound nearly absent from pretraining data, even more accurately than ordinary consonants.

## Problem

Self-supervised speech models are pretrained on data heavily skewed toward high-resource languages, raising concern that they may poorly represent typologically rare sounds like click consonants found mainly in Khoisan languages.

## Method

The authors fine-tune and compare Wav2Vec2 and HuBERT on data from two click-rich Khoisan languages (G|ui and West !Xoon) to test recognition accuracy for clicks versus other consonants.

## Results

The fine-tuned models consistently recognize clicks more accurately than non-click consonants, suggesting self-supervised pretraining generalizes well to rare phonemes despite their underrepresentation in pretraining data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Supports using self-supervised speech models as a foundation for ASR and documentation tools for endangered click languages and other low-resource languages with rare phonemes.

## Related

- (link related pages by id as the wiki grows)
