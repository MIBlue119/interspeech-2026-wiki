---
id: kopar26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2725
pdf: https://www.isca-archive.org/interspeech_2026/kopar26_interspeech.pdf
---

# Beyond Binary: Speech Representations Across the Cognitive Score Hierarchy

[PDF](https://www.isca-archive.org/interspeech_2026/kopar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kopar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2725)

**TL;DR** — This study analyzes how acoustic features predict cognitive scores across a three-level clinical hierarchy (task, domain, global) for mild cognitive impairment, finding that open-ended tasks show performance dilution while constrained screening tasks show inverse dilution.

## Problem

Current automated speech analysis for mild cognitive impairment largely relies on binary classification that misses subtle cognitive gradations, focuses heavily on English-centric single tasks, and treats clinical scores as flat targets rather than respecting the hierarchical structure of assessments. Overlooking this hierarchy ignores inherent relationships between task-level, domain-level, and global-level cognitive scores.

## Method

The study uses 5,754 German recordings from an elderly cohort spanning one MMSE screening task and five CERAD+ diagnostic tasks. It compares hand-crafted eGeMAPS acoustic features (prosody-preserved and concatenated streams) with self-supervised learning (SSL) representations extracted from the final hidden layers of wav2vec 2.0 and HuBERT using global mean pooling. Models including Ridge regression, SVM, and XGBoost are evaluated across a 5x3 nested cross-validation framework to predict targets across task, domain, and global hierarchical levels.

## Results

SSL representations (specifically HuBERT) generally outperform hand-crafted features on lower-level tasks, though eGeMAPS achieves the best binary MCI classification performance using MMSE recordings with a balanced accuracy of 0.62 on the development set and 0.63 on the hold-out set. Open-ended tasks like phonemic fluency exhibit a 'dilution' effect where predictive power decreases from task-level to global-level scores, functioning as specialist representations. Conversely, constrained tasks like MMSE and word list recognition exhibit an 'inverse dilution' effect with performance improving toward higher aggregation levels, functioning as generalist representations.

## Code

- https://github.com/neselidondurma/beyond-binary-mci

## Applications

Engineers and clinical researchers building automated speech-based cognitive screening tools and multi-task diagnostic systems for neurodegenerative diseases.

## Limitations

The evaluation is restricted to a single German-speaking cohort and omits sociodemographic and lifestyle covariates.

## Related

- (link related pages by id as the wiki grows)
