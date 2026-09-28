---
id: yaish26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-222
pdf: https://www.isca-archive.org/interspeech_2026/yaish26_interspeech.pdf
---

# Active Constructive Interference for Speech

[PDF](https://www.isca-archive.org/interspeech_2026/yaish26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yaish26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-222)

**TL;DR** — The paper introduces Active Speech Enhancement (ASE), a paradigm that unifies active noise cancellation and speech enhancement using a Transformer-Mamba architecture to simultaneously suppress noise and amplify target speech.

## Problem

Traditional speech enhancement operates passively after audio is captured, while classical Active Noise Cancellation (ANC) focuses solely on destructively suppressing predictable noise without actively modifying or enriching speech content. This leaves a gap in scenarios where acoustic environments severely degrade intelligibility, requiring a joint approach that can actively reshape sound fields to approach clean target signals.

## Method

The proposed ASE-TM architecture integrates dense convolutional encoders, Mamba2-based time-frequency blocks, and a centralized multi-head attention block for capturing global context. It processes 16 kHz audio via STFT magnitude and phase representations, predicting the complex spectrum of an active cancellation loudspeaker signal. The model is trained using a multi-level loss function combining time-domain L1/L2 penalties, spectral losses, anti-wrapping phase losses, metric-based adversarial objectives, and consistency constraints.

## Results

Evaluated on additive noise reduction (VoiceBank-DEMAND), room reverberation, and signal declipping tasks against adapted baselines including THF-FxLMS, DeepANC, and ARN, the ASE-TM model demonstrates superior performance across metrics like PESQ, STOI, CSIG, CBAK, COVL, and NMSE. The framework simulates a room enclosure with primary and secondary acoustic paths, incorporating a parameterized loudspeaker saturation non-linearity function and random T60 reverberation times during training.

## Code

- https://github.com/ofiryaish/ASE-TM

## Applications

Engineers building smart speakers, hearing aids, or in-cabin automotive communication systems who need real-time active acoustic modification to enhance speech intelligibility in hostile noise environments.

## Limitations

Evaluated primarily in simulated rectangular room enclosures with fixed reference and modification microphone geometries, leaving real-world acoustic deployment dynamics as an open scope.

## Related

- (link related pages by id as the wiki grows)
