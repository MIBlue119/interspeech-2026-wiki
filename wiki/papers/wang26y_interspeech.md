---
id: wang26y_interspeech
category: speech-coding
labels: [generative-model]
institutions: ["Amazon"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1490
pdf: https://www.isca-archive.org/interspeech_2026/wang26y_interspeech.pdf
---

# AugCodec: A Low-Bitrate Disentangled Neural Speech Codec via Data Augmentation

*Dongmei Wang, Xiaohang Sun, Yang Liu, Fanjie Kong, Abhishek Yanamandra, Abhinav Jain, Daniel Tompkins, Woohyun Kang, Najmeh Sadoughi, Sunil Hadap, Xiang Hao, Zhu Liu, Caren Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26y_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26y_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1490)

**Category:** `speech-coding` · **Labels:** `generative-model`

**TL;DR** — AugCodec is a low-bitrate disentangled neural speech codec operating at 12.5 Hz that uses tailored data augmentation and a dedicated augmentation loss to decompose speech into semantic, speaker, and prosody streams, achieving a Word Error Rate (WER) of 5.12% on LibriSpeech test-clean.

## Key contributions

- Proposes a multi-stream data augmentation strategy that feeds voice-converted speech, cross-utterance speaker recordings, and low-frequency STFT components into separate encoders to enforce feature disentanglement.
- Introduces a learned compression and expansion mechanism via linear projections and concatenation that preserves temporal dynamics better than pooling or interpolation.
- Designs an augmentation loss minimizing the L1 distance between source and voice-converted semantic embeddings to encourage speaker-agnostic representations and mitigate conversion mismatch.
- Demonstrates robust ultra-low-bitrate reconstruction and voice conversion performance, significantly outperforming BiCodec and matching or beating Mimi and Qwen-TTS-Tokenizer.

## Problem

Prior neural speech codecs either rely on residual vector quantization (RVQ) requiring 8+ tokens per frame without supporting disentanglement, or suffer from severe cross-feature interference because all target attributes are extracted from the same speech source. Specifically, methods like FreeCodec and BiCodec fail to achieve proper semantic-speaker separation at low frame rates, leading to catastrophic degradation in reconstruction WER (exceeding 60%) during voice conversion tasks. This insufficiency limits their utility as reliable foundational building blocks for speech language models and downstream speech-to-speech architectures.

## Method

AugCodec consists of four major modules: encoders, quantizers, feature fusion, and a decoder. The architecture utilizes three separate encoder streams. The semantic encoder takes averaged 1024-dimensional wav2vec 2.0 features (layers 11, 14, 16), passes them through 12 ConvNeXt blocks, and applies a learned temporal compression factor of 4 via channel concatenation and linear projection to achieve 12.5 Hz (or 6.25 Hz). The speaker encoder uses an ECAPA-TDNN on 128-dimensional mel-spectrograms from a different utterance of the same speaker, aggregated via cross-attention into a global representation quantized with Finite Scalar Quantization (FSQ). The prosody encoder uses an ECAPA-TDNN with a coarser temporal resolution (160 ms hop) on low-frequency STFT components (<500 Hz), also quantized using FSQ.

During feature fusion, compressed semantic and prosody streams are expanded back to original temporal resolutions using learned linear projections, combined via element-wise multiplication, and modulated by the global speaker embedding using FiLM-based adaptive layer normalization with a residual connection. A single-layer Transformer then models final temporal dependencies. The decoder comprises 18 ConvNeXt blocks followed by DAC-style upsampling layers using Snake activations, weight-normalized convolutions, and Tanh to output 16 kHz waveforms.

The model is trained end-to-end using a weighted sum of multi-scale mel L1 loss (15.0), multi-scale STFT L1 loss (5.0), adversarial feature/waveform losses (2.5, 1.0), quantization codebook/commitment losses (3.0), and a semantic augmentation loss (1.0) that minimizes L1 distance between source and voice-converted semantic outputs.

## Experimental setup

The model is trained on approximately 3000 hours of 16 kHz speech data from LibriLight-medium and LibriTTS datasets (segmented via VAD to 2s-15s clips). Evaluation is conducted on 1237 samples (4s-10s splits) from LibriSpeech test-clean. Baselines include BiCodec (retrained to 12.5 Hz), Mimi, Qwen-TTS-Tokenizer-12Hz, and FACodec. Metrics include WER (evaluated via Whisper-v3-large), PESQ, speaker similarity (SIM via WavLM-base-plus-sv), and UTMOS. Optimization uses AdamW (lr = 1e-4, beta1 = 0.8, beta2 = 0.99) with a batch size of 72 for 750k iterations.

## Results

AugCodec-3 achieves a headline WER of 5.12%, PESQ of 1.99, SIM of 0.90, and UTMOS of 3.04 at a bitrate of 400 bps, outperforming the retrained BiCodec (WER 60.15, PESQ 1.40) and competitive open-source models like Mimi (WER 7.19, PESQ 1.81) and Qwen-TTS-Tokenizer-12Hz (WER 13.09, PESQ 1.36) at matching frame rates. In voice conversion evaluations, AugCodec achieves a remarkably low WER of 5.87 at 12.5 Hz compared to 65.43 for BiCodec. Ablation studies confirm that removing the augmentation loss (L_aug) degrades performance (WER dropping to 6.29, PESQ to 1.89). AugCodec does not win on raw speaker similarity against Mimi, where Mimi achieves 0.92 compared to AugCodec's 0.90.

| Systems | Frame rate | Bit-rate(bps) | WER ↓ | PESQ ↑ | SIM ↑ | UTMOS ↑ |
|---|---|---|---|---|---|---|
| GT | - | - | 3.10 | - | - | 3.21 |
| BiCodec | 12.5, global | 312.50 | 60.15 | 1.40 | 0.88 | 2.66 |
| Mimi | 12.5 | 412.50 | 7.19 | 1.81 | **0.92** | 2.25 |
| Qwen-TTS-Tokenizer-12Hz | 12.5 | 412.50 | 13.09 | 1.36 | 0.78 | 1.17 |
| AugCodec-3 | 12.5, global, 6.25 | 400.00 | **5.12** | **1.99** | 0.90 | 3.04 |
| AugCodec-2 w/o L_aug | 12.5, global, 6.25 | 387.50 | 6.29 | 1.89 | 0.90 | 2.92 |

## Limitations

The evaluation is restricted to clean English speech (LibriSpeech test-clean), leaving multi-lingual robustness and noisy acoustic conditions untested. The approach relies heavily on an off-the-shelf voice conversion model (Seed-VC) during training, which may introduce compounding artifacts or domain biases into the semantic augmentation pipeline. Furthermore, scaling down semantic frame rates to 6.25 Hz (AugCodec-4) results in a noticeable WER spike to 17.11%, indicating a lower bound on usable temporal compression for high-fidelity content retention.

## Why read this

Speech and ML engineers building speech language models or multimodal tokenizers should read this to see how dedicated data augmentation and loss design can eliminate cross-feature interference in ultra-low-bitrate disentangled codecs. It provides a blueprint for replacing residual vector quantization with independent multi-stream tokenization without sacrificing semantic intelligibility.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Foundational tokenization for speech language models, ultra-low-bandwidth speech transmission, voice conversion, and text-to-speech generation.

## Institutions / 機構

Amazon

## Related

- (link related pages by id as the wiki grows)
