---
id: martinez26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-820
---

# findsylls: A Language-Agnostic Toolkit for Syllable-Level Speech Tokenization and Embedding

**TL;DR** — A unified, modular toolkit standardizes syllable segmentation and embedding methods (like Sylber and VG-HuBERT) under one interface, demonstrated on English, Spanish, and a newly annotated under-documented language.

## Problem

Syllable-level units offer compact, linguistically meaningful representations for spoken language modeling and unsupervised word discovery, but syllabification research is fragmented across incompatible implementations, datasets, and evaluation protocols.

## Method

The author builds findsylls, a modular, language-agnostic toolkit that unifies classical syllable detectors and end-to-end syllabifiers under a common interface for segmentation, embedding extraction, and multi-granular evaluation, standardizing widely used methods and letting their components be recombined for controlled comparisons.

## Results

The toolkit is demonstrated on English and Spanish corpora and on new hand-annotated data from Kono, an underdocumented Central Mande language, showing a single framework can support reproducible syllable-level experiments across both high-resource and under-resourced settings.

## Code

Toolkit reported as released by the author (findsylls) — unverified by this wiki as of the `updated` date; please confirm and update this entry if you can.

## Applications

Reproducible syllable-level speech modeling and unsupervised word discovery research across languages, including under-documented ones.

## Related

- (link related pages by id as the wiki grows)
