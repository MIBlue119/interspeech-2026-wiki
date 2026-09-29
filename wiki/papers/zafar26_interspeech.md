---
id: zafar26_interspeech
category: health-clinical
labels: [robustness-noise]
institutions: ["University of New South Wales"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2862
pdf: https://www.isca-archive.org/interspeech_2026/zafar26_interspeech.pdf
---

# Rethinking Acoustic Variability Of ADReSS and ADReSSo Datasets For Dementia Detection

*Muhammad Abdullah Zafar, Mostafa Shahin, Beena Ahmed*

[PDF](https://www.isca-archive.org/interspeech_2026/zafar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zafar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2862)

**Category:** `health-clinical` · **Labels:** `robustness-noise`

**TL;DR** — This paper demonstrates that near state-of-the-art classification performance on the benchmark ADReSS and ADReSSo dementia detection datasets can be achieved using just two low-level acoustic features, random label permutations, or even silence-only segments. These findings reveal that high benchmark scores often stem from spurious channel or environmental correlations rather than robust pathology-related speech cues.

## Key contributions

- Shows that classifiers trained on only two low-level acoustic features from openSMILE achieve macro-F1 test scores close to competition state-of-the-art on ADReSS (0.875) and ADReSSo (0.831).
- Demonstrates via label permutation that randomly shuffling dementia training labels can still yield competitive test set performance due to brittle split-specific correlations.
- Proves that silence-only segments outperform speech-only segments using the same high-performing feature pairs, indicating severe channel/recording-chain confounds rather than pathology markers.
- Establishes through 100 Monte Carlo resampling iterations that top-performing feature pairs lack stability, with mean resampling F1 scores dropping significantly (to 0.622 for ADReSS and 0.667 for ADReSSo) and rarely recurring across splits.

## Problem

Despite the ADReSS and ADReSSo challenge datasets serving as de facto standards for speech-based dementia detection with over 100 recent papers relying on them, their small scale and residual acoustic variability leave them vulnerable to superficial exploitation. Prior studies noted that subsets of recordings or silent pauses can inflate classification metrics, but it remained unknown if entire recordings could be trivially discriminated using low-level features. This matters because models appearing highly accurate on standard test sets may actually be learning incidental recording conditions or channel artifacts rather than true cognitive decline indicators, undermining clinical generalizability.

## Method

The study employs an interpretable classification pipeline using logistic regression with liblinear solver on low-level acoustic descriptors extracted via openSMILE. Two prominent feature sets are evaluated: the theory-driven eGeMAPSv02 (88 features) and the exhaustive ComParE 2016 (6,373 features). Stepwise feature selection identifies individual features and pairwise combinations that maximize discriminative power on fixed test splits, evaluated via macro-F1 score after z-score normalization and mean imputation.

To probe robustness, three evaluation regimes are applied: (1) original challenge test splits, (2) label permutation (training labels randomly shuffled across 100 iterations as a negative control), and (3) Monte Carlo resampling (100 random 70/30 train/test splits preserving label balance). Additionally, voice activity detection (VAD) using pyannote splits each recording into silence-only and speech-only variants to isolate whether discriminative power originates from verbal cues or background properties.

## Experimental setup

The evaluation uses the ADReSS dataset (Train: 54 HC / 54 AD, Test: 24 HC / 24 AD) and the ADReSSo dataset (Train: 87 HC / 79 AD, Test: 36 HC / 35 AD), both derived from the Pitt Cookie Theft corpus. Classifiers are compared against competition state-of-the-art benchmarks (macro-F1 of 0.895 for ADReSS and 0.857 for ADReSSo). Implementation relies on standard scikit-learn pipelines with logistic regression evaluated via macro-F1 across 100 Monte Carlo runs and label permutations.

## Results

Two-feature logistic regression models achieve macro-F1 scores of 0.875 on ADReSS and 0.831 on ADReSSo, closely approaching the respective SOTA benchmarks of 0.895 and 0.857. However, under 100 Monte Carlo resampling splits, the mean macro-F1 drops substantially to 0.622 for ADReSS and 0.667 for ADReSSo. Label permutation experiments show that randomizing training labels produces test macro-F1 scores ranging from 0.123 to 0.875 (ADReSS) and 0.153 to 0.831 (ADReSSo), with many permuted runs overlapping true-label benchmark scores. Furthermore, silence-only variants outperform speech-only variants using the winning feature pairs (macro-F1 of 0.702 vs 0.643 on ADReSS; 0.631 vs 0.576 on ADReSSo).

| Dataset | 2 Features (Macro-F1) | SOTA Benchmark | Monte Carlo Mean | Silence-Only | Speech-Only |
|---|---|---|---|---|---|
| ADReSS | 0.875 | 0.895 | 0.622 | 0.702 | 0.643 |
| ADReSSo | 0.831 | 0.857 | 0.667 | 0.631 | 0.576 |

## Limitations

The analysis is scoped strictly to English-language speech from the Pitt Cookie Theft corpus via the ADReSS and ADReSSo challenges, and does not directly test larger unconstrained corpora or deep learning architectures like transformers or self-supervised speech foundation models. The feature exploration is restricted to linear logistic regression using openSMILE LLDs, meaning non-linear interactions captured by deep neural networks are not explicitly ruled out from also exploiting spurious artifacts.

## Why read this

Researchers and engineers working on clinical speech analysis or small-dataset benchmarking should read this to understand the severe vulnerability of standard dementia benchmarks to spurious channel and silence correlations. It provides actionable guidelines—such as mandating Monte Carlo cross-validation and label permutation controls—to prevent overestimating model generalizability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnostic screening support tools for neurodegenerative diseases and rigorous evaluation protocols for small-sample medical speech datasets.

## Institutions / 機構

University of New South Wales

**Funding / 經費:** National Institutes of Health

## Related

- [LoRA-Tuned Large Language Models for Dementia Detection via Multi-View Speech-Derived Features](park26c_interspeech.md) — same problem · relatedness 2.7/3
- [Gated Multi-graph Fusion via Graph Attention Networks for Alzheimer’s Disease Detection](li26ga_interspeech.md) — same problem · relatedness 2.6/3
- [Listening Between the Lines: Joint Learning of ASR Embeddings and LLM-Augmented Linguistics for Dementia Detection](jung26_interspeech.md) — same problem · relatedness 2.6/3
- [WSG: Clinically-Informed Weighted Speech Graphs for Dementia Detection](xiao26b_interspeech.md) — same problem · relatedness 2.3/3
- [Who is Speaking or Who is Depressed? A Controlled Study of Speaker Leakage in Speech-Based Depression Detection](yeh26_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
