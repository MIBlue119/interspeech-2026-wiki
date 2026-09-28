---
id: xu26i_interspeech
category: speech-emotion-recognition
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1038
pdf: https://www.isca-archive.org/interspeech_2026/xu26i_interspeech.pdf
---

# A barrier or a booster? Familiarity effects on Mandarin emotion prosody recognition using AI-powered voice cloning

*Feng Xu, Gaoyuan Zhang, Shanshan Xue, Yixiang Chen, Hanrui Zhou, Xurong Xie, Hui Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1038)

**TL;DR** — This study investigates how AI-generated synthetic voice and speaker familiarity affect Mandarin emotion prosody recognition, finding that human voices yield significantly higher accuracy and faster processing than AI voices, while familiarity with an AI voice provides compensatory benefits for happiness but causes delays for fear due to the uncanny valley effect.

## Key contributions

- Adapted an open-source F0-conditioned singing voice conversion (SVC) model for emotion-preserving voice conversion using a dedicated effort factor equation.
- Demonstrated a persistent behavioral gap showing that natural human speech yields significantly higher emotion recognition accuracy and shorter reaction times than AI-synthesized speech across happy, sad, and angry emotions.
- Revealed that speaker familiarity with an AI voice acts as a double-edged sword, providing top-down cognitive compensation that improves accuracy for happy stimuli while triggering evaluation delays for fearful stimuli.
- Established that while behavioral metrics (accuracy and RT) capture cognitive processing differences between speech sources and familiarity conditions, time- and frequency-domain HRV features do not show statistically significant differentiation.

## Problem

Emotion prosody perception requires processing both acoustic cues and social indices, but it remains unclear how acoustic atypicalities in AI synthetic voices interact with a listener's prior social knowledge and memory. Prior research evaluates emotion recognition gaps using anonymous speakers, neglecting how speaker familiarity modifies top-down cognitive scaffolding during human-machine interaction. Addressing this is crucial because deploying familiar AI voices without accounting for prosodic flaws risks violating social expectations and inducing communicative fatigue or the uncanny valley effect.

## Method

The study utilized an adapted F0-conditioned singing voice conversion (SVC) framework for emotion-preserving voice conversion (EPVC). The model regulates target pitch using an equation incorporating the source emotion F0 contour ($F_s$), source speaker mean neutral F0 ($F_s^{\prime}$), and target speaker mean neutral F0 ($F_{\text{target}}$), controlled by an effort factor $c$ where $c=1$ preserves source arousal and $c=0$ yields a neutral reference pitch. The synthesized stimuli were perceptually filtered by phonetics experts before presentation.

The experimental paradigm evaluated 17 Mandarin-speaking adults (ages 22-41) in a within-subject design using PsychoPy. Auditory stimuli consisted of 14 neutral Mandarin sentences (6 words long) rendered in four emotions (happiness, anger, fear, sadness). Trials proceeded through four phases: a 600 ms fixation cross, auditory prompt presentation, a 300 ms blank followed by emotion emoji choices, and an 1100 ms ending blank. Behavioral data (accuracy, RT) and continuous physiological data (Biopac MP 150 at 1000 Hz via a three-lead configuration) were collected simultaneously.

Physiological preprocessing involved a 5-20 Hz band-pass Butterworth filter, Pan-Tompkins R-peak identification with an 85% adaptive threshold, and feature extraction spanning time-domain metrics (mean HR, RMSSD) and frequency-domain metrics (LF, HF, LF/HF ratio via Welch's PSD on linearly interpolated 4 Hz resampled RR intervals). Statistical evaluation relied on Linear Mixed Models (LMMs) and Generalized Linear Mixed Models (GLMMs) fitted in R using lmerTest, optimizing structures via likelihood ratio tests and applying Tukey's HSD adjustment for post-hoc pairwise comparisons.

## Experimental setup

Seventeen Mandarin-speaking adults (aged 22-41, M=28.18) participated in the within-subject experiment. Stimuli comprised 14 neutral 6-word Mandarin sentences recorded by a professional female broadcaster (for human stranger and AI source material) and a familiar colleague (for target speaker timbre). Baselines compared human stranger voices against AI-synthesized stranger voices, and AI stranger voices against AI familiar voices across four emotions (happiness, sadness, anger, fear). Metrics included response accuracy, reaction time (RT), and HRV features (mean HR, RMSSD, LF/HF ratio). Implementation details involved a Biopac MP 150 physiological system, PsychoPy experiment control, a 60 Hz display at 1024x768 resolution, and GLMM/LMM statistical modeling in R.

## Results

Human voices achieved significantly higher accuracy and shorter reaction times than AI voices across happiness, sad, and angry emotions (GLMM Source main effect Chi-sq=36.985, p < .001; LMM Source F=13.480, p < .001), except for fear where the accuracy gap disappeared due to biological salience and threat detection. For AI voice familiarity, accuracy for happy stimuli was significantly higher with familiar voices than stranger voices (beta=0.66, p=.036), demonstrating a top-down cognitive compensation mechanism. Conversely, reaction times to fearful AI stimuli were significantly faster for stranger voices than familiar voices (beta=-0.19, p=.005), indicating a processing delay for familiar arousing negative stimuli attributable to the uncanny valley effect. Physiological measures (mean HR, RMSSD, LF/HF ratio) revealed no significant main effects across speech sources or familiarity conditions (all p > .05).

| System / Condition | Accuracy (Happy) | Accuracy (Sad) | RT (Happy) | RT (Sad) |
|---|---|---|---|---|
| Human Stranger | High | High | Faster | Faster |
| AI Stranger | Lower | Lower | Slower | Slower |
| AI Familiar | Highest (Happy) | Comparable | Delayed (Fear) | Comparable |

## Limitations

The study's scope is bounded by a relatively small sample size of 17 Mandarin-speaking participants, limiting demographic and cross-linguistic generalization. The experimental design isolated audio stimuli from visual and contextual cues, which normally assist natural emotion decoding. Additionally, heart rate variability failed to capture autonomic nervous system stress variations in this paradigm, pointing to potential insensitivity of short-term HRV metrics for this specific cognitive load.

## Why read this

Speech and ML engineers building personalized digital voice assistants or voice prostheses should read this to understand that faithful timbre cloning alone is insufficient when synthetic prosodic atypicalities interact with speaker familiarity, triggering uncanny valley delays for negative emotions.

## Code

- https://github.com/Plachtaa/seed-vc

## Applications

Personalized digital voice assistants, synthetic voice cloning systems, speech prostheses, and affective human-computer interaction design.

## Related

- (link related pages by id as the wiki grows)
