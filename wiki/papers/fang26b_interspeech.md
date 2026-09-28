---
id: fang26b_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1827
pdf: https://www.isca-archive.org/interspeech_2026/fang26b_interspeech.pdf
---

# WhispEar: A Bidirectional Framework for Scaling Whispered Speech Conversion via Pseudo-Parallel Whisper Generation

[PDF](https://www.isca-archive.org/interspeech_2026/fang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1827)

**TL;DR** — WhispEar introduces a bidirectional whispered-to-normal and normal-to-whisper conversion framework utilizing unified semantic representations and zero-shot pseudo-parallel data scaling, outperforming existing baselines across quality, intelligibility, and speaker similarity.

## Problem

Whispered speech lacks vocal fold vibration and periodic excitation, resulting in degraded fundamental frequency and acoustic cues that impair normal speech reconstruction. Existing whisper-to-normal (W2N) methods suffer from severe data scarcity because they rely on very limited parallel corpora, while traditional DSP-based pseudo-whispers exhibit a wide distribution gap. Furthermore, current approaches struggle to maintain speaker timbre and natural prosody.

## Method

The framework is trained in three stages: first, distilling a lightweight semantic tokenizer from a large ASR encoder using RoPE self-attention, FSMN blocks, and FSQ quantization on mixed whispered and normal speech; second, training a shared conditional Flow-Matching Transformer and vocoder (initialized from CosyVoice2) for both W2N and N2W directions; third, training unified tokenizers using real aligned data and roughly 3,000 hours of zero-shot pseudo-parallel whisper data synthesized from massive normal speech corpora. The normal-to-whisper (N2W) module is trained first on real paired data to generate these scalable pseudo-pairs, which then trains the harder W2N direction.

## Results

Evaluated on the English wTIMIT and bilingual wEar (Chinese-English) datasets using UTMOS, DNSMOS, NISQA, F0 Pearson correlation, speaker embedding cosine similarity (SIM), and WER/CER. WhispEar-Scaled achieves superior performance over strong baselines including WESPER, DistillW2N, MaskCycleGAN, and CosyVoice2, reducing English WER to 22.44% (compared to 30.74% unscaled and >36% for baselines) and improving speaker similarity to 0.577. Ablation and scaling experiments demonstrate consistent performance gains as pseudo-parallel training data size increases from 10k to 200k pairs.

## Code

- https://whispear-demo.github.io/

## Applications

Speech engineers and researchers building privacy communication tools, voice restoration systems, or speech-to-speech conversion pipelines.

## Related

- (link related pages by id as the wiki grows)
