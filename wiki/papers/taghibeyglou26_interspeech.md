---
id: taghibeyglou26_interspeech
category: health
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-844
pdf: https://www.isca-archive.org/interspeech_2026/taghibeyglou26_interspeech.pdf
---

# Multi-Phonation Graph Learning with Self-Supervised Speech Embeddings for ALS Detection and Progression Prediction

[PDF](https://www.isca-archive.org/interspeech_2026/taghibeyglou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/taghibeyglou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-844)

**TL;DR** — A subject-level graph learning framework aggregates multiple speech phonation and DDK recordings via kNN graphs on pretrained self-supervised embeddings to predict ALS dysarthria severity and disease progression, achieving macro-F1 scores of 0.73 and 0.69 on the SAND validation set.

## Problem

Amyotrophic lateral sclerosis (ALS) impairs speech motor control early, making vocal analysis a promising non-invasive biomarker, but automated staging remains challenging due to limited labeled clinical data, high inter-speaker variability, and cues being dispersed across multiple elicitation tasks and time segments. Prior systems either rely on handcrafted acoustic descriptors with classical classifiers or end-to-end deep models that are data-hungry and prone to generalizing poorly across recording conditions and speakers. This work addresses the gap of effectively fusing multi-recording, multi-task acoustic data per subject in low-resource clinical environments.

## Method

The pipeline resamples audio to 16 kHz, normalizes waveforms, and structures them into fixed 20-second clips that are segmented into 2-second chunks (totaling 80 chunks per subject from 5 sustained vowels and 3 DDK syllables). Four frozen base-size SSL encoders are evaluated for feature extraction: wav2vec 2.0, HuBERT, data2vec-audio, and UniSpeech-SAT, generating 768-dimensional node embeddings. A k-nearest-neighbor (kNN) graph is constructed for each subject in cosine similarity embedding space, with edges symmetrized and weighted by similarity scores (hyperparameter k evaluated in {1, 3, 5, 10}). Five graph neural network backbones (GCN, ResGCN, GAT, GraphSAGE, and GIN) with message-passing layers, global mean pooling, and a two-layer MLP classifier are trained using AdamW, cosine annealing, and inverse-frequency class-weighted cross-entropy loss.

## Results

Evaluated on the SAND dataset comprising 339 Italian speakers (205 ALS, 134 controls) across 10-fold cross-validation and official validation splits. For Task 1 (5-class dysarthria severity), the best configuration (HuBERT combined with GIN) achieves a macro-F1 of 0.73, weighted F1 of 0.67, and balanced accuracy of 0.72 on the validation set, outperforming SAND validation baselines of 0.61. For Task 2 (4-class ALSFRS-R progression prediction), the HuBERT+GIN model achieves a validation macro-F1 of 0.69, weighted F1 of 0.68, and balanced accuracy of 0.65, exceeding the baseline of 0.58. GIN consistently outperformed other GNN backbones across tasks, and HuBERT generally provided the most robust feature front-end.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and clinical researchers developing non-invasive digital health tools, vocal biomarkers, and automated screening systems for neurodegenerative diseases.

## Limitations

All SSL encoders were pretrained primarily on English corpora while the SAND dataset is in Italian, creating a potential cross-lingual mismatch. Simple tiling and truncation to reach a fixed duration introduced artificial repetition, and the unsupervised kNN topology risks connecting segments based on nuisance characteristics rather than clinical relevance.

## Related

- (link related pages by id as the wiki grows)
