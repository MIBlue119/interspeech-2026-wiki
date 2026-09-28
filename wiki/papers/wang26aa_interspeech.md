---
id: wang26aa_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1671
---

# URGENT-MOS: Unified Multi-Metric and Preference Learning for Robust Speech Quality Assessment

**TL;DR** — A unified speech-quality-assessment model that jointly learns absolute multi-metric quality prediction and pairwise preference prediction in one architecture, improving accuracy and cross-domain robustness on both fronts.

## Problem

Automatic speech quality assessment tools usually specialize in either absolute quality prediction or pairwise preference prediction, even though the URGENT Challenge protocol shows both are needed together under heterogeneous supervision, and costly human listening tests don't scale.

## Method

URGENT-MOS jointly models multi-metric absolute quality prediction (including human MOS and objective measures) and pairwise preference prediction within a single shared architecture, learning from heterogeneous supervision across diverse metrics.

## Results

The unified framework improves both absolute-quality and preference-prediction performance and cross-domain robustness compared to specialized single-task approaches; code is released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Scalable automatic evaluation of speech generation and enhancement systems, reducing reliance on costly human listening tests.

## Related

- (link related pages by id as the wiki grows)
