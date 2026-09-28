---
id: agrawal26_interspeech
category: prosody
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/agrawal26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/agrawal26_interspeech.pdf
---

# Amadea: An AI Companion for Pitch-Aware Spoken Language Practice

[PDF](https://www.isca-archive.org/interspeech_2026/agrawal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/agrawal26_interspeech.html)

**TL;DR** — Amadea is an interactive language-learning platform that combines unscripted conversational AI dialogue with real-time, phrase-level pitch-contour pronunciation feedback for pitch-sensitive languages.

## Problem

Second-language learners of pitch accent and lexical tonal languages like Japanese and Mandarin lack access to conversational practice partners and receive inadequate acoustic feedback from existing tools. Traditional computer-assisted pronunciation training relies on fixed prompts and rote repetition rather than spontaneous dialogue, limiting long-term engagement and fluency. Furthermore, existing systems struggle to provide corrective prosodic feedback during free-form conversation where the intended phrase is not predetermined.

## Method

The system features two operating modes: structured lessons with pre-scripted phrases and unscripted conversation with an AI companion. When a user speaks, OpenAI Whisper transcribes the utterance to infer the intended communicative phrase, and OpenAI gpt-4o-mini-tts synthesizes a native reference audio. Audio inputs are decoded to 16 kHz mono, and fundamental frequency (F0) is extracted using pYIN over an 80-400 Hz range with a 2048-sample frame and 80-sample hop. Low-energy regions more than 25 dB below the utterance peak are masked, and unvoiced frames are treated as missing. Dynamic Time Warping (DTW) is performed on z-normalised intensity contours, and finite aligned F0 pairs are z-normalised to compute a phrase-level pitch-pattern score defined as 100/(1 + d) using mean absolute distance.

## Results

The paper presents the system design and architecture of Amadea without reporting quantitative benchmark evaluations, user study metrics, or baseline comparisons. The core pipeline successfully combines ASR transcription, text-to-speech reference generation, F0 extraction, and DTW alignment to render phrase-level pitch divergence visualisations and numerical scores in real time.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Second-language learners and educators practicing pitch-sensitive languages such as Japanese and Mandarin can use this system for interactive pronunciation training and conversational practice.

## Limitations

System performance is bounded by ASR errors and subsequent distortion of target phrases, noisy F0 extraction, temporal alignment failures, and the assumption of a single reference trajectory for native prosody.

## Related

- (link related pages by id as the wiki grows)
