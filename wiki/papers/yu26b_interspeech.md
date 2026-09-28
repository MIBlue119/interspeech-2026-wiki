---
id: yu26b_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1015
pdf: https://www.isca-archive.org/interspeech_2026/yu26b_interspeech.pdf
---

# Enhancing Flow Matching with A Unified Guidance Framework for Efficient and Robust Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/yu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1015)

**TL;DR** — A unified guidance framework for Flow Matching speech synthesis combines data-level heterogeneous perturbation and enhanced model-level trajectory distillation, achieving a nearly 3x inference speedup and improved speaker similarity.

## Problem

Flow Matching models for speech generation suffer from high inference latency due to curved ODE trajectories and Classifier-Free Guidance dual-pass overhead, alongside timbre leakage caused by acoustic residue in semantic tokens. These dual bottlenecks restrict the deployment of Flow Matching models in real-time zero-shot scenarios. Resolving this requires simultaneously eliminating shortcut learning during training and linearizing the sampling trajectory.

## Method

The framework uses a two-pillar strategy built on a Diffusion Transformer (DiT) decoder with 330M parameters (20 blocks, attention dimension 1024, AdaLN speaker conditioning). First, Data-guidance (DG) applies a dual-stage heterogeneous perturbation pipeline—combining model-driven cross-synthesis and signal-driven pitch/energy shifting—to corrupt acoustic residue in semantic tokens during training. Second, Enhanced Model-guidance (MG) performs an online training loop that jointly minimizes an intrinsic guidance distillation loss (internalizing CFG weights into a single forward pass) and a trajectory rectification loss (linearizing the ODE sampling path). The model is pre-trained on 50k hours of Emilia and fine-tuned on a 60k-hour mixed corpus using 16 NVIDIA H100 GPUs.

## Results

Evaluated on LibriTTS and Seed-TTS for Voice Conversion and Text-to-Speech tasks. On LibriTTS voice conversion, the unified guidance framework achieves a 3.25x speedup (reducing RTF from 0.078 to 0.024) while using only 3 NFEs, outperforming the 10-step base model in speaker similarity (0.808 non-parallel SIM). In zero-shot TTS tests paired with the CosyVoice2 LLM backend, the unified model maintains competitive word error rates while surpassing unoptimized baseline speaker similarity scores.

## Code

- https://yuzuda283.github.io/unified-guidanc%20e-flow-matching/Interspeech2026_demo_samples/

## Applications

Speech and ML engineers building real-time zero-shot text-to-speech, voice conversion, or speech-to-speech translation systems.

## Limitations

Extreme trajectory rectification can introduce a slight degradation in word error rate.

## Related

- (link related pages by id as the wiki grows)
