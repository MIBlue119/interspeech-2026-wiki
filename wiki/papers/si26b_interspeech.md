---
id: si26b_interspeech
category: audio-classification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1250
pdf: https://www.isca-archive.org/interspeech_2026/si26b_interspeech.pdf
---

# Cross Domain Few-Shot Class-Incremental Audio Classification Via Adversarial Contrastive Learning

[PDF](https://www.isca-archive.org/interspeech_2026/si26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/si26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1250)

**TL;DR** — This paper introduces cross-domain few-shot class-incremental audio classification (CD-FCAC), utilizing an adversarial contrastive training strategy to achieve superior average accuracy across domain shifts and class increments.

## Problem

Traditional few-shot class-incremental audio classification (FCAC) assumes that both base and incremental classes originate from the exact same domain distribution, ignoring real-world domain shifts. In practical deployments such as smart homes or monitoring agents, systems must continuously adapt to new audio classes while facing distinct distribution shifts between sessions. This coexistence of domain shift and class increment leads to severe catastrophic forgetting and degraded decision boundaries.

## Method

The framework separates model execution into an encoder and a classifier, where the encoder is trained during the base session and frozen during incremental sessions to prevent catastrophic forgetting. During the base session, an adversarial contrastive training strategy combines an adversarial spectral disruptor with supervised contrastive loss to extract domain-invariant, intra-class compact, and inter-class separable embeddings. The spectral disruptor applies random convolutional perturbations on log Mel-spectrograms to simulate pseudo-target domains via alternating maximization and minimization steps. Incremental sessions update the classifier using new class embeddings alongside saved mean embedding vectors of old classes.

## Results

Evaluated on six cross-domain pairs derived from the LS-100, NSynth-100, and FSC-89 datasets (typically using a 5-way 5-shot setting), the method consistently outperforms state-of-the-art baselines including DFSL, CEC, PAN, AMFO, and PCR. It achieves average accuracy scores of 46.89% on FS->NS, 41.67% on FS->LS, 85.17% on NS->FS, 79.09% on NS->LS, 80.05% on LS->FS, and 79.78% on LS->NS. Ablation visualizations via t-SNE confirm that the adversarial contrastive approach successfully prevents overlap between source and target domain embeddings.

## Code

- https://github.com/YongjieSi/ACL

## Applications

Engineers building audio recognition agents, smart home monitoring systems, or robotic acoustic detectors that must continually learn new sound classes from novel deployment environments without retraining from scratch.

## Related

- (link related pages by id as the wiki grows)
