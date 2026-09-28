---
id: getman26b_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-566
---

# Do Learned Layer Weights Reflect Pretrained Information Structure in Self-Supervised Speech Models?

**TL;DR** — Contrary to earlier claims that they're uninformative, the learned per-layer weights used to combine SSL speech model layers actually track how phonetic/lexical information is distributed across the pretrained model.

## Problem

Self-supervised speech models are commonly evaluated with learned weighted sums over frozen layers, but prior work concluded these weights are uninformative based on their weak correlation with single-layer downstream performance.

## Method

The authors instead test whether learned layer weights reflect the pretrained model's own layerwise information content, measured via adjusted mutual information (AMI) between clustered layer representations and phone or word labels, across 13 SSL models.

## Results

Learned weights show significant correlation with AMI for most conditions, with strength depending on supervision amount and pretraining objective; weights trained with 10 minutes of labeled data correlate more strongly than those from 1 hour, contrastive models reach correlations up to 0.98, and clustering-based models show weaker alignment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Better-informed layer-selection and probing methodology for researchers building applications on top of self-supervised speech representations.

## Related

- (link related pages by id as the wiki grows)
