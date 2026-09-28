---
id: ye26d_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2941
---

# ZipCodec: Simple and Pretrained-Model-Free Speech Tokenizer via Flow-Matching

**TL;DR** — Offloading acoustic reconstruction to a flow-matching decoder lets ZipCodec use a 4.4M-parameter encoder, beating tokenizers with encoders over 20x larger and no pretrained models required.

## Problem

Speech tokenizers are a critical interface for feeding audio into large language models, but most existing tokenizers require massive pretrained models or complex multi-stage training pipelines.

## Method

ZipCodec is a single-stage-trained, pretrained-model-free tokenizer that offloads acoustic reconstruction to a powerful Zipformer-based flow-matching decoder, enabling an ultra-lightweight 4.4M-parameter encoder, plus an Encoder Consistency Regularization (ECR) loss that boosts the encoder's semantic capacity in a purely self-supervised way without external teachers or labels.

## Results

ZipCodec achieves competitive acoustic and semantic performance, outperforming models with encoders more than 20 times larger, and delivers improved zero-shot TTS generation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Lightweight, easy-to-train speech tokenization for feeding audio into speech LLMs and zero-shot TTS systems without dependence on large pretrained encoders.

## Related

- (link related pages by id as the wiki grows)
