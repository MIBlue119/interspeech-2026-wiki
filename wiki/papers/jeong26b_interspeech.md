---
id: jeong26b_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2697
pdf: https://www.isca-archive.org/interspeech_2026/jeong26b_interspeech.pdf
---

# Cross-lingual Retrieval-Augmented Classification for Dysarthria Severity Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/jeong26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jeong26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2697)

**TL;DR** — The paper introduces Cross-lingual Retrieval-Augmented Classification (CRAC) to assess dysarthria severity using an opposite-language speech database, achieving balanced accuracies of 87.3% on Korean and 86.7% on Italian datasets.

## Problem

Automatic dysarthria severity assessment suffers from a severe scarcity of labeled pathological speech data within individual languages. While cross-lingual adaptation can help, naive multilingual data pooling often harms performance because models overfit to language-specific acoustic variations rather than core severity attributes.

## Method

CRAC operates in four stages using a frozen Whisper-small encoder: supervised contrastive alignment maps mean-pooled frame features into a 128-dimensional severity-focused search space via a trainable projection head; a FAISS vector database stores opposite-language training keys and content values; a multi-head cross-attention fusion module blends target queries with top-k retrieved cross-lingual references; and subject-level inference aggregates softmax predictions across six speech tasks using soft voting. The projection head is optimized via supervised contrastive loss with class-balanced sampling, while the downstream cross-attention and MLP classifier use cross-entropy loss with inverse-frequency weighting.

## Results

Evaluated on a Korean post-stroke dataset (276 subjects, 6 tasks) and an Italian ALS dataset (221 subjects, 6 tasks) under a speaker-independent three-class classification protocol (Healthy, Mild-to-Moderate, Severe). CRAC reaches 87.3% balanced accuracy (80.0% macro-F1, 87.0% micro-F1) on Korean, outperforming monolingual baseline 1 (78.9%) and pooled baseline 2 (76.4%). On Italian, CRAC achieves 86.7% balanced accuracy (77.3% macro-F1, 90.9% micro-F1), outperforming monolingual baseline 1 (66.7%) and pooled baseline 2 (80.0%).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathologists and digital health platforms for automated, objective, and cross-lingual clinical assessment of motor speech disorders.

## Related

- (link related pages by id as the wiki grows)
