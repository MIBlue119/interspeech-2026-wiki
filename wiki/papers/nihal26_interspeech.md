---
id: nihal26_interspeech
category: bioacoustics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2629
pdf: https://www.isca-archive.org/interspeech_2026/nihal26_interspeech.pdf
---

# Ecologically-Constrained Task Arithmetic for Multi-Taxa Bioacoustic Classifiers Without Shared Data

[PDF](https://www.isca-archive.org/interspeech_2026/nihal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nihal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2629)

**TL;DR** — Independently fine-tuned bioacoustic encoders can be combined via simple task vector averaging into a unified 661-species classifier reaching 59.2% accuracy without sharing any underlying data.

## Problem

Bioacoustic training data is heavily fragmented across different taxa, geographic regions, and institutions with strict data-sharing or privacy limitations. While centralized training or monolithic retraining solves this, it requires access to all raw data and extensive compute capacity. Task arithmetic enables model composition without data sharing, but its viability and geometric foundations remain unstudied in speech and bioacoustics.

## Method

The framework utilizes BEATs (90M parameters, pretrained via iterative self-supervised learning on AudioSet2M) as the shared base encoder. Specialists are independently fine-tuned on separate datasets using identical hyperparameters (AdamW, OneCycleLR, batch size 32, 20 epochs, BF16, SpecAugment, Mixup). Task vectors are extracted strictly from encoder weights (excluding classification heads) and merged via simple averaging, task vector scaling, DARE dropout, or conflict-resolution techniques like TIES and DELLA. Evaluation uses linear probing and k-NN diagnostics across five taxonomic groups (661 species) and four geographic regions.

## Results

The simple averaged merged model achieves 59.2% multi-taxa accuracy, which is 86% of a jointly-trained baseline, while regional models reach 91% of dedicated performance. Sign-conflict resolution methods (such as TIES) underperform simple averaging by one to six percentage points because bioacoustic task vectors are near-orthogonal (cosine similarities 0.01 to 0.09). Pairwise cosine similarities strongly correlate with spectral distribution distance (Spearman rho = -0.915, p < 0.001), aligning with the acoustic niche hypothesis. Merging creates an asymmetric accuracy redistribution where dominant passerine groups lose up to 11.8% accuracy while underrepresented marine mammal and amphibian groups gain up to 3.9% and 1.9% respectively.

## Code

- https://ragib-amin-nihal.github.io/BioAcousticArithmetic/

## Applications

Environmental conservation groups and bioacoustic researchers collaborating across distributed institutions to build unified multi-taxa species classifiers while preserving data privacy.

## Limitations

Domain negation (such as focal-to-soundscape transfer) serves as a boundary condition where task vector composition fails.

## Related

- (link related pages by id as the wiki grows)
