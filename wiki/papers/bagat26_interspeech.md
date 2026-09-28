---
id: bagat26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2422
pdf: https://www.isca-archive.org/interspeech_2026/bagat26_interspeech.pdf
---

# Synthetic Audio Generation Framework for Air Traffic Control Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/bagat26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bagat26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2422)

**TL;DR** — This paper proposes a synthetic speech generation pipeline leveraging TTS, voice conversion, and accent conversion to address data scarcity in air traffic control automatic speech recognition, achieving improved word error rates.

## Problem

Automatic speech recognition systems struggle in safety-critical air traffic control domains due to heavy channel noise, non-native English accents, domain-specific phraseology, and severe scarcity of real training data. Previous supervised and self-supervised approaches are limited by the small scale of available human-transcribed recordings. Developing effective generative data augmentation pipelines remains challenging because standard acoustic simulations do not sufficiently capture complex variations in speaker identity, accents, and radio conditions.

## Method

The framework first processes real recordings using DAIEN-TTS for speech-environment separation and AudioSR for 8kHz-to-16kHz super-resolution. It then applies four generative techniques using real transcriptions: F5-TTS for text-to-speech L1 generation, kNN-VC for voice conversion using L2-ARCTIC reference speakers, TokAN for L2-to-L1 accent normalization, and a newly repurposed TokAN model for controllable L1-to-L2 accent conversion. The L1-to-L2 module fine-tunes the token conversion and synthesizer parts with a reduced CTC loss weight of 0.2, filtering out hallucinated samples whose Whisper-large-v3-turbo transcripts exceed 50% relative WER. Finally, an air traffic control acoustic simulation module applies downsampling/upsampling, a 200Hz high-pass filter, and re-injection of the separated background noise.

## Results

Experiments use the 4-hour human-transcribed portion of the ATCO2 corpus under 4-fold cross-validation to fine-tune Whisper-small for 20 epochs. Compared to an out-of-the-box Whisper baseline achieving 63.32% WER and a real-data-only fine-tuning baseline achieving 22.69% WER, training on synthetic data mixtures improves robustness. Specifically, voice conversion alone yields 24.18% WER with acoustic simulation, while mixing synthetic and real data yields further significant WER reductions over real-data-only training.

## Code

- https://gitlab.inria.fr/rbagat/atc_generation

## Applications

Speech engineers and developers building robust automatic speech recognition systems for safety-critical, noisy, and accented domains like aviation communications.

## Limitations

The generation pipeline filters out approximately 35% of synthesized audio due to high word error rate hallucinations exceeding 50% relative to input transcripts.

## Related

- (link related pages by id as the wiki grows)
