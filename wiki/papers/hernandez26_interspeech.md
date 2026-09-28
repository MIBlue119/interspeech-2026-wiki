---
id: hernandez26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-773
pdf: https://www.isca-archive.org/interspeech_2026/hernandez26_interspeech.pdf
---

# Adapting Self-Supervised Speech Representations for Cross-Lingual Dysarthria Detection in Parkinson's Disease

[PDF](https://www.isca-archive.org/interspeech_2026/hernandez26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hernandez26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-773)

**TL;DR** — This paper proposes a simple representation-level language shift technique using healthy control centroids to align cross-lingual self-supervised speech embeddings, substantially improving sensitivity and F1-score for Parkinson's disease dysarthria detection when target-language pathological data is absent.

## Problem

Automatic dysarthria detection models often struggle to generalize across languages because self-supervised speech models encode language-dependent phonological and rhythmic properties that confound pathology classification. This language-induced domain shift is especially problematic in clinical applications where target-language pathological data is scarce or unavailable. Developing methods that remove this language-dependent variation without requiring extensive model retraining or target labels is critical for global clinical screening tools.

## Method

The method operates on frozen self-supervised speech model representations (HuBERT-Large, WavLM-Large, and XLS-R-300M) extracted from oral diadochokinesis /pa-ta-ka/ recordings. Speaker-level vectors are obtained by frame-level mean-pooling, chunk averaging, and utterance averaging. To perform domain adaptation, a centroid-based vector arithmetic shifts source-language embeddings toward the target-language space by subtracting the source healthy control centroid and adding the target healthy control centroid, estimated strictly within training cross-validation folds. Classification is subsequently performed using a logistic regression model with threshold tuning enforcing a minimum sensitivity of 0.9.

## Results

Evaluated on Parkinson's disease datasets in Czech, German, and Spanish using 5-fold stratified cross-validation across three random seeds. In pure cross-lingual settings lacking target-language patient data, baseline models yielded severely imbalanced predictions with high specificity but poor sensitivity (e.g., HuBERT achieved 0.98 specificity vs 0.35 sensitivity on Czech), while applying the language shift substantially recovered sensitivity (to 0.93) and improved F1 (from ~0.48 to 0.74 on Czech). In multilingual settings where target-language patient data was present, the language shift yielded smaller, consistent gains in specificity while preserving high sensitivity.

## Code

- https://github.com/abnerLing/language-shift-dysarthria

## Applications

Speech and machine learning engineers developing cross-lingual clinical screening tools and automated diagnostic assistants for neurodegenerative speech disorders.

## Limitations

Performance varies across languages, with German remaining a more challenging target language across tested models.

## Related

- (link related pages by id as the wiki grows)
