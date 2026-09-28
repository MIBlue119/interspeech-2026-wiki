---
id: manamalage26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-586
pdf: https://www.isca-archive.org/interspeech_2026/manamalage26_interspeech.pdf
---

# FedMPA: A Novel Privacy-Performance Optimization Approach for Multimodal Speech-Based Depression Detection

[PDF](https://www.isca-archive.org/interspeech_2026/manamalage26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/manamalage26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-586)

**TL;DR** — FedMPA is a federated multimodal prototype alignment framework for privacy-preserving depression detection that achieves a Privacy-Performance Score of 0.92 on the E-DAIC dataset.

## Problem

Speech-based automatic depression detection relies on sensitive acoustic and linguistic data, raising privacy concerns such as vulnerability to membership inference attacks. While federated learning helps prevent raw data exposure, it struggles with multimodal heterogeneity under non-IID client distributions and a performance trade-off compared to centralized training. Furthermore, quantifying this privacy-performance balance is underexplored in clinical speech applications.

## Method

FedMPA extends the ALiDeR architecture to federated learning using modality-specific class prototypes for audio, text, and fused representations, along with an Exponential Moving Average (EMA)-stabilized global prototype bank. Local client training utilizes weighted cross-entropy, a prototype-pull loss, and a repulsion loss to penalize embeddings near incorrect-class prototypes and maintain class separation. The server employs prototype-based similarity weighting via softplus and softmax normalization alongside momentum-based aggregation. Final classification uses a hybrid inference strategy that falls back on prototype geometric similarity when softmax uncertainty exceeds a confidence threshold of tau = 0.6.

## Results

Evaluated on the E-DAIC dataset (partitioned across 4 speaker-level clients with 163 training, 56 dev, and 56 test participants), FedMPA achieved an Accuracy of 0.88, Precision of 0.89, Recall of 0.89, F1-score of 0.89, and Unweighted Average Recall (UAR) of 0.89. It outperformed FL baselines FedAvg, FedProx, FedProto, and FedGPD, yielding an MIAconf AUC of 0.52 and a Privacy-Performance Score (PPS) of 0.92. Ablations showed that combining weighted cross-entropy, prototype pulling, and prototype repulsion increased UAR from 0.74 (standard cross-entropy) to 0.89, while hybrid inference outperformed softmax-only or prototype-only alternatives.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers developing decentralized, privacy-aware mental health assessment tools and speech-based diagnostic systems.

## Limitations

Experiments are restricted to a single semi-clinical dataset (E-DAIC), only audio and text modalities are used, and privacy evaluation is limited to black-box membership inference attacks.

## Related

- (link related pages by id as the wiki grows)
