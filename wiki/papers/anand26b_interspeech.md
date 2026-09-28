---
id: anand26b_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3357
pdf: https://www.isca-archive.org/interspeech_2026/anand26b_interspeech.pdf
---

# Preferences of a Voice-First Nation: Large-Scale Pairwise Evaluation and Preference Analysis for TTS in Indian Languages

[PDF](https://www.isca-archive.org/interspeech_2026/anand26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/anand26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3357)

**TL;DR** — This paper presents a large-scale, multidimensional human preference evaluation framework for multilingual text-to-speech across 10 Indic languages, revealing Gemini 2.5 Pro TTS as the top-performing model among 7 evaluated systems based on over 120K pairwise comparisons.

## Problem

Traditional subjective metrics like MOS and MUSHRA fail to capture the complex, multidimensional nature of modern multilingual text-to-speech and suffer from rater bias, while existing evaluations rarely address the linguistic diversity and code-mixing common in voice-first regions like India. This makes it difficult for engineers to diagnose specific failure modes or reliably rank models across realistic deployment conditions. Addressing this gap requires a controlled, large-scale evaluation framework that combines direct pairwise comparisons with granular perceptual feedback.

## Method

The authors curate a benchmark of 5,357 sentences across 10 Indian languages spanning normalized, symbolic, and code-mixed subsets across 16 domains. They collect over 120K pairwise comparisons from 1,915 vetted native raters using a strict two-step protocol that captures holistic overall preference before independent ratings across six granular perceptual axes (intelligibility, expressiveness, voice quality, liveliness, noise, and hallucinations). A maximum-likelihood Bradley-Terry model mapped to an Elo-like scale is used to build a multilingual leaderboard, with uncertainty quantified via 500 bootstrap resampling iterations.

## Results

Evaluating 7 state-of-the-art TTS systems (Gemini 2.5 Pro TTS, ElevenLabs v3, Sonic 3, Bulbul v3 Beta, Speech 2.8 HD, GPT-4o Mini TTS, and Indic F5) over 120K comparisons, Gemini 2.5 Pro TTS achieves the highest Bradley-Terry score of 1128.53, ranking first overall and across 9 of 10 individual languages. ElevenLabs v3 (1056.28) and Sonic 3 (1050.83) follow closely in a statistically tied tier, whereas the open-source Indic F5 model ranks last (805.75). Condition-wise evaluations demonstrate that top commercial models maintain robust rankings across code-mixed, normalized, and symbolic text inputs.

## Code

- https://huggingface.co/datasets/ai4bharat/SpeechArenaBench/

## Applications

Speech and ML engineers building or selecting multilingual and Indic text-to-speech systems for conversational AI, education, telemedicine, and accessibility applications.

## Limitations

The study is restricted to 10 Indian languages and a fixed set of 7 evaluated text-to-speech systems.

## Related

- (link related pages by id as the wiki grows)
