---
id: yeh26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1394
pdf: https://www.isca-archive.org/interspeech_2026/yeh26_interspeech.pdf
---

# Who is Speaking or Who is Depressed? A Controlled Study of Speaker Leakage in Speech-Based Depression Detection

[PDF](https://www.isca-archive.org/interspeech_2026/yeh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yeh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1394)

**TL;DR** — This study demonstrates that speech-based depression detection models heavily exploit speaker identity cues rather than true clinical biomarkers, causing accuracy to plummet from nearly 98% under speaker-overlapped evaluation down to random chance for unseen speakers.

## Problem

Recent speech-based depression detection systems routinely report classification accuracies exceeding 90% on benchmark datasets like DAIC-WOZ, but often collapse to random chance when deployed on unseen patients. This discrepancy is driven by speaker leakage—where recordings from the same individuals appear in both training and test sets—causing models to learn non-causal speaker voiceprints rather than genuine clinical biomarkers. Consequently, conventional evaluation protocols severely overestimate the real-world generalization and clinical utility of these systems.

## Method

The authors propose a size-matched data splitting framework on the DAIC-WOZ dataset (189 subjects, 6,545 segments) that holds training set size constant (5,117 segments) while controlling whether test speakers are observed during training. They evaluate three model families of increasing complexity: (i) Wav2Vec-Linear Probing with frozen CNN and fine-tuned transformer layers, (ii) XLSR-eGeMAPS Concatenation combining XLS-R embeddings with hand-crafted OpenSMILE features, and (iii) Wav2Vec-SLS utilizing Sensitive Layer Selection to aggregate multi-layer representations. Each architecture is tested in original and Domain-Adversarial Neural Network (DANN) configurations using a Gradient Reversal Layer to explicitly suppress speaker identity features.

## Results

Under speaker-overlapped evaluation (Training Set B), fine-tuned Wav2Vec and Wav2Vec-SLS models achieve stellar accuracies of 97.65% and 98.31%, respectively. However, under strict speaker-independent evaluation (Training Set A) with identical training set sizes, accuracy drops sharply to 58.74% for fine-tuned Wav2Vec and 70.31% for Wav2Vec-SLS. The XLSR-eGeMAPS concatenation models yield lower baseline accuracy (around 62% to 67%) but also display severe drops in generalization. Applying DANN adversarial training provides only limited recovery, confirming that pathological depression markers and speaker identity remain deeply entangled in modern speech representations.

## Code

- https://github.com/jen900704/Speech-Depression-Speaker-Leakage

## Applications

Clinicians, machine learning engineers, and researchers building automated speech-based mental health screening tools to ensure clinically valid evaluation protocols.

## Limitations

The investigation is constrained to the DAIC-WOZ dataset and evaluates specific architectural families, leaving broader cross-corpus validation as future work.

## Related

- (link related pages by id as the wiki grows)
