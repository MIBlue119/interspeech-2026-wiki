---
id: ali26b_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1522
---

# MambAdapter: Lightweight Mamba-Based Adapters for Parameter-Efficient Transfer Learning in Speech and Audio

**TL;DR** — Injecting a lightweight Mamba state-space module into shared low-rank adapters improves parameter-efficient adaptation of speech/audio foundation models without added fine-tuning cost.

## Problem

Fully fine-tuning large Transformer-based speech and audio foundation models for new domains is expensive, and existing parameter-efficient transfer learning (PETL) methods leave room for better feature modeling.

## Method

MambAdapter integrates a Mamba module into low-rank bottleneck adapters and shares parameters across adapters, aiming to model audio features more effectively than standard PETL adapters.

## Results

Matches or outperforms strong PETL baselines on four audio classification tasks and five speech recognition languages, even under reduced parameter budgets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Efficient domain or language adaptation of large speech/audio models when compute or storage for full fine-tuning is limited.

## Related

- (link related pages by id as the wiki grows)
