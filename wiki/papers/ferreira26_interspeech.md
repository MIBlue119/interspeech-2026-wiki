---
id: ferreira26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2960
pdf: https://www.isca-archive.org/interspeech_2026/ferreira26_interspeech.pdf
---

# CAL-MOS: Bridging Layers with Adapters for Robust MOS Prediction Across Speech Foundation Models

[PDF](https://www.isca-archive.org/interspeech_2026/ferreira26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ferreira26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2960)

**TL;DR** — This paper evaluates layer utilization strategies for Speech Foundation Models in non-intrusive Mean Opinion Score prediction, showing that a layer-calibrated adapter approach improves frozen-backbone aggregation robustness.

## Problem

Non-intrusive speech quality assessment relies heavily on Speech Foundation Models, but different layers capture distinct types of acoustic, phonetic, and task-specific information. It remains unclear which layer depths are most informative for MOS prediction, and naive cross-layer weighted sums often yield unstable fusion results across backbones and datasets.

## Method

The authors benchmark ten Speech Foundation Models under a unified protocol, evaluating last-layer probing, best-layer selection, naive cross-layer weighted sum aggregation, and full fine-tuning. They introduce a layer-calibrated aggregation strategy (Adapter + Mean) where each layer output is processed by an independent adapter composed of two linear projections, layer normalization, and a ReLU activation before mean-pooling and regression. Models are trained using Mean Squared Error loss, the AdamW optimizer, and a cosine learning rate scheduler with linear warmup.

## Results

Evaluated across four MOS datasets (BVCC, BRSpeechMOS, SingMOS, and TMHINT-QI) using utterance-level and system-level MSE and Spearman Rank Correlation Coefficient metrics. Results show that the most informative layer depth is strongly dependent on both the backbone and the dataset, frequently residing in the early-to-mid network layers rather than the final layer. The proposed adapter-based calibration method stabilizes multi-layer fusion and narrows the performance gap to full fine-tuning while keeping the massive backbone encoder frozen.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing automated speech quality assessment systems, text-to-speech pipelines, or voice conversion frameworks can use these insights to efficiently extract quality scores without expensive full model fine-tuning.

## Limitations

The study focuses on non-intrusive MOS prediction and evaluates specific SSL backbones and datasets under bounded training epoch regimes.

## Related

- (link related pages by id as the wiki grows)
