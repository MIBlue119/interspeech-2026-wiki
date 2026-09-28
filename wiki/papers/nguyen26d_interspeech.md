---
id: nguyen26d_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1043
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26d_interspeech.pdf
---

# DiFlow-TTS: Compact and Low-Latency Zero-Shot Text-to-Speech with Discrete Flow Matching

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1043)

**TL;DR** — DiFlow-TTS is a compact zero-shot text-to-speech framework using discrete flow matching over factorized codec tokens, achieving up to 34× inference speedup over baselines.

## Problem

Autoregressive speech generation models suffer from high inference latency, whereas continuous flow-based and diffusion-based approaches are hindered by complex continuous spaces or rigid sampling constraints tied to training configurations. Operating directly in a structured discrete token space enables more efficient density estimation and flexible generation, but applying discrete flow matching to multi-attribute speech synthesis remains largely unexplored.

## Method

The framework utilizes a pre-trained FACodec tokenizer to extract factorized discrete tokens (prosody, content, acoustic details) and speaker embeddings. A Phoneme-Content Mapper (PCM) translates text into discrete content tokens and semantic embeddings via a duration predictor and length regulator. A Factorized Discrete Flow Denoiser (FDFD), built on Diffusion Transformer (DiT) blocks with separate prediction heads for prosody and acoustic subspaces, simultaneously generates the target prosody and acoustic token streams using discrete flow matching. Finally, a Codec Decoder reconstructs the raw audio waveform from the generated tokens and speaker embeddings.

## Results

Evaluated on standard speech corpora, DiFlow-TTS demonstrates competitive naturalness, content accuracy, and prosody preservation compared to existing autoregressive and non-autoregressive baselines. The model achieves a compact architecture footprint that is up to 11.7× smaller than baseline systems and delivers low-latency inference with up to a 34× speedup. The factorized design effectively coordinates separate attribute distributions within a unified discrete flow process.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building on-device, real-time, or resource-constrained voice cloning and text-to-speech applications.

## Related

- (link related pages by id as the wiki grows)
