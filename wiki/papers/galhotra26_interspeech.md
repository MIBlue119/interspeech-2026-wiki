---
id: galhotra26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3234
pdf: https://www.isca-archive.org/interspeech_2026/galhotra26_interspeech.pdf
---

# Advancing Infant Distress Detection: Two- and Three-Way Classification in Real-World Audio Environments

[PDF](https://www.isca-archive.org/interspeech_2026/galhotra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/galhotra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3234)

**TL;DR** — This paper introduces the first real-world dataset annotated for graded infant distress (crying, fussing, and non-distress) from daylong audio, achieving a macro F1 of 0.803 for binary detection and 0.624 for ternary classification.

## Problem

Prior infant distress detectors are predominantly trained on clean, controlled laboratory audio and fail catastrophically when deployed in real-world acoustic environments. Furthermore, existing models treat distress as a binary phenomenon, collapsing distinct emotional states (crying vs. fussing) that represent different levels of arousal and urgency. This binary collapse discards critical variability required to model fine-grained caregiver responses and developmental outcomes.

## Method

The authors augment the deBarbaroCry corpus—comprising 66 hours of daylong infant-worn LENA audio—with new ternary annotations, yielding 4.75 hours of fussing, 3.15 hours of crying, and 58.1 hours of non-distress. They process audio into overlapping 5-second segments and evaluate traditional machine learning baselines (using 102 pyAudioAnalysis acoustic descriptors), scratch-trained CNNs, and hybrid architectures combining 1,024-dimensional YAMNet embeddings with Gradient Boosting or RBF-kernel SVMs. The final pipeline uses PCA on YAMNet embeddings followed by an SVM classifier, extended to three-way classification via a one-vs-one strategy.

## Results

Evaluated using Leave-One-Participant-Out Cross-Validation (LOPO-CV), the best binary model (YAMNet + RBF-SVM) achieves a macro F1 of 0.803 (distress precision 0.703, recall 0.793, F1 0.722), outperforming traditional Gradient Boosting (0.676) and frozen YAMNet (0.275). The ternary YAMNet+SVM classifier establishes a new real-world benchmark of macro F1 = 0.624, with per-class F1 scores of 0.398 for fussing, 0.582 for crying, and 0.895 for non-distress. Cross-dataset evaluations confirm that lab-trained models degrade severely in real-world conditions, whereas naturalistic training generalizes more robustly.

## Code

- https://github.com/dailyactivitylab/InfantDistressClassification.git

## Applications

Speech and machine learning engineers, developmental psychologists, and health researchers building ecologically valid automated monitoring tools for infant vocalizations, early intervention programs, and caregiver responsiveness analysis.

## Limitations

Cross-dataset performance variations may partially stem from differences in dataset size and composition rather than purely ecological factors.

## Related

- (link related pages by id as the wiki grows)
