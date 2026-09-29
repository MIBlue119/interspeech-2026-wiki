---
id: guo26c_interspeech
category: speech-llm-dialogue
labels: [efficient-on-device, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2122
pdf: https://www.isca-archive.org/interspeech_2026/guo26c_interspeech.pdf
---

# Adaptive Federated Fine-Tuning of Self-Supervised Speech Representations

*Xin Guo, Chunrui Zhao, Hong Jia, Ting Dang, Gongping Huang, Xianrui Zheng, Yan Gao*

[PDF](https://www.isca-archive.org/interspeech_2026/guo26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guo26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2122)

**Category:** `speech-llm-dialogue` · **Labels:** `efficient-on-device`, `self-supervised`

**TL;DR** — An adaptive federated fine-tuning framework for speech self-supervised models uses early exits and depth-aware layer-wise partial aggregation to handle system and task heterogeneity, matching or exceeding homogeneous federated performance while reducing memory overhead by up to 43.27%.

## Key contributions

- Transforms a static 12-layer Wav2Vec 2.0 backbone into an elastic multi-branch architecture by inserting prediction heads at intermediate Transformer layers (3rd, 6th, 9th, 12th).
- Introduces resource- and task-aware local training where clients dynamically choose their maximum trainable depth based on local hardware and task complexity.
- Develops a depth-weighted layer-wise partial aggregation mechanism on the server that independently aggregates each Transformer layer using participating client data sizes and trained depths.
- Comprehensive empirical validation across 5 SUPERB benchmark tasks demonstrating robust performance under non-IID and hardware-heterogeneous settings.

## Problem

Centralized fine-tuning of deep speech self-supervised learning models like Wav2Vec 2.0 violates privacy regulations such as GDPR by requiring raw audio aggregation. While federated learning (FL) preserves privacy, deploying it on speech SSL models faces severe system and task heterogeneity: devices have drastically different compute and memory capacities (leading to stragglers under unified full-model training), and diverse downstream tasks require different representation depths (shallow layers for acoustic/KWS tasks, deep layers for semantic/ASR tasks). Existing federated fine-tuning strategies activate the entire model uniformly, causing redundant computational overhead on resource-constrained edge devices and failing to exploit the hierarchical nature of speech representations.

## Method

The framework modifies the 12-layer Transformer contextual encoder of a pre-trained Wav2Vec 2.0 Base model (initialized on 100 hours of LibriSpeech) by attaching independent prediction heads at intermediate layers (E = {3, 6, 9, 12}). Frame-level representations are aggregated via statistical pooling to generate utterance-level embeddings for classification tasks, while ASR uses a sequence modeling module trained with Connectionist Temporal Classification (CTC).

Before each communication round, clients select their maximum trainable depth L_max in E based on local memory and task constraints. Low-resource clients terminate computation early (e.g., layer 3), updating only shallow layers, while high-resource clients train up to deeper task-optimal layers. Because clients update different subsets of layers, standard FedAvg cannot be applied directly. Instead, the server performs layer-wise partial aggregation: each Transformer layer is aggregated independently using only the updates from clients that trained up to or beyond that layer, weighted proportionally by local dataset size and maximum trained depth.

Inference can similarly leverage early exits depending on edge constraints, trading off a pyramid-shaped optimization where lower acoustic layers receive robust updates from all clients and higher semantic layers are refined by capable subsets.

## Experimental setup

Evaluated on five SUPERB benchmark tasks across LibriSpeech (ASR, WER metric), Google Speech Commands 12- and 35-class (KWS, error rate), IEMOCAP 4-class (ER, error rate), and VoxCeleb1 (SID error rate and ASV equal error rate). Simulated heterogeneous FL divides clients into 50% low-resource (shallow depth capped at layer 3) and 50% high-resource groups, combined with speaker-identity non-IID partitioning for KWS, ER, and ASR. Implemented using Flower and SpeechBrain frameworks, running KWS for 1000 rounds, ASR for 100 rounds, SID for 200 rounds, and ER for 50 rounds with 1-3 local epochs per round.

## Results

Under heterogeneous federated settings, the proposed depth-aware layer-wise partial aggregation outperforms standard FedAvg across nearly all tasks, achieving ASR test-clean WER of 8.79% (vs 9.21% for FedAvg), ASR test-other WER of 18.40% (vs 19.20%), ER error rate of 34.50% (vs 35.00%), SID error rate of 15.30% (vs 17.50%), and ASV EER of 10.93% (vs 12.15%). In several cases (ASR, ER, SID), the heterogeneous partial aggregation approach even surpasses the homogeneous FL baseline where all clients use the optimal layer. Memory cost measurements show that reducing model depth from 12 layers down to 3 layers cuts client GPU memory consumption by 43.27% for KWS, 24.51% for SID, 15.48% for ER, and 9.59% for ASR.

| Tasks | Homo-FL | FedAvg (Hetero) | Layer-wise Agg (Hetero) |
|---|---|---|---|
| KWS (12-class) | 17.50% | 18.40% | 17.60% |
| KWS (35-class) | 10.70% | 14.60% | 13.40% |
| ASR (test-clean) | 8.81% | 9.21% | 8.79% |
| ER | 35.70% | 35.00% | 34.50% |
| SID | 17.30% | 17.50% | 15.30% |

## Limitations

The evaluation relies on simulated edge heterogeneity rather than physical edge hardware deployment, and focuses exclusively on Wav2Vec 2.0 Base without testing scaling behavior on larger SSL models (e.g., Wav2Vec 2.0 Large or wav2vec-BERT). The framework requires predefined early-exit branches and does not dynamically adjust exit locations during inference based on instance-level difficulty.

## Why read this

Researchers and engineers building privacy-preserving speech applications on edge hardware will learn how to resolve dimensional mismatches and straggler effects when training multi-exit SSL backbones across heterogeneous federated networks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving on-device speech recognition, keyword spotting, and paralinguistic emotion/speaker analysis for mobile and IoT assistants.

## Institutions / 機構

Wuhan University, University of Auckland, University of Melbourne, University of Cambridge, Flower Labs

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
