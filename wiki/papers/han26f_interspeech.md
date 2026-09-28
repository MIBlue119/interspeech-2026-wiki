---
id: han26f_interspeech
category: speech-synthesis
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3485
pdf: https://www.isca-archive.org/interspeech_2026/han26f_interspeech.pdf
---

# TAP-ETS: Time Aligned Phoneme Guiding for EMG-to-Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/han26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/han26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3485)

**TL;DR** — TAP-ETS introduces a time-aligned phoneme-guided framework for electromyography-to-speech synthesis that injects explicit frame-wise phoneme embeddings via cross-attention, reducing Word Error Rate on the Gaddy silent EMG benchmark from 25.12% to 19.77%.

## Problem

Prior electromyography-to-speech (ETS) models typically treat phoneme information merely as a secondary auxiliary training objective rather than an explicit conditioning signal during generation. This weak inductive bias limits controllability and makes it difficult to seamlessly integrate external text- or phoneme-level semantic correction models without fully retraining the synthesis backbone.

## Method

The TAP-ETS architecture consists of an encoder-decoder network where downsampled EMG features act as queries, and frame-wise phoneme sequences serve as keys and values in a cross-attention decoder. During training, the framework optimizes a joint objective combining a mel-spectrogram reconstruction loss ($\lambda_{mel}=0.5$) and a phoneme cross-entropy loss ($\lambda_{ph}=0.5$). For inference-time correction without retraining, the authors propose two TAP refinement strategies: a Levenshtein distance-based method that aligns corrected phoneme sequences while preserving original temporal island durations, and a Transformer-based masking refinement model trained on LibriSpeech to fix alignment errors.

## Results

Evaluated on the Gaddy silent EMG test benchmark using Whisper-medium ASR transcriptions, TAP-ETS achieves an accuracy of 73.03%, a Phoneme Error Rate (PER) of 15.59%, a Character Error Rate (CER) of 11.15%, and a Word Error Rate (WER) of 19.77%, outperforming baselines like Gaddy (25.12% WER) and Scheck (26.09% WER). Sequential application of the Levenshtein and masking-based refinement strategies yields the strongest intelligibility gains.

## Code

- https://github.com/ongdyub/TAP-ETS

## Applications

Speech and ML engineers building silent speech interfaces, assistive communication devices, or vocal prosthetics driven by facial and articulatory muscle activity.

## Limitations

The framework assumes availability of reliable phoneme durations or relies on external correction and refinement modules to mitigate initial EMG-induced phoneme errors.

## Related

- (link related pages by id as the wiki grows)
