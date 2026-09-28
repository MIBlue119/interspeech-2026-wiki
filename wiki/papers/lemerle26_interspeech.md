---
id: lemerle26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2863
pdf: https://www.isca-archive.org/interspeech_2026/lemerle26_interspeech.pdf
---

# Low-Framerate Speech Tokenization via Two-Stage Latent Patch Modeling

*Théodor Lemerle, Diego Torres, Téo Guichoux, Nicolas Obin, Axel Roebel*

[PDF](https://www.isca-archive.org/interspeech_2026/lemerle26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lemerle26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2863)

**TL;DR** — Z-Codec is a two-stage latent speech tokenizer that achieves low-bitrate, semantically rich 12.5 Hz speech representations (continuous or 1.1 kbps FSQ discrete) while remaining fully trainable on consumer-grade hardware.

## Key contributions

- Proposes a decoupled two-stage speech tokenization design: Stage 1 handles high-framerate waveform compression (WavVAE, 100 Hz), while Stage 2 handles aggressive low-framerate compression via flow matching and patch modeling.
- Eliminates complex vector quantization codebook scale issues or adversarial training instability in the low-framerate stage by utilizing continuous latent VAE or finite scalar quantization (FSQ) operating over latent patches.
- Incorporates semantic supervision directly at the velocity head using intermediate layer representations from WavLM-large to preserve linguistic content and lower differential character error rate (dCER).
- Demonstrates tractable, high-quality downstream TTS training on a single consumer GPU (RTX 4090) using a 0.24B-parameter encoder-decoder Transformer with continuous latent velocity prediction.

## Problem

Modern neural speech tokenizers for text-to-speech require low-bitrate and low-framerate semantic representations to scale efficiently with Transformer architectures. However, achieving this typically demands joint waveform compression, adversarial training, and semantic supervision, which leads to exorbitant compute costs and complex optimization challenges such as codebook collapse in large vector quantization tables. Prior methods like DAC, Mimi, and SemantiCodec couple waveform-level adversarial losses with low-bitrate compression, making reproduction difficult on standard consumer hardware. Z-Codec solves this by factorizing the problem so that the heavy-lifting of adversarial waveform modeling is isolated in an initial high-framerate stage, keeping subsequent latent compression lightweight and stable.

## Method

The first stage, WavVAE, takes raw waveforms and encodes them into Gaussian parameters with bottleneck dimension 24, producing 100 Hz continuous latents. It uses a time-domain cascading downsampler with strides [3, 4, 4, 5] and a Vocos-inspired ConvNeXt decoder predicting STFT features, trained via an adversarial VAE-GAN setup with a Multi-Resolution Discriminator (MRD loss weight 1.0) and KL-divergence weight 2e-4.

The second stage, PatchAE/PatchFSQ, groups the 100 Hz latents into non-overlapping patches of 8 tokens, yielding a 12.5 Hz sequence. The encoder and decoder utilize ConvNeXt blocks with base dimension 768 and windowed self-attention (size 32). It learns a conditional velocity field via flow matching to map Gaussian noise to target latent patches, driven by a timestep-conditioned affine modulation. Continuous (VAE) and discrete (FSQ with 32 latents, 7 values/scalar, ~1.1 kbps) variants are explored. Semantic supervision is injected via an auxiliary 2-layer MLP head maximizing cosine similarity with the 6th layer of WavLM-large.

The downstream TTS backbone employs a T5 encoder-decoder structure: a 6-layer self-attention text encoder and a 12-layer gated linear attention (GLA) audio decoder (hidden dim 1024, attention head size 128). A 3-layer MLP velocity prediction head maps autoregressive outputs to continuous PatchVAE targets using 10 ODE steps and classifier-free guidance (scale 1.3).

## Experimental setup

Evaluated on HiFiTTS-2 and the LibriTTS train/test-clean splits. Codecs are compared against Mimi (12.5 Hz), WavTokenizer (40/75 Hz), Higgs v2, XY-Tokenizer, SemantiCodec, and DAC across PESQ, STOI, UTMOSv2, speaker similarity (Sim), and differential Character Error Rate (dCER) using NeMo Parakeet. TTS is compared against F5-TTS (0.3B), Spark-TTS (0.5B), and XTTS-v2 (0.3B) using naturalness (NMOS), speaker similarity (SMOS), and CER with 50 Prolific participants. WavVAE trained for 500k steps on 1 RTX 4070 (~4 days); PatchAE trained for 300k steps on 1 RTX 4070 (~6 days); TTS trained for 250k steps on 1 RTX 4090 (~2 days).

## Results

WavVAE achieves a top-tier PESQ of 4.14 and UTMOS of 3.14 at 100 Hz, outperforming standalone vocoders like Vocos (3.67 PESQ) and BigVGAN-base (3.92 PESQ). For the full 12.5 Hz Z-Codec (FSQ), it scores 2.23 PESQ, 3.05 UTMOSv2, and 0.59% dCER, matching or beating production codecs like Higgs v2 (2.55 PESQ, 3.05 UTMOSv2, 0.67% dCER) and XY-Tokenizer (2.27 PESQ, 0.47% dCER). Ablating WavLM semantic supervision doubles dCER from 0.59% to 1.49%, confirming its critical role in linguistic preservation. In subjective MUSHRA and Prolific listening evaluations, Z-Codec matches state-of-the-art systems (Higgs) in acoustic quality, while the 0.24B-parameter TTS model achieves an NMOS of 4.13±0.23, tying Spark-TTS (0.5B) and outperforming XTTS-v2 (3.56 NMOS).

| System | Semantic | Framerate (Hz) | Bitrate (kbps) | PESQ ↑ | UTMOSv2 ↑ | dCER ↓ |
|---|---|---|---|---|---|---|
| Ground Truth | – | – | – | – | 3.18 | – |
| WavTokenizer (1 VQ) | No | 75 | 0.9 | 2.25 | 3.12 | 1.35% |
| DAC (4 RVQ) | No | 80 | 3.0 | 2.40 | 2.09 | 0.63% |
| Higgs (4 RVQ) | Yes | 25 | 1.0 | 2.55 | 3.05 | 0.67% |
| XY-Tokenizer (8 RVQ) | Yes | 12.5 | 1.0 | 2.27 | 2.95 | 0.47% |
| Z-CODEC (FSQ, ours) | Yes | 12.5 | 1.1 | 2.23 | 3.05 | 0.59% |

## Limitations

The architecture relies entirely on non-causal convolutions and attention blocks, making it unsuitable for low-latency streaming applications without structural modifications. Furthermore, all evaluations and training runs are strictly restricted to English-language speech data.

## Why read this

Speech and ML engineers looking to train state-of-the-art low-framerate speech tokenizers and TTS models without industrial compute clusters will find this a practical, reproducible blueprint utilizing a two-stage decoupled design.

## Code

- https://github.com/theodorblackbird/z-codec

## Applications

Text-to-speech synthesis, low-bitrate audio compression, speech tokenization for generative language-audio models.

## Related

- (link related pages by id as the wiki grows)
