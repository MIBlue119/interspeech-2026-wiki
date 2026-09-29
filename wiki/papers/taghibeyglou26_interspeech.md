---
id: taghibeyglou26_interspeech
category: health-clinical
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-844
pdf: https://www.isca-archive.org/interspeech_2026/taghibeyglou26_interspeech.pdf
---

# Multi-Phonation Graph Learning with Self-Supervised Speech Embeddings for ALS Detection and Progression Prediction

*Behrad TaghiBeyglou, Fatemeh Bagheri, Ervin Sejdic*

[PDF](https://www.isca-archive.org/interspeech_2026/taghibeyglou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/taghibeyglou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-844)

**Category:** `health-clinical` · **Labels:** `self-supervised`

**TL;DR** — A subject-level graph learning framework transforms multiple short phonation and DDK recordings into a single kNN graph over frozen SSL embeddings, achieving macro-F1 of 0.73 on dysarthria severity and 0.69 on disease progression prediction.

## Key contributions

- A unified subject-level graph formulation that aggregates all available vowels and syllables per patient into a single kNN graph over SSL speech embeddings.
- Comprehensive benchmarking crossing four SSL feature extractors (wav2vec 2.0, HuBERT, data2vec-audio, UniSpeech-SAT) with five GNN architectures (GCN, ResGCN, GAT, GraphSAGE, GIN).
- Strong validation results surpassing SAND Challenge baselines across both dysarthria severity and ALSFRS-R progression forecasting tasks.

## Problem

Automated ALS staging and progression monitoring from speech are challenged by limited labeled clinical datasets, high inter-speaker acoustic variability, and the reality that clinical markers are distributed across diverse elicitation tasks and temporal segments. Prior pipelines relying on handcrafted acoustic descriptors or naive deep models struggle to generalize across speakers, recording conditions, and languages without task-specific tuning. This work addresses the gap by introducing a multi-recording fusion method capable of exploiting complementary cues across distinct vowel and syllable tokens.

## Method

Audio recordings containing five sustained vowels (/a, e, i, o, u/) and three diadochokinetic syllables (/pa, ta, ka/) were resampled from 8 kHz to 16 kHz, peak-normalized to [-1, +1], and fixed to 20 s clips via tiling or truncation. Each 20 s clip was segmented into ten non-overlapping 2 s chunks, yielding up to 80 node vectors per subject (8 recordings x 10 chunks). These chunks were passed through four frozen base-size SSL backbones, extracting 768-dimensional mean-pooled hidden states from the final encoder layer. A per-subject k-nearest-neighbor (kNN) graph was constructed in the 768-dimensional space using cosine similarity, with grid search exploring k in {1, 3, 5, 10}.

Five GNN backbones (GCN, ResGCN, GAT with 4 heads, GraphSAGE with mean aggregation, and GIN with sum aggregation) performed message passing over the subject graph. Grid search optimized hidden dimensions d in {128, 256}, layer depths L in {2, 3}, and dropout in {0.3, 0.5}. Graph-level representations were generated via global mean pooling followed by a two-layer MLP classifier with ReLU and dropout. Training utilized AdamW optimizer, cosine learning-rate annealing, initial learning rates in {10^-3, 3x10^-4}, weight decay of 10^-4, and cross-entropy loss weighted by inverse class frequency to handle label imbalance.

## Experimental setup

Evaluated on the Italian Speech Analysis for Neurodegenerative Diseases (SAND) dataset containing 2,712 voice recordings from 339 participants (205 ALS, 134 controls; split into 219 training and 53 validation subjects). Task 1 evaluates 5-class dysarthria severity, while Task 2 evaluates 4-class ALSFRS-R progression prediction. Metrics include macro-F1 (mF1), weighted F1 (wF1), and balanced accuracy (BACC) via stratified 10-fold cross-validation and official validation split evaluation. Experiments ran on a single NVIDIA RTX 5080 GPU (16 GB VRAM) using PyTorch and HuggingFace Transformers.

## Results

The top-performing configuration across both tasks was HuBERT paired with a Graph Isomorphism Network (GIN). For Task 1 (dysarthria severity), HuBERT+GIN attained a validation mF1 of 0.73, weighted F1 of 0.67, and balanced accuracy of 0.72, outperforming the challenge validation baseline of 0.61. For Task 2 (progression prediction), HuBERT+GIN achieved a validation mF1 of 0.69, weighted F1 of 0.68, and balanced accuracy of 0.65, improving upon the 0.58 baseline. GIN consistently outperformed GCN, ResGCN, GAT, and GraphSAGE due to its sum-aggregation property, which amplifies sparse local impairment signals across subject chunks.

| System / Condition | Task 1 mF1 | Task 2 mF1 | Evaluation Set |
| :--- | :--- | :--- | :--- |
| SAND Baseline (ViT / PART) | 0.61 | 0.58 | Validation |
| TUKE (1st place, Task 1) | 0.61 | – | Test |
| ISDS (1st place, Task 2) | 0.51 | 0.58 | Test |
| Ours (HuBERT + GIN) | 0.73 | 0.69 | Validation |
| Ours (Wav2Vec 2.0 + GIN) | 0.71 | 0.64 | Validation |
| Ours (UniSpeech-SAT + GIN) | 0.62 | 0.68 | Validation |

## Limitations

All SSL encoders were pretrained primarily on English corpora while the SAND dataset is Italian, introducing a cross-lingual domain mismatch. Fixed-duration padding via tiling and truncation introduces artificial repetition that can bias graph neighborhood construction, and unsupervised kNN edge creation may inadvertently group segments by acoustic nuisance factors rather than true pathology.

## Why read this

Researchers building speech-based biomarkers for neurodegenerative disorders will learn how to effectively fuse heterogeneous multi-task phonation recordings using graph neural networks and self-supervised embeddings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated remote monitoring systems for neurodegenerative diseases, clinical speech assessment tools, and low-resource digital biomarkers for disease progression tracking.

## Institutions / 機構

University of Toronto, North York General Hospital

## Related

- (link related pages by id as the wiki grows)
