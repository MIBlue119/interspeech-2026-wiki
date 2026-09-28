---
id: chen26p_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1513
pdf: https://www.isca-archive.org/interspeech_2026/chen26p_interspeech.pdf
---

# Bridging the Gap: A Hierarchical Framework for Cross-Modal Style Modeling in Expressive TTS

*Jiale Chen, Jiaxun Li, Wei Li, Yuanpeng Wang, Yuehai Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1513)

**TL;DR** — OTAFlow is a hierarchical framework for prompt-driven expressive TTS that combines optimal transport distribution alignment, contrastive learning, and conditional flow matching to resolve the cross-modal gap and one-to-many style mapping problem. It significantly outperforms baseline models in fine-grained style retrieval (Recall@1 of 0.135 vs 0.072 for InfoNCE-only) and synthesized emotion similarity.

## Key contributions

- A unified text-audio style representation combining optimal transport (OT) distribution alignment, InfoNCE contrastive learning, and multi-task auxiliary supervision on emotion, pitch, and energy.
- A conditional flow matching (CFM) module applied in the unified embedding space to model the conditional distribution p(zs|zt), enabling diverse style sampling from a single text prompt.
- A decoupled downstream training strategy using a Diffusion Transformer (DiT) flow-matching acoustic model built upon Matcha-TTS, keeping the CLAP backbone and adapters frozen.
- Experimental validation showing superior style consistency (sMOS 3.88) and emotion similarity (ESIM 69.19) on Textrolspeech compared to models like EmoVoice, CosyVoice2, and IndexTTS2.

## Problem

Natural language prompts offer a flexible interface for expressive text-to-speech, but suffer from a severe cross-modal representation gap between text descriptions and audio signals. Furthermore, a single prompt inherently corresponds to diverse valid acoustic realizations, creating a complex one-to-many mapping problem that causes point-wise alignment objectives to fail. Prior approaches using specialized encoders, point-wise distances, or purely end-to-end LLMs either lack explicit distribution-level alignment or fail to provide interpretable, stable style control under multi-modal ambiguity.

## Method

OTAFlow is organized into three sequential stages. Stage 1 constructs a unified style space by mapping frozen pre-trained CLAP text and audio encoders through symmetric lightweight linear adapters gt(·) and gs(·). This stage is jointly optimized via an entropy-regularized optimal transport loss (computed using the Sinkhorn algorithm on cosine distance cost matrices), an asymmetric InfoNCE contrastive loss over mini-batches, and three multi-task cross-entropy classification heads attached to the audio embedding for emotion, pitch, and energy supervision (weighted by lambda_k).

Stage 2 implements a prompt-to-style sampler using Conditional Flow Matching (CFM) to learn the conditional distribution p(zs|zt) within the unified space. The vector field of the continuous normalizing flow is parameterized by a lightweight time-conditioned residual MLP and trained with classifier-free guidance by randomly dropping conditions. At inference, starting from standard Gaussian noise x(0) ~ N(0, I), the model integrates the conditional ODE using CFG to sample diverse audio style embeddings z_hat_s.

Stage 3 integrates the sampled style embeddings into a downstream Matcha-TTS-derived acoustic backbone, where the original estimator is replaced by a Diffusion Transformer (DiT) injecting style via AdaLN. During downstream generation, a time-dependent vector field transforms mel-scale noise into target mel-spectrogram features under phoneme and style conditioning, subsequently converted to waveforms via a vocoder. The CLAP encoders, adapters, and flow sampler remain frozen during this phase.

## Experimental setup

Experiments are performed on the Textrolspeech dataset containing ~330 hours of expressive English speech paired with natural-language prompts across multiple speakers. A balanced test set of 50 utterances across eight typical emotions is sampled, and waveforms are resampled to 22.05 kHz. Baselines include EmoVoice, CosyVoice2, IndexTTS2, alongside internal ablation variants (Frozen CLAP, CLAP + InfoNCE, CLAP + OT). Metrics include Recall@k (k=1, 5, 10), Median Rank (MedR), Naturalness MOS (nMOS), Style MOS (sMOS), UTMOS, Emotion Similarity (ESIM via emotion2vec), Speaker Encoder Cosine Similarity (SECS via WavLM), and Style Distance. The system runs with 16-bit mixed precision, batch size of 8, using the Adam optimizer with a cosine learning rate schedule annealing from 1e-4 to 1e-5.

## Results

In cross-modal retrieval, the proposed combination of OT and InfoNCE achieves a Text-to-Audio Recall@1 of 0.135 and Median Rank of 4, vastly outperforming raw frozen CLAP (MedR 178) and InfoNCE-only (MedR 8). For text-only expressive TTS (Track-1), OTAFlow reaches an sMOS of 3.88 and an ESIM of 69.19, beating EmoVoice (sMOS 3.72, ESIM 61.47), IndexTTS2 (sMOS 3.80, ESIM 60.80), and CosyVoice2 (sMOS 3.75, ESIM 67.76). When utilizing timbre reference audio (Track-2), it secures an ESIM of 92.21 while maintaining competitive speaker similarity (SECS 92.61).

Ablations on the CFM module confirm that replacing it with a deterministic regression head collapses the Style Distance from 0.1279 down to 0.0000 and drops sMOS from 3.88 to 3.52, verifying that CFM is essential for capturing style stochasticity without losing emotional fidelity. The model does not win uniformly on absolute speech naturalness (UTMOS scores of 2.90 vs IndexTTS2's 3.04), reflecting the constraints of its lightweight downstream Matcha-TTS backbone.

| Method | nMOS ↑ | sMOS ↑ | UTMOS ↑ | ESIM ↑ | SECS ↑ |
|---|---|---|---|---|---|
| EmoVoice | 4.06 | 3.72 | 2.56 | 61.47 | 87.74 |
| IndexTTS2 | 4.10 | 3.80 | 3.04 | 60.80 | 89.55 |
| CosyVoice2 | 4.12 | 3.75 | 2.87 | 67.76 | 86.97 |
| OTAFlow (Ours) | 4.15 | 3.88 | 2.90 | 69.19 | 89.80 |

## Limitations

The framework is evaluated exclusively on the English Textrolspeech dataset, leaving cross-lingual and multilingual generalization untested. The downstream acoustic generator relies on a lightweight Matcha-TTS/DiT structure, which slightly lags behind massive end-to-end autoregressive models in absolute naturalness scores (UTMOS). Furthermore, the evaluation scale is limited to a balanced test subset of 400 gallery items, and the system assumes the availability of clean multi-task annotation labels during Stage 1 training.

## Why read this

Speech researchers and engineers building prompt-controlled expressive TTS systems should read this paper to learn how to combine optimal transport distribution alignment with conditional flow matching to resolve the cross-modal gap and one-to-many text-to-style mapping problem.

## Code

- https://sunny00952.github.io/OTAFlow/

## Applications

Building fine-grained, prompt-controllable expressive text-to-speech systems for audiobooks, virtual assistants, and interactive voice generation where users specify rich paralinguistic emotions via natural language.

## Related

- (link related pages by id as the wiki grows)
