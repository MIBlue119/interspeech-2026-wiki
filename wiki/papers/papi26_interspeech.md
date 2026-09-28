---
id: papi26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-40
---

# Cross-Attention is Half Explanation in Speech-to-Text Models

**TL;DR** — An empirical audit finds that cross-attention in speech-to-text models, often trusted as a proxy for input-output relevance, captures only about half of true input saliency, so it should be treated as a partial, not complete, explanation.

## Problem

Cross-attention in speech-to-text models is widely used for downstream tasks like timestamp prediction under the assumption that it faithfully reflects which parts of the input drove each output, but its explanatory validity in the speech domain was largely untested.

## Method

The authors compare cross-attention scores against input saliency maps from feature-attribution methods across monolingual and multilingual, single-task and multi-task speech-to-text models at multiple scales.

## Results

Attention and saliency show moderate alignment, especially when aggregated across heads and layers, but cross-attention captures only about 50% of overall input relevance and at best 52-75% of encoder saliency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cautions researchers and toolmakers against relying solely on cross-attention for interpretability, timestamp prediction, or alignment claims in speech-to-text systems.

## Related

- (link related pages by id as the wiki grows)
