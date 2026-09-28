---
id: khaloo26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1479
pdf: https://www.isca-archive.org/interspeech_2026/khaloo26_interspeech.pdf
---

# Perceptual and Acoustic Correlates of Racial Identity in Text-to-Speech Voices

[PDF](https://www.isca-archive.org/interspeech_2026/khaloo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/khaloo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1479)

**TL;DR** — Listeners can perceive speaker race in fully synthetic text-to-speech voices and exhibit racial stereotyping, with a classification model achieving 65% accuracy using psychoacoustic features.

## Problem

As voice-AI systems become increasingly human-like, understanding the social attributes and racial biases encoded in synthetic voices is critical for ethical deployment. Prior work has produced mixed findings regarding whether listeners can reliably identify race in text-to-speech (TTS) outputs, necessitating controlled investigations into perceptual bias and underlying acoustic markers.

## Method

The study evaluated 32 commercially synthesized voices from EasyPeasy AI (spanning American and African American accent categories) using a web experiment with 144 American participants rating personality traits and racial identity. A psychoacoustic feature set (F0, F1–F4, formant dispersion, residual H1*, harmonic/inharmonic measures, and coefficient of variability across vowel segments) was extracted using VoiceSauce. An XGBoost Gradient Boosted Decision Tree classifier with 5-fold cross-validation was trained on male-rated voices to distinguish between voices perceived as Black versus White.

## Results

Listeners showed a general bias toward rating TTS voices as White, and Black female voices were most frequently categorized as ambiguous. For male-sounding voices, those perceived as Black received significantly lower ratings in pleasantness, professionalism, trustworthiness, and competence compared to those perceived as White. The XGBoost model predicted perceived race with 65% accuracy, identifying residual H1*, spectral tilt, noise measurements, and formants F1, F2, and F4 as key acoustic drivers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, ethicists, and designers of conversational AI and text-to-speech systems to audit and mitigate racial bias and stereotyping in synthetic voice generation.

## Limitations

The acoustic classification model was restricted to male-rated voices due to data imbalances and limited representation of Black female voices on the platform.

## Related

- (link related pages by id as the wiki grows)
