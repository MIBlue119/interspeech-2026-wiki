---
id: jeon26_interspeech
category: health-clinical
institutions: ["Sogang University", "Hallym University", "Sungshin Women's University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1247
pdf: https://www.isca-archive.org/interspeech_2026/jeon26_interspeech.pdf
---

# Disentangling Depression from Cognitive Decline in Elderly Speech Using Concurrent Clinical Assessments

*Woori Jeon, Seunghee Ha, Sang-Kyu Lee, Ji Hye Yoon, Tae-Jin Yoon, Seung Jin Lee, Woojae Han, Jungmin So*

[PDF](https://www.isca-archive.org/interspeech_2026/jeon26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jeon26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1247)

**Category:** `health-clinical`

**TL;DR** — This paper presents a method for disentangling depression from cognitive decline in elderly speech by utilizing dual clinical assessments, demonstrating that formant features (specifically F1 and F2) provide robust depression signals while widely used F0 features carry no signal, achieving a UAR of 0.760.

## Key contributions

- Introduces the first Korean elderly MCI speech corpus containing 89 speakers recorded annually over three years (209 total observations) with concurrent SGDS (depression) and MMSE (cognitive) scores.
- Applies dual statistical methods (longitudinal linear mixed-effects models and cross-sectional partial correlations) to systematically isolate depression-specific acoustic features from cognitive confounders.
- Proves that formant features (PC1) are significantly associated with depression after controlling for cognitive function, whereas traditional F0 features carry no signal.
- Achieves a UAR of 0.760 using a compact subset of 12 interpretable features (F1 + F2), outperforming both the full 88-feature eGeMAPS baseline and large self-supervised representations.

## Problem

Detecting depression in elderly patients with mild cognitive impairment (MCI) is heavily confounded because both depression and cognitive decline produce overlapping acoustic shifts like reduced pitch range and lower energy. Standard speech classifiers trained on general or younger adult populations risk learning cognitive patterns instead of true depression markers. Resolving this ambiguity is clinically critical because untreated depression accelerates cognitive decline, yet prior studies lack concurrent cognitive scores to decouple the two conditions.

## Method

The authors analyze a reading passage ("Autumn") read aloud by participants, ensuring linguistic content is controlled across subjects. After stripping examiner instructions using WhisperX, they extract the 88-feature extended Geneva Minimalistic Acoustic Parameter Set (eGeMAPS) and organize them into seven functionally motivated groups (F0, Energy, Spectral, MFCC, Voice Quality, Formant, and Temporal). To reduce dimensionality and handle multicollinearity, they extract the first principal component (PC1) for each group.

To separate depression signals from cognitive ones, they employ two independent statistical approaches on group PC1s: a linear mixed-effects model (LMM) with a per-subject random intercept (absorbing time-invariant between-subject variance and tracking within-subject changes over time) controlling for SGDS, MMSE, age, and gender; and partial Spearman correlations controlling for MMSE, age, and gender. For classification, they evaluate an SVM with an RBF kernel (C = 0.1, class-weighted to handle imbalance) using leave-one-subject-out (LOSO) cross-validation across all 88 features of a group, alongside self-supervised baselines (WavLM, wav2vec2, HuBERT) using mean-pooling paired with both an SVM and a linear classification head.

The feature selection design relies on functionally coherent acoustic families rather than individual feature search to prevent overfitting on small datasets. Subgroup ablations isolate individual formants (F1, F2, F3) and pairwise/triple combinations to identify exactly which articulatory dynamics carry clinical depression information.

## Experimental setup

The study uses a longitudinal Korean corpus of 89 MCI elderly subjects (209 total observations across three years; mean age 78.1 years, 67% female). Baselines include the full 88-feature eGeMAPS, Whisper large-v3 derived CER + WER (2 features), and four self-supervised models (WavLM-Base/Large, wav2vec2-Base, HuBERT-Base). Evaluation metrics are Unweighted Average Recall (UAR), Sensitivity, Specificity, Accuracy, and F1 score, evaluated via leave-one-subject-out cross-validation.

## Results

The F1+F2 feature subset (12 features) achieves a headline UAR of 0.760, outperforming the full 88-feature eGeMAPS baseline (0.655 UAR) and the strongest SSL model (HuBERT-Base with a linear head at 0.729 UAR). Notably, the F0 feature group yields a UAR of just 0.512 (chance level), confirming that pitch features carry no useful depression signal in this MCI cohort.

In ablations across formant subgroups, F2 alone matches the full 18-feature formant group at 0.747 UAR, and combining F1+F2 maximizes performance at 0.760 UAR, whereas adding F3 degrades performance (F1+F3 drops to 0.662), showing that lip rounding contributes noise while tongue/vowel positioning carries the core affective signal.

| System / Condition | Features (d) | UAR | Sensitivity | Specificity | Accuracy | F1 |
|---|---|---|---|---|---|---|
| eGeMAPS full | 88 | .655 | .512 | .798 | .742 | .438 |
| HuBERT-Base (Linear) | 768 | .729 | .795 | .663 | .689 | .501 |
| Formant Group | 18 | .747 | .756 | .738 | .742 | .534 |
| F2 Subgroup | 6 | .747 | .756 | .738 | .742 | .534 |
| F1 + F2 Subgroup | 12 | .760 | .805 | .714 | .732 | .541 |
| F0 Group | 10 | .512 | .537 | .488 | .498 | .295 |

## Limitations

The dataset is constrained by a modest sample size of 89 subjects and 209 observations. There is a notable gender imbalance (67% female), which contributes to a gender asymmetry in model error where female specificity is significantly lower than male specificity. Furthermore, evaluation is restricted to a single controlled reading task in a single language (Korean), omitting spontaneous speech dynamics.

## Why read this

Speech and ML researchers working on paralinguistics or health informatics should read this to understand how concurrent clinical assessments can prevent models from learning confounding cognitive signals when diagnosing depression in elderly populations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated, non-invasive digital health screening tools for monitoring depression and cognitive health in elderly populations via clinical speech recordings.

## Institutions / 機構

Sogang University, Hallym University, Sungshin Women's University

**Funding / 經費:** Ministry of Education of the Republic of Korea, National Research Foundation of Korea, Artificial Intelligence Innovation Graduate School grant funded by the Korea government (MSIT), National Information Society Agency funded by the Ministry of Science, ICT through the Big Data Platform and Center Construction Project

## Related

- [Layer-wise Multi-factor Adaptive Disentanglement for Cross-corpus Speech Depression Detection](wang26j_interspeech.md) — same problem · relatedness 2.1/3
- [Who is Speaking or Who is Depressed? A Controlled Study of Speaker Leakage in Speech-Based Depression Detection](yeh26_interspeech.md) — same problem · relatedness 2.0/3
- [More than a feeling: Expressive style influences cortical speech tracking in subjective cognitive decline](ma26b_interspeech.md) — same problem · relatedness 2.0/3
- [Natural Speech Encodes Early Markers of Cognitive Decline: Evidence from Clinical Conversations](haghbin26b_interspeech.md) — same problem · relatedness 2.0/3
- [WildElder: A Chinese Elderly Speech Dataset from the Wild with Fine-Grained Manual Annotations](wang26_interspeech.md) — complementary · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
