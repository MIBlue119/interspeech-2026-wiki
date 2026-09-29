---
id: dhar26_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1655
pdf: https://www.isca-archive.org/interspeech_2026/dhar26_interspeech.pdf
---

# Adaptive Oscillatory Inductive Bias for Modeling Sharp Prosodic Dynamics in Diffusion-Based TTS

*Sandipan Dhar, Nirmesh J. Shah, Ashishkumar P. Gudmalwar, Pankaj Wasnik*

[PDF](https://www.isca-archive.org/interspeech_2026/dhar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dhar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1655)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — OscillaTTS integrates an adaptive oscillatory activation function into a StyleTTS2-based diffusion decoder to better capture sharp prosodic dynamics, improving MUSHRA speech quality to 86.67 and reducing Word Error Rate on LJSpeech to 1.85%.

## Key contributions

- Investigates the role of oscillatory inductive bias in diffusion-based text-to-speech decoders for modeling expressive speech dynamics.
- Proposes an adaptive oscillatory activation function combining periodic modulation with a linear bypass for signal stability.
- Integrates the proposed activation into the StyleTTS2 decoder architecture, yielding the OscillaTTS system.
- Demonstrates consistent improvements across subjective MUSHRA/ES-MOS and objective metrics (MCD, F0-RMSE, AutoPCP, WER) on LJSpeech and the Emotional Speech Dataset.

## Problem

Generating expressive speech with abrupt pitch transitions, energy shifts, and rapid prosodic variations remains difficult for standard neural text-to-speech systems. Existing diffusion decoders often use fixed-frequency periodic activations like Snake, which provide limited adaptability and struggle to handle sharp amplitude and frequency changes at voiced-unvoiced boundaries. This causes degradation in naturalness and intelligibility for emotional narration and conversational styles. Overcoming this limitation is crucial for producing human-like expressive synthetic speech across diverse acoustic conditions.

## Method

OscillaTTS builds upon the two-stage StyleTTS2 architecture, retaining elements such as the bidirectional LSTM acoustic-text encoder, PLBert prosodic text encoder, Transferable Monotonic Aligner (TMA), and JDC pitch extractor. Stage 1 pre-trains the iSTFT-Net-based decoder and acoustic components for 200 epochs, while stage 2 jointly trains the style diffusion model and downstream components for 120 epochs using an SLM discriminator as an acoustic-semantic critic.

The core innovation lies in replacing standard decoder activations with the proposed Oscilla activation: x + tanh(alpha * sin^2(x)). The periodic sin^2(x) component captures vocal fold harmonic structures, while the learnable parameter alpha provides input-dependent adaptive modulation via a sech^2 gating mechanism that suppresses gradients during saturation to maintain stability. The linear bypass term (x) preserves the underlying signal structure and prevents the uncontrolled cubic scaling seen in activation functions like Snake.

## Experimental setup

Evaluated on single-speaker English LJSpeech (~24 hours) and the English subset of the Emotional Speech Dataset (ESD) covering Angry, Happy, and Sad styles, split 80/10/10 for training/validation/testing. Compared against baselines including StyleTTS2, GlowTTS, GradTTS, FastSpeech2, and BigVGAN. Metrics include MUSHRA, ES-MOS, Mel Cepstral Distortion (MCD), F0-RMSE, AutoPCP for prosody similarity, and Whisper-based Word Error Rate (WER). Implemented with AdamW optimizer (learning rate 10^-4, batch size 8) on a single NVIDIA A100 GPU.

## Results

On LJSpeech, OscillaTTS achieved a subjective MUSHRA score of 86.67±1.49 (vs 81.48 for StyleTTS2), an MCD of 6.59, an F0-RMSE of 0.35, and a WER of 1.85% (substantially lower than FastSpeech2's 4.57% and GlowTTS's 6.22%). On expressive emotions (ESD dataset), it improved Angry ES-MOS to 70.71 and dropped Angry WER to 4.05% compared to baseline StyleTTS2's 9.21%. Ablation studies confirmed that learnable alpha outperforms fixed alpha (MCD 6.59 vs 6.63) and standard activations like Snake1D (MCD 6.64), ReLU (8.14), and tanh (7.87).

| Systems | MUSHRA/ES-MOS ↑ | MCD ↓ | F0-RMSE ↓ | WER ↓ |
| --- | --- | --- | --- | --- |
| StyleTTS2 (Baseline) | 81.48 | 6.64 | 0.41 | 2.86 |
| GlowTTS | 75.79 | 6.85 | 0.40 | 6.22 |
| GradTTS | 83.78 | 6.90 | 0.35 | 3.89 |
| FastSpeech2 | 76.00 | 6.62 | 0.35 | 4.57 |
| Proposed OscillaTTS | 86.67 | 6.59 | 0.35 | 1.85 |

## Limitations

Evaluated solely on single-speaker English datasets (LJSpeech) and a limited subset of three emotions from the ESD dataset, leaving multi-speaker expressive synthesis and cross-lingual generalization untested. The architecture inherits the heavy two-stage training complexity and alignment overhead of StyleTTS2. The paper does not analyze inference latency overhead introduced by the learnable tanh-trigonometric activation function.

## Why read this

Researchers and audio engineers working on expressive or diffusion-based text-to-speech systems should read this paper to see how replacing fixed periodic activations with an adaptive oscillatory nonlinearity can resolve pitch tracking errors and improve intelligibility during sharp prosodic transitions.

## Code

- https://research.sri-media-analysis.com/interspeech26-oscilla-tts/

## Applications

Expressive text-to-speech generation, conversational AI agents, audiobook narration, and emotional voice synthesis.

## Institutions / 機構

Sony

## Related

- (link related pages by id as the wiki grows)
