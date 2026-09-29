---
id: ghosh26f_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1461
pdf: https://www.isca-archive.org/interspeech_2026/ghosh26f_interspeech.pdf
---

# MagpieTTS-LF: Inference-Time Long-Form Speech Generation Without Training on Long-Form data

*Subhankar Ghosh, Jason Li, Paarth Neekhara, Shehzeen Hussain, Ryan Langman, Xuesong Yang, Roy Fejgin*

[PDF](https://www.isca-archive.org/interspeech_2026/ghosh26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ghosh26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1461)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — MagpieTTS-LF is an inference-time algorithm that enables encoder-decoder TTS models to generate coherent, multi-minute long-form speech without requiring model retraining, achieving a Word Error Rate of 0.025 on a 1-hour HiFiTTS subset. It utilizes soft attention priors, stateful chunk generation, and history-aware text encoding to eliminate prosodic drift and boundary artifacts.

## Key contributions

- Inference-time soft attention prior mechanism that maintains non-zero weights on past and future tokens for graceful information decay rather than hard binary cutoffs.
- Stateful chunk generation algorithm carrying attention prior states, encoder hidden states, and text history across sentence boundaries.
- Cross-chunk state propagation achieving significant improvements in long-range prosodic coherence, speaker consistency over multi-minute durations, and boundary naturalness.
- Introduction of the Long-Form HifiTTS benchmark dataset containing 20 passages of approximately 3-4 minutes each derived from Multilingual LibriSpeech.

## Problem

State-of-the-art neural TTS models like Tortoise, VALL-E 2, NaturalSpeech 2/3, and MagpieTTS produce high-quality speech on short 2-20 second utterances but degrade significantly when generating paragraph-length speech. Naive sentence-level chunking and concatenation cause energy discontinuities, warbles, speaking rate inconsistencies, and loss of intonation. Existing workarounds such as extreme sequence compression (e.g., VibeVoice at 7.5 Hz) sacrifice temporal resolution and intelligibility, state-space models require complex extrapolations, and streaming block-wise attention masks need hard architectural modifications and training-time changes.

## Method

MagpieTTS-LF builds upon the MagpieTTS encoder-decoder architecture operating on discrete audio codec tokens with Connectionist Temporal Classification (CTC) loss and learned attention priors. Instead of retraining, it operates entirely at inference time by splitting long input texts into sentence-level chunks using punctuation-aware segmentation.

To prevent alignment drift, it introduces soft attention priors at each decoding step t. A prior distribution Pt is computed over encoder positions based on expected monotonic alignment, using a fixed experimental weight vector w = (0.2, 0.8, 1.0, 0.8, 0.2) and an epsilon eps = 0.1 for distant positions. A strength parameter lambda = 1.0 scales this prior, ensuring distant encoder positions maintain non-zero weights for gradual context preservation rather than binary cutoffs.

The stateful inference algorithm maintains context across independent chunks using three components: history text tokens (the final K tokens from the previous chunk), history encoder context (corresponding encoder hidden states concatenated with current chunk outputs), and attention tracking (saving last attended text positions to initialize the soft attention prior tau for the next chunk). Input texts are encoded as Xi = [H_text; si] and combined with cached encoder states H_enc before prior-guided autoregressive generation at a temperature of 0.7 and CFG scale of 2.5.

## Experimental setup

Evaluated on a curated dataset of 20 long English texts and a 1-hour subset of the Long-Form HifiTTS dataset (20 passages, ~3-4 minutes each, ~135 WPM). Baselines include XTTS, Qwen3-TTS, and VibeVoice. Metrics include Word Error Rate (WER) and Character Error Rate (CER) via Whisper-Large, speaker similarity (SSIM) via TitaNet and WavLM embeddings on 10-second chunks, Prosodic Boundary Discontinuity (PBD) measuring F0 jumps and energy differences within +/- 1000 ms of sentence boundaries, and naturalness via UTMOSv2. All inferences ran on a single NVIDIA A6000 GPU.

## Results

MagpieTTS-LF achieves a WER of 0.025 and CER of 0.012, substantially outperforming XTTS (0.051 WER / 0.035 CER), Qwen3-TTS (0.045 WER / 0.028 CER), and VibeVoice (0.115 WER / 0.105 CER). In prosodic boundary discontinuity, it obtains the lowest energy discontinuity at 14.04 dB (compared to 17.91 dB for Qwen3-TTS, 28.90 dB for VibeVoice, and 30.62 dB for XTTS), while maintaining comparable F0 jumps around 69.19 Hz. In speaker consistency and naturalness across relative sequence positions (0 to 1), MagpieTTS-LF exhibits minimal variance and no observable drift in WavLM speaker similarity and UTMOSv2 scores, whereas VibeVoice shows a downward trend in quality over long durations.

| Model | WER_↓_ | CER_↓_ | SSIM (WavLM)_↑_ | $\Delta$Energy (dB)_↓_ |
|---|---|---|---|---|
| **MagpieTTS-LF** | **0.025** | **0.012** | **0.979** | **14.04** |
| Qwen3-TTS | 0.045 | 0.028 | 0.958 | 17.91 |
| XTTS | 0.051 | 0.035 | 0.929 | 30.62 |
| VibeVoice | 0.115 | 0.105 | 0.848 | 28.90 |

## Limitations

The evaluation is restricted to English text passages and relies heavily on text chunking via punctuation marks, which may fail on unpunctuated or heavily stylized transcripts. The approach requires hyperparameter tuning for prior strength lambda, weights w, and epsilon to balance monotonicity with context retention across different model architectures. Furthermore, the inference-time state caching introduces sequential dependency between chunks that prevents fully parallelized multi-chunk generation.

## Why read this

Speech researchers and engineers working with autoregressive or encoder-decoder TTS systems who need to generate multi-minute speech without retraining base models will find an elegant, zero-retraining inference blueprint. It demonstrates how soft attention priors and state-passing can solve boundary artifacts more effectively than aggressive token compression or naive chunk concatenation.

## Code

- https://github.com/NVIDIA-NeMo/NeMo

## Applications

Audiobook narration, long-form podcast generation, automated news reading, and long-form conversational speech synthesis in speech LLMs.

## Institutions / 機構

NVIDIA

## Related

- (link related pages by id as the wiki grows)
