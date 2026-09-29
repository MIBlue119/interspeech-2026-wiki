---
id: xiao26b_interspeech
category: health-clinical
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2266
pdf: https://www.isca-archive.org/interspeech_2026/xiao26b_interspeech.pdf
---

# WSG: Clinically-Informed Weighted Speech Graphs for Dementia Detection

*Yao Xiao, Fritz Peters, Madhurananda Pahar, Dorota A Braun, Caitlin H Illingworth, Stefan Goetze, Daniel Blackburn, Heidi Christensen*

[PDF](https://www.isca-archive.org/interspeech_2026/xiao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xiao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2266)

**Category:** `health-clinical`

**TL;DR** — Weighted Speech Graphs (WSGs) integrate clinically motivated semantic, phonological, spatial, and temporal attributes into speech graph edge weights for dementia detection, achieving competitive classification using only one or two features. Restricting graph construction to target task words rather than full transcripts yields substantial performance improvements.

## Key contributions

- Proposes Weighted Speech Graphs (WSGs), incorporating semantic, phonological, spatial, and temporal attributes as edge weights into speech graphs for cognitive decline analysis.
- Demonstrates that constructing graphs strictly from task-relevant target words (correct fluency responses and Content Information Units) rather than full transcripts markedly improves classification performance.
- Releases PyWSG, an open-source Python framework for graph construction, topological feature extraction, and visualisation.
- Shows that compact subsets of 1-2 clinically informed features match or exceed the performance of larger unweighted feature sets.

## Problem

Traditional speech graph approaches model word trajectories as unweighted directed graphs of abstract tokens, completely ignoring word meaning, pronunciation, and picture description locations. Consequently, they fail to explicitly capture vital cognitive indicators like switching behaviors between semantic or phonological clusters and spatial jumps during picture description. Furthermore, including non-target words such as filled pauses and interjections creates overly connected nodes that distort underlying graph connectivity metrics.

## Method

The framework first extracts task-relevant target words: spellchecker-verified words starting with 'p' for phonemic verbal fluency (PVF), WordNet animal meanings for semantic verbal fluency (SVF), and Content Information Units (CIUs) via a standard dictionary for Cookie Theft Description (CTD). A weighted, directed graph is then constructed using NetworkX where nodes represent unique target words and edges represent consecutive transitions. Edge weights encode domain-specific attributes: ConceptNet Numberbatch and SoundVectors cosine distances for semantic and phonological weights; scaled 2D Euclidean distances for spatial weights; and inter-word time differences for temporal weights.

Topological features including number of edges (E), number of nodes (N), total word count (WC), diameter, average shortest path length (ASP), density, and average total degree (ATD) are computed in both weighted and unweighted formulations. Distance vs. similarity weights are carefully chosen to preserve directional mapping (e.g., smaller phonological diameter or temporal ASP for dementia due to reduced clustering and slower generation rates). Sequential Forward Selection (SFS) using the mean of F1 and AUC selects compact feature subsets via inner folds, which are then used to train Naïve Bayes classifiers for binary healthy-versus-dementia classification.

## Experimental setup

Evaluated on two datasets: CognoMemory (110 recordings across 92 individuals performing SVF, PVF, and CTD, transcribed via WhisperX using Whisper large) and the ADReSS dataset (156 audio recordings and manual transcripts for CTD). Evaluated via stratified 5-fold cross-validation on CognoMemory and the official train/test split on ADReSS. Performance is measured using Area Under the ROC Curve (AUC) and F1-score against baseline models utilizing unweighted features and full-transcript inputs.

## Results

Restricting graph input from all words to target words only boosts PVF F1/AUC from 0.55/0.56 to 0.75/0.75, and ADReSS CTD F1/AUC from 0.47/0.64 to 0.73/0.77. Using the SFS-selected final subset of 1-2 features yields robust cross-dataset generalisation: on ADReSS CTD, a 2-feature model achieves an F1 of 0.73 and AUC of 0.75, matching the full baseline feature set performance while utilizing a fraction of the features. The most frequently selected features include phonological diameter for PVF (dementia mean 2.8 vs HC 5.3), temporal diameter/ASP for SVF, and spatial ASP combined with word count for CTD.

| System / Condition | Input Representation | Feature Set | F1-Score | AUC |
|---|---|---|---|---|
| Baseline PVF [14] | All words | Baseline (13 features) | 0.55 | 0.56 |
| Target-Word PVF | Target words only | Baseline (13 features) | 0.75 | 0.75 |
| WSG PVF (Proposed) | Target words only | SFS Final Subset (1 feature) | 0.77 | 0.75 |
| Baseline ADReSS CTD [14] | All words | Baseline (13 features) | 0.47 | 0.64 |
| Target-Word ADReSS CTD | Target words only | Baseline (13 features) | 0.73 | 0.77 |
| WSG ADReSS CTD (Proposed) | Target words only | SFS Final Subset (2 features) | 0.73 | 0.75 |

## Limitations

The study relies heavily on automatic transcription tools (WhisperX) for datasets lacking manual transcripts, which introduces alignment and transcription errors that could affect temporal measurements. The evaluation is restricted to English-language datasets primarily containing Alzheimer's disease cases, limiting claims regarding cross-linguistic and broader multi-etiology dementia generalizability. Furthermore, the Naïve Bayes classifier scope restricts exploration of complex non-linear feature interactions.

## Why read this

Researchers and clinical NLP engineers working on automated cognitive screening should read this to see how injecting linguistic and spatial priors into graph edge weights drastically reduces feature dimensionality while preserving interpretability. It provides an open-source Python framework (PyWSG) and demonstrates that targeted word extraction outperforms raw transcript graph parsing.

## Code

- https://github.com/yaoxiao1999/weighted-speech-graphs

## Applications

Automated screening and longitudinal monitoring of dementia and cognitive decline via routine speech elicitation tasks in clinical or telehealth settings.

## Institutions / 機構

University of Sheffield

## Related

- (link related pages by id as the wiki grows)
