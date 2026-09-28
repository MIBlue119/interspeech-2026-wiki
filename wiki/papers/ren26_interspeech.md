---
id: ren26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-67
pdf: https://www.isca-archive.org/interspeech_2026/ren26_interspeech.pdf
---

# MOS-Bias: From Hidden Gender Bias to Gender-Aware Speech Quality Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/ren26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-67)

**TL;DR** — This paper reveals that male listeners consistently assign higher Mean Opinion Score (MOS) ratings than female listeners, and proposes a gender-aware automated quality assessment model using abstract binary group embeddings to improve both overall and gender-specific prediction accuracy.

## Problem

Subjective listening tests are costly, driving reliance on automated Mean Opinion Score (MOS) predictors trained on aggregated human ratings. However, standard MOS aggregation ignores listener demographics, masking systematic perception gaps between groups. The authors investigate whether listener gender introduces hidden bias into these gold-standard benchmarks and how automated models inherit it.

## Method

Building upon the SSL-MOS framework and the BVCC dataset, the authors introduce a parallel gender-MOS branch alongside the standard mean-MOS prediction branch. Both branches share a self-supervised learning (SSL) encoder to leverage the full dataset. Instead of using explicit gender labels, the auxiliary network conditions predictions on abstract binary group embeddings (0 and 1) to autonomously isolate gender-specific scoring patterns via shared projection weights.

## Results

Evaluated on the BVCC test set across multiple random seeds, standard models trained on average MOS labels display a prediction skew, showing 15.6% lower utterance-level MSE against male ground truth than female ground truth. The proposed gender-aware model improves overall utterance-level LCC from 0.853 to 0.862 and reduces MSE from 0.290 to 0.239. For male-specific evaluation, the model improves LCC from 0.806 to 0.816, and for female-specific evaluation, LCC rises from 0.802 to 0.806.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing automated speech quality evaluators for text-to-speech, voice conversion, and speech enhancement systems to ensure equitable, unbiased scoring.

## Limitations

The empirical analysis is constrained by the limited availability of datasets containing listener gender metadata, relying primarily on the BVCC corpus.

## Related

- (link related pages by id as the wiki grows)
