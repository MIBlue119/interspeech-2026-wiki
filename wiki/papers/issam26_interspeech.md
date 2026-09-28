---
id: issam26_interspeech
category: speech-translation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2278
---

# Cross-Modal Robustness Transfer (CMRT): Training Robust Speech Translation Models Using Adversarial Text

**TL;DR** — CMRT transfers adversarial robustness from text to speech translation models without needing any adversarial speech data, gaining over 3 BLEU points average robustness across four language directions.

## Problem

End-to-end speech translation models often overlook robustness to inflectional morphology variations common in non-native and dialectal speech, and while adversarial fine-tuning works for text robustness, generating adversarial speech data to do the same for speech is computationally difficult.

## Method

The authors adapt a text-domain adversarial attack targeting inflectional morphology to speech, first confirming speech translation models are highly vulnerable to it, then propose Cross-Modal Robustness Transfer (CMRT), which transfers robustness learned from adversarial text directly into the speech modality without requiring adversarial speech data at all.

## Results

Across four language directions, CMRT improves adversarial robustness by over 3 BLEU points on average while maintaining performance on clean, unperturbed data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Making speech translation systems more robust to non-native and dialectal speech variation without the cost of collecting or synthesizing adversarial speech training data.

## Related

- (link related pages by id as the wiki grows)
