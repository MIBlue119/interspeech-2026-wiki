---
id: lee26j_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-943
pdf: https://www.isca-archive.org/interspeech_2026/lee26j_interspeech.pdf
---

# WAND: Windowed Attention and Knowledge Distillation for Efficient Autoregressive Text-to-Speech Models

[PDF](https://www.isca-archive.org/interspeech_2026/lee26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-943)

**TL;DR** — WAND introduces windowed local attention and knowledge distillation for autoregressive text-to-speech models, achieving constant O(1) memory complexity and up to 66.2% KV cache reduction with negligible quality loss.

## Problem

Autoregressive LLM-based text-to-speech models suffer from quadratic scaling of computation and memory due to full self-attention over the expanding sequence length. This cumulative memory footprint expansion restricts long-form utterance synthesis and imposes severe hardware constraints during real-time deployment. Existing work either changes architectures entirely—leading to performance degradation—or relies on KV caching, which still exhibits a linearly expanding memory footprint.

## Method

The framework bifurcates attention into persistent global attention over conditioning inputs (system prompts, text, reference audio) and local sliding-window attention over generated acoustic tokens (using fixed window sizes like W=32 or W=64). To adapt pretrained models efficiently, WAND fine-tunes them for a single epoch using only 53.8 hours of English speech from LibriTTS train-clean-100 with an AdamW optimizer and cosine schedule. It employs a knowledge distillation objective combining cross-entropy loss against ground-truth tokens and a Skew Kullback-Leibler divergence loss to match a full-attention teacher model's probability distribution. A curriculum learning strategy progressively reduces the window size and scales a temperature-controlled soft mask during training to maintain gradient flow and stability.

## Results

Evaluated on the Seed-TTS benchmark across CosyVoice 2-0.5B, IndexTTS 1.5, and SparkTTS-0.5B, WAND cuts KV cache size by up to 66.2% (e.g., IndexTTS 1.5 drops from 38.44 MB to 13.01 MB for a 10-second generation) and reduces total GFLOPs by up to 46.9%, achieving 1.51x to 1.89x speedups. Content accuracy is preserved or slightly improved, with English WER remaining within 0.2% or decreasing (CosyVoice 2 WER drops from 1.94% to 1.72%), and Mandarin CER degrading by less than 0.1% absolute despite zero Mandarin training data. Speaker similarity (SSIM) and UTMOS/NMOS subjective naturalness scores remain comparable to full-attention baselines.

## Code

- https://onemeee.github.io/wand-tts/

## Applications

Speech engineers and developers deploying LLM-based text-to-speech systems for real-time streaming, long-form audiobook generation, or memory-constrained edge hardware.

## Limitations

Some performance drop in content consistency can occur without knowledge distillation, necessitating supervision from a full-attention teacher model.

## Related

- (link related pages by id as the wiki grows)
