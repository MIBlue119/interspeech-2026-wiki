---
id: vu26_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1650
pdf: https://www.isca-archive.org/interspeech_2026/vu26_interspeech.pdf
---

# Adaptive Multimodal Expert Specialization by Meta-Learning for Spoken English Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/vu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/vu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1650)

**TL;DR** — A meta-learning framework combining a mixture of experts with multimodal feature integration achieves an F1-score above 84% and an MSE of 0.225 for automated spoken English assessment.

## Problem

Automated spoken language assessment struggles with data scarcity and privacy constraints that restrict large-scale data collection. Traditional monolithic models fail to capture diverse vocal profiles and intermodal synergies, resulting in inaccurate proficiency scoring.

## Method

The architecture projects and normalizes acoustic, linguistic, turn-taking, and visual features, feeds them into a Transformer encoder with attentive pooling, and routes them through a mixture of experts (MoE) with 16 experts and a top-2 gating mechanism. Model-agnostic meta-learning (MAML) using first-order derivatives provides optimal task initialization for rapid adaptation across distinct scoring criteria. The training recipe incorporates soft-discretized regression combining KL-divergence, load balancing, MSE, and margin-penalized losses, optimized via Bayesian optimization on NVIDIA A40 GPUs.

## Results

Evaluated primarily on the ETS Vericant dataset containing university admission interviews of 427 speakers, the model achieves an 84.88% F1-score in binary classification and an MSE of 0.225 in regression for the primary SEE target, representing a 32.4% error reduction over baseline configurations. On the MIT Interview Dataset for hirability prediction, the model achieves an F1-score exceeding 70% across three repetitions. Ablation studies confirm that replacing MoE with a dense layer, omitting MAML, or removing rubric-guided features leads to notable performance degradation.

## Code

- https://github.com/cngthnh/meta_see

## Applications

Educational technology platforms and examiners use this system for automated, scalable spoken language coaching, proficiency testing, and low-resource interview skill evaluation.

## Limitations

The framework relies heavily on frozen pretrained feature extractors, which can restrict domain sensitivity and fine-grained feature capture.

## Related

- (link related pages by id as the wiki grows)
