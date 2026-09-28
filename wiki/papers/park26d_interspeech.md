---
id: park26d_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-953
pdf: https://www.isca-archive.org/interspeech_2026/park26d_interspeech.pdf
---

# Countering Neural Audio Codec Distortions in Watermarking with Adaptive Restoration

*Sungho Park, Thien An Nguyen, Souhwan Jung*

[PDF](https://www.isca-archive.org/interspeech_2026/park26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-953)

**TL;DR** — A codec-aware adaptive restoration framework uses a ConvNeXt-based U-Net and a classifier to reconstruct spectrograms degraded by neural audio codecs, raising watermark bitwise accuracy from random guessing to over 98% for multi-codebook RVQ codecs.

## Key contributions

- Formulates neural audio codec distortion in watermarking as a spectral restoration preprocessing task rather than altering the core embedding algorithm.
- Proposes a ConvNeXt U-Net architecture featuring 7x7 depthwise convolutions and large receptive fields to model spatially correlated vector quantization artifacts.
- Introduces an adaptive framework with a 100% accurate lightweight codec classifier that dynamically routes distorted audio to codec-specific restoration experts.
- Provides a comprehensive evaluation across 11 neural audio codecs, demonstrating limitations on single-codebook models versus high fidelity on RVQ-based systems.

## Problem

Modern neural audio codecs employ learned latent representations and vector quantization that introduce structured, non-linear distortions fundamentally different from conventional noise or filtering. These distortions severely corrupt fine-grained spectral structures where deep-learning-based audio watermarks are embedded, dropping watermark extraction accuracy to near-random levels. Prior universal restoration approaches fail because different codecs utilize heterogeneous architectures, numbers of quantizers, and training objectives, preventing a single model from capturing conflicting distortion characteristics.

## Method

The framework processes compressed audio through four sequential stages: time-frequency transformation via STFT to generate a magnitude spectrogram, a lightweight codec classifier that identifies the compression model, an adaptive restoration network that selects the matching codec-specific expert model, and finally the unmodified downstream watermark decoder. The restoration network is structured as a symmetric U-Net with nine resolution stages (eight downsampling/upsampling levels, down from an initial 512x512 resolution), where conventional convolutional layers are replaced by ConvNeXt blocks with N=8 repeated blocks per level. ConvNeXt blocks incorporate 7x7 depthwise convolutions and large receptive fields to capture spatially correlated, block-wise quantization errors and long-range spectral shifts across multiple frequency bins simultaneously.

The restoration model is optimized exclusively as a pre-processing module using an L1 reconstruction loss between the restored spectrogram and the original watermarked pre-compression spectrogram. During inference, only the single specialist model selected by the router is activated. This modular design permits seamless extensibility: new codecs can be accommodated by training additional specialist models without altering existing weights or the baseline watermark extractor.

## Experimental setup

Experiments use the LJSpeech dataset comprising 13,100 short single-speaker audio clips, split 8:1:1 for training, validation, and testing. Models are trained for 200 epochs with a batch size of 4 and gradient accumulation of 8 using an NVIDIA RTX 4090 GPU, selecting checkpoints based on validation loss. Evaluation covers 11 neural codecs (EnCodec, DAC, AudioDec, FunCodec, BigCodec, HiFi-Codec, SpeechTokenizer, Mimi, UniCodec, StableCodec, and WavTokenizer) evaluated via Bitwise Accuracy and Attribution Accuracy.

## Results

Without restoration, baseline bitwise extraction accuracy drops to near-random levels of 50-60% across most neural codecs. The proposed adaptive framework achieves over 98% bitwise accuracy for multi-codebook Residual Vector Quantization (RVQ) codecs at practical bit-rates, such as EnCodec at 24 kbps improving from 72.91% to 98.75%, DAC at 8 kbps reaching 99.58% (up from 86.56%), and FunCodec at 16 kbps jumping from 59.60% to 98.03%. Ablation studies at 6 kbps EnCodec show that combining both ConvNeXt and adaptive routing achieves 84.05% bitwise accuracy, compared to 70.44% for a basic CNN with adaptive routing, 60.54% for a shared ConvNeXt model without routing, and 59.01% with no restoration. However, the framework fails to improve single-codebook models (Nq = 1) like WavTokenizer or StableCodec, where information is entirely erased rather than preserved in residual layers.

| System / Condition | EnCodec (6 kbps) Bit Acc | EnCodec (6 kbps) Attr Acc | DAC (8 kbps) Bit Acc | AudioDec (12 kbps) Bit Acc |
|---|---|---|---|---|
| Baseline (No Restoration) | 59.00% | 0.38% | 86.56% | 60.09% |
| w/o Adaptive Routing | 60.54% | 2.67% | - | - |
| w/o ConvNeXt (Basic CNN) | 70.44% | 4.66% | - | - |
| Proposed (Ours) | 84.05% | 26.15% | 99.58% | 94.23% |

## Limitations

The framework's post-hoc restoration is ineffective on single-codebook (Nq = 1) and extremely low bit-rate codecs (e.g., WavTokenizer, StableCodec) because hard vector quantization completely erases fine-grained spectral details rather than leaving recoverable residual traces. Evaluation is constrained to single-speaker English speech from LJSpeech, leaving multi-speaker, diverse acoustic environments, and music domains untested. The approach requires maintaining and running separate model weights for each supported neural codec in the router.

## Why read this

Speech and ML engineers building robust audio watermarking systems for generative AI attribution should read this to understand how to design modular spectrogram restoration pre-processors that neutralize neural codec distortions without modifying underlying embedding logic.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio content verification, deepfake detection tracking, tracing ownership of synthetic speech, and intellectual property protection for generative text-to-speech outputs.

## Related

- (link related pages by id as the wiki grows)
