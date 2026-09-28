---
id: chien26c_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3201
---

# Two-Sided Fairness Transfer for Gender-Neutral Speech Emotion Recognition with Partially Observed Attributes

**TL;DR** — A "task vector" derived from the gap between speaker-side and rater-side fair SER models lets you transfer fairness to a new dataset that only has gender labels for one of the two sides.

## Problem

Fair speech emotion recognition needs neutrality to both speaker-side and rater-side gender bias, but existing debiasing methods require attribute labels for both sides, which are often unavailable together, especially in new target datasets.

## Method

The authors first fine-tune a pretrained CLAP model with an adversarial debiasing objective to build one-sided (speaker- or rater-) gender-neutral models on a source dataset, derive an "ATT2Fair" task vector from the difference between the two, and apply that vector to infer the missing-side fair model on a target dataset that only has partial (one-sided) attribute labels.

## Results

The approach demonstrates practical cross-dataset fairness transfer, producing gender-neutral SER models even when the target dataset lacks complete demographic annotation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building fairer emotion-recognition systems for new deployments or datasets that lack complete speaker/rater demographic labels.

## Related

- (link related pages by id as the wiki grows)
