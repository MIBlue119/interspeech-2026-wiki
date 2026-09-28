---
id: ugan26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1099
pdf: https://www.isca-archive.org/interspeech_2026/ugan26_interspeech.pdf
---

# Adding Robust Code-Switching Capabilities to High Performance Multilingual ASR

[PDF](https://www.isca-archive.org/interspeech_2026/ugan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ugan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1099)

**TL;DR** — Bayesian Low-Rank Adaptation (BLoRA) equips strong multilingual ASR models with robust code-switching capabilities without degrading monolingual baselines, achieving a 32.87% relative error reduction on code-switched words.

## Problem

Fine-tuning strong multilingual ASR models on synthetic code-switching data typically causes catastrophic degradation of their existing monolingual capabilities and out-of-domain robustness. Prior work often sidesteps this by starting from weak baselines or failing to evaluate on clean out-of-domain test sets, leaving the problem of preserving strong foundation models while adding code-switching unsolved. This matters because production systems rely heavily on robust monolingual performance and cannot afford regressions when expanding to handle code-switched speech.

## Method

The authors use a lightweight two-step synthesis pipeline involving GPT-4o with targeted linguistic prompts to insert English words into German sentences with correct morphological inflections, followed by XTTS-v2 for speech synthesis using automatic segment-boundary stitching. To prevent catastrophic forgetting during adaptation, they employ Bayesian Low-Rank Adaptation (BLoRA) on a Whisper-v3-turbo model, which applies KL regularization and a Gaussian prior on adaptation weights (rank r=32, lambda_KL=0.5) to yield sparse, uncertainty-aware update matrices. Training uses a learning rate of 1e-3, 2000 warmup steps, and a weight decay of 5e-4 for up to 30,000 steps. They also explore data filtering strategies using CER thresholds ranging from 5% to 40% computed via Whisper-medium.

## Results

Evaluated on the English-German CSFleurs dataset (with Point-of-Interest Error Rate, PIER) and CommonVoice 14 for monolingual preservation. Standard LoRA fine-tuning degrades German WER significantly (up to 74.24% relative degradation, and up to 418% in other configurations) and fails to improve code-switching. In contrast, BLoRA combined with the 5% CER synthesis filter reduces PIER by 32.87% using just 1000 samples, and achieves a 5.31% overall relative WER improvement on CSFleurs while preserving performance on CommonVoice. Textual diversity in synthetic prompts yields slightly larger PIER gains (18.94%) compared to speaker diversity (16.85%).

## Code

- https://github.com/enesyugan/robust-code-switching-asr

## Applications

Speech engineers and practitioners deploying large foundational ASR models in multilingual production environments who need to support code-switching without harming existing monolingual accuracy.

## Limitations

Some residual performance gap remains on conversational code-switching datasets like DECM due to acoustic mismatches with read-speech training distributions.

## Related

- (link related pages by id as the wiki grows)
