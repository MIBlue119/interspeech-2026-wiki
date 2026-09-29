---
id: kopar26_interspeech
category: health-clinical
labels: [self-supervised]
institutions: ["Hertie Institute for AI in Brain Health", "Tübingen AI Center", "Humboldt-Universität zu Berlin", "Tübingen University Hospital", "Tübingen Center for Mental Health", "German Center for Mental Health", "University Medical Center Schleswig-Holstein", "Hertie Institute for Clinical Brain Research", "Friedrich-Alexander-Universität Erlangen-Nürnberg", "Charité–Universitätsmedizin"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2725
pdf: https://www.isca-archive.org/interspeech_2026/kopar26_interspeech.pdf
---

# Beyond Binary: Speech Representations Across the Cognitive Score Hierarchy

*Serli Kopar, Roshan P. Rane, Christian Mychajliw, Lydia Federmann, Gerhard Eschweiler, Daniela Berg, Sam Gijsen, Paula Andrea Pérez-Toro, Kerstin Ritter*

[PDF](https://www.isca-archive.org/interspeech_2026/kopar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kopar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2725)

**Category:** `health-clinical` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates how speech representations (hand-crafted eGeMAPS vs. self-supervised HuBERT/W2V2 embeddings) predict cognitive status across a three-tier clinical assessment hierarchy (task, domain, and global levels) using 5,754 German neuropsychological recordings. It reveals a dichotomy where open-ended "specialist" tasks suffer predictive dilution at higher aggregation levels, whereas constrained "generalist" screening tasks show inverse dilution, improving as scores are aggregated.

## Key contributions

- Evaluates speech-based mild cognitive impairment (MCI) prediction across a formal three-level neuropsychological hierarchy (individual tests, cognitive domains, and global status).
- Analyzes 5,754 recordings from an elderly German cohort across five CERAD+ diagnostic tasks and the MMSE screening task.
- Identifies opposing aggregation dynamics: a "dilution effect" for open-ended specialist tasks (like phonemic fluency) and an "inverse dilution effect" for constrained generalist tasks (like MMSE).
- Releases code publicly to support future reproducibility and clinical speech analysis research.

## Problem

Automated clinical speech analysis frequently suffers from three core bottlenecks: a narrow focus on binary patient-vs-control classification that overlooks subtle cognitive shifts in mild cognitive impairment (MCI), a heavy reliance on English-centric and single-task datasets, and treating clinical scores as flat targets while ignoring the hierarchical architecture of standardized batteries like CERAD+. Standard screening and diagnostic instruments span individual task scores, composite cognitive domains, and global clinical statuses. Modeling these relationships helps uncover how specific speech patterns map onto multi-domain cognitive decline.

## Method

The study utilizes speech recordings from the TREND study, comprising one MMSE screening task and five CERAD+ diagnostic tasks (Word List Recognition [RW], Boston Naming Test [BNT], Word List Recall [RL], Verbal Fluency [VF], and Phonemic Fluency [PF]). A rigorous audio quality control and preprocessing grid search (>2,500 combinations on a manually transcribed subset of N=89) optimized a pipeline using a 6th-order Butterworth high-pass filter (fc = 100 Hz), spectral-gating noise suppression, and loudness normalization (-23 LUFS), achieving 0.20 DER and 0.33 JER. Two audio streams were generated: Prosody-Preserved (examiner masked, temporal structure retained) and Concatenated (participant segments merged via 10 ms linear cross-fades), combined into a unified EG All feature set. Additionally, latent representations were extracted from frozen final hidden layers of wav2vec 2.0 (base-960h) and HuBERT (large-ls960-ft) via global mean pooling.

Prediction models (Ridge regression, SVM/SVR, and XGBoost) were trained within a 5x3 nested cross-validation framework featuring z-score normalization and PCA variance thresholding. Level 1 targets raw task scores, Level 2 predicts cognitive domain composite measures (Language, Memory, Executive Function, Visuospatial Ability—including predicting non-verbal drawing-based domains from speech tasks), and Level 3 targets global CERAD+ totals and binary MCI status. Hyperparameters were selected via majority vote across NCV folds, retrained on the full development set, and tested on an independent subject-disjoint hold-out set.

## Experimental setup

The dataset includes 959 filtered sessions (698 healthy controls, 261 MCI) from 593 participants, split into a development set (N=772) and a hold-out set (N=187). Models are compared across hand-crafted eGeMAPS feature subsets (EG V-Qual, EG Prosody, EG All) and self-supervised models (wav2vec 2.0, HuBERT). Evaluation metrics include Pearson correlation (r) for continuous targets and balanced accuracy for binary classification.

## Results

HuBERT consistently outperforms hand-crafted eGeMAPS at Level 1 task-level prediction, with Pearson correlations reaching up to r = 0.85 for Phonemic Fluency (PF). For domain-level (Level 2) and global-level (Level 3) targets, HuBERT achieves a top Pearson r of 0.68 for Language domain prediction from PF speech, and binarized CERAD+ prediction achieves 0.70 development balanced accuracy (0.65 hold-out) using RL features with HuBERT. Conversely, binary MCI classification is best performed using MMSE recordings with eGeMAPS features, yielding a balanced accuracy of 0.62 on development and 0.63 on hold-out sets.

Feature importance analysis on the best binary MCI model reveals that positive SVM weights (indicating MCI) associate with increased low-frequency spectral slope variability (+0.22) and elevated F0 pitch instability (+0.18), whereas healthy controls exhibit wider F1/F2 bandwidths and steeper spectral slopes in voiced segments.

| Level – Target | Input Test | Feature | DEV Set | HO Set |
|---|---|---|---|---|
| Level 3: MCI (Binary) | MMSE | eGeMAPS All | 0.62 ± 0.07 | 0.63 |
| Level 3: CERAD+ (Binary) | RL | HuBERT | 0.70 ± 0.01 | 0.65 |
| Level 3: CERAD+ (Total) | RL | HuBERT | 0.58 ± 0.07 | 0.49 |
| Level 2: LAN | PF | HuBERT | 0.70 ± 0.03 | 0.68 |
| Level 1: PF | PF | HuBERT | 0.85 ± 0.02 | 0.80 |

## Limitations

The study is restricted to a single German-speaking cohort, limiting immediate cross-lingual and cross-cultural generalization. The dataset lacks integration of richer sociodemographic and lifestyle covariates, and the evaluation relies on fixed segment-level pooling rather than joint hierarchical end-to-end multi-task modeling of all scores simultaneously.

## Why read this

Speech and ML researchers focusing on clinical biomarker discovery should read this paper to understand why self-supervised representations excel at low-level linguistic tasks while hand-crafted acoustic metrics remain robust for screening classification, and how hierarchical target aggregation impacts model design.

## Code

- https://github.com/neselidondurma/beyond-binary-mci

## Applications

Automated clinical screening tools, digital biomarker pipelines for neurodegenerative diseases, and remote cognitive health monitoring applications.

## Institutions / 機構

Hertie Institute for AI in Brain Health, Tübingen AI Center, Humboldt-Universität zu Berlin, Tübingen University Hospital, Tübingen Center for Mental Health, German Center for Mental Health, University Medical Center Schleswig-Holstein, Hertie Institute for Clinical Brain Research, Friedrich-Alexander-Universität Erlangen-Nürnberg, Charité–Universitätsmedizin

**Funding / 經費:** Gemeinnützigen Hertie-Stiftung, Deutsche Forschungsgemeinschaft, Germany's Excellence Strategy, International Max Planck Research School for Intelligent Systems

## Related

- (link related pages by id as the wiki grows)
