---
id: meng26b_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-196
pdf: https://www.isca-archive.org/interspeech_2026/meng26b_interspeech.pdf
---

# Learning Global Key Knowledge for Federated Speaker Recognition via Fisher Information

*Ying Meng, Zhihua Fang, Liang He*

[PDF](https://www.isca-archive.org/interspeech_2026/meng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/meng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-196)

**TL;DR** — This paper proposes a federated speaker recognition framework that uses the Fisher Information Matrix (FIM) to identify and align critical embedding dimensions between global and local models, mitigating data heterogeneity and reducing performance degradation. Across VoxCeleb partitions, the method improves Equal Error Rate (EER) significantly over standard federated baselines like FedAvg, FedProx, and MOON.

## Key contributions

- Formulates a federated speaker recognition strategy that uses the Fisher Information Matrix to quantify and isolate task-discriminative dimensions in speaker embeddings.
- Introduces a dimension selection and feature alignment loss that forces local extractors to track crucial global representation subspaces, filtering out client-side redundant or drift parameters.
- Eliminates the need for transmitting extra auxiliary structural information between server and clients during federated rounds compared to prior feature-sharing strategies.
- Demonstrates robustness across diverse evaluation partitions (Vox-O, Vox-E, Vox-H, and CN-Celeb1) with varying degrees of data complexity and domain shift.

## Problem

Modern speaker recognition architectures require massive datasets to achieve competitive performance, but centralizing raw audio from disparate organizations creates severe privacy liabilities and economic overheads. Federated learning circumvents this by keeping data local and exchanging model parameters, yet acute data heterogeneity across clients introduces skewed distributions and redundant feature representations. Unfiltered aggregation causes global and local models to get trapped in suboptimal feature spaces, as update cycles continuously reinforce conflicting client-specific biases. Prior federated adaptations like FedProx and MOON fail to adequately filter out these harmful feature dimensions during client-server knowledge transfer.

## Method

The framework utilizes an ECAPA-TDNN backbone with a channel size of 1024 as the local and global embedding extractors, mapping audio into 512-dimensional speaker embeddings (D=512). During the local training phase, for a given batch of inputs and labels, the server-broadcasted global model and the client's local model generate global and local embeddings respectively. A temporary classifier initialized on the client computes a standard cross-entropy loss on the global embedding, allowing the system to calculate the diagonal Fisher Information Matrix (FIM) via the squared log-likelihood gradients of the classifier parameters with respect to the embedding dimensions. A scale hyperparameter s determines the fraction of top-scoring dimensions to retain (t = s * D), establishing an importance index array I.

The system then slices and L2-normalizes both global and local embeddings using index array I to form filtered vectors v^G and v^K of dimension t. A cosine similarity loss function penalizes deviations between the local and global key dimensions. This alignment loss is combined with an AM-Softmax classification loss (margin m=0.2, scale s=30) to form the unified local training objective. By restricting representation alignment strictly to the top Fisher-informed dimensions, the local model absorbs global discriminative capacity while ignoring client-specific noise and redundant heterogeneity.

## Experimental setup

Evaluated on VoxCeleb1, VoxCeleb2, and CN-Celeb1 datasets, split uniformly across 4 clients based on speaker IDs to simulate data heterogeneity. Evaluated using Vox-O, Vox-E, Vox-H, and CN-Celeb.Eval test sets. Baselines include Standard (isolated local training), FedAvg, FedProx, MOON, FedCDA, and FedFSS. Models use an ECAPA-TDNN architecture trained with the Adam optimizer (batch size 128, initial learning rate 0.001 with 0.97 decay per epoch), 5 local epochs (E=5), 20 aggregation rounds (R=20), and scale parameter s set to 0.2. Metrics reported are Equal Error Rate (EER %) and minimum Detection Cost Function (minDCF at P_target=0.05).

## Results

When trained on VoxCeleb2 and evaluated on the standard Vox-O test set across 4 clients, the proposed method achieves EERs ranging from 1.91% to 2.06% and minDCF from 0.1277 to 0.1456, consistently outperforming FedAvg (2.52%-2.73% EER) and FedFSS (2.23%-2.64% EER). On more challenging evaluation sets like Vox-H (trained on VoxCeleb2), the proposed system yields EERs between 4.08% and 4.29%, outperforming FedFSS (4.59%-4.82% EER). Ablation experiments confirm the necessity of both the FIM and feature selection components; removing FIM or skipping feature selection entirely leads to consistent performance degradation across all client setups (e.g., Client 1 EER drops from 4.15% down to 4.32% without feature selection).

| Method | Client1 EER (%) | Client1 minDCF | Client2 EER (%) | Client2 minDCF |
|---|---|---|---|---|
| Standard | 3.66 | 0.2404 | 3.37 | 0.2234 |
| FedAvg | 2.69 | 0.1891 | 2.52 | 0.1834 |
| MOON | 2.72 | 0.1954 | 2.59 | 0.1707 |
| FedFSS | 2.47 | 0.1822 | 2.48 | 0.1861 |
| Ours | 2.06 | 0.1341 | 1.91 | 0.1277 |

## Limitations

The evaluation is restricted to closed-set partition scenarios derived from benchmark datasets (VoxCeleb and CN-Celeb) rather than true cross-device deployments with unconstrained acoustic environments and highly unbalanced non-IID client sample sizes. The computation of the Fisher Information Matrix adds overhead during local training via gradient magnitude tracking over temporary classifier parameters. Furthermore, performance on cross-domain settings (such as training on VoxCeleb1 and evaluating on CN-Celeb1) is comparable to or slightly trails specialized baselines like FedFSS.

## Why read this

Researchers and systems engineers working on federated speaker recognition and privacy-preserving biometric systems will find a principled way to leverage the Fisher Information Matrix for feature-space alignment. It offers a concrete formulation to filter out heterogeneous client drift without requiring complex auxiliary data transmissions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving distributed voice biometrics, multi-institution speaker verification systems, and federated voice assistants deployed on edge hardware.

## Related

- (link related pages by id as the wiki grows)
