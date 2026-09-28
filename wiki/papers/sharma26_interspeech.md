---
id: sharma26_interspeech
category: multilingual
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2502
---

# Robust Language Identification Using Semi-positive Contrastive Learning

**TL;DR** — SpCL is a bi-modal audio-text spoken language identification framework using a semi-positive contrastive loss that distinguishes same-language-same-domain pairs from same-language-different-domain pairs, improving cross-corpora generalization for low-resource language ID without explicit domain adaptation.

## Problem

Spoken Language Identification is conventionally modeled as speech-only, ignoring text data, and low-resourced LID systems generalize poorly across corpora/domains without costly explicit domain adaptation.

## Method

SpCL (Semi-positive Contrastive Learning) uses a bi-modal audio-text encoder to map speech waveforms and phoneme-based text captions into a shared embedding space, introducing a novel semi-positive contrastive loss that distinguishes strong positive pairs (same language and domain) from semi-positive pairs (same language, different domain) via a controlled weighting scheme.

## Results

On 12 Indian languages with multi-domain datasets, SpCL outperforms strong acoustic and phonetic baselines on both seen and unseen test domains, with ablations confirming benefits of semi-positive weighting and dynamic captions, and Whisper-based audio encoders giving the best robustness under domain mismatch.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for building spoken language identification systems for multilingual, low-resource regions (e.g. Indian languages) that must generalize across recording domains.

## Related

- (link related pages by id as the wiki grows)
