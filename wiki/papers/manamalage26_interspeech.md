---
id: manamalage26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-586
pdf: https://www.isca-archive.org/interspeech_2026/manamalage26_interspeech.pdf
---

# FedMPA: A Novel Privacy-Performance Optimization Approach for Multimodal Speech-Based Depression Detection

*Dushanthi Madhushika Manamalage, Frederick Sundram, Partha S. Roop, Seyed Reza Shahamiri*

[PDF](https://www.isca-archive.org/interspeech_2026/manamalage26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/manamalage26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-586)

**TL;DR** — FedMPA is a Federated Multimodal Prototype Alignment framework for decentralized speech-based depression detection that jointly optimizes classification utility and privacy. It achieves a Privacy-Performance Score (PPS) of 0.92 and a UAR of 0.89 on the E-DAIC dataset.

## Key contributions

- A federated multimodal prototype alignment framework combining modality-specific class prototypes with an EMA-stabilized global prototype bank.
- A repulsion-based prototype loss designed to maintain distinct class separation under non-IID conditions.
- Prototype-based similarity weighting for server aggregation and a hybrid inference strategy bridging softmax and geometric distances.
- A task-specific Privacy-Performance Score (PPS) metric to quantify the trade-off between clinical UAR and membership inference vulnerability.

## Problem

Speech-based automatic depression detection (ADD) offers non-invasive mental health assessment, but centralized data collection exposes sensitive acoustic and linguistic identities to privacy breaches like Membership Inference Attacks (MIAs). While Federated Learning (FL) prevents raw data sharing, applying it to multimodal speech introduces significant challenges: heterogeneous feature spaces leading to client drift under non-IID conditions, residual gradient/update privacy leaks, and performance drops relative to centralized training. Prior federated approaches fail to jointly optimize or quantify the balance between predictive performance and privacy guarantees in speech-based clinical tasks.

## Method

FedMPA builds upon the centralized ALiDeR architecture, extending it to a decentralized setting using modality-specific prototypes for audio, text, and fused representations. Each local client computes class-wise prototypes, which are uploaded to the server and integrated into a global prototype bank using an Exponential Moving Average (EMA) with a smoothing factor of gamma = 0.9 to suppress noise and stabilize client drift.

Local training relies on a composite objective comprising weighted cross-entropy (LWCE) to address class imbalance, a modality-specific prototype pulling loss (L_proto) that pulls client embeddings toward the corresponding global class prototype using squared L2 distance, and a repulsion loss (L_repulsion) that explicitly penalizes embeddings approaching incorrect-class prototypes. The balancing hyperparameter configuration uses lambda = 0.07 for audio/text and 0.08 for the fused modality, with beta parameters set similarly.

For server-side aggregation, FedMPA replaces standard FedAvg with prototype-based similarity weighting. The server computes cosine similarity between client prototype updates and global prototypes, passing them through softplus and softmax activations (controlled by a sensitivity parameter delta = 2.0) to prioritize well-aligned clients alongside momentum-based updates (momentum = 0.9). Inference employs a hybrid strategy where a confidence threshold tau = 0.6 determines whether to use the softmax classifier or fall back to a geometric prototype-margin classifier when softmax uncertainty is high.

## Experimental setup

Evaluated on the E-DAIC dataset (275 participants: 66 depressed, 209 non-depressed based on PHQ-8 scores, split into 163 train, 56 dev, 56 test subsets), partitioned into 4 non-IID speaker-level clients. Compared against centralized ALiDeR and federated baselines FedProx, FedAvg, FedProto, and FedGPD. Evaluated using Accuracy, Precision, Sensitivity/Recall, Specificity, F1-score, Unweighted Average Recall (UAR), MIA confidence AUC (MIA^conf AUC), and Privacy-Performance Score (PPS). Implemented with 5 local epochs, batch size of 8, 30 communication rounds, Adam optimizer at learning rate 1e-5, and server momentum learning rate 1.0.

## Results

FedMPA achieves an Unweighted Average Recall (UAR) of 0.89, an Accuracy of 0.88, an F1-score of 0.89, an MIA^conf AUC of 0.52 (where 0.5 indicates random guessing/ideal privacy), a normalized privacy score of 0.96, and a headline Privacy-Performance Score (PPS) of 0.92. In baseline comparisons, centralized ALiDeR achieves a higher UAR (0.92) but worse privacy (MIA^conf AUC 0.42, PPS 0.88), while existing FL baselines underperform: FedProx scores 0.74 UAR (PPS 0.80), FedAvg scores 0.76 UAR (PPS 0.82), FedProto scores 0.81 UAR (PPS 0.85), and FedGPD scores 0.87 UAR (PPS 0.89). Ablations show that removing repulsion loss drops UAR from 0.89 to 0.84, and replacing the hybrid inference with pure softmax drops UAR to 0.80.

| System / Condition | Acc | F1 | UAR | MIA^conf AUC | ρ^conf | PPS |
|---|---|---|---|---|---|---|
| Centralized | 0.92 | 0.91 | 0.92 | 0.42 | 0.84 | 0.88 |
| FedProx | 0.71 | 0.67 | 0.74 | 0.43 | 0.86 | 0.80 |
| FedAvg | 0.75 | 0.75 | 0.76 | 0.44 | 0.88 | 0.82 |
| FedProto | 0.82 | 0.85 | 0.81 | 0.45 | 0.90 | 0.85 |
| FedGPD | 0.84 | 0.85 | 0.87 | 0.54 | 0.92 | 0.89 |
| FedMPA (Ours) | 0.88 | 0.89 | 0.89 | 0.52 | 0.96 | 0.92 |

## Limitations

Experiments are restricted to a single semi-clinical benchmark dataset (E-DAIC) with only 4 federated clients, limiting evaluation across diverse real-world demographics and larger client topologies. The framework handles only audio and text modalities, omitting other potential clinical signals. Privacy evaluation is limited to black-box confidence-based membership inference attacks without white-box gradient leakage assessments or formal differential privacy guarantees.

## Why read this

Researchers building privacy-preserving multimodal healthcare architectures will find a concrete recipe for combining prototype-based federated alignment, repulsion losses, and hybrid server inference to close the performance gap with centralized models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Decentralized mental health screening, privacy-preserving speech-based biomarker analysis, and secure federated multimodal diagnostics.

## Related

- (link related pages by id as the wiki grows)
