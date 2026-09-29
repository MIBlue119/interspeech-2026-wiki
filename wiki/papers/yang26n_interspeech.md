---
id: yang26n_interspeech
category: speech-coding
labels: [efficient-on-device, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2398
pdf: https://www.isca-archive.org/interspeech_2026/yang26n_interspeech.pdf
---

# U-Codec: Neural Speech Codec under Extreme Temporal Compression for Fast High-Fidelity Speech Generation

*Xusheng Yang, Long Zhou, Wenfu Wang, Kai Hu, Zixiang Wan, Yushen Chen, Shulin Feng, Chenxing Li, Meng Yu, Dong Yu, Yuexian Zou*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2398)

**Category:** `speech-coding` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — U-Codec is an ultra-low frame-rate (5Hz) neural speech codec that compresses speech into discrete tokens to accelerate LLM-based TTS by up to 3× while preserving SOTA naturalness and intelligibility.

## Key contributions

- Proposes U-Codec, the first 5Hz ultra-low frame-rate neural speech codec designed specifically for efficient speech-text LLM modeling.
- Introduces a Transformer-based inter-frame long-term dependency bottleneck and factorized residual vector quantization (FRVQ) to prevent spectral and intelligibility collapse under extreme temporal compression.
- Employs a hierarchical global-local CodecFormer Transformer architecture to decouple inter-frame and intra-frame token generation, enabling scalable sequence modeling up to 32-100 RVQ layers.
- Demonstrates up to 3× faster inference speed (RTF 0.52) in zero-shot TTS compared to high-frame-rate baselines like SoundStream while maintaining comparable subjective and objective quality.

## Problem

State-of-the-art neural speech codecs like SoundStream, EnCodec, and DAC operate at high frame rates (50-75 FPS), resulting in extremely long token sequences that cause a quadratic computational bottleneck and slow down autoregressive LLM-based text-to-speech inference. While reducing frame rates is desirable, prior attempts drop performance drastically (e.g., PESQ dropping to ~2.0 at 12.5Hz) due to severe losses in spectral details and phonetic pronunciation. Extreme temporal compression down to 5Hz has not been systematically explored or successfully optimized until now.

## Method

The encoder downsamples a 16kHz waveform via five residual convolutional blocks with strided convolutions (strides [8, 5, 5, 4, 4] for 5Hz) starting from 64 channels and doubling width, followed by an 8-layer contextual Transformer bottleneck (hidden size 512, MLP 2048, 8 heads, RoPE) to model inter-frame dependencies over 200ms windows. Latent representations are quantized using factorized residual vector quantization (FRVQ) with configurations ranging from 8 to 32+ layers and codebook sizes from 256 to 16,384 at ~1kbps bitrate. The decoder mirrors the encoder structure with upsampling factors [4, 4, 5, 5, 8] and starts from 2048 channels to reconstruct high-fidelity audio.

For downstream LLM speech generation, a hierarchical global-local CodecFormer architecture decouples sequence generation: a global Transformer (24 layers, 1536 dim, 12 heads, 6144 MLP) models long-range dependencies across patch-aggregated frames, reducing sequence length from T×N to T. A local Transformer (8 layers) then autoregressively decodes the N intra-frame RVQ tokens per patch. The codec training uses a combination of multi-scale mel-spectrogram L1 loss (weight 15), LSGAN adversarial loss with Multi-Period Discriminators and MS-STFT discriminators (weight 1), feature matching loss (weight 1), and VQ commitment loss (weight 0.25).

The models are trained using 16 H20 GPUs with a batch size of 16 for 600k steps with a 1×10^-4 learning rate and a 1000-step warmup. The TTS models utilize Libriheavy (50k hours) trained for 4 epochs with max 15k sequence length, max learning rate 6×10^-4, and multinomial Top-k sampling (k=5, temperature=1.0) during inference.

## Experimental setup

