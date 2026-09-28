---
id: heo26b_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2354
pdf: https://www.isca-archive.org/interspeech_2026/heo26b_interspeech.pdf
---

# Tracing the Origins: Legacy Codec Identification in Neural Audio Transcoding

[PDF](https://www.isca-archive.org/interspeech_2026/heo26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/heo26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2354)

**TL;DR** — This paper introduces a Transformer-based framework that accurately identifies legacy audio compression codecs and bitrates hidden beneath residual vector quantization neural audio transcoding, achieving up to 99.99% accuracy.

## Problem

Modern neural audio codecs (NACs) convert audio into discrete residual vector quantization (RVQ) tokens, which breaks traditional audio forensics relying on linear signal processing of waveforms. When legacy-compressed audio undergoes neural re-compression, the newly generated neural artifacts superimpose over the legacy compression traces, creating a forensic blind spot. Addressing this gap is critical to verify audio authenticity and track content provenance in neural-driven distribution pipelines.

## Method

The framework processes RVQ token sequences through three specialized modules: a Layer-Causal RVQ Transformer (LCR-Trans) using causal-masked attention to capture inter-layer dependencies, a Dynamic Layer-wise Attentive Aggregator (DLAA) to weight forensically significant codebook layers, and a Temporal Context Transformer (TC-Trans) to model long-range temporal signatures like pre-echo suppression. The architecture uses a 2D convolutional initial projection and is trained with AdamW for 25 epochs using a speaker-disjoint VCTK dataset. It outputs global representations via an MLP classifier for codec and bitrate identification.

## Results

Evaluated on a VCTK-derived dataset processed by 48 kHz EnCodec across five legacy codecs (MP3, AAC, Opus, Vorbis, G.711) and four bitrates (32-128 kbps), the full model achieves 97.32% to 99.99% accuracy for fixed-bitrate codec identification. For an 18-class joint codec and bitrate identification task, the proposed model reaches an overall accuracy of 89.34% (outperforming a baseline CNN+MLP of 73.71%). Ablation tests confirm that removing LCR-Trans, DLAA, or TC-Trans drops performance, with LCR-Trans providing the largest individual contribution.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio forensic analysts, media authenticity investigators, and platform security engineers aiming to trace the provenance and compression history of AI-transcoded digital audio.

## Limitations

Identification performance degrades when distinguishing between high bitrates (e.g., 96 kbps versus 128 kbps) for certain codecs like MP3 and Opus due to artifact convergence near transparency.

## Related

- (link related pages by id as the wiki grows)
