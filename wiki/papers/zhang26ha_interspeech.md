---
id: zhang26ha_interspeech
category: keyword-spotting
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3545
pdf: https://www.isca-archive.org/interspeech_2026/zhang26ha_interspeech.pdf
---

# Margin-Aware Contrastive Regularization for Robust Streaming Keyword Spotting under Strict False-Alarm Constraints

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26ha_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26ha_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3545)

**TL;DR** — The paper introduces Margin-Aware Contrastive Regularization (MACR), an offline auxiliary training objective for edge keyword spotting that achieves over 40% relative false rejection rate reduction at strict false-alarm constraints without adding inference overhead.

## Problem

Lightweight causal keyword spotting models optimized via standard cross-entropy suffer from severe false rejection rate degradation when deployed in continuous streams under strict false-alarm budgets (e.g., <= 0.5 false alarms per hour). Standard global contrastive learning methods fail because they forcibly cluster the heterogeneous Unknown category, causing representational distortion and degraded discrimination.

## Method

MACR operates purely as an offline auxiliary training regularizer that combines target-restricted intra-class pull and margin-aware hard-negative repulsion. It applies the pull objective exclusively to structurally consistent target keywords while avoiding global clustering of non-target/background categories. The repulsion loss uses an explicit geometric safety margin and heavily weights offline-mined hard negatives tracked via an exponential moving average model. During inference, the MACR auxiliary branch is discarded entirely, yielding zero additional parameters, multiply-accumulates, or algorithmic latency.

## Results

Evaluated on Google Speech Commands V2 (12-class) using a 100-hour continuous-stream protocol across a 150K-parameter causal 1D-CNN backbone, MACR reduces the false rejection rate from 16.32% to 7.64% at 0.5 FA/h and from 29.85% to 14.80% at 0.2 FA/h. Closed-set accuracy remains highly competitive at 95.68% compared to 95.82% for standard cross-entropy. Ablations confirm that removing the safety margin, dropping hard-negative weighting, or globally clustering the Unknown class degrades streaming performance. Cross-architecture experiments on DS-CNN (Tiny) and BC-ResNet-1 show consistent false rejection rate reductions with negligible impact on closed-set accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Edge speech and machine learning engineers deploying always-on voice interfaces and wake-word detectors on resource-constrained hardware under strict false-alarm constraints.

## Limitations

Evaluated solely on the English multi-keyword Google Speech Commands V2 setting; broader languages, custom wake words, and far-field conditions remain unverified.

## Related

- (link related pages by id as the wiki grows)
