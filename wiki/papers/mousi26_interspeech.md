---
id: mousi26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1980
---

# Said Aloud, Read Different: Cross-Modal Instability in Multimodal Models

**TL;DR** — A new speech-augmented visual benchmark across 18 MENA countries shows multimodal models give inconsistent answers to the same question depending on whether it's spoken or written and in English or Arabic, with speech making failures worse.

## Problem

Speech-first multimodal assistants must interpret spoken queries and ground them visually, but it was unclear whether semantically equivalent queries get consistent judgments across modality (text vs. speech) and language (English vs. Arabic).

## Method

The authors build a contrastive triplet benchmark of 10,150 culturally grounded images from 18 MENA countries, each paired with one supported and two plausible-but-unsupported statements, and define 'contrastive instability' as the rate a model fails to correctly resolve every statement in a triplet, then evaluate recent multimodal models under text/speech and English/Arabic.

## Results

Modality and language shifts introduce substantial triplet-level inconsistencies not visible from aggregate accuracy alone, with speech input amplifying partial failures relative to text; the benchmark is released publicly.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Evaluation and stress-testing of speech-first multimodal assistants for robustness and fairness across modality and language, particularly for Arabic and MENA cultural content.

## Related

- (link related pages by id as the wiki grows)
