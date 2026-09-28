---
id: otani26_interspeech
category: speech-synthesis
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3379
pdf: https://www.isca-archive.org/interspeech_2026/otani26_interspeech.pdf
---

# Speaker-Independent Speech Synthesis from Real-time MRI Articulatory Data

[PDF](https://www.isca-archive.org/interspeech_2026/otani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/otani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3379)

**TL;DR** — This paper proposes a speaker-independent speech synthesis framework that generates speech waveforms directly from real-time MRI (rtMRI) articulatory videos using cross-modal training with speaker embeddings, achieving a differential word error rate as low as 4.5% on read speech.

## Problem

Traditional real-time MRI (rtMRI) speech synthesis systems rely on speaker-dependent modeling, preventing generalization to unseen speakers, while alternative text-to-speech approaches bypass direct articulatory control over duration, prosody, and speaker traits. Overcoming this gap is crucial for computer-assisted pronunciation training and speech rehabilitation applications, but it requires robust extraction of linguistic content, prosody, and speaker identity solely from mid-sagittal vocal tract images.

## Method

The architecture comprises an EfficientNetV2-B0 encoder for per-frame image feature extraction, an E-Branchformer Base module for temporal modeling, and a BigVGAN-v2 vocoder for waveform synthesis. To enable speaker-independent synthesis without reference speech at inference, the model utilizes a dual-path cross-modal training strategy: one path processes reference speech through a frozen X-vector and an MLP, while the other aggregates E-Branchformer outputs via attention pooling. Both paths feed into a shared Feature-wise Linear Modulation (FiLM) generator, guided by a cosine similarity loss to align the MRI-derived speaker representation with the audio-derived target. An additional F0 estimation head utilizes a log-domain Pearson correlation loss on high-periodicity frames, and the model is trained with mean squared error losses on mel-spectrograms totaling approximately 33 million parameters.

## Results

Evaluated on the USC 75-Speaker Speech MRI Database using 51 selected speakers (43 training, 4 validation, 4 test), the model achieved differential word error rates (dWER) ranging from 4.5% to 11.1% and character error rates (dCER) from 1.8% to 5.6% on read speech. F0 correlation analysis demonstrated that relative prosodic patterns are captured effectively, yielding Pearson correlation coefficients between 0.38 and 0.57 across all voiced frames (0.62 to 0.76 for high-periodicity frames). Speaker Encoder Cosine Similarity (SECS) reached 0.95 to 0.96 for the rtMRI path, though pairwise matrix evaluations revealed challenges in distinguishing speakers within the same gender.

## Code

- https://github.com/y-otn/m2s-code

## Applications

Speech and ML engineers developing computer-assisted pronunciation training (CAPT) systems or speech rehabilitation tools for individuals with speech disorders.

## Limitations

Absolute F0 estimation remains challenging and within-gender speaker discrimination is difficult due to the limited spatial resolution of mid-sagittal rtMRI images which cannot capture vocal fold vibrations or full 3D vocal tract geometry.

## Related

- (link related pages by id as the wiki grows)
