---
id: geng26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-711
---

# Beyond Acoustic Sparsity and Linguistic Bias: A Prompt-Free Paradigm for Mispronunciation Detection and Diagnosis

**TL;DR** — A mispronunciation detection system that decouples raw acoustic modeling from the canonical-pronunciation prompt that usually biases predictions, improving fine-grained error detection.

## Problem

ASR-derived mispronunciation detection systems either favor sequence-level alignments that miss brief mispronunciation cues (CTC) or get biased toward the intended pronunciation by explicit canonical prompts.

## Method

Introduces CROTTC, an acoustic model enforcing monotonic frame-level alignment to capture transient deviations, plus an implicit-injection (IF) strategy that transfers mispronunciation knowledge without an explicit canonical prompt.

## Results

CROTTC-IF reaches a 71.77% F1-score on L2-ARCTIC and 71.70% F1-score on the Iqra'Eval2 leaderboard, with analysis showing decoupling acoustics from explicit priors gives more robust detection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted pronunciation training and language-learning apps needing fine-grained mispronunciation feedback.

## Related

- (link related pages by id as the wiki grows)
