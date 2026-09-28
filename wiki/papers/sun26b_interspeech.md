---
id: sun26b_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1006
---

# PAN-Mask: Pathology-Aware Neurological Masking with End-to-End Learnable Weights for Neurological Disorder Detection from Speech

**TL;DR** — Replacing random masking in self-supervised pathological-speech classifiers with masking that targets clinically salient segments consistently improves neurological disorder detection across multiple diseases, languages, and datasets.

## Problem

Self-supervised speech models like WavLM advance pathological speech classification, but their content-agnostic random masking overlooks sparse, localized clinical biomarkers that matter for detecting neurological disorders.

## Method

PAN-Mask uses a lightweight detector that computes and aggregates six interpretable acoustic descriptors via learnable attention to estimate frame-level pathology salience, then selectively masks the high-salience segments during self-supervised fine-tuning, discouraging shortcut learning and compelling the encoder to capture robust, distributed clinically relevant patterns.

## Results

Evaluated on six datasets across three disorders and five languages with identical hyperparameters, PAN-Mask gives accuracy gains of 8.31-22.72% (average 13.82%) over random masking and yields interpretable clinical insights.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More accurate, interpretable speech-based screening tools for neurological disorders across languages and clinical populations.

## Related

- (link related pages by id as the wiki grows)
