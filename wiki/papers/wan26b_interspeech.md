---
id: wan26b_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1798
pdf: https://www.isca-archive.org/interspeech_2026/wan26b_interspeech.pdf
---

# Continuous Time-Varying Emotion Control Zero-Shot Text-To-Speech With Emotion Orthogonal LoRA

[PDF](https://www.isca-archive.org/interspeech_2026/wan26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wan26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1798)

**TL;DR** — This paper introduces Emotion Orthogonal LoRA (EO-LoRA) and Flow-DGPO to enable continuous, time-varying emotion control in zero-shot text-to-speech, improving emotional similarity and naturalness over baseline models.

## Problem

High-quality emotional text-to-speech typically relies on coarse, discrete emotion categories or reference prompts that entangle emotion with speaker traits and content prosody. This makes fine-grained control and gradual, time-varying emotion transitions within a single sentence difficult to achieve reliably without extensive training data.

## Method

The system builds on a pretrained F5-TTS Diffusion Transformer (DiT) flow-matching backbone by freezing original weights and injecting three parallel low-rank adaptation branches scaled dynamically by continuous Valence, Arousal, and Dominance (VAD) values at each time step. An orthogonality regularizer using Frobenius inner products prevents redundant updates across the VAD dimensions, while an injection location ablation selects attention value/output projections and feed-forward linear layers. To further optimize the model, a reinforcement learning preference alignment stage called Flow-DGPO samples candidate groups, computes advantage scores via GRPO normalization, and applies a direct preference optimization loss margin.

## Results

Evaluated on EMO-Change and JVNV S2ST datasets, EO-LoRA combined with Flow-DGPO outperforms fine-tuned F5-TTS and baseline configurations. On EMO-Change, the full model achieves an AutoPCP of 3.60, an Emo SIM of 0.778, an Aro-Val SIM of 0.914, and a word error rate (WER) of 0.2%, compared to baseline F5-TTS WER of 7.1% and AutoPCP of 3.17. Subjective listener evaluations confirm consistent gains in mean opinion scores for naturalness (NMOS), speaker similarity (SMOS), and emotion similarity (EMOS). Ablations show that removing the orthogonality regularizer drops Emo SIM from 0.753 to 0.708, and alternative LoRA injection targets such as query/key projections degrade controllability.

## Code

- https://wancc-p.github.io/EoLoRA/

## Applications

Speech engineers and developers building conversational agents, dubbing systems, or audiobook narrators requiring precise, time-varying emotional expression and zero-shot cross-lingual emotion transfer.

## Limitations

Cross-lingual tasks show a performance gap in speaker similarity and word error rate when transferring emotions from out-of-domain prompt languages (e.g., Japanese prompts on an English backbone).

## Related

- (link related pages by id as the wiki grows)
