---
id: chen26p_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1513
pdf: https://www.isca-archive.org/interspeech_2026/chen26p_interspeech.pdf
---

# Bridging the Gap: A Hierarchical Framework for Cross-Modal Style Modeling in Expressive TTS

[PDF](https://www.isca-archive.org/interspeech_2026/chen26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1513)

**TL;DR** — OTA-Flow is a hierarchical cross-modal framework for prompt-driven expressive text-to-speech that combines optimal transport, contrastive learning, and conditional flow matching to achieve superior style accuracy and sample diversity.

## Problem

Natural language style prompts in text-to-speech suffer from a severe representation gap between text and audio modalities alongside a complex one-to-many mapping problem where a single prompt can correspond to multiple valid acoustic realizations. Conventional point-wise alignment objectives lead to unstable representations and poor control granularity, whereas purely end-to-end generative LLMs often lack explicit control over underlying style factors.

## Method

The framework operates in three main stages: first constructing a unified style space using Sinkhorn-based optimal transport for distribution alignment, a symmetric InfoNCE contrastive loss, and multi-task supervision heads for emotion, pitch, and energy; second, employing a conditional flow matching module parameterized by a time-conditioned residual MLP to model the conditional distribution of audio style embeddings given text prompts; and third, plugging these style embeddings into a Matcha-TTS derived Diffusion Transformer backbone using adaptive layer normalization. During training, the pretrained CLAP encoders are kept frozen while lightweight dual adapters, projection heads, and auxiliary classification heads are optimized on an 8-batch size with 16-bit mixed precision.

## Results

Evaluated on the Textrolspeech dataset containing 330 hours of expressive English speech, the method is compared against EmoVoice, CosyVoice2, and IndexTTS2. In cross-modal retrieval tests with a gallery size of 400, combining OT and InfoNCE achieved a Text-to-Audio Recall@1 of 0.135 and Median Rank of 4, substantially outperforming frozen CLAP and single-objective variants. In downstream expressive TTS evaluations (Track-1, text-only), OTAFlow achieved a style MOS (sMOS) of 3.88 and an emotion similarity (ESIM) of 69.19, outperforming all baseline models. Ablations confirm that replacing conditional flow matching with a deterministic regression head degrades sMOS from 3.88 to 3.52 and drops style diversity distance from 0.1279 to zero.

## Code

- https://sunny00952.github.io/OTAFlow/

## Applications

Engineers building controllable text-to-speech systems, virtual assistants, and audiobook generation tools that rely on natural language prompts for precise expressive style control.

## Related

- (link related pages by id as the wiki grows)
