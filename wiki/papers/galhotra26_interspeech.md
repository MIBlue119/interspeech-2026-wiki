---
id: galhotra26_interspeech
category: paralinguistics-emotion
labels: [dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3234
pdf: https://www.isca-archive.org/interspeech_2026/galhotra26_interspeech.pdf
---

# Advancing Infant Distress Detection: Two- and Three-Way Classification in Real-World Audio Environments

*Yashaswi Galhotra, Priyanka Khante, Anna Madden-Rusnak, Kaya de Barbaro*

[PDF](https://www.isca-archive.org/interspeech_2026/galhotra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/galhotra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3234)

**Category:** `paralinguistics-emotion` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — This paper introduces deBarbaroFussCry, the first real-world dataset annotated for graded infant distress (crying, fussing, and non-distress) from daylong home audio, and establishes robust classification benchmarks using YAMNet embeddings combined with an RBF-kernel SVM (binary macro F1 = 0.803, ternary macro F1 = 0.624).

## Key contributions

- Released the deBarbaroFussCry dataset: augmenting 66 verified hours of infant-worn home audio with 4.75 hours of fussing and 3.15 hours of crying annotations.
- Established a state-of-the-art real-world binary distress detection pipeline (YAMNet + RBF SVM) achieving macro F1 = 0.803, improving over prior baselines by 17.8%.
- Introduced the first naturalistic benchmark for graded three-way distress classification (cry, fuss, non-distress), achieving macro F1 = 0.624.
- Demonstrated through cross-dataset evaluations that models trained on ecologically valid daylong audio generalize significantly better than lab-trained models.

## Problem

Prior infant distress detection models are overwhelmingly trained on controlled laboratory or clinical corpora with clean acoustics, causing severe performance degradation when deployed in real-world home environments. Furthermore, existing real-world systems collapse distinct distress states into a single binary category, discarding graded information (crying vs. fussing) that is essential for modeling sensitive caregiver responses. This work addresses the lack of naturalistic graded datasets and builds models capable of operating robustly amidst household background noise and overlapping speech.

## Method

The authors utilized the deBarbaroFussCry corpus, comparing temporal segmentation strategies and finding that 5-second sliding windows with a 4-second overlap yielded the optimal acoustic context and temporal precision (binary macro F1 = 0.676 via Gradient Boosting). To address class imbalance, undersampling was applied, and evaluation was strictly performed using Leave-One-Participant-Out Cross-Validation (LOPO-CV).

For feature extraction and classification, the pipeline leverages 1,024-dimensional embeddings from YAMNet (a 14-layer CNN pre-trained on AudioSet). To mitigate redundancy and overfitting under limited labeled data, Principal Component Analysis (PCA) was applied to reduce the embedding space to 300 components (retaining 90% variance). A grid of traditional machine learning classifiers, deep CNNs, and hybrid models was tested.

The top-performing architecture pairs YAMNet embeddings with an RBF-kernel Support Vector Machine (SVM), which effectively leverages margin-based classification to model non-linear decision boundaries in the high-dimensional embedding space. This binary setup was subsequently extended to ternary classification (fuss, cry, non-distress) using a one-vs-one multi-class strategy with majority voting.

## Experimental setup

Evaluated on the deBarbaroFussCry dataset derived from 742 hours of LENA daylong infant-worn home recordings (containing 66 hours of candidate segments, with 7.9 hours of verified distress). Baselines included traditional scikit-learn/XGBoost classifiers on 102-dimensional handcrafted pyAudioAnalysis features, standalone 2-4 layer CNNs on log-mel spectrograms, and frozen/fine-tuned YAMNet configurations. Performance was measured via macro-averaged F1 and distress-class precision/recall using Leave-One-Participant-Out Cross-Validation (LOPO-CV).

## Results

For binary classification, the hybrid YAMNet + RBF SVM achieved a headline macro F1 of 0.803 (distress precision 0.703, recall 0.793, F1 0.722), outperforming standalone Gradient Boosting on handcrafted features (0.676) and 3-layer log-mel CNNs (0.592). When extended to ternary classification, the YAMNet + SVM pipeline achieved a macro F1 of 0.624, with per-class F1 scores of 0.398 for fuss, 0.582 for cry, and 0.895 for non-distress. In cross-dataset evaluations, a model trained on the lab-based CRIED dataset dropped to F1 = 0.217 on deBarbaroFussCry, whereas the deBarbaroFussCry-trained model transferred robustly to CRIED at F1 = 0.718.

| System / Condition | Prec (Distress) | Rec (Distress) | F1 (Distress) | Macro F1 |
|---|---|---|---|---|
| Gradient Boosting (Handcrafted) | - | - | - | 0.676 |
| 3-Layer CNN (Log-Mel) | - | - | - | 0.592 |
| YAMNet (Fine-tuned) | - | - | - | 0.386 |
| YAMNet + Gradient Boosting | 0.682 | 0.787 | 0.706 | 0.761 |
| **YAMNet + RBF SVM (Binary)** | **0.703** | **0.793** | **0.722** | **0.803** |
| **YAMNet + RBF SVM (Ternary)** | 0.602 | 0.656 | 0.624 | **0.624** |

## Limitations

Fussing remains the hardest class to classify reliably, exhibiting relatively low precision (0.328) and frequent false positives due to acoustic overlap with non-distress and crying, as well as higher acoustic variability. The experiments are bounded by the specific characteristics of LENA child-worn hardware recordings and participant-level variation inherent to LOPO-CV evaluation protocols.

## Why read this

Researchers building real-world paralinguistic or child-centered audio monitoring tools should read this paper to see how combining pre-trained acoustic embeddings (YAMNet) with margin-based classifiers (SVM) overcomes the severe generalization gaps typical of lab-trained speech models.

## Code

- https://github.com/dailyactivitylab/InfantDistressClassification.git

## Applications

Automated home audio monitoring for infant wellbeing, computational tracking of caregiver responsiveness, and scalable developmental psychology research tools.

## Institutions / 機構

University of Texas at Austin

## Related

- (link related pages by id as the wiki grows)
