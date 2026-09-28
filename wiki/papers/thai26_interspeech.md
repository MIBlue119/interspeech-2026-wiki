---
id: thai26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-949
---

# Contrastive Regularization for Accent-Robust ASR

**TL;DR** — Adding a lightweight supervised contrastive loss during CTC fine-tuning makes ASR encoder representations more accent-invariant, cutting word error rate by up to 29% on unseen accents without changing the model architecture.

## Problem

ASR systems built on self-supervised pretraining plus CTC fine-tuning perform well on native speech but remain sensitive to accent variability, especially accents unseen during training.

## Method

The authors add an utterance-level supervised contrastive loss (SupCon) as an auxiliary objective during CTC fine-tuning, regularizing encoder representations toward accent-invariance without architectural changes or explicit accent labels.

## Results

On the L2-ARCTIC benchmark, SupCon gives consistent WER reductions across multiple pretrained encoders, with up to 25-29% relative reduction under unseen-accent evaluation, and representation-geometry analysis shows it makes embeddings more compact and stable under accent variation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Model-agnostic, easy-to-add regularization for improving ASR robustness to unseen accents in production speech recognition systems.

## Related

- (link related pages by id as the wiki grows)
