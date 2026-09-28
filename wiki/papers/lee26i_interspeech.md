---
id: lee26i_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-932
pdf: https://www.isca-archive.org/interspeech_2026/lee26i_interspeech.pdf
---

# Designed Vocalizations Dataset: Sound-Designed Human and Animal Voices for Non-human Voice Conversion

[PDF](https://www.isca-archive.org/interspeech_2026/lee26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-932)

**TL;DR** — The paper introduces the Designed Vocalizations Dataset, a public resource of 231,800 audio pairs designed for non-human voice conversion, achieving baseline MOS scores up to 3.81.

## Problem

Voice conversion research heavily focuses on natural human speech while overlooking non-natural and non-human vocalizations such as monster growls and robotic voices. This gap exists due to a lack of public resources and standardized benchmarks, making fair comparison across studies difficult. Addressing this enables automated sound design tools for creative media industries like games and films.

## Method

The dataset pairs raw vocal sources (3,270 VCTK speech samples and 2,384 non-linguistic Freesound audio clips) with designed target variants generated via professional audio effect chains. These chains utilize 40 training presets from Dehumaniser 2 and in-house tools incorporating 7 core effect modules (delay pitch shifting, flanger/chorus, granular, noise generator, pitch shifting, ring modulator, spectral shifting) plus 6 external post-processing effects. A representative Conditional VAE (CVAE) baseline model with modified STFT parameters (20ms window, 5ms hop) and style embeddings applied solely to the prior and flow modules is evaluated on non-parallel training data.

## Results

Evaluated across seen-to-seen, seen-to-unseen, unseen-to-seen, and unseen-to-unseen scenarios using a test set of 120 sources and 47 presets (40 seen, 7 unseen). Timbre similarity measured via BEATs cosine similarity drops from 0.667 (seen-seen) to 0.610 (unseen-unseen). Energy prosody preservation (PCC-E) remains high across all scenarios at 0.982–0.985, while intelligibility measured via Whisper CER/WER is 1.89%/5.23% for seen sources and 1.64%/4.65% for unseen sources. Subjective 5-point Mean Opinion Scores (MOS) range from 3.81 for seen-to-seen down to 3.49 for unseen-to-unseen.

## Code

- https://ncai-official.github.io/speech/publications/designed-vocalizations-dataset/

## Applications

Engineers and researchers building voice conversion or automated sound design systems for video games, films, animation, and virtual reality.

## Limitations

The dataset is currently bound to specific software presets (Dehumaniser 2 and Cubase configurations) and evaluated on a single baseline architecture.

## Related

- (link related pages by id as the wiki grows)
