---
id: lakshmi26_interspeech
category: dataset
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2368
---

# The First Dravidian Speech Datasets for Transphobic and Homophobic Hate Speech: Creation, Annotation, and Multimodal Benchmarking

**TL;DR** — The first Telugu and Malayalam speech datasets for transphobic and homophobic hate speech reveal that a multimodal acoustic-plus-text baseline detects such speech well in-domain but degrades under domain shift.

## Problem

Hate speech targeting the LGBTQIA+ community is under-explored for low-resource languages, and speech-based detection in particular lacks resources, since text-only approaches miss the paralinguistic cues carried in audio.

## Method

The authors build an Elicited Speech Dataset and a Social Media Audio Extract Dataset covering homophobic and transphobic hate speech in Telugu and Malayalam, and evaluate a multimodal baseline fusing Wav2Vec 2.0 acoustic embeddings with IndicBERT linguistic embeddings via attention-based fusion.

## Results

The multimodal baseline performs strongly in matched, in-domain conditions but shows clear degradation under cross-domain and hybrid evaluation, revealing acoustic transfer as a key remaining challenge.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building speech-aware content moderation tools for LGBTQIA+ hate speech detection in Dravidian and other under-resourced languages.

## Related

- (link related pages by id as the wiki grows)
