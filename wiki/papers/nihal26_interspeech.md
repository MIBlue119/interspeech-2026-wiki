---
id: nihal26_interspeech
category: audio-understanding
labels: [self-supervised]
institutions: ["Institute of Science Tokyo", "RIKEN"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2629
pdf: https://www.isca-archive.org/interspeech_2026/nihal26_interspeech.pdf
---

# Ecologically-Constrained Task Arithmetic for Multi-Taxa Bioacoustic Classifiers Without Shared Data

*Ragib Amin Nihal, Benjamin Yen, Runwu Shi, Takeshi Ashizawa, Kazuhiro Nakadai*

[PDF](https://www.isca-archive.org/interspeech_2026/nihal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nihal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2629)

**Category:** `audio-understanding` · **Labels:** `self-supervised`

**TL;DR** — The paper demonstrates that independently fine-tuned bioacoustic models can be composed into a unified 661-species classifier via task vector arithmetic without sharing any training data, achieving 59.2% accuracy (86% of a jointly-trained baseline). It also uncovers that bioacoustic task vectors are near-orthogonal and their geometry aligns with the acoustic niche hypothesis.

## Key contributions

- A privacy-preserving multi-taxa composition framework that merges specialist encoders into a 661-species classifier achieving 59.2% accuracy without shared data or compute.
- Empirical evidence that bioacoustic task vectors are near-orthogonal (cosine similarities 0.01-0.09) and strongly correlated with spectral distribution distance, validating an extension of the acoustic niche hypothesis to transformer weight space.
- Discovery of an asymmetric composition effect where majority/species-rich groups lose accuracy (-11.8% for passerines) while underrepresented minority groups gain accuracy (+3.9% for marine mammals, +1.9% for amphibians), promoting equitable biodiversity monitoring.
- Demonstration of universal linear mode connectivity across taxonomic and regional pairs, alongside successful zero-shot cross-regional transfer where leave-one-out regional merges reach 90.8% of dedicated performance.

## Problem

Passive bioacoustic monitoring produces massive datasets scattered across taxa, regions, and institutions, but centralizing this sensitive or terabyte-scale data is often infeasible due to privacy policies, legal agreements, and logistical limits. Monolithic classifiers like BirdNET and Perch avoid fragmentation but require full, expensive retraining whenever new taxa or regions are added, while independent fine-tuning leaves models isolated and prone to catastrophic forgetting if combined. Task arithmetic offers a decentralized alternative in computer vision and speech processing, but its geometry, applicability, and failure modes have never been evaluated on multi-taxa and multi-regional bioacoustic audio encoders.

## Method

The system architecture uses BEATs (iter3+ AS2M), a 90-million parameter audio spectrogram transformer pretrained via self-supervised learning on AudioSet2M using LayerNorm. Five taxonomic groups (Passerines, Non-passerines, Raptors/waterbirds, Marine mammals, Amphibians) and four regional subsets independently fine-tune the full shared encoder using identical hyperparameters (AdamW with lr=1e-5, weight decay 0.01, OneCycleLR, batch size 32, 20 epochs, BF16, SpecAugment, Mixup with alpha=0.3, and label smoothing epsilon=0.1) on disjoint data splits. Task vectors are extracted solely from the encoder weights (excluding classification heads) via subtraction from the base pretrained model (tau_i = theta_i - theta_0).

During inference, direct combination strategies—specifically simple averaging (1/N sum of task vectors), unscaled task arithmetic, and DARE (random dropout with expectation-preserving rescaling)—are added back to the base model. Sign-conflict resolution methods (TIES, DARE+TIES, DELLA) are also evaluated but fail because bioacoustic task vectors exhibit near-chance sign agreement (sigma near 0.50) due to their near-orthogonality. Evaluation relies on linear probing and 1-Nearest Neighbor classification on frozen merged encoder features, comparing against jointly trained baselines using paired bootstrap 95% confidence intervals.

## Experimental setup

The evaluation utilizes 661 species partitioned into 5 taxonomic groups from BirdCLEF 23/24/25 (81k, 38k, 21k train samples), Watkins Marine Mammal Sound Database (1.4k train samples), and AnuraSet (12k train samples), plus 4 regional subsets (East Africa, South Asia, Neotropics, North America) split 70/10/20 into train/val/test. Baselines include single-domain specialists and a jointly-trained monolithic encoder trained on pooled data. Metrics include multi-class classification accuracy, composition gap relative to joint training, task vector cosine similarity, sign agreement, Jensen-Shannon Divergence on spectral distributions, and loss barriers along linear interpolation paths computed on TSUBAME4.0 hardware.

## Results

Simple averaging and DARE+avg achieve 58.8% to 59.2% accuracy on the 661-species task, capturing 86% of the jointly-trained baseline accuracy (68.3%) with a 9.4% composition gap. In contrast, sign-conflict methods like TIES perform worst (53.0% accuracy, 15.3% gap) because near-orthogonal task vectors render majority-vote sign elections random. Across pairwise comparisons, cosine similarities range from 0.013 to 0.093, strongly correlating negatively with Jensen-Shannon spectral divergence (Spearman rho = -0.915, p < 0.001). For regional models, uniform merging reaches 60.8% accuracy (6.5% gap vs 67.2% joint), and leave-one-out regional composition achieves zero-shot transfer at 90.8% of dedicated single-region performance despite minimal species overlap (Jaccard < 0.034).

| System / Condition | Accuracy (%) | Composition Gap (%) |
|---|---|---|
| Joint-Trained Baseline | 68.3 | 0.0 |
| DARE + Average (p=0.9) | 59.2 | 9.1 |
| Task Arithmetic (lambda=1.0) | 59.0 | 9.3 |
| Simple Averaging | 58.8 | 9.5 |
| DARE + TIES | 57.9 | 10.4 |
| TIES Merging (k=0.5) | 53.0 | 15.3 |

## Limitations

The study is scoped to a single base architecture (BEATs) and evaluates taxonomic and regional groups where species sets are strictly disjoint, meaning performance at finer taxonomic scales where orthogonality weakens remains untested. Domain negation experiments show that task subtraction fails because focal-recording styles entangle with canonical species identity in weight space. Additionally, linear probing reveals a 9.4% gap while 1-NN shows only a 2.3% gap, indicating that global subspace arrangements shift during merging and penalize linear classifiers.

## Why read this

Speech and ML researchers working on decentralized model merging, federated learning, or multi-domain audio will find this paper essential for understanding how acoustic niche principles govern weight-space geometry and why vision-centric merging heuristics fail on audio.

## Code

- https://ragib-amin-nihal.github.io/BioAcousticArithmetic/

## Applications

Privacy-preserving collaborative biodiversity monitoring across fragmented global institutions and decentralized ecological surveying.

## Institutions / 機構

Institute of Science Tokyo, RIKEN

**Funding / 經費:** Japan Society for the Promotion of Science, Research Organization of Information and Systems

## Related

- (link related pages by id as the wiki grows)
