---
id: fujita26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-919
pdf: https://www.isca-archive.org/interspeech_2026/fujita26_interspeech.pdf
---

# Scalable Direction-Following TTS via Voice Impression-Guided Pseudo Triplet Construction

[PDF](https://www.isca-archive.org/interspeech_2026/fujita26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fujita26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-919)

**TL;DR** — The paper introduces a scalable pseudo-triplet construction pipeline for direction-following text-to-speech synthesis, achieving stable speaker-preserving style modifications guided by natural language performance directions.

## Problem

Direction-following text-to-speech requires paired pre- and post-modification utterances with associated natural language direction text, but existing speech corpora lack these relative stylistic changes. This scarcity hinders data-intensive generative models like diffusion and flow matching from performing robust speaker-preserving style transformations. Addressing this gap is critical for enabling models to act on director-style feedback to modify delivery while keeping speaker identity and linguistic content intact.

## Method

The framework utilizes an impression-controllable zero-shot TTS model (FastSpeech2 backbone with HuBERT encoder and HiFi-GAN V1 vocoder) to synthesize pre- and post-modification utterance pairs over 13 continuous voice impression dimensions. An LLM (Qwen3-Next-80B-A3B-Instruct) converts the estimated impression differences into natural language performance directions, yielding pseudo triplets. A direction-conditioned style refiner operates in the speech embedding space, employing rectified flow matching conditioned on the pre-mod embedding, direction representation (encoded via ModernBERT-Ja-310M), and time step. The full training recipe combines 346,488 pseudo triplets derived from 1,600 speakers with 6,899 actual recorded utterance pairs from professional actors.

## Results

Evaluated on Japanese datasets including 15,000 generated utterances per speaker, the pseudo-triplet approach ensures robust speaker identity preservation within human reference bounds (ECAPA-TDNN cosine similarity), avoiding the extreme variance seen in models trained solely on recorded data. UTMOSv2 naturalness scores confirm that direction refinement does not degrade audio quality, matching source recorded scores of approximately 2.95 to 2.97. Combining pseudo and recorded data yields superior direction alignment scores (LLM-based evaluation) while maintaining stable speaker similarity across both seen and unseen speakers.

## Code

- https://ntt-hilab-gensp.github.io/IS2026pseudo/

## Applications

Speech engineers and developers building voice-acting tools, audiobook production software, or interactive voice generation systems requiring fine-grained stylistic adjustments via natural language directions.

## Limitations

The approach relies on proxy impression estimators and synthetic pairs which may not fully capture the complete nuance of authentic human acting without auxiliary recorded data.

## Related

- (link related pages by id as the wiki grows)
