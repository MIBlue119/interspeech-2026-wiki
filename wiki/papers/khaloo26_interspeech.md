---
id: khaloo26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1479
pdf: https://www.isca-archive.org/interspeech_2026/khaloo26_interspeech.pdf
---

# Perceptual and Acoustic Correlates of Racial Identity in Text-to-Speech Voices

*Noah Khaloo, Nicole Holliday, Sarah Creel*

[PDF](https://www.isca-archive.org/interspeech_2026/khaloo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/khaloo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1479)

**TL;DR** — This study investigates how listeners perceive racial identity in commercial text-to-speech (TTS) voices, demonstrating that listeners can categorize synthetic voices by race and exhibit racial stereotyping while showing a bias toward rating voices as White. An XGBoost acoustic classifier achieves 65% accuracy distinguishing Black-rated from White-rated voices using psychoacoustic voice quality and formant features.

## Key contributions

- Evaluated 144 human listeners on personality and racial categorization of 32 fully synthetic TTS voices from EasyPeasy AI, revealing a systematic bias toward rating synthetic voices as White.
- Uncovered significant social penalty for male synthetic voices perceived as Black, which received lower ratings in professionalism, competence, trustworthiness, and pleasantness.
- Trained a Gradient Boosted Decision Tree (XGBoost) classifier on psychoacoustic voice quality and formant features to predict perceived race with 65% cross-validated accuracy.
- Identified key acoustic correlates driving racial perception in synthetic speech, including Residual H1*, spectral tilt measures, Cepstral Peak Prominence (CPP), and vowel-specific F1/F2 shifts mimicking human AAE vs. MAE differences.

## Problem

As voice-AI systems become increasingly human-like, understanding the social and racial attributes encoded in synthetic voices is critical, especially given their deployment in high-stakes settings like education, healthcare, and customer service. Prior research shows human listeners can reliably distinguish racial identities (e.g., Mainstream American English vs. African American English) based on phonetic cues, and that these perceptions interact with social and personality evaluations. However, it remains poorly understood whether fully synthetic TTS voices successfully encode these racial distinctions, how human listeners perceive them, and what acoustic parameters drive these perceptions.

## Method

The study analyzed 32 voices randomly sampled from EasyPeasy AI (balanced across platform-assigned gender and race: 8 Black Male, 8 Black Female, 8 White Male, 8 White Female). Listeners evaluated voices in two blocks: personality traits (7-point Likert scales for friendliness, professionalism, competence, trustworthiness, pleasantness, funniness, and human-likeness) and race/identity judgment. Acoustic variables were extracted using VoiceSauce at 1-ms frames from vowel tokens, grounded in the Psychoacoustic Model of the Voice. Extracted features included F0, F1-F4 formants, formant dispersion, harmonic source measures (Residual H1*, H2*-H4*, H2kHz*-H5kHz*), and inharmonic measures (CPP, SHR, Energy). Features were segmented into onset, midpoint, and offset, computing means and Coefficients of Variability (CoV), and centered relative to phonation modality (breathy, creaky, etc.).

A Gradient Boosted Decision Tree (XGBoost) model was trained to distinguish between voices rated as Black versus White, restricted to male-rated voices due to gender imbalance in perceived race clusters. The model incorporated 61 features (including one-hot encoded vowel identities and a zero-feature negative control). Hyperparameters were tuned via 5-fold speaker-level cross-validation repeated 50 times: 50 boosting rounds, max tree depth of 4, learning rate eta = 0.1, min child weight of 1, and gamma = 0.

## Experimental setup

The listening experiment recruited 144 American English participants via Prolific (after dropping 6 of 150 for incomplete data), with a demographically representative distribution across race, gender, and age. Evaluation metrics included listener accuracy in race/gender identification, 7-point Likert personality scores analyzed via linear mixed-effects models, and 5-fold cross-validation accuracy for the XGBoost acoustic classifier.

## Results

The XGBoost classifier achieved a cross-validated test accuracy of 65% using all 61 acoustic and vowel features, and a slightly improved 66% using a reduced set of the top 15 gain features. Feature gain analysis revealed that Residual H1* exhibited the most robust difference, with Black-rated voices showing lower values across vowel duration. Additional distinguishing features included lower CPP, H2*-H4*, and H2kHz*-H5kHz*, and higher F4 for Black-rated voices, alongside localized F1/F2 shifts in vowels like /æ/, /E/, /i/, and /aI/.

In perceptual evaluations, male synthetic voices categorized as Black were rated significantly lower in pleasantness (beta = -0.64, p < 0.05), professionalism (beta = -1.09, p < 0.05), trustworthiness (beta = -0.53, p < 0.05), and competence (beta = -0.67, p < 0.05) compared to White-rated voices. Perceived human-likeness was a significant positive predictor of all personality ratings across both genders (p < 0.01). Female-sounding voices showed no significant personality rating differences across perceived race, largely because listeners exhibited higher ambiguity in identifying the race of Black female platform-assigned voices (5 out of 9 ambiguous voices were Black female).

| System / Condition | Features Used | Evaluation Metric | Score (%) |
|---|---|---|---|
| Full XGBoost Model | 61 Acoustic + Vowel Features | 5-Fold CV Accuracy | 65.0 |
| Reduced XGBoost Model | Top 15 Acoustic Features | 5-Fold CV Accuracy | 66.0 |

## Limitations

The study is limited by a gender imbalance in perceptual race categories, forcing the acoustic classification model to be trained exclusively on male voices due to insufficient Black female samples in clear perceptual clusters. The dataset relies on a single commercial TTS platform (EasyPeasy AI) with proprietary underlying architectures, limiting generalizability to open-source foundation TTS models. Furthermore, testing was restricted to American English, leaving multilingual and cross-cultural generalization unaddressed.

## Why read this

Speech and ML engineers building commercial text-to-speech systems should read this paper to understand that current black-box TTS engines implicitly encode socially perceptible racial markers and trigger listener stereotyping. It provides actionable acoustic insights into how voice quality and spectral tilt parameters drive racial perception in synthetic speech.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditing and mitigating racial bias in commercial text-to-speech pipelines, designing socially responsible voice generation tools, and improving fairness evaluations for conversational AI agents.

## Related

- (link related pages by id as the wiki grows)
