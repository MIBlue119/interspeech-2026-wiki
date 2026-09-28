---
id: charlot26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2772
---

# BabyHuBERT: Multilingual Self-Supervised Learning for Segmenting Speakers in Child-Centered Long-Form Recordings

**TL;DR** — A HuBERT-style model pretrained on 13,000 hours of multilingual child-centered audio substantially beats adult-pretrained models at telling apart who's speaking in daylong recordings of children.

## Problem

Speech models trained on clean adult speech generalize poorly to child-centered daylong recordings, which differ acoustically and linguistically, hampering research on early language development.

## Method

BabyHuBERT is a self-supervised speech model pretrained on 13,000 hours of multilingual child-centered recordings spanning 40+ languages, evaluated on voice-type classification (distinguishing the key child, other children, male adults, and female adults).

## Results

BabyHuBERT-VTC reaches 55.0-76.1% F1 across six corpora, consistently beating adult-trained baselines (W2V2-LL4300, HuBERT), with gains up to 18.3 absolute F1 points on underrepresented-language corpora (Vanuatu, Solomon Islands).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Child language development research and speaker/voice-type segmentation for underrepresented-language daylong recordings.

## Related

- (link related pages by id as the wiki grows)
