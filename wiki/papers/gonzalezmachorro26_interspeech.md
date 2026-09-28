---
id: gonzalezmachorro26_interspeech
category: health
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1052
pdf: https://www.isca-archive.org/interspeech_2026/gonzalezmachorro26_interspeech.pdf
---

# Towards Speech Impairment Prediction in German-Speaking Individuals with Amyotrophic Lateral Sclerosis

*Monica Gonzalez-Machorro, Ricarda von Heynitz, Justin Hanslmeier, Finja Grimm, Alexandra-Iulia Deac, Anne Gründel, Isabell Cordts, Bjoern Schuller*

[PDF](https://www.isca-archive.org/interspeech_2026/gonzalezmachorro26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gonzalezmachorro26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1052)

**TL;DR** — This paper investigates automated speech impairment prediction for German-speaking individuals with amyotrophic lateral sclerosis (ALS) using clinical scores, achieving a Concordance Correlation Coefficient (CCC) of up to 0.86 in a within-speaker setting.

## Key contributions

- Evaluated and compared cross-sectional (across-speaker) and temporal within-speaker machine learning modelling paradigms for predicting ALS speech impairment.
- Contrasted the predictive utility of two distinct clinical scores: the coarse 0-4 ordinal ALSFRS-R-speech scale and the continuous 0-40 QOL-Dys questionnaire.
- Systematically analyzed five common speech tasks (sustained /a:/, Cookie Theft picture description, /da/-/da/, /da/-/ba/, and a reading passage) to determine task-specific utility.
- Demonstrated that Whisper encoder embeddings combined with SVMs outperform openSMILE eGeMAPS and Wav2vec2 across most setups.

## Problem

Amyotrophic Lateral Sclerosis (ALS) is a rapidly progressive neurodegenerative disease causing bulbar dysfunction and speech deterioration, requiring reliable non-invasive biomarkers. Prior studies show high variability in data collection protocols, struggle with clinical heterogeneity, and primarily focus on binary healthy-versus-ALS detection rather than continuous severity tracking or granular quality-of-life assessment. Existing work rarely investigates how specific speech tasks and different clinical rating scales influence automated severity prediction models in languages other than English or Italian.

## Method

Audio-visual recordings were converted to 16 kHz WAV format, segmented using a pyannote Voice Activity Detection (VAD) model (discarding chunks under 300 ms), and cleaned using spectral-gating noise reduction (removing ~70% of stationary noise). Three acoustic feature sets were extracted: 88 functionals of eGeMAPS via openSMILE, 1280-dimensional encoder representations from Whisper Large v3, and mean-pooled encoder outputs from Wav2vec2-large-xlsr-53-german. All features were normalized using training-set standard scalers.

For regression, Support Vector Machines (SVM), XGBoost, and Random Forests were optimized via randomized search with 5-fold GroupKFold cross-validation (speaker-level splits to prevent leakage). Parameter spaces included C and kernel for SVM, estimators/learning rates for XGB, and tree depths for Random Forests. Task-level predictions were also fused via simple mean fusion. Two split strategies were tested: a cross-sectional speaker-independent setup (quantized severity stratification, 20% test speakers) and a temporal within-speaker setup (first sessions for training, subsequent follow-up sessions for testing to mimic a longitudinal monitoring scenario).

## Experimental setup

Evaluated on the AIMnd 2.0 German-speaking cohort comprising 66 pwALS and 96 total sessions (52 speakers / 69 sessions for cross-sectional training, 14 speakers / 27 sessions for cross-sectional testing; 66 speakers for within-speaker training, 17 speakers / 20 sessions for within-speaker testing). Models were compared across various feature sets, machine learning algorithms, and individual speech tasks. Evaluation metrics included Concordance Correlation Coefficient (CCC) with 95% confidence intervals (1,000 bootstrap iterations), Bias, and Limits of Agreement (LoA).

## Results

In the cross-sectional setting, the reading passage with Whisper features achieved the highest CCC of 0.65 for ALSFRS-R-speech, while diadochokinetic tasks (/da/-/ba/, /da/-/da/) reached a CCC of 0.62 for QOL-Dys. In the within-speaker setting, the reading passage again led for ALSFRS-R-speech (CCC = 0.71, Whisper + SVM), whereas the /da/-/da/ task achieved a standout CCC of 0.86 for QOL-Dys. QOL-Dys consistently yielded higher predictability than ALSFRS-R-speech, attributed to its continuous scale and sensitivity to subtle acoustic shifts. Task fusion did not reliably outperform single-task models, and sustained /a:/ consistently showed the weakest performance across settings.

| System / Condition | Task | Features | Model | CCC (ALSFRS-R-speech) | CCC (QOL-Dys) |
|---|---|---|---|---|---|
| Cross-Sectional | Read Passage | Whisper | SVM | 0.65 | 0.54 |
| Cross-Sectional | Picture Desc. | Whisper | SVM / XGB | 0.64 | 0.50 |
| Cross-Sectional | /da/-/da/ | eGeMAPS / Whisper | SVM | 0.53 | 0.62 |
| Within-Speaker | Read Passage | Whisper | SVM | 0.71 | 0.75 |
| Within-Speaker | /da/-/da/ | Whisper | SVM | 0.55 | 0.86 |
| Within-Speaker | All Fused | Whisper | SVM | 0.54 | 0.83 |

## Limitations

The study is restricted to a single clinical center with a relatively small cohort of 66 patients and severe attrition in longitudinal follow-ups (only 17 patients contributed multiple sessions). Analyses are limited to acoustic features, omitting complementary linguistic, semantic, or orofacial cues. The generalizability is untested on other motor neuron diseases or languages, and simple temporal splitting was used rather than advanced personalized individual adaptation algorithms.

## Why read this

Speech and ML researchers focusing on health applications and atypical speech processing should read this paper to understand how task selection and clinical score granularity (ordinal vs. continuous QoL metrics) impact longitudinal disease monitoring models for neurodegenerative disorders.

## Code

- https://github.com/monicagoma98/IS_AIMnd_2026

## Applications

Automated clinical support tools for remote or in-clinic continuous monitoring of ALS progression via routine speech tasks.

## Related

- (link related pages by id as the wiki grows)
