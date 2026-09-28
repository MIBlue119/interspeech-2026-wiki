---
id: taghibeyglou26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-844
pdf: https://www.isca-archive.org/interspeech_2026/taghibeyglou26_interspeech.pdf
---

# Multi-Phonation Graph Learning with Self-Supervised Speech Embeddings for ALS Detection and Progression Prediction

*Behrad TaghiBeyglou, Fatemeh Bagheri, Ervin Sejdic*

[PDF](https://www.isca-archive.org/interspeech_2026/taghibeyglou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/taghibeyglou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-844)

**TL;DR** — A subject-level graph learning framework transforms multiple short phonation and syllable recordings into a single kNN graph using frozen SSL embeddings, outperforming baseline models on ALS dysarthria severity and progression prediction tasks. The best-performing configuration (HuBERT + Graph Isomorphism Network) achieves a macro-F1 of 0.73 on dysarthria severity and 0.69 on ALSFRS-R progression prediction on the validation set.

## Key contributions

- Formulates a subject-level graph representation that unifies multiple sustained vowels and DDK syllable recordings into a single kNN graph over SSL segment embeddings.
- Performs a systematic, comprehensive benchmark crossing four SSL speech front-ends and five GNN architectures on both SAND challenge tasks.
- Demonstrates consistent validation set gains over the SAND challenge baselines by leveraging multi-recording aggregation and graph message passing.

## Problem

Amyotrophic lateral sclerosis (ALS) progressively impairs speech motor control, making acoustic analysis a valuable non-invasive biomarker. However, automated severity staging and progression prediction remain difficult due to limited labeled clinical data, high inter-speaker variance, and clinical cues that are distributed across heterogeneous speech tasks and timestamps. Prior pipelines relying on handcrafted acoustic features or isolated deep models struggle with generalization across accents, recording conditions, and multi-task elicitation protocols.

## Method

The pipeline processes voice recordings (five sustained vowels /a, e, i, o, u/ and three DDK repetitions /pa, ta, ka/) originally sampled at 8 kHz by resampling them to 16 kHz. Audio clips are peak-normalized to [-1, +1], fixed to 20 seconds via tiling or truncation, and split into non-overlapping 2-second chunks, yielding $T = 10$ segments per recording (up to $N = 80$ nodes total per subject). Each chunk is passed through a frozen SSL model (base variants of wav2vec 2.0, HuBERT, data2vec-audio, or UniSpeech-SAT) to extract a 768-dimensional mean-pooled hidden vector. 

A single kNN graph per subject is built in the 768-dimensional embedding space using cosine similarity, with edges symmetrized and weighted by similarity scores, searching over $k \in \{1, 3, 5, 10\}$. Five GNN backbones (GCN, ResGCN, GAT with 4 heads, GraphSAGE, and GIN) process the node features with $L \in \{2, 3\}$ message-passing layers, hidden dimensions $d \in \{128, 256\}$, BatchNorm, ReLU, and dropout (0.3 or 0.5). Global mean pooling produces a subject-level representation fed into a two-layer MLP classifier.

Models are trained using AdamW with cosine learning-rate annealing, weight decay of $10^{-4}$, a batch size of 16, and early stopping (patience 50, max 200 epochs). Cross-entropy loss incorporates inverse-frequency class weighting to handle label imbalance. Hyperparameters are tuned via 10-fold stratified cross-validation before training on the official training split.

## Experimental setup

Evaluated on the Speech Analysis for Neurodegenerative Diseases (SAND) dataset containing 2,712 recordings from 339 Italian speakers (205 ALS patients, 134 healthy controls). The official split has 219 training and 53 validation subjects. Tasks include 5-class dysarthria severity classification (Task 1) and 4-class ALSFRS-R disease progression prediction (Task 2). Metrics reported are balanced accuracy (BACC), macro-F1 (mF1), and weighted F1 (wF1). Implemented in PyTorch 2.10.0 and HuggingFace Transformers 5.1.0 on a single NVIDIA RTX 5080 GPU with 16 GB VRAM.

## Results

For Task 1 (dysarthria severity), the HuBERT + GIN configuration achieves a validation macro-F1 of 0.73, weighted F1 of 0.67, and balanced accuracy of 0.72, outperforming the SAND validation baseline of 0.61. For Task 2 (progression prediction), the HuBERT + GIN configuration achieves a validation macro-F1 of 0.69, weighted F1 of 0.68, and balanced accuracy of 0.65, surpassing the baseline of 0.58. GIN consistently outperforms other GNN backbones across various SSL front-ends, and HuBERT embeddings yield the most robust representations among evaluated SSL extractors.

| System | Task 1 mF1 | Task 2 mF1 | Set |
| --- | --- | --- | --- |
| SAND Baseline (ViT / PART) | 0.61 | 0.58 | Val |
| TUKE (1st, Task 1) | 0.61 | – | Test |
| ISDS (1st, Task 2) | 0.51 | 0.58 | Test |
| Ours (HuBERT + GIN) | 0.73 | 0.69 | Val |
| Ours (Wav2Vec 2.0 + GIN) | 0.71 | 0.64 | Val |
| Ours (UniSpeech-SAT + GIN) | 0.62 | 0.68 | Val |

## Limitations

All SSL encoders were pretrained primarily on English corpora, whereas the SAND dataset consists of Italian speech, introducing a cross-lingual domain mismatch. Fixed-duration padding via tiling and truncation creates artificial audio repetitions that could bias the kNN graph construction. The kNN topology is unsupervised and static, risking the formation of edges based on channel or environmental artifacts rather than clinical proximity. Finally, evaluation is limited to the internal validation split rather than the final held-out test server.

## Why read this

Speech and ML researchers working on low-resource clinical biomarkers will learn how to effectively combine pretrained SSL embeddings with graph neural networks for multi-utterance patient profiling. The paper provides clear empirical evidence that sum-aggregating diverse phonation chunks via GIN outperforms standard message-passing architectures for pathological speech tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated remote monitoring of neurodegenerative diseases, digital health biomarker pipelines, and clinical speech assessment tools for low-resource settings.

## Related

- (link related pages by id as the wiki grows)
