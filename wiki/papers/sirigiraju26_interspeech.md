---
id: sirigiraju26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3247
---

# ALFreeD: Teacher-Guided Few-Shot Pronunciation Assessment via Segmentation-Free Deviation Modeling

**TL;DR** — A pronunciation-assessment framework that scores learners against a teacher's own recording rather than canonical phonemes and forced alignment, needing far less labeled data.

## Problem

Automatic pronunciation assessment typically depends on canonical phonemes, their aligned boundaries, and large labeled datasets, all of which are costly and cumbersome to obtain.

## Method

ALFreeD extracts frame-level HuBERT embeddings from learner and teacher utterances, computes deviation scores after DTW-based temporal alignment, derives an utterance-level pronunciation deviation vector via an i-vector framework that suppresses non-pronunciation variability, and passes it to an MLP for quality prediction.

## Results

On SpeechOcean762, ALFreeD achieves competitive performance with recent end-to-end methods while using minimal labeled data and no canonical phoneme segmentation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-resource computer-assisted language learning tools for automatic pronunciation feedback.

## Related

- (link related pages by id as the wiki grows)
