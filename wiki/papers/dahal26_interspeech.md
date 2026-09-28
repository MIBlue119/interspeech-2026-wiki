---
id: dahal26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-322
---

# Mixture of Phonetic Experts Based Low-Rank Adaptation of Conformer Models for Accented English Speech Recognition

**TL;DR** — Organizing LoRA experts by phonetic manner-of-articulation class, instead of by accent, lets a single adapted ASR model generalize to unseen accents without accent-specific modules.

## Problem

Accented English ASR is challenging, and existing mixture-of-experts adaptation methods typically assign one expert per accent, which implicitly assumes accent identity is the key axis of variation and doesn't generalize to accents not seen in training.

## Method

MoPE-LoRA organizes adaptation along phonetic categories instead, using six fixed low-rank experts aligned to manner-of-articulation classes, routed at the frame level through a hybrid mechanism combining phoneme supervision with learned acoustic gating; because experts are shared across accents, no accent-specific modules are needed.

## Results

On L2-ARCTIC, MoPE-LoRA consistently beats single LoRA and full fine-tuning, and in zero-shot evaluation with one accent held out, it delivers a 12.3% relative improvement over single LoRA.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Accent-robust ASR deployment for diverse, multilingual user bases, including generalizing to previously unseen accents without collecting accent-specific training data.

## Related

- (link related pages by id as the wiki grows)
