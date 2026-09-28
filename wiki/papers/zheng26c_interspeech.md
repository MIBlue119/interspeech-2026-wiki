---
id: zheng26c_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1760
pdf: https://www.isca-archive.org/interspeech_2026/zheng26c_interspeech.pdf
---

# CtrlSpeech: Coarse-to-Fine Control for Expressive Speech Synthesis

*Zhisheng Zheng, Xiaohang Sun, Zhu Liu, Caren Chen, Rohith Kumar, Manoj Aggarwal, Gerard Medioni, David Harwath*

[PDF](https://www.isca-archive.org/interspeech_2026/zheng26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zheng26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1760)

**TL;DR** — CtrlSpeech is a text-to-speech framework that integrates global speaker embeddings with phone-aligned pitch, loudness, and duration signals on a diffusion-autoregressive backbone, achieving strong zero-shot voice cloning and precise fine-grained prosody control. On Seed-TTS, the 0.6B model reaches 2.58% WER and 0.63 speaker similarity (SIM-o).

## Key contributions

- Proposes CtrlSpeech, unifying global timbre conditioning with explicit, phone-aligned pitch, loudness, and duration controls for expressive text-to-speech synthesis.
- Adapts the DiTAR continuous-latent generative backbone to process multi-modal text and local conditioning streams via patch-wise autoregression and local diffusion decoding.
- Demonstrates an iterative coarse-to-fine workflow enabling users to progressively adjust local prosody and rhythm without altering the target speaker's voice identity.
- Achieves competitive zero-shot performance on LibriSpeech-PC (2.46% WER) and Seed-TTS (2.58% WER) while significantly reducing attribute control errors.

## Problem

While modern text-to-speech architectures achieve high naturalness and zero-shot voice cloning, they struggle with fine-grained, explicit control over expressive attributes. Existing reference-conditioned or instruction-based models typically bundle speaker identity, prosody, and style together, restricting adjustments to coarse sentence-level global prompts or style tokens. Users lack a practical mechanism to independently manipulate local acoustic events like pitch, loudness, or phone duration for a specific word or segment while strictly preserving the target speaker's timbre.

## Method

CtrlSpeech models speech as a continuous latent space using a VAE encoder that compresses 16 kHz waveforms into 40 Hz tokens of 64 dimensions, paired with a BigVGAN decoder. It builds on the DiTAR architecture, factorizing generation into patch-wise token groups (each containing 4 consecutive latent tokens). A causal autoregressive transformer models long-range dependencies across patches, outputting a hidden representation h_k that conditions a local diffusion transformer decoder (LocDiT) to denoise the target patch using bidirectional attention and historical prefix context.

To incorporate conditioning, input phoneme embeddings are augmented with discretized control attributes: pitch extracted via WORLD/DIO, converted to Mel-scale, and quantized into 128 bins (65.0-650.0 Hz); loudness computed via A-weighting and RMS energy, mapped to decibels, and quantized into 64 bins (-60.0 to 0.0 dB); and phone duration specified as the count of acoustic frames per phone via forced alignment. Global timbre is preserved by combining a pre-trained Campplus speaker embedding vector with a reference prompt audio stream. The system is trained via an L1 variance-preserving flow-matching loss alongside an auxiliary patch-level stop prediction loss.

During inference, classifier-free guidance (CFG) is applied with 32 sampling steps and a guidance scale of 1.5, treating time and speaker embeddings as a unified condition. The workflow supports iterative refinement where users generate an initial utterance and subsequently modify aligned pitch, loudness, or duration signals.

## Experimental setup

Pretrained on 20,000 hours of English speech combining subsets of Emilia and GigaSpeech. Evaluated zero-shot on LibriSpeech-PC test-clean and Seed-TTS test-en, and evaluated for controllability on LJSpeech. Implemented in two sizes: 0.1B parameters (hidden size 512, 4-layer 8-head aggregation encoder and DiT decoder) and 0.6B parameters (hidden size 1024, 6-layer 16-head aggregation encoder and DiT decoder). Trained for 5 epochs using AdamW (lr 2e-4, weight decay 0.01, linear warmup over 5% steps) on 8 NVIDIA A100 80GB GPUs.

## Results

On LibriSpeech-PC test-clean, the 0.6B model achieves 2.46% WER and 0.65 SIM-o, closely matching vocoder-reconstructed ground truth (2.45% WER, 0.68 SIM-o) and outperforming the replicated DiTAR baseline (2.55% WER, 0.61 SIM-o). On Seed-TTS test-en, it reaches 2.58% WER and 0.63 SIM-o compared to DiTAR's 2.89% WER and 0.59 SIM-o. Ablations on speaker conditions show that combining speaker embeddings with prompt audio yields the highest similarity (0.63 SIM-o) compared to prompt-only (0.53) or embedding-only (0.48).

For fine-grained control on LJSpeech, providing explicit control signals reduces pitch RMSE from 67.86 Hz to 38.39 Hz and loudness RMSE from 6.35 dB to 4.56 dB for the 0.6B model. Phoneme-level duration MAE on LibriSpeech-PC drops from 28.08 to 11.86 frames when control is enabled. Weaknesses include higher text-only pitch error compared to specialized sketch models like DrawSpeech, and higher baseline WER (6.50% for 0.1B, 2.58% for 0.6B) when specific conditioning layers interact under zero-shot settings.

| System / Condition | WER (%) ↓ | SIM-o ↑ | Pitch RMSE (Hz) ↓ | Duration MAE ↓ |
|---|---|---|---|---|
| Ground Truth | 1.90 | 0.73 | - | - |
| Replicated DiTAR (0.6B) | 2.89 | 0.59 | - | 28.00 |
| CtrlSpeech (0.1B) w/ control | 6.50 | 0.58 | 41.54 | 14.00 |
| CtrlSpeech (0.6B) w/ control | 2.58 | 0.63 | 38.39 | 11.86 |

## Limitations

Evaluated exclusively on English speech, leaving multilingual and code-switching capabilities unexplored. Relies heavily on external tools (pitch extractors and forced aligners) whose errors propagate into control signals. Text-only generation struggles to predict precise natural local prosody without manual prompts, and non-target expressive features like emotion, fine voice quality, and nonverbal vocalizations are unmodeled.

## Why read this

Speech synthesis researchers building controllable or diffusion-autoregressive TTS architectures should read this paper to see how phone-aligned continuous control signals can be injected into patch-wise latent diffusion models without sacrificing voice cloning quality.

## Code

- https://www.modelscope.cn/models/iic/CosyVoice-300M/file/view/master/campplus.onnx

## Applications

Interactive audio production suites, voice dubbing tools requiring precise pitch and pacing alterations, and audiobook editing systems.

## Related

- (link related pages by id as the wiki grows)
