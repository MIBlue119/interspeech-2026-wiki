---
id: li26q_interspeech
category: few-shot
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1024
pdf: https://www.isca-archive.org/interspeech_2026/li26q_interspeech.pdf
---

# Few-shot Class-variable Incremental Audio Classification via Prototype Adaptation and Pseudo Class-variable Training

[PDF](https://www.isca-archive.org/interspeech_2026/li26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1024)

**TL;DR** — This paper introduces Few-shot Class-variable Incremental Audio Classification (FCIAC), handling both class additions and removals, and achieves superior average accuracy using prototype adaptation and pseudo class-variable training.

## Problem

Traditional few-shot class-incremental audio classification models assume that the number of classes strictly increases over time, making them unsuitable for practical scenarios where classes can also be removed or modified (e.g., adding or deleting voice keywords in smart speakers). Furthermore, models tend to overfit new classes when trained with limited samples and suffer from catastrophic forgetting of old classes when past data cannot be stored due to privacy constraints. Defining the FCIAC setup addresses this mismatch by supporting both class additions and deletions across incremental sessions.

## Method

The proposed framework consists of a ResNet18 encoder (frozen after base training) and a Class-variable Prototype Adaptation Network (CPAN) acting as the classifier. CPAN contains four components: an Attentive Prototype Generator Module (APGM) activated during class addition, a Stability Adaptation Module for Prototypes (SAMP), a Plasticity Adaptation Module for PAMP, and a fusion module leveraging self-attention and layer normalization. To bridge the gap between static base training and dynamic incremental sessions, a Pseudo Class-variable Training Strategy (PCTS) mixes base data subsets using Beta-distributed coefficients to simulate episodic class addition and removal cycles. Old classes are represented and reconstructed via multivariate Gaussian distributions parameterized by stored mean vectors and covariance matrices.

## Results

Evaluated on three public datasets (LS-100, NSynth-100, and FSC-89) across 4 incremental sessions with alternating class additions and removals, comparing against baselines like CEC, PAN, and AMFO. On LS-100, the method achieves an average accuracy (AA) of 98.73% overall (99.85% base, 86.34% incremental). Ablation experiments on LS-100 show that combining CPAN and PCTS yields the highest overall AA of 92.62% compared to variants without them (91.43%). Friedman and Nemenyi post-hoc tests confirm that the performance improvements over baselines are statistically significant at a confidence level of alpha = 0.05.

## Code

- https://github.com/cgq2971-afk/FCIAC

## Applications

Smart speakers, voice assistants, and domestic activity monitoring systems that require dynamic, on-the-fly updating of acoustic categories through keyword addition or removal.

## Limitations

The authors note that this is a preliminary investigation into the FCIAC problem and that further optimization of model architecture and loss functions is required to enhance performance.

## Related

- (link related pages by id as the wiki grows)
