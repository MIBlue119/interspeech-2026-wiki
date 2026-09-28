---
id: dhar26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1655
pdf: https://www.isca-archive.org/interspeech_2026/dhar26_interspeech.pdf
---

# Adaptive Oscillatory Inductive Bias for Modeling Sharp Prosodic Dynamics in Diffusion-Based TTS

[PDF](https://www.isca-archive.org/interspeech_2026/dhar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dhar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1655)

**TL;DR** — OscillaTTS introduces an adaptive oscillatory activation function into diffusion-based text-to-speech decoders to better model sharp prosodic dynamics, achieving superior subjective and objective scores over StyleTTS2 on LJSpeech and expressive emotion datasets.

## Problem

Standard diffusion-based text-to-speech (TTS) models and existing periodic activations (like Snake) struggle to accurately represent rapid pitch variations, abrupt amplitude shifts, and voiced-unvoiced boundary transitions in expressive speech. Furthermore, activations with fixed-frequency parameters lack the flexibility required to capture diverse speech dynamics across multiple speakers and emotional states. This failure limits the naturalness and prosodic fidelity of synthetic emotional narration and conversational dialogue.

## Method

The authors propose OscillaTTS, integrating a novel adaptive oscillatory activation function into the decoder of the StyleTTS2 framework, which uses an iSTFT-Net vocoder backbone. The activation function is defined as x + tanh(alpha * sin^2(x)), where the periodic component captures harmonic speech structures, a learnable parameter alpha enables adaptive modulation, and a linear bypass component preserves signal stability. The training follows a two-stage recipe from StyleTTS2: 200 epochs for pre-training (stage 1) and 120 epochs for joint training (stage 2) using the AdamW optimizer on a single NVIDIA A100 GPU.

## Results

Evaluated on LJSpeech and the Emotional Speech Dataset (ESD) across Angry, Happy, and Sad categories. On LJSpeech, OscillaTTS achieves a MUSHRA speech quality score of 86.67 (vs 81.48 for StyleTTS2), Mel Cepstral Distortion (MCD) of 6.59, and F0-RMSE of 0.35, outperforming baselines including GlowTTS, GradTTS, and FastSpeech2. On ESD, it improves emotion similarity (ES) scores and reduces Word Error Rate (WER) down to 4.05 for Angry (compared to 9.21 for StyleTTS2). Ablation studies confirm that learnable alpha outperforms fixed alpha, Snake1D, ReLU, and other baseline activation variants.

## Code

- https://research.sri-media-analysis.com/interspeech26-oscilla-tts/

## Applications

Engineers building high-fidelity text-to-speech systems for expressive domains such as conversational AI, audiobooks, and emotional voice generation.

## Limitations

The current scope is restricted to single-speaker evaluation and specific emotion categories, though future work aims to extend it to multi-speaker expressive TTS and singing voice synthesis.

## Related

- (link related pages by id as the wiki grows)
