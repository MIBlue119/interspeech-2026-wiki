---
id: zhong26b_interspeech
category: health
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1057
pdf: https://www.isca-archive.org/interspeech_2026/zhong26b_interspeech.pdf
---

# A Benchmark for Early-stage Parkinson's Disease Detection from Speech

[PDF](https://www.isca-archive.org/interspeech_2026/zhong26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhong26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1057)

**TL;DR** — The paper introduces the first standardized, speaker-independent benchmark for speech-based early-stage Parkinson's disease (EarlyPD) detection, evaluating multiple models across diverse tasks and training data settings.

## Problem

Prior studies on speech-based early-stage Parkinson's disease (EarlyPD) detection suffer from inconsistent datasets, unstandardized disease definitions, and varied evaluation protocols, making direct comparisons impossible. Establishing a reliable benchmark with well-defined criteria (Hoehn and Yahr stage <= 2 and time after diagnosis <= 5 years) is critical to bridge machine learning research with actual clinical deployment.

## Method

The benchmark utilizes researcher-accessible public datasets (PC-GITA and NeuroVoz) alongside a private Dutch dataset (PERSPECTIVE-Base) to evaluate three speech tasks: sustained vowels (/a/), diadochokinetic sequences (/pa-ta-ka/), and sentence reading. A fixed, speaker-independent 5-fold split is applied, ensuring balanced validation and test sets of 6 EarlyPD and 6 healthy control speakers per fold. Four training data configurations are tested using three baseline models (BDHPD, InceptionPD, and RECA-PD) trained with early stopping on an NVIDIA A10 GPU. Models are evaluated at both utterance and aggregate logit levels using ROC-AUC and positive-class F1 score.

## Results

Evaluated on PC-GITA and NeuroVoz datasets across BDHPD, InceptionPD, and RECA-PD models, performance varies by task and training setting, with RECA-PD achieving the highest overall average F1 and AUC scores. Incorporating broader speaker diversity during training—either via non-EarlyPD data or external EarlyPD cohorts—consistently benefits DDK and sentence tasks. Adding external EarlyPD speakers from the private dataset improves AUC on shared tasks compared to strict early-only training. Utterance-level and aggregate-level metrics highlight trade-offs between threshold-independent AUC and threshold-dependent F1.

## Code

- https://github.com/terryyizhongru/B-EarlyPD-Speech

## Applications

Clinicians, speech pathologists, and machine learning engineers developing non-invasive screening tools for neurodegenerative disorders.

## Limitations

The public open track is restricted by the limited availability of datasets containing sufficient metadata to accurately filter for EarlyPD criteria.

## Related

- (link related pages by id as the wiki grows)
