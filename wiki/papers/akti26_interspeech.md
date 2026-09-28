---
id: akti26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1159
pdf: https://www.isca-archive.org/interspeech_2026/akti26_interspeech.pdf
---

# Synthesizing the Lombard Effect: Multi-Level Control of Speech Clarity and Vocal Effort in TTS

[PDF](https://www.isca-archive.org/interspeech_2026/akti26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/akti26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1159)

**TL;DR** — A flow-matching text-to-speech framework achieves continuous, disentangled control over vocal effort and articulation to simulate the Lombard effect, improving speech intelligibility in noise.

## Problem

Most modern text-to-speech systems are trained primarily on neutral, non-Lombard speaking styles and lack mechanisms to adapt to challenging acoustic environments or listener hearing difficulties. While prior work has explored isolated acoustic adjustments like speaking rate or volume, they typically fail to provide unified, multi-dimensional control over both vocal effort and hyper-articulation. This limitation reduces the robustness and intelligibility of conversational agents and assistive technologies operating in real-world noisy conditions.

## Method

The system builds on Matcha-TTS using an optimal transport flow-matching decoder and a Vocos waveform vocoder, trained on an 11-hour subset of the Expresso dataset augmented with LJ Speech. It introduces a dual-axis conditioning mechanism using pseudo-labels for articulation (fast to enunciated) and vocal effort (neutral to projected), mapped into continuous 32-dimensional embeddings concatenated with speaker identity. A factorized dual-injection strategy broadcasts these style embeddings to both the text encoder (controlling phoneme duration and speaking rate) and the flow-matching U-Net decoder (modulating spectral tilt, energy distribution, and formants). During inference, continuous scalars and word-level emphasis annotations allow both utterance-level style scaling and localized temporal/acoustic adjustments.

## Results

Evaluated using the Harvard Sentences dataset against a naive signal-processing baseline (RMS matching and time-stretching), the model is assessed via Word Error Rate (WER) using Whisper-medium, Mean Vowel Dispersion (MVD), Spectral Tilt, Phoneme Rate, Speech Intelligibility Index (SII), and a 10-participant CMOS study. Increasing articulation consistently reduces WER and raises MVD (e.g., higher vowel distinctiveness), while vocal effort effectively shifts spectral tilt toward higher frequencies without altering vowel dispersion. In speech-in-noise experiments across restaurant babble, overlapping speech, and white noise (SNR = 10, 5, 1), joint scaling yields substantial robustness gains, and word-level emphasis combined with hyper-articulation reduces WER on previously mistaken words from 17.61% down to 3.90%. In human evaluation, the proposed method achieves positive CMOS preferences for both naturalness (1.97) and intelligibility (1.13) over the time-stretched baseline.

## Code

- https://seymanurakti.github.io/synthesizing-lombard-effect/

## Applications

Engineers building conversational agents, interactive spoken dialogue systems, or hearing-assistive technologies can use this model to dynamically synthesize clear, intelligible speech adapted to noisy environments.

## Limitations

Automatic speech recognition (ASR)-based evaluations can underestimate the benefits of Lombard speech due to model sensitivity to extreme vocal effort, and token-level control can experience minor style leakage between adjacent words.

## Related

- (link related pages by id as the wiki grows)
