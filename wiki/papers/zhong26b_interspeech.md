---
id: zhong26b_interspeech
category: health-clinical
labels: [dataset-or-benchmark-release]
institutions: ["Radboud University", "Radboud University Medical Center"]
code: https://github.com/terryyizhongru/B-EarlyPD-Speech
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1057
pdf: https://www.isca-archive.org/interspeech_2026/zhong26b_interspeech.pdf
---

# A Benchmark for Early-stage Parkinson's Disease Detection from Speech

*Terry Yi Zhong, Cristian Tejedor-Garcia, Khiet Truong, Janna Maas, Louis ten Bosch, Bastiaan R. Bloem*

[PDF](https://www.isca-archive.org/interspeech_2026/zhong26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhong26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1057)

**Category:** `health-clinical` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — This paper introduces the first standardized benchmark for speech-based early-stage Parkinson's disease (EarlyPD) detection, featuring speaker-independent 5-fold splits across public datasets and establishing comprehensive baselines. The benchmark achieves an average AUC of 0.67 and F1 of 0.66 across tasks, demonstrating that early-stage detection is notably harder than all-stage PD classification.

## Key contributions

- Proposes the first standardized benchmark for speech-based EarlyPD detection using strictly filtered, researcher-accessible datasets (PC-GITA and NeuroVoz) defined by Hoehn & Yahr <= 2 and time after diagnosis <= 5 years.
- Establishes a transparent, speaker-independent 5-fold cross-validation protocol covering open-source datasets and a private clinical track (PERSPECTIVE-Base) with multi-dimensional evaluation breakdowns.
- Benchmarks three prominent speech-based PD detection paradigms (BDHPD, InceptionPD, RECA-PD) across sustained vowels, diadochokinetic (DDK) tasks, and sentence reading under four training data configurations.
- Provides actionable empirical insights showing that expanding training speaker diversity—either via non-early PD data or external private cohorts—improves performance, and that utterance aggregation mitigates intra-speaker variability.

## Problem

Speech-based Parkinson's disease (PD) detection has grown rapidly, but prior studies suffer from severe fragmentation due to inconsistent definitions of early-stage PD, proprietary or incomparable dataset splits, and varying language or speech task configurations. Many papers label models as 'early-stage' without clinical stage stratification or rely on heavily skewed cohorts (e.g., exclusively male speakers or narrow Hoehn & Yahr stages). This lack of a standardized protocol makes cross-method comparisons nearly impossible, impeding clinical translation. Reliable early-stage detection is clinically vital because it enables intervention before severe motor symptoms manifest, but it is inherently harder than general PD vs. healthy control classification.

## Method

The benchmark standardizes EarlyPD criteria as Hoehn & Yahr stage <= 2 and time after diagnosis <= 5 years. It utilizes two public datasets in the open track: PC-GITA (100 speakers) and NeuroVoz (108 speakers), and integrates PERSPECTIVE-Base (200 Dutch speakers via smartphone app) in a private augmentation track. Audio inputs are standardized to mono 16 kHz, 16-bit WAV with SoX peak-normalization, capped at 10 seconds maximum duration, and converted to log-mel spectrograms using consistent FFT configurations across tasks. Three specific tasks are evaluated independently: sustained vowels (/a/), DDK (/pa-ta-ka/), and sentence reading.

Models are trained using nested cross-validation on an NVIDIA A10 GPU for a maximum of 20 epochs with early stopping (patience of 5 epochs without validation AUC improvement). Model checkpoints are selected using validation AUC, while decision thresholds are optimized using the positive-class F1 score on the validation set. Three diverse open-source architectures are benchmarked: BDHPD (pretrained self-supervised learning representations), InceptionPD (vision-pretrained models applied to audio spectrograms), and RECA-PD (explainable AI architecture). Evaluation is conducted at both the utterance level and the aggregate level via mean-logit pooling across multiple utterances per speaker to account for intra-speaker acoustic variability.

## Experimental setup

The evaluation uses a fixed speaker-independent 5-fold cross-validation split where each validation and test fold contains precisely 6 EarlyPD and 6 healthy control (HC) speakers (total 30 EarlyPD test speakers). Four training data settings are compared: AllPD (all stages), AllPD-sub (distribution-matched subset matching EarlyPD size), EarlyPD (early stage only), and EarlyPD+Private (augmented with private data). Performance is measured using Area Under the ROC Curve (AUC) and F1 score, reporting the mean and standard deviation over 5 random seeds.

## Results

Across all models and tasks, RECA-PD achieves the highest overall average performance (F1 0.67, AUC 0.70), particularly excelling on DDK and sentence reading tasks. InceptionPD attains competitive AUC on sustained vowels (up to 0.67 in certain settings). Comparing training configurations, augmenting early-stage training data with non-Early PD speakers (AllPD setting) yields the highest average F1 on DDK (0.69) and sentence tasks (0.69), while incorporating external private early-stage data (EarlyPD+) consistently boosts AUC (reaching 0.75 on DDK). Aggregating 10 sentence-level utterances per speaker provides consistent performance gains (e.g., up to +0.11 AUC increase for InceptionPD) by overcoming intra-speaker variability.

In terms of limitations and gaps, vowel-based tasks consistently underperform compared to DDK tasks. Furthermore, a gender disparity analysis reveals higher performance for female speakers than male speakers across models, and comparing all-stage vs. early-stage test sets shows a persistent drop in performance for early-stage detection (e.g., BDHPD drops by 0.05 to 0.13 in AUC), confirming its heightened difficulty.

| System / Condition | DDK (AUC) | Vowel (AUC) | Sentence (AUC) | Avg (F1) |
| --- | --- | --- | --- | --- |
| BDHPD (AllPD) | 0.73 | 0.57 | 0.75 | 0.66 |
| InceptionPD (AllPD) | 0.69 | 0.61 | 0.67 | 0.65 |
| RECA-PD (AllPD) | 0.80 | 0.63 | 0.77 | 0.67 |
| BDHPD (EarlyPD+) | 0.75 | 0.60 | 0.70 | 0.66 |
| InceptionPD (EarlyPD+) | 0.71 | 0.67 | 0.64 | 0.66 |
| RECA-PD (EarlyPD+) | 0.80 | 0.57 | 0.75 | 0.66 |

## Limitations

The benchmark is currently restricted to single-task training setups and omits spontaneous speech tasks due to limited open-source implementation support. The open-track datasets are limited to Spanish-speaking cohorts (PC-GITA and NeuroVoz), raising open questions regarding cross-lingual generalization to tonal or structurally diverse languages. The private dataset track relies exclusively on Dutch speakers, and observed performance variations between datasets point to remaining domain shift challenges related to acoustic recording environments.

## Why read this

Speech and ML researchers building clinical voice biomarkers should read this paper to adopt the first rigorous, reproducible benchmarking standard for early-stage Parkinson's disease detection. It offers concrete insights into how training data composition, task selection, and utterance aggregation impact model generalization.

## Code

- https://github.com/terryyizhongru/B-EarlyPD-Speech

## Applications

Automated, non-invasive digital health screening tools for early-stage neurological disorder detection via smartphone or clinical voice recordings.

## Institutions / 機構

Radboud University, Radboud University Medical Center

**Funding / 經費:** Dutch Research Council, SURF

## Related

- [PAN-Mask: Pathology-Aware Neurological Masking with End-to-End Learnable Weights for Neurological Disorder Detection from Speech](sun26b_interspeech.md) — same problem · relatedness 2.1/3
- [Adapting Self-Supervised Speech Representations for Cross-Lingual Dysarthria Detection in Parkinson's Disease](hernandez26_interspeech.md) — same problem · relatedness 2.0/3
- [Speech and Video Biomarkers Exhibit Reduced Within-Subject Variability in Early Parkinson’s Disease and Resistance to Placebo and Hawthorne Effects](kothare26b_interspeech.md) — same problem · relatedness 2.0/3
- [Toward an Articulatory Weakness Index for Speech Kinematics in Parkinson’s Disease](baligar26_interspeech.md) — same problem · relatedness 2.0/3
- [S-DiverSe: Spanish Diverse Speech](lopez26b_interspeech.md) — shared data / evaluation · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
