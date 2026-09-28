---
id: xu26g_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-879
pdf: https://www.isca-archive.org/interspeech_2026/xu26g_interspeech.pdf
---

# Whisper-Aware LLM: Self-Supervised Uncertainty Learning for Robust Whispered Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/xu26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-879)

**TL;DR** — The Whisper-Aware LLM framework equips audio-large language models with self-supervised uncertainty perception and confidence-fused decoding, achieving a state-of-the-art 1.31% CER on AISHELL6-Whisper and reducing noise hallucination rates from over 25% to 4.5%.

## Problem

Whispered speech lacks fundamental frequency (F0) and harmonic structure, creating signal ambiguity that forces conventional ASR systems into a difficult trade-off between failing to capture whispers and hallucinating transcriptions from background noise. Existing data augmentation and static projection layers address acoustic symptoms rather than the underlying signal uncertainty. This paper addresses this gap by teaching an Audio-LLM to explicitly quantify and react to intrinsic physical deficiencies in the acoustic signal.

## Method

The framework builds upon Qwen2-Audio (utilizing an audio encoder, an adapter, and a 7B LLM decoder) by adding a lightweight Uncertainty Perception Module (UPM) trained via two physics-informed self-supervised tasks: F0 contour prediction (MSE loss) and masked spectrum reconstruction. The UPM produces a global uncertainty vector converted via an MLP into an instruction embedding, and a frame-wise confidence sequence that modulates decoder self-attention via additive bias. Training follows a disciplined three-stage protocol: UPM pre-training with a frozen backbone, interface adaptation (updating encoder, adapter, UPM, and decoding interfaces while freezing the LLM), and full end-to-end fine-tuning using LoRA on the decoder with a composite auxiliary loss (weight 0.1).

## Results

Evaluated on AISHELL6-Whisper, wTIMIT, AISHELL-1, and LibriSpeech, the proposed model sets a new SOTA on whispered speech with a 1.31% Chinese whisper CER (a 17% relative reduction over previous best) while maintaining normal speech performance (0.63% CER). On the custom Noise Hallucination Set of 1,000 non-speech or faint noise clips, the model cuts the Hallucination Rate to 4.5% compared to 25.2%-35.5% for strong baselines like Seed-ASR and Qwen3-ASR. Ablations confirm that adding frame-wise attention modulation drops CER to 3.45%, global instruction reduces it to 1.84%, and the full combined model reaches 1.31%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building robust speech recognition systems for mobile, wearable, or ambient smart devices that need to reliably handle whispered speech and reject background noise without failing on normal speech.

## Related

- (link related pages by id as the wiki grows)
