---
id: xu26n_interspeech
category: health-clinical
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1233
pdf: https://www.isca-archive.org/interspeech_2026/xu26n_interspeech.pdf
---

# Automatic Graphical Representations of Language for Dementia Detection

*Lingfeng Xu, Si-Ioi Ng, Pranav S. Ambadi, Fan Lei, Kimberly D. Mueller, Julie Liss, Visar Berisha*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1233)

**Category:** `health-clinical` · **Labels:** `self-supervised`

**TL;DR** — An automated framework extracts Content Information Units (CIUs) from speech recordings using WhisperX and BERT, modeling narrative temporal dynamics as a directed graph to differentiate between cognitively normal and impaired speakers. The framework achieves a CIU identification F1 score of 0.865 on ASR transcripts and reveals significant differences in walk length, edge weight variability, and local jitter (Hedge's g up to 0.80 for unique nodes).

## Key contributions

- Proposes a fully automated pipeline combining WhisperX, BERT, and Layer-wise Relevance Propagation (LRP) to identify and localize 23 Content Information Units (CIUs) without manual transcriptions.
- Introduces a temporal graph representation for the Cookie Theft picture description task where nodes are CIUs, directed edges encode temporal transitions, and edge weights represent time intervals.
- Derives novel temporal and graph-based features—including normalized walk length, relative edge jitter, and degree centralization—to capture narrative organization and micro-temporal pacing instabilities.
- Demonstrates robust clinical discrimination on the W-ADRC dataset, showing that cognitively impaired speakers exhibit significantly longer transition intervals, increased pacing variability, and fewer unique nodes.

## Problem

Traditional cognitive status assessment via the Cookie Theft picture description relies heavily on labor-intensive manual CIU annotation, limiting scalability. Prior automated attempts used dictionary-based mapping with restricted vocabularies and word-level operations that ignored contextual sentence-level semantics and temporal dynamics. Furthermore, existing graph-based analyses focus exclusively on spatial distributions of CIUs across regions of the picture, leaving the temporal organization and narrative pacing of speakers largely underexplored.

## Method

Audio recordings are first downsampled to 16 kHz and processed via WhisperX to generate textual transcripts with word-level timestamps. A pre-trained BERT-base-uncased model fine-tuned on a multi-label classification task (23 CIU classes) processes the sentences, optimized using AdamW with a learning rate of 2e-5, batch size of 64, 20 epochs, and dropout rate of 0.2, augmented by a low-weight auxiliary ranking loss. To localize CIUs, a Layer-wise Relevance Propagation (LRP) method propagates relevance scores backward through self-attention layers to isolate word-level contributions; top scoring words are encoded with Sentence Transformers, and cosine similarity matches them to target CIU phrases (using anchor spans for actions). 

Using the identified CIU sequences and their onset timestamps, a directed temporal graph is constructed for each transcript, where nodes denote CIUs and edge weights correspond to transition time intervals. Graph features are extracted and normalized by word count to eliminate narrative length effects: unique nodes, normalized nodes, normalized walk length, normalized cycles, mean/std edge weight, degree centralization, and relative edge jitter (mean absolute difference between consecutive edge weights normalized by their mean).

## Experimental setup

Evaluated using the Pitt Corpus (DementiaBank), the Wisconsin Registry for Alzheimer’s Prevention (WRAP) (combined to train BERT: 2,783 transcripts from 1,352 speakers), and the Wisconsin Alzheimer’s Disease Research Center (W-ADRC) clinical core (testing set: 488 normal, 80 clinical samples / 306 normal, 64 clinical speakers). Baselines include traditional speech markers such as unfilled pause rate and speech rate. Metrics comprise Precision, Recall, F1 for CIU identification, CIU localization accuracy, and Welch's t-test with Hedge's g effect sizes and Bonferroni correction for feature comparisons.

## Results

The BERT model achieved an F1 score of 0.879 on manual transcripts and 0.865 on ASR transcripts for 23-class CIU identification. LRP-based localization achieved an average accuracy of 0.910 across categories, though performance dropped to 0.741 for the abstract action category 'action performed by the girl' due to vague phrase targets. 

In clinical group comparisons, the Clinical group produced significantly shorter descriptions (Word count: 95.34 vs 128.72, g=0.41), higher unfilled pause rates (0.39 vs 0.30, g=-0.36), and fewer unique nodes (12.33 vs 14.89, g=0.80). Temporal graph features revealed that the Clinical group had longer normalized walk lengths (0.50 vs 0.43, g=-0.28), greater mean edge weights (3.09 vs 2.62, g=-0.29), higher edge weight standard deviation (3.62 vs 2.80, g=-0.35), and increased relative edge jitter (1.18 vs 1.10, g=-0.37), indicating slowed, uneven narrative pacing.

| System / Condition | F1 Score (ASR) | Unique Nodes (Normal) | Unique Nodes (Clinical) | Relative Edge Jitter (Normal) | Relative Edge Jitter (Clinical) |
|---|---|---|---|---|---|
| Manual Transcripts | 0.879 | - | - | - | - |
| ASR Transcripts (Proposed) | 0.865 | 14.89 | 12.33 | 1.10 | 1.18 |

## Limitations

The framework relies on WhisperX, which is not specifically adapted for clinical speech containing disfluencies, resulting in occasional utterance segmentation errors and mistranscriptions of critical keywords. Localization accuracy suffers on abstract CIU categories (e.g., actions without explicit descriptive verbs). The dataset scope is restricted to English-language Cookie Theft descriptions, and further evaluation on broader clinical populations is required.

## Why read this

Researchers and engineers building automated digital health tools for cognitive screening will learn how to bridge Transformer-based text interpretation with temporal graph neural features to capture narrative pacing dynamics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated digital biomarker extraction for early clinical screening and longitudinal monitoring of Alzheimer's disease and mild cognitive impairment.

## Institutions / 機構

Arizona State University, University of Wisconsin-Madison, University of Waterloo

**Funding / 經費:** NIH-NIA

## Related

- (link related pages by id as the wiki grows)
