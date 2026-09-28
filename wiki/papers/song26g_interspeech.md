---
id: song26g_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3119
---

# Real-Time Speech Enhancement on Edge Devices Guided by Harmonic and Voice-Activity Cues Utilizing Skin-Attachable Accelerometer

**TL;DR** — LAU-NetV2 compresses skin-attachable accelerometer signals into compact voice-activity and harmonic cues that FiLM-modulate a lightweight U-Net, cutting model size 68x versus prior multimodal approaches while improving PESQ from 1.78 to 2.78 and running in 48.66ms on a wearable microcontroller.

## Problem

Skin-attachable accelerometers capture noise-robust speech vibrations that complement acoustic microphones, but existing multimodal speech enhancement models combine the two signal streams with parallel encoders or attention blocks that are too costly for edge deployment.

## Method

LAU-NetV2 is a lightweight accelerometer-assisted U-Net using efficient cue-guided Feature-wise Linear Modulation (FiLM): the accelerometer stream is compressed into temporal voice activity (to suppress non-speech regions) and spectral harmonics (to preserve voiced structure), and these representations generate FiLM parameters that modulate intermediate time-frequency feature maps.

## Results

LAU-NetV2 with FiLM has 46k parameters, 68x fewer than prior multimodal models, improves PESQ from 1.78 to 2.78 on TAPS+DNS outperforming baselines, and runs in 48.66ms on a wearable microcontroller prototype.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Enables real-time voice interfaces on truly resource-constrained wearable hardware that combines skin-attached accelerometers with microphones for noise-robust enhancement.

## Related

- (link related pages by id as the wiki grows)
