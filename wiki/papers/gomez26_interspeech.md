---
id: gomez26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3113
pdf: https://www.isca-archive.org/interspeech_2026/gomez26_interspeech.pdf
---

# Unsupervised Speech in the Wild Challenge: Learning Robust Multilingual Representations

[PDF](https://www.isca-archive.org/interspeech_2026/gomez26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gomez26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3113)

**TL;DR** — The Unsupervised Speech in the Wild (UPS) Challenge benchmarks self-supervised multilingual speech representations trained exclusively on 800k+ hours of heterogeneous web audio, evaluating 80 submissions across language identification, few-shot ASR, and speaker clustering.

## Problem

Most speech self-supervised learning (SSL) models are pretrained on clean, highly curated corpora like LibriSpeech or CommonVoice, leaving their performance on noisy, acoustically diverse web audio largely unexamined. Naturally occurring web speech contains spontaneous dialogue, environmental noise, and long-tailed linguistic variations that stress-test representation robustness. To bridge this gap, the UPS Challenge restricts participants to training exclusively on uncurated web audio and evaluates them across diverse phonetic, linguistic, and speaker-level downstream tasks.

## Method

Participants pretrain models from scratch or continue pretraining from checkpoints using the Unsupervised People's Speech (UPS) dataset, which contains over 800,000 hours of public web audio (approximately 522,000 speech hours detected via Silero VAD across 89 languages). Evaluation uses standardized frozen encoders communicating through a unified inference interface deployed on Dynabench. Downstream probes include a linear classifier for zero-shot language identification, a lightweight linear projection head with CTC loss for few-shot ASR on 73 languages, and independent speaker clustering per language with oracle speaker counts on a VoxTube-derived subset.

## Results

Across 80 scored submissions from 14 teams, the top-performing language identification model achieved 0.9488 Macro-F1 (whisper-baseline), the best ASR results reached 0.5378 CER (WavLM-large variants), and the top speaker clustering hit 0.9469 ARI (qwen3-encoder-baseline). Analyses reveal that ASR difficulty is heavily script-dependent (e.g., Japanese exhibits an average CER of 1.48 due to logographic script mismatches), while speaker clustering is highly sensitive to gender imbalance and per-language speaker subset composition.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing robust, multilingual speech foundation models for uncurated acoustic environments.

## Limitations

Speaker clustering and ASR metrics are vulnerable to artifacts such as per-language speaker imbalances, script-to-decoding mismatches, and gender skews in the evaluation subsets.

## Related

- (link related pages by id as the wiki grows)
