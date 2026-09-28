---
id: park26d_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-953
pdf: https://www.isca-archive.org/interspeech_2026/park26d_interspeech.pdf
---

# Countering Neural Audio Codec Distortions in Watermarking with Adaptive Restoration

[PDF](https://www.isca-archive.org/interspeech_2026/park26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-953)

**TL;DR** — The paper introduces a codec-aware adaptive restoration framework that reconstructs spectrograms prior to watermark extraction, improving bitwise accuracy to over 98% for residual vector quantization (RVQ) based neural audio codecs.

## Problem

Neural audio codecs utilize learned latent representations and vector quantization that introduce structured, non-linear distortions capable of degrading audio watermarks down to near-random extraction levels. Because different neural codecs affect embedded watermarks according to varying architectures and quantizer configurations, universal restoration approaches fail to generalize across them.

## Method

The framework interposes a restoration network between the neural codec output and the watermark extractor, operating only during verification. It comprises four sequential stages: time-frequency transformation via STFT, codec identification via a lightweight classifier achieving 100% test accuracy, codec-specific restoration using a ConvNeXt-based U-Net, and watermark extraction. The U-Net replaces conventional layers with ConvNeXt blocks featuring 7x7 depthwise convolutions across nine resolution stages to capture spatially correlated, long-range quantization distortion patterns. Training uses an L1 reconstruction loss on paired clean and codec-distorted LJSpeech data.

## Results

Evaluated on 11 neural audio codecs (including EnCodec, DAC, AudioDec, FunCodec) using the LJSpeech dataset, the proposed method successfully recovers bitwise accuracy to over 98% for RVQ-based codecs under practical bit-rates. For example, EnCodec at 6 kbps improves from a baseline bitwise accuracy of 59.00% to 84.05%, and AudioDec at 12 kbps improves from 60.09% to 94.23%. Ablation studies confirm that combining both the ConvNeXt architecture and adaptive codec-specific routing is essential, outperforming a shared single model (60.54% bitwise accuracy) or a basic CNN with adaptive routing (70.44%).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers implementing audio watermarking and content traceability systems for generated speech can use this as a preprocessing module to ensure watermark survival against lossy neural audio compression.

## Limitations

The approach experiences a performance ceiling with single-codebook models (such as WavTokenizer) due to an information bottleneck where fine-grained details are entirely erased.

## Related

- (link related pages by id as the wiki grows)
