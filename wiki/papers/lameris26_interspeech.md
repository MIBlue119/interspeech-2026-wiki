---
id: lameris26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-736
pdf: https://www.isca-archive.org/interspeech_2026/lameris26_interspeech.pdf
---

# Lost in Phonation: Voice Quality Variation as an Evaluation Dimension for Speech Foundation Models

[PDF](https://www.isca-archive.org/interspeech_2026/lameris26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lameris26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-736)

**TL;DR** — The paper introduces VQ-Bench to evaluate speech foundation models on voice quality variations, revealing that models shift behavioral outputs and amplify gender biases based on phonation types.

## Problem

Current speech foundation model evaluations focus heavily on recognition accuracy and text-aligned reasoning via multiple-choice questions, leaving their interpretation of paralinguistic variations like voice quality largely untested. This gap is critical because voice quality (such as breathiness or creakiness) carries profound social, pragmatic, and emotional meanings in human communication. Without controlled evaluation frameworks, deploying speech-based AI risks unexamined biases and unpredictable behavioral shifts based purely on how something is spoken rather than what is said.

## Method

The authors introduce VQ-Bench, a parallel evaluation dataset totaling 25 hours and 17 minutes, using speech samples from the Buckeye and VCTK corpora. They synthesize modal, breathy, creaky, and end-creak phonation variants across 148 speakers using the zero-shot F5-TTS system combined with VoiceQualityVC to control glottal source parameters like spectral tilt, open quotient, and periodicity regularity. They evaluate two speech foundation model architectures—an open-weight model (LFMAudio2-1.5B) and a leading commercial speech-to-speech API—across open-ended generation tasks grouped into four ecologically valid domains (Therapy, Career Advice, Interview Screening, and Storytelling). Outputs are judged using gemini-2.5-flash-lite on structured rubrics, and a Wav2Vec 2.0 speech emotion recognition model is evaluated via Bayesian multilevel categorical regression to track logit shifts across phonation and gender.

## Results

As a basic biometric sanity check, the OpenAI real-time API failed completely, classifying all speakers as male regardless of actual gender or voice quality, whereas LFMAudio2-1.5B succeeded. Using cumulative link mixed models on LLM-judge ratings for LFMAudio2-1.5B, voice quality significantly affected all evaluation dimensions except role status and emotional validation (e.g., breathy and end-creak increased STEM orientation in career advice, while creaky voice increased care orientation). End-creak aligned more closely with breathy speech than sustained creaky voice, indicating sensitivity to temporal distribution and pragmatic phrasing. Furthermore, systematic gender disparities emerged, where female voices received significantly lower ratings than male voices for salary offers and leadership endorsements, and Bayesian SER regression showed increased 'fearful' and 'surprised' predictions for female voices.

## Code

- https://shreeharsha-bs.github.io/Lost-in-phonation/

## Applications

Speech-to-text and speech-to-speech system developers use these benchmarks to audit model fairness, paralinguistic robustness, and social bias in conversational agents.

## Limitations

The study's scope is restricted to American English datasets (Buckeye and VCTK) and specific synthetic voice quality transformations.

## Related

- (link related pages by id as the wiki grows)
