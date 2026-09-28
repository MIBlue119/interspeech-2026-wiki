---
id: subedi26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2966
---

# BiMamba2 Masked Discrete-Unit Prediction for Multilingual Speech Representation for Unsupervised Speech in the Wild Challenge

**TL;DR** — A 48M-parameter bidirectional Mamba-2 encoder trained HuBERT-style on 250 hours of 67-language unlabeled speech, submitted to the Unsupervised Speech in the Wild challenge, doing well on speaker clustering but lagging on language ID and transcription.

## Problem

The Unsupervised Speech in the Wild Challenge at Interspeech 2026 asks for multilingual speech representations learned entirely without labeled data, across a wide range of languages.

## Method

Trains a bidirectional Mamba-2 (BiMamba2) encoder with masked discrete-unit prediction following the HuBERT-style paradigm on 250 hours across 67 languages, combining masked k-means pseudo-label prediction with language identification supervision and VICReg regularization.

## Results

Achieves an Adjusted Rand Index of 0.735 on official evaluation, exceeding four baselines on speaker clustering, though language identification macro-F1 (0.073) and character error rate (0.870) remain below supervised baselines; the paper also notes a local-versus-official metric discrepancy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Fully unsupervised multilingual speech representation learning for low-resource and unlabeled speech corpora.

## Related

- (link related pages by id as the wiki grows)
