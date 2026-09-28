---
id: irigoyen26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3411
pdf: https://www.isca-archive.org/interspeech_2026/irigoyen26_interspeech.pdf
---

# Pruning as Regularization: Sensitivity-Aware One-Shot Pruning in ASR

[PDF](https://www.isca-archive.org/interspeech_2026/irigoyen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/irigoyen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3411)

**TL;DR** — One-shot magnitude pruning acts as an implicit regularizer for encoder-decoder ASR Transformers, improving Whisper-small's test-other WER by up to 2.38% absolute without any fine-tuning.

## Problem

Neural networks are typically heavily over-parameterized, and while pruning is usually studied for post-training compression, its capacity to act as an implicit regularizer remains underexplored in ASR. Naive global magnitude pruning causes catastrophic model collapse at 30-40% sparsity because different components exhibit widely varying sensitivities to weight removal.

## Method

The authors introduce a sensitivity diagnostic combining first-order gradient norms and second-order Fisher Information diagonal approximations, applied post-tuning on a validation calibration subset without parameter updates. Using a 244M-parameter Whisper-small model, they evaluate component- and layer-wise unstructured one-shot magnitude pruning across encoders and decoders. Based on these sensitivity profiles, they allocate component-specific sparsity configurations (e.g., pruning 50% of decoder self-attention or late encoder layers) across LibriSpeech, Common Voice, and TED-LIUM without retraining or mask recomputation.

## Results

Evaluated primarily on LibriSpeech test-other (baseline WER 11.64%), Common Voice v15 English, and TED-LIUM 3. Pruning 50% of decoder self-attention improves test-other WER by 2.38% absolute (20.44% relative), and pruning the last four encoder layers (9-12) by 50% yields a 1.72% improvement. Component-specific sensitivity-aware compression achieves 40.8% overall sparsity (reducing parameters from 241M to 143M and GFLOPs from 4.55 to 2.77) while preserving near-baseline accuracy, where naive global magnitude pruning completely collapses.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and practitioners seeking to compress ASR foundation models or improve their out-of-domain generalization without expensive retraining or fine-tuning cycles.

## Limitations

The study is primarily scoped to English Whisper-small, and unstructured sparsity masks are not exploited by standard dense inference kernels in their implementation so runtime/RTF remains unchanged.

## Related

- (link related pages by id as the wiki grows)
