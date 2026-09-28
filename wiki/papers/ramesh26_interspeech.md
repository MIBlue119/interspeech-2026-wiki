---
id: ramesh26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2568
pdf: https://www.isca-archive.org/interspeech_2026/ramesh26_interspeech.pdf
---

# Duration-Aware Soft Targets for Text-Independent Supervised Phone Segmentation

[PDF](https://www.isca-archive.org/interspeech_2026/ramesh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ramesh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2568)

**TL;DR** — This paper replaces rigid hard boundary labels with duration-aware soft targets to model phonetic transition uncertainty, achieving an R-value of 91.53% on TIMIT using a simple BiGRU architecture.

## Problem

Standard supervised phone segmentation relies on hard binary targets where boundaries are marked as single-frame events. However, natural speech transitions occur gradually and exhibit inherent boundary ambiguity, making single-frame hard labels an inadequate representation. Prior methods attempt to fix this via complex structured loss functions or autoregressive modeling, which drastically increase computational overhead.

## Method

The method introduces duration-aware soft targets by replacing non-boundary frames near a hard transition with unnormalized zero-mean half-Gaussian pulses. The standard deviation of each pulse is proportional to the duration of the neighboring phone, scaled by a spread ratio hyperparameter K set to 0.2. The model architecture consists of 39-dimensional MFCC feature extraction followed by two layers of bidirectional GRUs (BiGRU) with a hidden dimension of 39 and a linear projection head with sigmoid activation. Training is optimized using weighted binary cross-entropy loss with a positive class weight of 4 for soft targets.

## Results

Evaluated on the TIMIT and Buckeye datasets using a 20 ms tolerance window, the soft-target BiGRU achieves R-values of 91.53% and 86.23%, respectively, outperforming hard targets and competing baselines like SEGFEAT and SuperSeg. Ablation studies across uniform, triangular, and Gaussian smoothing kernels show comparable performance, indicating that the gains stem primarily from smoothing rather than the specific kernel shape. Soft targets also yield a 40% reduction in spurious false peaks per utterance and improve segmentation accuracy across both filter and source transition types.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers working on downstream speech tasks like automatic speech recognition, keyword spotting, and phonetic analysis who need robust frame-level phone boundaries.

## Limitations

The spread ratio K is currently fixed rather than adaptive to varying acoustic contexts.

## Related

- (link related pages by id as the wiki grows)
