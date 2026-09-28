---
id: yang26n_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2398
pdf: https://www.isca-archive.org/interspeech_2026/yang26n_interspeech.pdf
---

# U-Codec: Neural Speech Codec under Extreme Temporal Compression for Fast High-Fidelity Speech Generation

[PDF](https://www.isca-archive.org/interspeech_2026/yang26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2398)

**TL;DR** — U-Codec is an ultra-low frame-rate neural speech codec operating at 5Hz that achieves up to 3× faster LLM-based text-to-speech inference while maintaining competitive reconstruction and generation quality.

## Problem

State-of-the-art neural speech codecs operate at high frame rates of 50 to 75 FPS using residual vector quantization, leading to long token sequences and inefficient autoregressive inference in LLM-based speech generation. Reducing the frame rate shortens sequences and accelerates inference, but extreme temporal compression like 5Hz typically causes severe intelligibility and spectral detail loss. Overcoming this trade-off is critical for enabling fast, high-fidelity speech generation models.

## Method

The encoder utilizes strided 1D convolutions to downsample 16kHz audio to 5Hz, followed by an 8-layer Transformer bottleneck with RoPE position embeddings and 512 hidden dimensions to capture long-term inter-frame dependencies. Latent features are quantized using factorized residual vector quantization (FRVQ) with extensive codebook explorations (ranging from 8 to 100 layers and codebook sizes from 4 to 16,384). A hierarchical global-local CodecFormer Transformer architecture explicitly decouples inter-frame and intra-frame correlations to manage multi-layer token dependencies without quadratic complexity scaling. The system is trained on 115k hours of multilingual speech using Multi-Period Discriminators, multi-scale STFT discriminators, and standard reconstruction, adversarial, and commitment losses.

## Results

Evaluated on LibriSpeech test-clean, U-Codec with 32 RVQ layers at 5Hz achieves a Word Error Rate (WER) of 3.44, PESQ of 3.20, and STOI of 0.93. When integrated into an autoregressive TTS framework, U-Codec achieves speaker similarity scores (SIM-r of 0.6757, SIM-o of 0.600) and naturalness Mean Opinion Scores (NMOS up to 4.19) comparable or superior to baseline high-frame-rate systems like UniAudio and VoiceBox. Complexity analysis demonstrates a Real-Time Factor (RTF) of 0.52 and a total MAC reduction to 0.89G for the 32RVQ configuration, delivering a 2–3× inference speedup over baseline 50Hz codecs.

## Code

- https://anonymous666-speech.github.io/CodecFormer_5Hz/

## Applications

Speech and ML engineers building large language model-based text-to-speech systems, zero-shot voice cloning, and real-time speech generation applications.

## Limitations

Extremely deep RVQ stacks (such as 100 layers) can increase sequential local decoding overhead and raise the real-time factor despite low total MACs.

## Related

- (link related pages by id as the wiki grows)
