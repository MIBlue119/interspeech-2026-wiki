---
id: li26ga_interspeech
category: health-clinical
institutions: ["Tianjin University", "Chinese Academy of Sciences", "Fuzhou University", "Huiyan Technology"]
code: https://github.com/opeacc/AD
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2578
pdf: https://www.isca-archive.org/interspeech_2026/li26ga_interspeech.pdf
---

# Gated Multi-graph Fusion via Graph Attention Networks for Alzheimer’s Disease Detection

*Jinyu Li, Xiao Wei, Bin Wen, Kai Li, Yuqin Lin, Xiaobao Wang, Longbiao Wang, Jianwu Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/li26ga_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ga_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2578)

**Category:** `health-clinical`

**TL;DR** — This paper proposes a Multi-View Gated Graph Attention Network that models spontaneous speech via a 'content-structure-flow' framework to detect Alzheimer's Disease, achieving 90.00% accuracy on the ADReSSo test set.

## Key contributions

- Introduces a 'content–structure–flow' tripartite linguistic framework utilizing semantic, dependency, and co-occurrence graphs for spontaneous speech analysis.
- Designs a Pointwise Mutual Information (PMI) based co-occurrence graph derived from healthy normative data to quantify narrative logic deviations and temporal discourse flow anomalies.
- Implements a heterogeneity-aware gated fusion mechanism that dynamically weights multi-view graph representations on a per-sample basis to handle diverse clinical symptoms.
- Establishes a robust ASR-to-graph node mapping pipeline utilizing Whisper and BERT-base token-averaged embeddings.

## Problem

Spontaneous speech is a critical non-invasive biomarker for Alzheimer's Disease (AD), but prior systems often overlook nonlinear structural disruptions and clinical heterogeneity in pathological language. Traditional machine learning relies heavily on handcrafted acoustic and lexical features, whereas recent deep learning and LLM methods capture semantics implicitly without explicitly modeling multi-dimensional linguistic degradation or narrative flow. Furthermore, existing graph-based approaches use simplistic fusion strategies like concatenation or fixed-weight summation, failing to adapt to diverse symptomatic manifestations across different patients.

## Method

The architecture processes raw audio from the 'Cookie Theft' picture description task using Whisper for robust transcription in the presence of disfluencies. The resulting word sequence is converted into 768-dimensional node features via BERT-base by averaging WordPiece token embeddings for each word. Three distinct graphs are constructed over the same word vertex set: a semantic graph (using cosine similarity with threshold tau_s = 0.8), a dependency graph (using spaCy syntactic dependencies), and a co-occurrence graph (using sliding window PMI with window size n = 3 and threshold tau_c = 0.3 calculated from a healthy normative corpus D_hc).

Topological features for each graph view are extracted via a single-layer Graph Attention Network (GAT) with 2 attention heads and a hidden dimension of 128. To resolve clinical heterogeneity, a gating network computes a dynamic weight vector over the concatenated view representations [z_sem || z_syn || z_co], producing a weighted sum fused vector alongside pass-through concatenations to preserve individual view details.

The final vector is processed by an MLP with a 256-unit hidden layer, a dropout rate of 0.5, and a weight decay of 0.003, outputting a probability via a Sigmoid function. Training utilizes the Adam optimizer with an initial learning rate of 1e-3, a ReduceLROnPlateau scheduler, a batch size of 8, and a maximum of 100 epochs, optimized using a Smoothed Binary Cross-Entropy Loss with a label smoothing parameter of alpha = 0.2.

## Experimental setup

Evaluated on the standardized ADReSSo 2021 Challenge dataset (a subset of the Pitt Corpus within DementiaBank), comprising 237 English speakers (122 AD, 115 HC) split into 166 training and 71 test participants after filtering out samples lacking valid subject speech segments. Compared against baselines by Luz et al., Balagopalan et al., Ajroudi et al., Cai et al., and Ortiz-Perez et al. using accuracy, F1-score, recall, and precision. Implemented using an NVIDIA GeForce RTX 4090D GPU.

## Results

The proposed model achieves a 5-fold cross-validation accuracy of 88.81% and an accuracy of 90.00% (F1-score 89.86%, Recall 88.57%, Precision 91.18%) on the test set, outperforming baseline methods such as Ortiz-Perez et al. (81.43% test accuracy) and Cai et al. (84.29% test accuracy).

Ablation experiments demonstrate that removing the graph structure entirely ('w/o Graph Structure') causes a severe drop in test accuracy to 81.43% and F1 to 80.60%. Removing the co-occurrence graph drops the F1-score to 85.29%, while removing the semantic graph, dependency graph, and gated fusion results in test accuracies of 85.71%, 87.14%, and 87.14% respectively.

| Method | Accuracy | F1-Score | Recall | Precision |
|---|---|---|---|---|
| Luz et al. [28] | 79.71 | 78.12 | 73.53 | 83.33 |
| Balagopalan et al. [11] | 82.86 | 83.33 | 85.71 | 81.08 |
| Ajroudi et al. [12] | 81.43 | 81.16 | 80.00 | 82.35 |
| Cai et al. [14] | 84.29 | 83.58 | 80.00 | 87.50 |
| Ortiz-Perez et al. [29] | 81.43 | 80.60 | 77.14 | 84.38 |
| **Ours** | **90.00** | **89.86** | **88.57** | **91.18** |

## Limitations

The evaluation is restricted to a single English-language dataset (ADReSSo 2021 / Pitt Corpus) containing a relatively small sample size of 237 speakers, potentially limiting generalization to broader clinical populations and other languages. The approach relies entirely on text transcripts derived from ASR, completely omitting acoustic prosody and paralinguistic cues in the current graph formulation.

## Why read this

Researchers and speech engineers working on computer-aided diagnosis of cognitive decline will find this paper valuable for its novel application of normative corpus PMI to model narrative discourse flow and its adaptive gated multi-graph fusion architecture.

## Code

- https://github.com/opeacc/AD

## Applications

Automated, non-invasive digital screening and longitudinal monitoring of Alzheimer's Disease and related dementias using spontaneous speech.

## Institutions / 機構

Tianjin University, Chinese Academy of Sciences, Fuzhou University, Huiyan Technology

**Funding / 經費:** National Natural Science Foundation of China, National Talent Program

## Related

- [LoRA-Tuned Large Language Models for Dementia Detection via Multi-View Speech-Derived Features](park26c_interspeech.md) — same problem · relatedness 3.0/3
- [Listening Between the Lines: Joint Learning of ASR Embeddings and LLM-Augmented Linguistics for Dementia Detection](jung26_interspeech.md) — same problem · relatedness 3.0/3
- [Cognitive-Heuristic Guided Multimodal Data Augmentation for Alzheimer’s Disease Detection Using LLM and TTS](jiang26e_interspeech.md) — same problem · relatedness 2.8/3
- [WSG: Clinically-Informed Weighted Speech Graphs for Dementia Detection](xiao26b_interspeech.md) — same problem · relatedness 2.7/3
- [Rethinking Acoustic Variability Of ADReSS and ADReSSo Datasets For Dementia Detection](zafar26_interspeech.md) — same problem · relatedness 2.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
