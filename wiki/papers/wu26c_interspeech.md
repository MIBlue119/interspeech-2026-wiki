---
id: wu26c_interspeech
category: low-resource
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-856
---

# SEA-MDD: Self-adapting Mispronunciation Detection and Diagnosis Models via Test-Time Training

**TL;DR** — SEA-MDD integrates MLP-based Test-Time Training modules into wav2vec 2.0's Transformer blocks so a mispronunciation detection model can keep adapting to new learner speech at test time, mitigating the performance drop seen when prior MDD models face diverse speech distributions.

## Problem

Mispronunciation detection and diagnosis (MDD) for second-language learners is hindered by substantial variability in learner proficiency and mispronunciation types, and large-scale annotation to cover all cases is prohibitively expensive.

## Method

SEA-MDD (SElf-Adapting MDD) integrates multilayer-perceptron-based Test-Time Training (TTT) modules into the Transformer blocks of wav2vec 2.0, with TTT module parameters updated during both training and test time via self-supervised learning, letting the model dynamically adjust to novel inputs.

## Results

Experiments validate that the self-adapting approach mitigates the performance degradation commonly observed in prior MDD models when exposed to diverse speech distributions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to computer-assisted pronunciation training tools that must remain accurate across a wide, evolving range of L2 learner speech without constant re-annotation.

## Related

- (link related pages by id as the wiki grows)
