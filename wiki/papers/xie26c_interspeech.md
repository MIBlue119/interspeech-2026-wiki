---
id: xie26c_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1757
pdf: https://www.isca-archive.org/interspeech_2026/xie26c_interspeech.pdf
---

# VoiceTTA: Enhancing Zero-Shot Text-to-Speech via Reinforcement Learning-Based Test-Time Adaptation

[PDF](https://www.isca-archive.org/interspeech_2026/xie26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xie26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1757)

**TL;DR** — VoiceTTA is a reinforcement learning-based test-time adaptation method for zero-shot text-to-speech that optimizes lightweight learnable prefixes using group relative preference optimization, improving speaker similarity and maintaining intelligibility on uncommon speech prompts.

## Problem

Pretrained zero-shot text-to-speech models struggle to generalize to uncommon speech scenarios such as regional dialects, accented speech, crosstalk, and slurred speech due to domain shifts from training on common datasets like audiobooks and podcasts. Traditional fine-tuning demands large, high-quality datasets and heavy computation, making rapid online personalization impractical.

## Method

The framework uses F5-TTS as a flow matching backbone, prepending four lightweight learnable prefixes to the first DiT layer while keeping the base model frozen. At inference time, it samples multiple candidate utterances by varying the flow matching temperature and computes a composite reward combining Whisper-based Word Error Rate (WER) for intelligibility, speaker embedding cosine similarity, and coefficient-of-variation differences of F0 and energy for style. It then optimizes the prefixes over 50 steps using group relative preference optimization (GRPO) without requiring a value model. The prefixes require storing only 16 KB per speaker and are reinitialized for each new test sample.

## Results

Evaluated on an internal dataset of 200 uncommon samples and 160 Chinese dialect utterances from KeSpeech, VoiceTTA achieves an average Word Error Rate of 3.12 and a speaker similarity (S-SIM) of 0.64, outperforming baselines like F5-TTS, MaskGCT, CosyVoice, and Vevo. Subjectively, it attains an S-MOS of 3.27 and an N-MOS of 3.35, outperforming baseline models on style imitation while preserving naturalness. Ablations confirm that combining both style and intelligibility rewards is essential, as style-only rewards severely degrade WER while intelligibility-only rewards fail to capture voice traits.

## Code

- https://voicetta.pages.dev/

## Applications

Engineers and developers building personalized zero-shot text-to-speech systems, voice cloning applications, or spoken dialogue interfaces that need to handle challenging acoustic prompts and uncommon dialects with minimal adaptation data.

## Limitations

The approach relies on careful balancing of reward weights and candidate sampling temperatures to avoid destroying speech intelligibility.

## Related

- (link related pages by id as the wiki grows)
