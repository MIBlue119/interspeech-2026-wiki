---
id: lyu26_interspeech
category: dataset
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-995
---

# TriA Pipeline: A Large-Scale Automatic Audio Annotation Pipeline For Audio Classification In Specific Scenarios

**TL;DR** — An automatic annotation pipeline built a 2,130-hour, 431-class audio event dataset (TriA), whose prior-knowledge-guided subset boosts domestic audio classification accuracy by nearly 4%.

## Problem

Annotated audio classification data is limited for many specific scenarios, such as domestic environments, creating a bottleneck for training audio classifiers.

## Method

The authors build TriA Pipeline, an automatic audio annotation pipeline that converts raw audio from various scenarios into high-quality training data with audio event annotations, using it to construct the TriA dataset (over 2,130 hours, 431 audio classes) and a prior-knowledge-guided subset (TriAGK) for domestic audio classification tasks.

## Results

Combining manually annotated data with TriAGK yields average relative gains of 3.97% in accuracy and 3.35% in Macro-F1 over manually annotated data alone across three domestic audio classification tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Scaling up training data for domain-specific audio classifiers (e.g., smart home sound event detection) where manual annotation alone is too costly.

## Related

- (link related pages by id as the wiki grows)
