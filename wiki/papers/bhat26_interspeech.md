---
id: bhat26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-135
pdf: https://www.isca-archive.org/interspeech_2026/bhat26_interspeech.pdf
---

# A Gated Multi-Task Whisper Framework for Speech, Emotion, and Scene Understanding

[PDF](https://www.isca-archive.org/interspeech_2026/bhat26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhat26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-135)

**TL;DR** — A unified multi-task model built on the Whisper-small encoder combines automatic speech recognition, speech emotion recognition, and acoustic scene classification using a VAD-inspired gating mechanism that reduces ASR hallucination rates from over 96% down to under 1%.

## Problem

Real-world assistive technologies and smart assistants must simultaneously process linguistic content, emotional states, and environmental acoustic contexts. While foundation models like Whisper excel at noisy automatic speech recognition, they are highly prone to generating spurious repetitions and hallucinations on silent or non-speech segments. Existing post-hoc filtering methods fail to address intrinsic task routing and memory inefficiency caused by deploying separate independent models for each task.

## Method

The architecture builds on the Whisper-small encoder (12 Transformer blocks, hidden size 768) and freezes/unfreezes the 12-layer ASR decoder during a two-phase training recipe. It introduces four output heads: the standard ASR decoder and linear classifiers for a 3-class VAD gate (clean speech, non-speech, noisy speech), speech emotion recognition (SER with 8 classes), and acoustic scene classification (ASC with 5 classes). Mean-pooled encoder embeddings drive the classification heads, while a weighted multi-task loss combines cross-entropy and masked classification objectives. During inference, a conditional gating mechanism dynamically routes execution, activating ASR and SER for clean speech, ASC only for non-speech, and all three modules for noisy speech.

## Results

The framework is evaluated on ESAS-32K, a synthesized multi-task corpus of 32,080 audio samples combining emotional speech (RAVDESS, TESS, SAVEE) and acoustic scenes (SPASS) across 5, 10, 15, and 20 dB SNR conditions. Under the 70/10/20 train/val/test split, the VAD gate achieves 99.98% accuracy (0.997 F1), SER reaches 97.85% accuracy (0.969 F1), and ASC achieves 98.2% accuracy (0.981 F1), with an ASR word error rate of 94.5 and a non-speech hallucination rate of only 0.015%. Without the gating mechanism, the ASR hallucination rate surges to 96.11%. Applying a decoding constraint of no_repeat_ngram_size=3 with a repetition penalty of 1.3 further prevents looping repetitions on the 10-second audio inputs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building context-aware smart assistants, elder-care monitoring systems, emergency alert tools, and assistive technologies requiring simultaneous speech transcription, emotional distress detection, and environmental noise analysis.

## Limitations

Evaluated primarily on fixed-length 10-second English audio samples and a limited set of acoustic scenes, requiring future extension to variable-length, multilingual, and cross-corpus settings.

## Related

- (link related pages by id as the wiki grows)
