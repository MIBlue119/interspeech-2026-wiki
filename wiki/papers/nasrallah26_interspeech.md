---
id: nasrallah26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2927
pdf: https://www.isca-archive.org/interspeech_2026/nasrallah26_interspeech.pdf
---

# DECRA: Dynamic Emotion Control for Real-time Speech Anonymization

[PDF](https://www.isca-archive.org/interspeech_2026/nasrallah26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nasrallah26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2927)

**TL;DR** — DECRA is a real-time streaming voice conversion framework that enables closed-loop, time-varying emotion control and anonymization with under 80 ms GPU latency.

## Problem

Current streaming voice anonymization models focus solely on identity conversion while ignoring paralinguistic cues like emotion, which leak sensitive affective information. Conversely, existing emotional voice conversion methods operate offline with utterance-level global conditioning, lack closed-loop input-adaptive mechanisms, and entangle speaker identity with affective attributes. This prevents real-time, dynamic manipulation of emotional states during conversational speech.

## Method

DECRA builds on the TVTSyn streaming backbone, utilizing a causal 1-D CNN content encoder with a vector-quantized bottleneck alongside a parallel speaker encoder. An adversarial training setup with a gradient reversal layer on an MLP projector decouples speaker timbre from emotional attributes into an emotion-free subspace. Continuous valence-arousal (V/A) trajectories are predicted online via a fully causal frame-level speech emotion recognition (SER) head and fused into the waveform decoder through a Conditional Layer Normalization with Fusion module. The training recipe leverages large unannotated speech datasets by deploying an offline SER model to generate pseudo V/A training labels. The content encoder and waveform decoder contain 37.5M and 52.5M parameters respectively.

## Results

Evaluated on the ESD corpus alongside LibriTTS and Natural Voices subsets, DECRA demonstrates superior emotion steering agreement (higher concordance correlation coefficients for valence and arousal) compared to offline and streaming baselines including SeedVC, Vevo, and TVTSyn. Subjective listening tests confirm strong emotion neutralization (e.g., 92.5% accuracy for angry-to-neutral and 91.7% for happy-to-neutral) and effective expressive conversion while maintaining competitive word error rates and speaker similarity scores. MOS evaluations indicate that the system's quality degradation is strictly a byproduct of its real-time streaming constraints rather than the emotion control mechanism.

## Code

- https://ghadynasrallah.github.io/

## Applications

Real-time speech communication tools, privacy-preserving telephony, and conversational agents requiring simultaneous speaker anonymization and dynamic emotion regulation.

## Limitations

Audio quality is constrained by real-time streaming limits compared to offline models, and conversion involving low-arousal emotions like sadness exhibits perceptual ambiguity.

## Related

- (link related pages by id as the wiki grows)
