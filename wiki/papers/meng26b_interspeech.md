---
id: meng26b_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-196
pdf: https://www.isca-archive.org/interspeech_2026/meng26b_interspeech.pdf
---

# Learning Global Key Knowledge for Federated Speaker Recognition via Fisher Information

[PDF](https://www.isca-archive.org/interspeech_2026/meng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/meng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-196)

**TL;DR** — This paper introduces a Fisher Information Matrix-based federated speaker recognition framework that aligns global and local model representations, reducing client data heterogeneity and improving Equal Error Rate across benchmark sets.

## Problem

In speaker recognition, organizations face privacy constraints and economic costs when transmitting large-scale raw data, making federated learning a crucial privacy-preserving alternative. However, inconsistent data distributions across clients cause local models to learn redundant knowledge and drift parameters, trapping models in local optima. Without filtering out this heterogeneous feature information during server aggregation and local updates, overall system performance degrades significantly.

## Method

The method employs an ECAPA-TDNN architecture with a 1024 channel size and a 512-dimensional speaker embedding space across one server and multiple clients. During local training, a Fisher Information Matrix (FIM) is computed using the squared log-likelihood gradients from a temporary cross-entropy classifier to identify the most discriminative dimensions of the global embeddings. A hyperparameter scale factor $s$ selects the top key dimensions ($t = s \cdot D$), and the local embeddings are constrained via cosine similarity loss to align with these target dimensions alongside an AM-Softmax classification loss ($m=0.2, s=30$). Training uses the Adam optimizer with a batch size of 128, an initial learning rate of 0.001 with 0.97 decay per epoch, 5 local epochs ($E$), and 20 aggregation rounds ($R$).

## Results

Evaluated on VoxCeleb1, VoxCeleb2 (using Vox-O, Vox-E, and Vox-H test sets), and CN-Celeb1 partitioned into 4 client sub-datasets based on speaker IDs. When trained on VoxCeleb2 and evaluated on Vox-O, the proposed method achieves an EER of 2.06% and minDCF of 0.1341, outperforming baselines like FedAvg (2.84% EER), MOON (2.59% EER), and FedFSS (2.43% EER). On the more challenging Vox-H test set, it reaches 4.29% EER compared to Standard (6.53%) and FedFSS (4.74%). Ablation studies confirm that incorporating both FIM and feature selection (FS) components consistently improves EER across all client splits compared to variant models without them.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and organizations building privacy-preserving, distributed biometric speaker verification systems across decentralized client devices with heterogeneous data distributions.

## Limitations

Performance on the CN-Celeb1 dataset is marginally inferior to certain specialized baselines like FedFSS.

## Related

- (link related pages by id as the wiki grows)
