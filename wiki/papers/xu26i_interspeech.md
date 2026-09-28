---
id: xu26i_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1038
pdf: https://www.isca-archive.org/interspeech_2026/xu26i_interspeech.pdf
---

# A barrier or a booster? Familiarity effects on Mandarin emotion prosody recognition using AI-powered voice cloning

[PDF](https://www.isca-archive.org/interspeech_2026/xu26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1038)

**TL;DR** — Evaluating Mandarin emotion prosody recognition, natural human voices achieved significantly higher accuracy and faster reaction times than AI voice cloning outputs, while speaker familiarity provided emotion-specific compensatory advantages or induced uncanny valley delays.

## Problem

Although emotion-preserving voice conversion (EPVC) models can clone speaker timbres, synthetic speech contains subtle acoustic atypicalities like spectral distortions and unnatural coarticulation. It remains unclear how these synthetic traits interact with top-down social cognition and listener familiarity, risking listener communicative fatigue and misinterpretation.

## Method

Seventeen Mandarin-speaking adults participated in a within-subject behavioral and physiological experiment involving 14 neutral six-word Mandarin sentences. Human emotion expressions were recorded by a broadcasting student, and neutral recordings from a familiar speaker served as target timbres for an adapted F0-conditioned singing voice conversion (SVC) model that maps source semantic content and fundamental frequency contours. Cognitive load was evaluated via continuous physiological monitoring (heart rate variability including mean HR, RMSSD, LF/HF ratio) alongside behavioral metrics (accuracy and reaction times) analyzed using linear and generalized linear mixed-effects models.

## Results

Human voices yielded significantly higher accuracy and shorter reaction times than AI-synthesized voices across happy, sad, and angry emotions (all p < .01), though fear showed no significant source-based accuracy gap due to biological salience. For AI-generated voices, speaker familiarity significantly improved accuracy for happy stimuli (p = .036) but slowed down reaction times for fearful stimuli compared to stranger voices (p < .05), signaling potential uncanny valley effects. Heart rate variability (HRV) metrics did not significantly differentiate between speech sources or familiarity conditions (all p > .05).

## Code

- https://github.com/Plachtaa/seed-vc

## Applications

Speech and machine learning engineers designing personalized digital avatars, voice prostheses, and human-computer interaction systems where emotional resonance and cognitive load matter.

## Limitations

The study isolates auditory stimuli from visual and contextual cues and utilizes a relatively small sample size of 17 participants.

## Related

- (link related pages by id as the wiki grows)
