---
id: li26ga_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2578
pdf: https://www.isca-archive.org/interspeech_2026/li26ga_interspeech.pdf
---

# Gated Multi-graph Fusion via Graph Attention Networks for Alzheimer’s Disease Detection

[PDF](https://www.isca-archive.org/interspeech_2026/li26ga_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ga_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2578)

**TL;DR** — This paper proposes a multi-view gated graph attention network that models spontaneous speech through content, structure, and flow to detect Alzheimer's disease with 90.00% test accuracy.

## Problem

Many automated Alzheimer's disease detection systems fail to account for nonlinear structural disruptions in pathological language and clinical heterogeneity across patients. Existing models also typically rely on simplistic feature fusion strategies like concatenation or fixed-weight summation, which limit their adaptability to diverse symptomatic manifestations.

## Method

The framework transcribes audio using Whisper and initializes word-level node features via BERT-base embeddings. It constructs three distinct graphs sharing the same vertex set: a semantic graph based on cosine similarity, a dependency graph derived from spaCy syntactic parsing, and a co-occurrence graph quantifying discourse flow using Pointwise Mutual Information (PMI) from a healthy normative corpus. A Graph Attention Network (GAT) extracts topological features from each view, and an adaptive gating network dynamically fuses them on a per-sample basis. The final representations pass through an MLP trained with a label-smoothed binary cross-entropy loss.

## Results

Evaluated on the ADReSSo 2021 dataset (comprising 237 English speakers describing the Cookie Theft picture), the model achieves 88.81% 5-fold cross-validation accuracy and 90.00% test set accuracy, outperforming baselines such as Luz et al., Balagopalan et al., and Ortiz-Perez et al. Ablation studies reveal that removing the PMI-based co-occurrence graph drops the test F1-score to 85.29%, removing the gated fusion mechanism drops test accuracy to 87.14%, and stripping all graph structures down to averaged BERT embeddings degrades test accuracy to 81.43%.

## Code

- https://github.com/opeacc/AD

## Applications

Clinicians and healthcare researchers can use this automated speech analysis tool for non-invasive screening and assessment of Alzheimer's disease.

## Limitations

The text does not state any specific limitations.

## Related

- (link related pages by id as the wiki grows)
