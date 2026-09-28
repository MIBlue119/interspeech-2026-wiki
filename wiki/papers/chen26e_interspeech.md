---
id: chen26e_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-645
pdf: https://www.isca-archive.org/interspeech_2026/chen26e_interspeech.pdf
---

# CAAD: Contrastive Audio-Aware Distillation for Efficient Speech Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/chen26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-645)

**TL;DR** — Contrastive Audio-Aware Distillation (CAAD) internalizes teacher-level contrastive decoding into a student speech language model weights via a synchronized teacher-forcing strategy, yielding a ~8% relative gain on Dynamic-SUPERB.

## Problem

Large speech language models suffer from severe modality bias, heavily favoring internal linguistic priors and ignoring acoustic inputs when text and speech conflict. While contrastive decoding mitigates this by contrasting audio-aware and text-only paths, it doubles inference latency, whereas standard knowledge distillation simply transfers the teacher's modal biases to the student.

## Method

CAAD uses a two-stage distillation framework built on the DeSTA architecture. Stage 1 generates unified text metadata Pseudo-Ground Truths (Pseudo-GT) using Llama-3-8B-Instruct based on audio attributes. Stage 2 employs a synchronized teacher-forcing strategy where positive (audio-aware) and negative (text-only, masked audio) teacher paths share the same anchor sequence, allowing full-sequence parallelization. The student model (Llama-3.2-3B backbone with a frozen LLM and 32M trainable Q-Former parameters) is optimized using a hybrid objective combining a KL-divergence contrastive distillation loss (weighted by guidance factor alpha and temperature tau) and a cross-entropy Pseudo-GT supervision loss.

## Results

Evaluated on Dynamic-SUPERB and MCR-BENCH (MELD emotion subset), CAAD-trained student models outperform standard knowledge distillation and greedy decoding baselines across multiple categories. CAAD achieves an overall Dynamic-SUPERB score improvement (reaching 60.57% compared to 58.42% for standard KD and 49.42% for greedy decoding) and improves robustness against misleading text on MCR-BENCH conflict resolution tasks.

## Code

- https://github.com/ChenWils/Contrastive

## Applications

Engineers building efficient, low-latency speech language models and conversational agents that need robust acoustic perception and resistance to text modality bias.

## Limitations

The method relies heavily on high-fidelity text metadata anchors derived from auxiliary models during Stage 1.

## Related

- (link related pages by id as the wiki grows)
