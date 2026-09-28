---
id: wang26o_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-825
pdf: https://www.isca-archive.org/interspeech_2026/wang26o_interspeech.pdf
---

# Gumbel-BEARD: Automatic Layer Selection for Self-Supervised Adaptation of Whisper in Low-Resource Domains

[PDF](https://www.isca-archive.org/interspeech_2026/wang26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-825)

**TL;DR** — Gumbel-BEARD automates intermediate encoder layer selection in Whisper via a hard Gumbel-Softmax selector for self-supervised domain adaptation, establishing new state-of-the-art word error rates on child speech corpora.

## Problem

Speech foundation models such as Whisper degrade severely in low-resource domains due to heavy distribution shifts like child speech or distinct adult dialects. Adapting these architectures using self-supervised objectives (such as BEARD) requires choosing an intermediate prediction layer, which typically demands expensive manual or brute-force searches and struggles with fixed-layer heuristic bottlenecks. Heuristic weighted-sum alternatives blur representations across diverse abstraction levels, failing to handle complex acoustic variations cleanly.

## Method

The framework utilizes a hard Gumbel-Softmax estimator with a straight-through estimator to dynamically select an encoder prediction layer at each optimization step. It introduces learnable unnormalized log-probabilities over the N encoder layers, annealed via a temperature parameter starting at 5.0 and decaying to 0.1 to transition from uniform exploration to discrete exploitation. The adaptation stage optimizes a combination of BEST-RQ discrete quantization loss and inner/output cosine-similarity distillation losses against a frozen teacher. Experiments employ Whisper-small (244M parameters) and Whisper-medium (769M parameters) using a batch size of 32, a learning rate of 1e-4, and a codebook size of 2048.

## Results

Evaluated on the MyST child speech corpus, Whisper-small with 10 hours of fine-tuning data achieves a 9.35% WER, matching a fully supervised baseline trained on the complete 133-hour labeled set (9.34%). Using Whisper-medium on the full MyST dataset establishes a state-of-the-art WER of 8.21%. On the OGI Spontaneous dataset, Whisper-small achieves a best WER of 11.06%. For adult dialectal adaptation on CORAAL, the framework delivers up to a 6% relative WER reduction over supervised fine-tuning baselines.

## Code

- https://github.com/Zilai-WANG/Gumbel_Beard

## Applications

Speech engineers and researchers working on low-resource speech recognition tasks, particularly for child speech and dialectal adaptation where labeled data is scarce.

## Limitations

The text does not explicitly state any major limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
