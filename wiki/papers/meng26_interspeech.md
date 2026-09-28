---
id: meng26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-25
pdf: https://www.isca-archive.org/interspeech_2026/meng26_interspeech.pdf
---

# A Federated Learning-Based Speaker Recognition Method with Dual Classification Heads

[PDF](https://www.isca-archive.org/interspeech_2026/meng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/meng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-25)

**TL;DR** — FedDCH introduces a federated speaker recognition method with dual classification heads to directly incorporate global distribution knowledge during local training, achieving an average EER improvement of 46.5% over local training on VoxCeleb2.

## Problem

Traditional federated learning setups for speaker recognition suffer from severe data heterogeneity because client datasets contain mutually exclusive speaker categories. Standard local classifiers lack awareness of the global data distribution, forcing models to rely solely on indirect knowledge transfer via model aggregation and leading to suboptimal performance.

## Method

The proposed FedDCH framework equips each client with an ECAPA-TDNN embedding extractor (1024 channels, 512-d embeddings), a local classification head, and an additional global classification head that maps to the full set of global speaker categories. During local training, the embedding extractor is optimized under joint supervision from both local and global classification heads using a combined loss (balancing coefficient alpha). On the server side, a speaker-ID-based weighted aggregation mechanism uses an advantage factor to aggregate the global classifier parameters based on data volume per speaker category. Training settings include Adam optimizer, initial learning rate of 0.001 (decayed by 0.97 per epoch), local epochs l=5, and total aggregation rounds T=20.

## Results

Evaluated on VoxCeleb and CN-Celeb datasets using EER and minDCF metrics, FedDCH was benchmarked against Standard training, FedAvg, FedProx, MOON, and FedCDA. On VoxCeleb2 partitioned across 4 clients and evaluated on Vox-O, Vox-E, and Vox-H, FedDCH consistently outperformed baseline federated methods (e.g., achieving average EER improvements of 46.5% over local training and 7.6% over FedAvg on VoxCeleb2). In heterogeneous cross-corpus evaluations combining VoxCeleb1, CN-Celeb1, VoxCeleb2, and CN-Celeb2, FedDCH improved average EER by 68.8% over local training and 5.4% over FedAvg. Ablation studies confirmed that joint guidance from both local and global classification heads yields superior performance compared to using either head in isolation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Enterprises and organizations collaborating on speaker verification and identification systems under privacy regulations without sharing raw audio data.

## Limitations

The paper notes room for optimization when handling particularly challenging validation sets like Vox-H.

## Related

- (link related pages by id as the wiki grows)
