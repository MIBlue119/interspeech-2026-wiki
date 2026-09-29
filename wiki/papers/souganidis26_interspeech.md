---
id: souganidis26_interspeech
category: applications-other
labels: [low-resource, self-supervised]
institutions: ["University of the Basque Country UPV/EHU"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1948
pdf: https://www.isca-archive.org/interspeech_2026/souganidis26_interspeech.pdf
---

# Discriminating Proficiency Levels in L2 Speech: A Comparative Study of Self-Supervised Models in Basque

*Christoforos Souganidis, Aitor Bellanco, Andoni Sudupe, Inma Hernáez, Ibon Saratxaga, Eva Navas*

[PDF](https://www.isca-archive.org/interspeech_2026/souganidis26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/souganidis26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1948)

**Category:** `applications-other` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — This paper investigates automated speaking assessment for low-resource languages by using self-supervised speech representations to classify C1-level proficiency in Basque, finding that multilingual mHuBERT-147 outperforms wav2vec 2.0 xlsr.

## Key contributions

- Evaluates holistic CEFR C1-level proficiency classification in Basque, a low-resource language isolate with limited data.
- First study to apply mHuBERT-147 to automated oral proficiency assessment and compare it against wav2vec 2.0 variants.
- Compares findings against a public benchmark using the ICNALE English L2 corpus to contrast linguistic and proficiency contexts.
- Analyzes multi-seed aggregation strategies (Model Soup, Seed Majority Vote, and Probability-averaging Majority Vote).

## Problem

Automated speaking assessment (ASA) research has overwhelmingly focused on intermediate proficiency levels in high-resource languages like English, leaving low-resource languages underexplored. While self-supervised learning (SSL) helps bypass the need for expensive manual transcriptions, curating standardized learner corpora across diverse CEFR levels remains difficult. Furthermore, distinguishing high-level speakers (C1 and above) involves subtle discourse and prosodic variations rather than basic pronunciation errors, making high-proficiency classification exceptionally challenging.

## Method

The study employs pre-trained self-supervised models—specifically wav2vec 2.0 (base and large-xlsr) and mHuBERT-147—as feature extractors and fine-tunes them for binary classification. The architecture passes raw 16 kHz audio through a convolutional encoder followed by a transformer-based contextual encoder, pooling frame-level hidden states into segment-level representations via mean-pooling. These representations feed into a linear binary classification head trained via cross-entropy loss.

Models are optimized using AdamW (weight decay 0.01, epsilon 1e-8) with a linear learning rate scheduler and a 0.1 warm-up ratio, employing a batch size of 4 with gradient accumulation over 4 steps. The CNN feature encoder is frozen during fine-tuning, and early stopping with a 3-epoch patience is driven by validation set Equal Error Rate (EER). Training explored peak learning rates of 1e-5, 2e-5, 2.5e-5, and 5e-5 across five random seeds.

At inference, examinees' longer monologs are segmented into 20-second chunks, and segment predictions are aggregated using three strategies: Model Soup (averaging weights across seeds), Seed Majority Vote (majority vote of hard labels per seed across segments, then across seeds), and Probability-averaging Majority Vote (averaging segment probabilities, thresholding, then majority voting across seeds).

## Experimental setup

Experiments utilize two datasets: C1-HABE (107 hours total across 309 exam recordings of Basque C1 examinees, segmented into 20-second chunks, split into ~22h train, ~1.8h dev, and ~12.8h test) and ICNALE (L2 English corpus comprising B1 vs B2+ levels, split into ~51h train, ~2.8h dev, and ~2.8h test). Baselines include wav2vec 2.0 xlsr (1024 dim) and wav2vec 2.0 base (768 dim). Evaluation metrics are accuracy, F1-score, and Equal Error Rate (EER), supported by mixed-effects logistic regression with Bonferroni-corrected p-values.

## Results

For Basque C1 classification (C1-HABE), mHuBERT-147 achieves the highest accuracy of 0.795 and an F1-score of 0.715 using Seed Majority Vote, significantly outperforming wav2vec 2.0 xlsr (p = .036), which maxes out at an accuracy of 0.774 and F1 of 0.686. Conversely, on the English ICNALE dataset, wav2vec 2.0 base achieves superior performance with an accuracy of 0.965 and F1 of 0.842 via Seed Majority Vote, significantly outperforming mHuBERT-147 (p = .0417). Ensemble strategy comparisons reveal that Seed Majority Vote (SMV) consistently yields the most correct predictions, significantly outperforming both Model Soup and Probability-averaging Majority Vote.

| System & Dataset | Strategy | Accuracy | F1-Score |
|---|---|---|---|
| C1-HABE: wav2vec 2.0 xlsr | Model Soup | 0.774 | 0.686 |
| C1-HABE: mHuBERT-147 | Seed Majority Vote | 0.795 | 0.715 |
| ICNALE: wav2vec 2.0 base | Seed Majority Vote | 0.965 | 0.842 |
| ICNALE: wav2vec 2.0 xlsr | Model Soup | 0.874 | 0.787 |
| ICNALE: mHuBERT-147 | Model Soup | 0.806 | 0.677 |

## Limitations

The dataset contains potential class contamination where 'Pass' examinees might reach C2 proficiency rather than strictly C1. L1 backgrounds vary widely in ICNALE (affecting transfer due to tonal/suprasegmental L1 interference) compared to the homogenous Basque/Spanish L1 background in C1-HABE, confounding cross-corpus comparisons. Acoustic quality variations over time and differing pre-training dataset scales across the evaluated SSL models also act as uncontrolled confounding factors.

## Why read this

Speech researchers and CALL engineers tackling automated proficiency evaluation in low-resource or non-English languages will learn how multilingual SSL models like mHuBERT-147 compare against wav2vec 2.0 on high-level (C1) assessment tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning (CALL) platforms, automated oral proficiency placement tests, and computer-based CEFR certification grading systems.

## Institutions / 機構

University of the Basque Country UPV/EHU

**Funding / 經費:** Department of Culture and Language Policy of the Basque Government

## Related

- (link related pages by id as the wiki grows)
