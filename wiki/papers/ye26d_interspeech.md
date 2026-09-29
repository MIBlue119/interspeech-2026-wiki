---
id: ye26d_interspeech
category: speech-coding
labels: [efficient-on-device, generative-model]
institutions: ["Xiaomi"]
code: https://github.com/winlaic/ZipCodec
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2941
pdf: https://www.isca-archive.org/interspeech_2026/ye26d_interspeech.pdf
---

# ZipCodec: Simple and Pretrained-Model-Free Speech Tokenizer via Flow-Matching

*Lingxuan Ye, Han Zhu, Liyong Guo, Zengwei Yao, Wei Kang, Fangjun Kuang, Zhifeng Han, Long Lin, Daniel Povey*

[PDF](https://www.isca-archive.org/interspeech_2026/ye26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ye26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2941)

**Category:** `speech-coding` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — ZipCodec is a single-stage speech tokenizer that replaces massive pretrained encoders with an ultra-lightweight 4.4M-parameter Zipformer encoder and a flow-matching decoder, achieving state-of-the-art reconstruction and zero-shot TTS performance.

## Key contributions

- Proposes an ultra-lightweight 4.4M-parameter speech encoder paired with a Zipformer-based flow-matching decoder, eliminating the need for heavy pretrained backbones or multi-stage pipelines.
- Introduces Encoder Consistency Regularization (ECR), a self-supervised loss enforcing representation consistency between clean and noise-augmented speech to boost semantic capacity without external teachers or labels.
- Implements a flow-distillation variant (ZipCodec-distill) that reduces inference function evaluations (NFEs) down to 3 while maintaining acoustic and semantic quality.
- Demonstrates superior zero-shot TTS generation and reconstruction performance across multiple benchmarks compared to baseline models with encoders over 20x larger.

## Problem

Traditional speech tokenizers rely either on pure acoustic signal compression (like EnCodec and SoundStream), which yields tokens lacking semantic richness for language modeling, or on complex multi-stage pipelines utilizing massive pretrained models (like HuBERT or Whisper) and supervised labels. These heavy encoder configurations inflate parameter counts and add pipeline complexity, raising the question of whether massive auxiliary encoders are truly necessary for semantic-rich tokenization. ZipCodec addresses this gap by showing that an extremely small, self-supervised encoder coupled with a powerful flow-matching decoder can achieve superior semantic-acoustic trade-offs without external dependencies.

## Method

ZipCodec operates on 24 kHz mel-spectrograms extracted with Vocos settings (1024 window, 256 hop). The encoder downsamples the mel-spectrogram 4x via convolution layers (two strided layers with kernel size 2 and GELU activations), followed by a 4-layer Zipformer backbone with encoder dimension $d_{\text{enc}} = 192$ and feedforward dimension 512. Continuous representations are quantized via Finite Scalar Quantization (FSQ) using 11 groups of 3 channels with quantization levels [8, 5, 5], yielding a frame rate of 23.4375 Hz and a bit rate of ~1.97 kbps.

The decoding stage uses a Zipformer-based flow-matching backbone with embedding and feedforward dimensions of 512 and 1536, operating with downsampling rates of [1×, 2×, 4×, 2×, 1×] across 5 stacks. It is optimized using optimal transport conditional flow-matching (CFM) with Classifier-Free Guidance (CFG) where the conditioning signal is randomly dropped with probability $p_{\text{drop}}$. To eliminate external semantic models, the training objective incorporates the Encoder Consistency Regularization (ECR) loss ($\lambda = 0.25$), which applies cosine similarity constraints between the encoder outputs of clean speech and noise-augmented speech ($\mathbf{y}^{\text{aug}} = \mathbf{y} + \beta \boldsymbol{\varepsilon}$, targeting SNRs of 10, 20, 30 dB).

For accelerated inference, ZipCodec-distill employs flow-distillation by supervising a student model with a pretrained teacher's two-step ODE outputs, explicitly learning the CFG scale $\gamma$ as an embedding. During standard inference, the model uses an Euler solver with 10 NFEs and $\gamma = 0.5$ alongside a logit-normal time schedule ($\eta = 0.5$). The distilled version reduces NFE to 3.

## Experimental setup

Models are trained on the Emilia dataset (96.7k hours of Chinese and English speech) for 400k iterations using ScaledAdam, and on LibriTTS (585 hours) for 30 epochs on NVIDIA H20 GPUs. Evaluations use the Librispeech PC test-clean set and SeedTTS (en/zh) test sets. Baselines include Encodec, SpeechTokenizer, XCodec, XCodec 2.0, XY-Tokenizer, and BiCodec. Metrics comprise WER (evaluated via HuBERT, Whisper-large-v3, and Paraformer-zh), speaker similarity (SIM-o via WavLM-ECAPA-TDNN), PESQ, ViSQOL, and UTMOS.

## Results

ZipCodec achieves top-tier performance, outperforming baselines with vastly larger encoders. On Librispeech PC test-clean, ZipCodec obtains a WER of 2.21%, SIM-o of 0.884, PESQ of 2.778, and ViSQOL of 4.46, compared to Encodec's 5.05% WER and XCodec's 2.84% WER. The distilled variant matches this with a 2.26% WER and improved PESQ (2.862) using only 3 NFEs. Ablation of the ECR loss weight $\lambda$ demonstrates that setting $\lambda = 0.25$ drops WER from 2.41% down to 2.28% relative to the unregularized baseline while improving acoustic scores. In downstream non-autoregressive zero-shot TTS tests sharing the same backbone, ZipCodec surpasses XCodec and XY-Tokenizer, achieving a 2.16% WER, 0.597 SIM-o, and 4.08 UTMOS.

| Model | Bit Rate (kbps) | Encoder Param. | Total Param. | Librispeech PC WER (%) ↓ | SeedTTS-en WER (%) ↓ | SeedTTS-zh WER (%) ↓ |
|---|---|---|---|---|---|---|
| Encodec | 1.50 | 8.0M | 23.3M | 5.05 | 6.53 | 5.20 |
| SpeechTokenizer | 4.00 | 67.7M | 103.7M | 2.48 | 2.96 | 2.14 |
| XCodec 2.0 | 0.80 | 635.8M | 822.7M | 2.59 | 2.85 | 2.06 |
| XY-Tokenizer | 1.00 | 263.4M | 519.6M | 2.36 | 2.69 | 1.77 |
| ZipCodec | 1.97 | 4.4M | 136.5M | 2.21 | 2.52 | 1.57 |
| ZipCodec - distill | 1.97 | 4.4M | 136.5M | 2.26 | 2.52 | 1.56 |

## Limitations

The current framework depends on an external Vocos vocoder for waveform reconstruction, which acts as an upper bound on acoustic metrics like PESQ. Evaluation is restricted to English and Chinese datasets (Emilia and LibriTTS), leaving broader multilingual generalization unverified. Additionally, although the encoder is lightweight (4.4M), the flow-matching decoder and total system size (136.5M parameters) still require multi-step ODE inference or distillation for real-time operation.

## Why read this

Researchers building speech LLMs or zero-shot TTS systems should read this paper to learn how to bypass heavy pretrained semantic encoders (like HuBERT/Whisper) entirely via self-supervised consistency regularization and flow-matching decoders.

## Code

- https://github.com/winlaic/ZipCodec

## Applications

Speech language modeling, zero-shot text-to-speech generation, and low-bitrate discrete audio tokenization for unified speech-text architectures.

## Institutions / 機構

Xiaomi

## Related

- (link related pages by id as the wiki grows)
