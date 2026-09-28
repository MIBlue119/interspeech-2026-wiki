---
id: a26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-266
pdf: https://www.isca-archive.org/interspeech_2026/a26_interspeech.pdf
---

# MTC-AVSR: Compressed-Token-based Audio-Visual Speech Recognition and Translation with Contrastive Language Alignment

[PDF](https://www.isca-archive.org/interspeech_2026/a26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/a26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-266)

**TL;DR** — MTC-AVSR is a multitask audio-visual speech recognition and translation model using compressed 3.5 tokens/second multimodal representations, achieving a 0.74% WER on LRS3 and state-of-the-art BLEU scores on MuAViC En-X tasks.

## Problem

State-of-the-art audio-visual speech recognition systems rely on high-resolution multimodal sequences that impose prohibitive computational costs and high latency on large language models. Furthermore, existing token compression techniques are confined to single-task recognition and leave open whether compressed tokens can retain cross-task semantic information for multilingual translation without retraining encoders or mapping them into a shared multilingual space.

## Method

The framework utilizes an MMS-style AV-QFormer compressor to reduce audio-visual inputs to 3.5 tokens/second, followed by a Language Adapter Module (LAM) featuring a shared multilingual lexicon and two-layer gated cross-attention. A Token-Contrastive Alignment Loss (TCAL) aligns adapter outputs to lexical entries using cosine similarity and temperature scaling. A frozen LLaMA-3.2-3B LLM decoder with QLoRA adapters is conditioned using Whisper-style prompt tokens (<recognize> or <translate> with language tags) for single-stream multi-task inference. The training strategy is staged: first aligning token source language with cross-entropy, then freezing the encoder and training the LAM and QLoRA adapters using cross-entropy and annealed TCAL.

## Results

Evaluated on the LRS3 dataset, the model achieves a clean Word Error Rate (WER) of 0.74% and 2.0% under 0 dB babble noise, performing on par with leading models while processing 1,759 hours of training data. On MuAViC English-to-X speech translation, it establishes new state-of-the-art BLEU scores under clean audio: 28.1 for Spanish, 26.3 for French, and 21.8 for Portuguese. Ablation studies confirm that each component—LAM, the multilingual lexicon, and TCAL—progressively improves translation BLEU and lowers WER.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building on-device or low-latency multilingual speech recognition and translation systems that incorporate visual lip-motion cues.

## Related

- (link related pages by id as the wiki grows)