The codec is trained on 115k hours of multilingual speech (LibriLight 60k, GigaSpeech 10k, MLS 45k) and evaluated on LibriSpeech test-clean (2620 utterances). TTS models are trained on Libriheavy (50k hours) and evaluated on a LibriSpeech test-clean subset (4 hours). Metrics include Word Error Rate (WER), STOI, PESQ (WB/NB), Speaker Similarity (SPK-SIM / SIM-r / SIM-o), UTMOS, MOS, SMOS, Real-Time Factor (RTF), and MACs. Baselines include BigCodec, EnCodec, WavTokenizer, DAC, SpeechTokenizer, X-codec, StableCodec, SemantiCodec, Mimi, DualCodec, UniAudio, VoiceBox, and VALL-E.

## Results

U-Codec at 5Hz with 32 RVQ layers achieves a WER of 3.44, STOI of 0.92, wideband PESQ of 3.20, and speaker similarity of 0.87, closely matching or beating high-frame-rate codecs like BigCodec while operating at a fraction of the frame rate. In zero-shot TTS evaluations, the 32RVQ-c256 configuration achieves a speaker similarity SIM-r of 0.676, SIM-o of 0.600, and WER of 1.8, rivaling VoiceBox and outperforming UniAudio. Ablation studies prove that replacing the contextual Transformer with a convolution module causes significant drops in intelligibility (WER jumps from 3.44 to 5.40), confirming that global attention is necessary to handle information-dense vs sparse segments at 5Hz.

Regarding inference efficiency, U-Codec-8RVQ-c16384 reduces the RTF to 0.52 (a 2-3× speedup over UniAudio's SoundStream baseline), and total MACs are slashed to as low as 0.89G (U-Codec-32RVQ-c256). However, ultra-deep RVQ stacks like 100 layers increase local autoregressive steps, driving up RTF (4.68) despite low total MACs, showing that extreme local depth without careful tuning hurts decoding speed.

| System / Condition | Frame Rate (Hz) | WER (↓) | PESQ-WB (↑) | SPK-SIM (↑) | RTF (↓) |
|---|---|---|---|---|---|
| EnCodec | 75 | 2.15 | 2.77 | 0.89 | - |
| DAC | 50 | 2.00 | 4.01 | 0.95 | - |
| Mimi | 12.5 | 2.96 | 2.25 | 0.73 | - |
| UniAudio (Baseline) | 50 | - | - | - | 1.40 |
| U-Codec (12.5Hz, 8 RVQ) | 12.5 | 2.96 | 2.49 | 0.85 | 1.33 |
| U-Codec (5Hz, 32 RVQ) | 5 | 3.44 | 3.20 | 0.87 | 1.60 |

## Limitations

While U-Codec narrows the gap, its reconstruction PESQ (max 3.20 at 5Hz) still lags behind high-bitrate/high-frame-rate codecs like DAC (4.15 PESQ), indicating a residual fidelity ceiling imposed by extreme temporal loss. Extremely deep RVQ variants (e.g., 100 layers) suffer from severe inference slowdowns (RTF 4.68) due to heavy local autoregressive decoding overhead despite low MAC counts. Evaluation is predominantly restricted to English-centric corpora (LibriSpeech/Libriheavy) for TTS downstream tests despite multilingual pretraining.

## Why read this

Speech LLM and TTS researchers should read this paper to learn how to break the high frame-rate bottleneck using a 5Hz tokenization scheme coupled with hierarchical global-local Transformers, achieving up to 3× inference speedups without sacrificing speech naturalness.

## Code

- https://anonymous666-speech.github.io/CodecFormer_5Hz/

## Applications

Extremely fast and lightweight zero-shot text-to-speech (TTS) systems, unified speech-text large language models, and on-device conversational speech generation agents.

## Institutions / 機構

Peking University, Tencent, Shanghai Jiao Tong University

**Funding / 經費:** Guangdong Provincial Key Laboratory of Ultra High Definition Immersive Media Technology

## Related

- (link related pages by id as the wiki grows)
