---
id: alharthi26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-395
---

# RIVET: Robust Idempotent Voice Attribute Editing

**TL;DR** — Training a voice attribute editor to be idempotent (applying it twice gives the same result as once) makes it far more robust to the noisy age/gender labels common in large speech datasets.

## Problem

Voice attribute editing models change traits like age and gender while preserving speaker identity, but the attribute annotations in large-scale datasets are often noisy or inconsistent, causing conditional generative models to produce unstable edits.

## Method

The authors introduce RIVET, a training framework that adds an idempotency objective — enforcing f(f(x)) = f(x) — as an implicit regularizer that reduces sensitivity to mislabeled training examples.

## Results

Under controlled label noise and on the naturally noisy GLOBE dataset, RIVET improves editing success rate and better preserves speaker identity than standard training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice attribute editing and anonymization tools that must be trained on real-world datasets with imperfect demographic labels.

## Related

- (link related pages by id as the wiki grows)
