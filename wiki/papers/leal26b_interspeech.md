---
id: leal26b_interspeech
category: health-clinical
labels: [self-supervised]
institutions: ["University of Milan", "Scientific Institute IRCCS E. Medea", "University of Verona", "Azienda Ospedaliera Universitaria Integrata"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-742
pdf: https://www.isca-archive.org/interspeech_2026/leal26b_interspeech.pdf
---

# Analyzing Longitudinal Vocal Changes During Cognitive Behavioral Therapy for Hikikomori Patients

*Samara S. Leal, Stavros Ntalampiras, Antonio Trabacca, Marcella Bellani, Roberto Sassi*

[PDF](https://www.isca-archive.org/interspeech_2026/leal26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/leal26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-742)

**Category:** `health-clinical` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates longitudinal vocal changes in hikikomori patients undergoing internet-based cognitive behavioral therapy, demonstrating that session-by-session speech trajectories predict treatment outcomes better than static pre-post comparisons. A feature fusion model combining Wav2vec 2.0 embeddings with traditional Mel-frequency cepstral coefficients and fundamental frequency achieves the highest F1-scores across age and gender groups.

## Key contributions

- Identifies stable longitudinal Mel-frequency cepstral coefficients (MFCC1-4, MFCC6) characterized by consistent temporal trends and low early inter-subject variability.
- Formulates a longitudinal trajectory modeling pipeline using session-level audio summaries from 35 hikikomori patients across 8 CBT sessions (276.7 total speech hours).
- Evaluates multiple acoustic representation strategies (MFCCs, Wav2vec 2.0, and their feature/decision fusion) under a Leave-One-Patient-Out (LOPO) cross-validation protocol.
- Demonstrates that fusing self-supervised deep representations with hand-crafted spectral and prosodic descriptors consistently outperforms single-modality baselines.

## Problem

Monitoring treatment response during cognitive behavioral therapy for individuals with prolonged social isolation like hikikomori is difficult because prior methods rely on static classification or cross-sectional snapshots like DAIC-WoZ and MODMA. Furthermore, existing longitudinal studies focus predominantly on pre-post differences or symptom scales alone rather than tracking continuous within-individual temporal speech dynamics. These static formulations miss critical intra-individual fluctuations and fail to capture early signs of treatment response or clinical deterioration.

## Method

The study analyzes a dataset of 35 patients comprising 276.7 hours of speech (approx. 59.3 minutes per session) captured across 8 CBT sessions via the AWS Chime SDK (48 kHz, mono). Audio was segmented into 5-second windows, preprocessed using RMS normalization and pre-emphasis filtering, and speaker-diarized via clinician-annotated reference segments and k-means clustering (k=2) to yield a Diarization Error Rate (DER) of 0.1698. Segment-level acoustic features were aggregated into session summaries (S1-S8) and baseline-corrected relative to the first session to isolate within-subject temporal variation.

For RQ1, temporal scores combining longitudinal slope, variability, late-session change, and early inter-subject variance identified the top-5 stable MFCCs. For RQ3, the framework evaluates four acoustic representations (AR): AR1 (all MFCCs), AR2 (selected MFCCs), AR3 (Wav2vec 2.0 only via facebook/wav2vec2-base-960h processed with a 1-layer GRU with 128 hidden units), and AR4 (fusion of Wav2vec 2.0 GRU outputs with session-level MFCC+F0 descriptors processed via an MLP). Models were trained for 10 epochs per fold using BCEWithLogitsLoss with per-fold class weights, optimized using GridSearchCV for MLPs and an F2-oriented threshold calibration to prioritize sensitivity to clinical deterioration.

## Experimental setup

The dataset contains 35 patients (24 young adults, 11 adolescents; 57.14% female, 42.86% male) who completed 8 CBT sessions, identified by a Hikikomori Questionnaire score above 42. Models were evaluated using a Leave-One-Patient-Out (LOPO) cross-validation protocol across age and gender strata, compared against various feature configurations (AR1 to AR4), and measured using macro recall mean/std, positive-class recall, specificity, precision, and positive-class F1-score.

## Results

Session-level acoustic trajectories successfully revealed distinct speech evolution patterns between patients showing clinical improvement or worsening, outperforming simple pre-post difference correlations. For the young adult cohort, the fusion model (AR4) achieved a positive-class F1-score of 0.37 with a positive recall of 0.70, compared to AR3 (Wav2vec 2.0 only) which achieved an F1 of 0.00 due to zero positive recall. For adolescents, AR4 reached an F1-score of 0.62 and positive recall of 0.71. In gender stratifications, AR4 achieved F1-scores of 0.47 for females and 0.40 for males, consistently outperforming unirepresentational baselines (AR1–AR3) which suffered from poor sensitivity or high false negatives.

| Cohort | Representation | Model | Macro Recall (Mean) | Specificity | Positive Recall | Positive F1 |
|---|---|---|---|---|---|---|
| YA | AR1 (All MFCCs) | MLP | 0.25 | 0.39 | 0.11 | 0.15 |
| YA | AR3 (Wav2vec2) | GRU | 0.58 | 1.00 | 0.00 | 0.00 |
| YA | AR4 (Fusion) | GRU+MLP | 0.52 | 0.36 | 0.70 | 0.37 |
| AD | AR1 (All MFCCs) | MLP | 0.32 | 0.14 | 0.51 | 0.55 |
| AD | AR3 (Wav2vec2) | GRU | 0.34 | 0.25 | 0.43 | 0.30 |
| AD | AR4 (Fusion) | GRU+MLP | 0.72 | 0.75 | 0.71 | 0.62 |

## Limitations

Clinical severity scores were available only at pre- and post-treatment intervals rather than continuously session-by-session, constraining direct supervision of intermediate trajectory changes. The sample size is relatively small (35 patients), limiting broader model generalization and statistical robustness across age and gender subgroups.

## Why read this

Researchers and engineers building speech-based digital health tools will learn how to formulate longitudinal, multi-session speech tracking pipelines instead of relying on static pre-post classification. It provides empirical proof that fusing self-supervised representations with handcrafted spectral features bridges the gap between global structure and clinical sensitivity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated telepsychology monitoring tools, remote cognitive behavioral therapy support systems, and objective vocal biomarker tracking for depressive disorders and social withdrawal.

## Institutions / 機構

University of Milan, Scientific Institute IRCCS E. Medea, University of Verona, Azienda Ospedaliera Universitaria Integrata

**Funding / 經費:** European Union

## Related

- [What Does a Pathological Speech Assessment Model Know about Acoustic Features? A Case Study on Oral and Oropharyngeal Cancer Patients](nguyen26h_interspeech.md) — shared technique · relatedness 1.9/3
- [PAN-Mask: Pathology-Aware Neurological Masking with End-to-End Learnable Weights for Neurological Disorder Detection from Speech](sun26b_interspeech.md) — shared technique · relatedness 1.9/3
- [Multi-Phonation Graph Learning with Self-Supervised Speech Embeddings for ALS Detection and Progression Prediction](taghibeyglou26_interspeech.md) — shared technique · relatedness 1.9/3
- [Beyond Binary: Speech Representations Across the Cognitive Score Hierarchy](kopar26_interspeech.md) — shared technique · relatedness 1.9/3
- [Uncovering Dimension-Specific Layer Preferences in Wav2Vec2 for Fine-Grained Perceptual Assessment of Dysarthric Speech](zhong26_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
