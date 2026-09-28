---
id: dahal26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-322
pdf: https://www.isca-archive.org/interspeech_2026/dahal26_interspeech.pdf
---

# Mixture of Phonetic Experts Based Low-Rank Adaptation of Conformer Models for Accented English Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/dahal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dahal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-322)

**TL;DR** — The paper introduces MoPE-LoRA, a mixture-of-phonetic-experts low-rank adaptation framework that organizes accented speech recognition along phonetic categories, yielding a 12.3% relative WER improvement over single LoRA in zero-shot evaluations.

## Problem

Standard parameter-efficient fine-tuning methods like LoRA apply uniform adaptation across all phonetic contexts without modeling how accent variations manifest at the phoneme level. Conversely, existing mixture-of-experts techniques assign sub-modules per accent, requiring the number of experts to scale with the number of accents and failing to generalize to unseen accent variations. Because accent differences are fundamentally expressed through systematic phonetic distortions that recur across different L1 backgrounds, treating accent identity as the primary axis of variation overlooks shared phonetic structures.

## Method

MoPE-LoRA employs a fixed set of six low-rank experts corresponding to manner-of-articulation phonetic categories: vowels, stops/plosives, fricatives, affricates, nasals, and liquids/glides. These LoRA experts (rank r=8, alpha=16) are inserted into the Query, Key, and Value projection matrices of Conformer encoder layers 6 through 16 of a NeMo Conformer CTC Small base model (approximately 13M parameters). The framework uses a hybrid routing mechanism combining external phonetic supervision from a frozen LibriSpeech-trained phoneme model with a learnable acoustic gating network via a blend parameter beta. To balance capacity and specialization, top-2 expert selection is utilized per frame along with load balancing and router Z-loss objectives.

## Results

Evaluated on the L2-ARCTIC dataset containing 24 hours of non-native speech across six accents (Mandarin, Korean, Spanish, Hindi, Arabic, and Vietnamese) using speaker- and sentence-disjoint four-fold cross-validation, MoPE-LoRA achieves a word error rate (WER) of 10.43% overall. In zero-shot cross-accent evaluations where one accent is completely held out during training, the method achieves a 12.3% relative WER improvement over standard single LoRA baselines. The base encoder processes audio at 16 kHz using Connectionist Temporal Classification (CTC) loss, trained over 50 epochs with a batch size of 16.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech recognition engineers and developers building robust, multi-accent, or low-resource ASR systems that need to generalize to unseen accent variations without storing accent-specific modules.

## Limitations

The framework relies on a separate, frozen phoneme-level CTC model to provide frame-level phonetic supervision during training.

## Related

- (link related pages by id as the wiki grows)
