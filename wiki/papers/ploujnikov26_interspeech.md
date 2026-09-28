---
id: ploujnikov26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2784
pdf: https://www.isca-archive.org/interspeech_2026/ploujnikov26_interspeech.pdf
---

# HybridCodec: Modeling Discrete and Continuous Representations For Efficient Speech Language Models

*Artem Ploujnikov, Francesco Verdini, Samir Sadok, Mirco Ravanelli*

[PDF](https://www.isca-archive.org/interspeech_2026/ploujnikov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ploujnikov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2784)

**TL;DR** — HybridCodec combines temporally compressed discrete tokens with dimensionality-reduced continuous residuals to bridge the discrete-continuous trade-off in neural audio codecs, enabling high-fidelity speech synthesis and recognition at ultra-low frame rates down to 6.25 Hz.

## Key contributions

- HybridCodec: A dual-path neural audio codec extending FocalCodec by jointly extracting time-reduced discrete tokens and modeling lost information as dimensionality-reduced continuous residuals.
- HybridLM: A decoder-only Transformer utilizing Adaptive Layer Normalization (AdaLN) to unify low-frame-rate autoregressive discrete token prediction with single-step non-autoregressive continuous residual upsampling.
- A unified framework handling both generative (TTS) and discriminative (ASR) downstream speech tasks without task-specific architectures.
- Demonstration that ultra-low frame rates (e.g., 6.25 Hz) can maintain high speech quality and speaker similarity, drastically reducing autoregressive inference steps.

## Problem

Modern speech language models rely on discrete neural audio codecs to convert continuous speech into token sequences, suffering from a fundamental rate-distortion trade-off. At low bitrates, quantization discards critical acoustic details like microprosody, tone, and speaker timbre, causing severe downstream degradation in naturalness and intelligibility. While prior task-specific work re-integrates continuous features through diffusion or continuous AR, these approaches sacrifice the unified generalizability of discrete LLMs. This paper bridges the gap by designing a unified architecture that leverages discrete token efficiency while recovering rich continuous acoustic nuances.

## Method

The HybridCodec encoding phase takes continuous base representations from the first six layers of pretrained WavLM (dim T x d) and passes them through a discrete pathway using Binary Spherical Quantization (BSQ) to obtain discrete indices and quantized approximations. The continuous pathway calculates the residual error by subtracting the quantized approximation from the base features, then applies a residual focal encoder (FE_res) with temporal downsampling strides r to yield a dimensionality-reduced bottleneck representation. Strides are set to (1,1,1) for 50 Hz, (2,1,1) for 25 Hz, (2,2,1) for 12.5 Hz, and (2,2,2) for 6.25 Hz. During decoding, the residual focal decoder (FD_res) upsamples the continuous residual by r, which is then added directly to the dequantized discrete tokens before passing to a Vocos waveform decoder.

The HybridLM architecture is a 12-layer GPT-style decoder-only Transformer (4 attention heads, d_model = d_emb = 512, d_ffn = 2048) that processes these hybrid representations using Adaptive Layer Normalization (AdaLN). AdaLN injects a mode-specific embedding (i_mode in {AR, NAR}) at every layer to dynamically adapt internal representations, multiplexing AR classification for discrete tokens and NAR regression for continuous residuals without objective interference. Pretrained ECAPA-TDNN speaker embeddings are injected via linear projection and addition. Training uses standard teacher forcing combining negative log-likelihood (NLL) for discrete tokens and mean squared error (MSE) for continuous residuals, with signed-log transform (SLT) applied to improve training dynamics.

During inference, generation proceeds in a cascaded manner: discrete tokens are generated autoregressively, followed by a single non-autoregressive forward pass to predict continuous residuals, which are then temporally aligned using the upsampling rate r. This cuts the required Transformer inference steps down to n_full / r + 1.

## Experimental setup

Trained on the 960-hour LibriTTS dataset (clean and other subsets combined, excluding samples over 20 seconds), evaluated strictly on the clean test set. Evaluated on resynthesis, text-to-speech (TTS, on 1,000 sampled utterances), and automatic speech recognition (ASR, on the full test set). Metrics include UTMOS, NISQA, differential Word Error Rate (dWER using Whisper Small greedy decoding), SpkSim (WavLM-SV cosine similarity), Code Usage, Normalized Entropy, WER, and CER.

## Results

In resynthesis at 12.5 Hz, HybridCodec achieves a dWER of 1.47 (substantially outperforming discrete FocalCodec's 7.94 dWER) and a SpkSim of 96.2, matching or exceeding higher-rate baselines while operating at a fraction of the frame rate.

For zero-shot TTS at 12.5 Hz, the hybrid model more than doubles the UTMOS score (4.10 vs. 1.99) and cuts dWER by more than half (14.79 vs. 32.97) compared to the discrete-only baseline. At an extreme 6.25 Hz rate, the hybrid approach reaches a UTMOS of 3.08 and dWER of 48.00, compared to 1.44 UTMOS and 121.00 dWER for the discrete-only baseline. In ASR, the hybrid model lowers the 50 Hz WER from 28.11 to 23.36 and CER from 14.48 to 12.36, demonstrating that continuous residuals consistently improve discriminative tasks.

| System / Condition | Frame Rate (Hz) | UTMOS (↑) | dWER (↓) | SpkSim (↑) | WER (↓) |
|---|---|---|---|---|---|
| Discrete-Only (TTS) | 50.0 | 4.07 | 16.10 | 0.924 | 28.11 |
| Hybrid (Ours, TTS) | 50.0 | 4.14 | 11.67 | 0.926 | 23.36 |
| Discrete-Only (TTS) | 12.5 | 1.99 | 32.97 | 0.853 | 28.50 |
| Hybrid (Ours, TTS) | 12.5 | 4.10 | 14.79 | 0.905 | 25.94 |
| Discrete-Only (TTS) | 6.25 | 1.44 | 121.00 | 0.707 | 29.13 |
| Hybrid (Ours, TTS) | 6.25 | 3.08 | 48.00 | 0.834 | 27.36 |

## Limitations

Evaluated exclusively on English speech data (LibriTTS corpus) and restricted to utterances under 20 seconds during training. While ultra-low frame rates like 6.25 Hz are achieved, generative quality at 6.25 Hz (UTMOS 3.08, dWER 48.00) still exhibits notable degradation relative to higher rates, indicating a ceiling for extreme compression bounds.

## Why read this

Speech and ML researchers building efficient speech LLMs or neural audio codecs should read this paper to see how non-autoregressive continuous residuals can eliminate the severe quality degradation of ultra-low frame rate discrete tokenization.

## Code

- https://speechbrain.github.io/

## Applications

Efficient long-form text-to-speech synthesis, low-latency zero-shot voice cloning, and unified multimodal speech-text language modeling.

## Related

- (link related pages by id as the wiki grows)
