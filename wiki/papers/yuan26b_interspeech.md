---
id: yuan26b_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-232
pdf: https://www.isca-archive.org/interspeech_2026/yuan26b_interspeech.pdf
---

# DelayGSE: A Generative Speech Enhancement Framework with Delayed Text-Aware Conditioning

[PDF](https://www.isca-archive.org/interspeech_2026/yuan26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yuan26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-232)

**TL;DR** — DelayGSE is a text-aware generative speech enhancement framework built on a multi-codebook language model that achieves a 15.8% relative word error rate reduction while jointly handling denoising, dereverberation, and audio superresolution.

## Problem

Generative speech enhancement models based on language and diffusion models frequently suffer from speech-like hallucinations and semantic degradation under low-SNR or transient noise conditions, producing fluent but incorrect audio. Traditional discriminative and continuous acoustic models lack the fine-grained distribution modeling needed for studio-quality perception, while existing discrete token LLM approaches degrade in word error rate despite high perceptual quality.

## Method

The framework utilizes an autoregressive Transformer decoder initialized from Qwen2.5 (0.5B), taking 16 kHz noisy speech encoded via a 4-layer STFT Conformer encoder and a pretrained frozen Whisper v3 large encoder. Speech is tokenized using the 44.1 kHz Descript Audio Codec (DAC) with 8 residual vector quantization (RVQ) codebooks. It applies codebook-level delay (stride-1 offset across codebooks) and text-first multi-task delay (delaying speech tokens by k=5 steps after text tokens) to enforce a semantic-before-acoustic generation order. Training minimizes a multi-task cross-entropy loss combining text prediction and codebook-weighted speech prediction, where RVQ loss weights are derived from an incremental contribution strategy measuring perceptual quality, intelligibility, and speaker similarity.

## Results

Evaluated on DNS Challenge, VCTK-DEMAND, URGENT 2025, and an internal meeting-room dataset (258 recordings), DelayGSE compares favorably against StoRM, FlowSE, LLaSE-G1, and a GAN baseline using DNSMOS P.808, FireRedASR WER, and speaker similarity (SIM). Ablations demonstrate that importance-aware codebook weighting improves perceptual quality and timbre over equal weighting, and delayed text supervision provides a 15.8% relative reduction in word error rate. Providing ground-truth text conditioning at inference yields a 33.1% relative WER reduction.

## Code

- https://delaygse.github.io/

## Applications

Speech and ML engineers building real-time communications platforms, human-computer interaction pipelines, and voice restoration tools requiring robust denoising, dereverberation, and audio superresolution.

## Limitations

The current model exhibits higher computational latency due to autoregressive sequence modeling.

## Related

- (link related pages by id as the wiki grows)
