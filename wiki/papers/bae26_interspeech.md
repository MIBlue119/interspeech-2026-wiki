---
id: bae26_interspeech
category: dysarthria
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1390
pdf: https://www.isca-archive.org/interspeech_2026/bae26_interspeech.pdf
---

# Something from Nothing: Data Augmentation for Robust Severity Level Estimation of Dysarthric Speech

[PDF](https://www.isca-archive.org/interspeech_2026/bae26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bae26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1390)

**TL;DR** — This paper proposes a three-stage pseudo-labeling and weakly supervised contrastive learning framework using typical and dysarthric speech to improve dysarthric speech quality assessment, achieving an average Spearman’s Rank Correlation Coefficient of 0.761 across unseen cross-domain test datasets.

## Problem

Dysarthric speech quality assessment (DSQA) models are heavily constrained by the scarcity of expert-annotated clinical datasets, as only a small fraction of large corpora like the Speech Accessibility Project (SAP) are rated by speech-language pathologists. Furthermore, existing models trained exclusively on limited English data often fail to generalize to cross-domain, multilingual settings with diverse etiologies.

## Method

The framework utilizes Whisper-large as the speech encoder and operates in three stages: a teacher regression model trained on the limited labeled SAP subset generates pseudo-labels for a much larger unlabeled SAP corpus; the pseudo-labeled data is combined with the typical LibriSpeech corpus for weakly supervised pretraining using a label-aware contrastive learning strategy; and finally, the representation layers are fine-tuned on the labeled SAP subset for regression. The architecture extracts normalized feature vectors from Whisper, maps them through linear projection layers, and applies statistical temporal pooling followed by a final linear layer. Training incorporates both fine-grained pseudo-labels for dysarthric utterances and normal speech data to enhance speaker and acoustic variability.

## Results

Evaluated on the SAP test set and five unseen cross-domain datasets (UASpeech, DysArinVox, EasyCall, EWA-DB, and NeuroVoz) spanning multiple languages and etiologies (such as ALS, CP, PD, and AD), the Whisper-large baseline achieves an utterance-level SRCC of 0.719 on SAP and an average speaker-level SRCC of 0.732 cross-domain. The full three-stage framework improves the cross-domain average SRCC to 0.761 while preserving performance on SAP. Ablations confirm that weak supervision during representation learning and the inclusion of the LibriSpeech dataset are essential for harmonizing datasets and boosting cross-domain robustness.

## Code

- https://github.com/JaesungBae/DA-DSQA

## Applications

Speech engineers and clinical researchers can use this framework to build objective, automated dysarthric speech quality assessment systems for continuous remote health monitoring and inclusive speech technology development.

## Limitations

The approach relies on pseudo-labeling which introduces label noise, and the initial training phase is restricted to English-only datasets before evaluating on multilingual cross-domain test sets.

## Related

- (link related pages by id as the wiki grows)
