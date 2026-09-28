---
id: poli26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2791
---

# DiscoPhon: Benchmarking the Unsupervised Discovery of Phoneme Inventories With Discrete Speech Units

**TL;DR** — DiscoPhon is a new multilingual benchmark testing whether discrete speech units from just 10 hours of an unseen language can be mapped to a predefined phoneme inventory; pretrained multilingual HuBERT and SpidR baselines show current models' units correlate reasonably well with phonemes, but with notable cross-language variation.

## Problem

Unsupervised discovery of phoneme inventories from discrete speech units lacks a standardized multilingual benchmark to evaluate how well current self-supervised models capture phonemic structure in new languages.

## Method

DiscoPhon covers 6 dev and 6 test languages chosen for diverse phonemic contrasts; given only 10 hours of speech in an unseen language, systems must produce discrete units mapped (many-to-one or one-to-one) to a predefined phoneme inventory, evaluated for unit quality, recognition, and segmentation, with four pretrained multilingual HuBERT and SpidR baselines provided.

## Results

Phonemic information is sufficiently available in current models for derived units to correlate well with phonemes, though with variation across languages.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

A benchmark resource for researchers developing unsupervised phoneme discovery methods for low-resource and unwritten languages.

## Related

- (link related pages by id as the wiki grows)
