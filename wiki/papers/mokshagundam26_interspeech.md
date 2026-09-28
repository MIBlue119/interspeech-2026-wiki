---
id: mokshagundam26_interspeech
category: prosody
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3144
---

# Boundaryless Speech-to-Syllable Representations with Hierarchical CNN for Linguistically Inspired Automatic Stress Detection

**TL;DR** — A fully boundary-independent CNN framework compresses frame-level embeddings into syllable-level representations without explicit segmentation, and with a linguistically motivated loss enforcing one stressed syllable per word, sharply improves automatic stress detection for L2 English learners.

## Problem

Automatic syllable stress detection is important for Computer Assisted Language Learning since L2 learners often misplace word stress, but existing approaches rely on manually annotated boundaries or forced alignment, which are costly and error-prone.

## Method

The authors propose a boundary-independent framework using CNNs for hierarchical time-compression that converts frame-level embeddings into compact syllable-level representations without explicit segmentation, incorporating a Post-net2.0 loss to enforce that each word has exactly one stressed syllable.

## Results

On the ISLE corpus with German and Italian learners, the approach consistently improves over boundary-dependent and prior boundary-independent state-of-the-art models, reaching 94.86% (German) and 96.24% (Italian) accuracy, with gains up to 18.67% and 16.12%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Directly applicable to computer-assisted language learning tools that give L2 English learners automatic feedback on word stress placement.

## Related

- (link related pages by id as the wiki grows)
