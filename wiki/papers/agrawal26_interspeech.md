---
id: agrawal26_interspeech
category: applications-other
labels: [streaming-real-time]
institutions: ["Amadea", "University of Queensland", "University of Edinburgh"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/agrawal26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/agrawal26_interspeech.pdf
---

# Amadea: An AI Companion for Pitch-Aware Spoken Language Practice

*Mrigendra Agrawal, Ryan Tsui, Kyaw Maung Maung Tet Toe*

[PDF](https://www.isca-archive.org/interspeech_2026/agrawal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/agrawal26_interspeech.html)

**Category:** `applications-other` · **Labels:** `streaming-real-time`

**TL;DR** — Amadea is an interactive speech learning platform that integrates real-time fundamental-frequency (F0) pronunciation feedback for pitch-sensitive languages into both structured lessons and open-ended conversational dialogues.

## Key contributions

- Bridges computer-assisted pronunciation training (CAPT) and generative conversational AI to support unscripted, free-form spoken dialogue in pitch-accent and lexical tonal languages.
- Proposes an end-to-end feedback pipeline that transcribes learner speech via ASR, generates a native reference audio via text-to-speech, and compares z-normalised F0 contours using Dynamic Time Warping (DTW).
- Introduces phrase-level pitch scoring (scored as 100 / (1 + d)) and visual divergence graphs that mitigate mora-level segmentation ambiguities.
- Combines relational conversational agent design with unobtrusive visual prosodic feedback to lower user inhibition and promote long-term language retention.

## Problem

Second-language learners of pitch-sensitive languages like Japanese and Mandarin face a lack of suitable conversational practice partners and acoustic feedback mechanisms. Traditional computer-assisted pronunciation training (CAPT) tools rely strictly on pre-scripted prompts and massed repetition exercises, failing to support spontaneous, open-ended conversation or practical communicative intent. This gap hinders the development of natural fluency, intonation, and long-term retention.

## Method

Amadea operates through two primary interfaces: structured lesson modes and open-ended conversation modes. When a learner speaks into the microphone, the browser captures the audio and routes it to OpenAI Whisper (whisper-1) for transcription, capturing the intended phrase even when spoken with learner-specific prosodic deviations. Simultaneously, an AI conversational companion maintains the dialogue loop, while OpenAI gpt-4o-mini-tts generates a native-like reference audio corresponding to the transcribed text.

The speech-feedback pipeline processes the user and reference audio files by decoding them to 16 kHz mono and extracting fundamental-frequency (F0) contours using the pYIN algorithm across an 80–400 Hz range with a 2048-sample frame and an 80-sample hop. Low-energy regions exceeding 25 dB below the utterance peak are masked, and unvoiced frames are treated as missing values. Dynamic Time Warping (DTW) is then computed on z-normalised intensity contours, after which finite aligned F0 pairs are z-normalised to calculate a pitch-pattern score based on their mean absolute distance.

Feedback is intentionally evaluated over the full phrase rather than individual morae or phonemes. This architectural choice minimizes sensitivity to segmentation ambiguity and minor local micro-variations while successfully highlighting major utterance-level prosodic deviations. Visualisations and tooltips present the resulting score and pitch-divergence graphs to the user asynchronously without breaking the conversational flow.

## Experimental setup

The paper outlines a systems design and architectural framework for Amadea, utilizing OpenAI Whisper (whisper-1) for ASR and OpenAI gpt-4o-mini-tts for reference speech generation, alongside pYIN for acoustic feature extraction. Evaluation details, specific dataset hour totals, and quantitative baseline comparisons are left as future work, as the paper focuses primarily on system description, pipeline architecture, and use-case integration.

## Results

Because this paper presents a novel system architecture and application framework rather than a closed corpus benchmark, formal quantitative accuracy comparisons against traditional baseline systems are not reported. The core functional results center on the system's ability to successfully close the practice loop by transcribing free-form speech, generating dynamic native references, aligning F0 contours via DTW, and rendering real-time phrase-level pitch-pattern scores and visual divergence graphs. Limitations and validation against expert human judgments are identified as necessary next steps.

## Limitations

The system is vulnerable to cascading errors from ASR misclassifications, noisy F0 extraction, and temporal alignment failures under heavy accent or poor acoustic conditions. Furthermore, natural prosody is not uniquely defined for many utterances, yet the system currently compares learner intonation against a single reference trajectory. External validation correlating Amadea's pitch-pattern scores with expert human evaluations, along with longitudinal user studies, remains to be conducted.

## Why read this

Researchers and engineers building conversational language-learning systems or CAPT applications will learn how to integrate real-time acoustic prosody tracking into LLM-driven chat loops without disrupting user immersion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning (CALL) platforms, interactive second-language tutoring applications, and real-time pronunciation feedback tools for pitch-accent and tonal languages.

## Institutions / 機構

Amadea, University of Queensland, University of Edinburgh

## Related

- (link related pages by id as the wiki grows)
