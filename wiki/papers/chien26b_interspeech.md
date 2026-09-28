---
id: chien26b_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1738
---

# From Bilevel to Trilevel: Joint Training for Speech Recognition

**TL;DR** — Extending bilevel optimization to a trilevel scheme lets an ASR acoustic model be jointly trained on supervised, unsupervised, and knowledge-distillation objectives in a single optimization loop, improving on standard pretrain-then-finetune pipelines.

## Problem

Standard ASR pipelines separate self-supervised pretraining, supervised fine-tuning, and teacher-distillation into different stages, and prior bilevel joint-training approaches don't cover all three objectives at once.

## Method

The authors use a sequential penalty-based bilevel gradient descent method that collapses two of the three training levels into a bilevel subproblem and then integrates that with the remaining upper level, making trilevel training tractable for large-scale ASR models.

## Results

On LibriSpeech with a FastConformer backbone, the trilevel strategy gives consistent improvements over conventional two-stage pretrain/fine-tune pipelines and over prior bilevel optimization methods.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Training pipelines for large-scale ASR systems that want to combine unlabeled data, labeled data, and teacher-model knowledge more efficiently than staged pipelines allow.

## Related

- (link related pages by id as the wiki grows)
