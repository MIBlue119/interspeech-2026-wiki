---
id: frangiadaki26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1371
pdf: https://www.isca-archive.org/interspeech_2026/frangiadaki26_interspeech.pdf
---

# Automatic Lyric Transcription for Greek Songs: Scaling and Task Composition Effects in Whisper Adaptation

[PDF](https://www.isca-archive.org/interspeech_2026/frangiadaki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/frangiadaki26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1371)

**TL;DR** — This paper presents the first systematic benchmark and controlled study for automatic lyric transcription in Greek using Whisper adaptation, achieving a Word Error Rate of 27.2% via a two-stage fine-tuning strategy on a newly curated dataset.

## Problem

Automatic lyric transcription is notoriously difficult due to extreme acoustic variations like melodic shifts, melisma, and instrumental accompaniment, a challenge compounded in low-resource languages lacking aligned corpora. Greek currently lacks any standardized benchmark for singing-voice ASR, leaving the behavior of multilingual foundation models under singing-domain adaptation unstudied. Addressing this requires curating specialized datasets and evaluating how model scale, multitask learning, and staged transfer impact performance.

## Method

The authors curate the GAD-ALT dataset by extracting vocal stems using Hybrid Transformer Demucs and aligning text using a CTC forced aligner combined with GPT-4o-mini English translations, yielding 19.65 hours of segment-level paired data split at the song level. They adapt Whisper models across three scales (Small, Medium, and Large-v3) using Hugging Face Seq2SeqTrainer with AdamW optimizer. Training configurations explore transcription-only targets, multitask learning with interleaved transcribe-translate ratios (2:1 and 4:1), and a two-stage strategy involving frozen-encoder decoder adaptation on read speech (Mozilla Common Voice) followed by full unfreezing on singing data.

## Results

Evaluated on the held-out Greek singing test set using normalized Word Error Rate (WER), zero-shot baselines yield high errors of 92.3% (Small), 65.1% (Medium), and 53.6% (Large-v3). Supervised fine-tuning significantly improves accuracy, showing that multitask learning acts as a beneficial regularizer for smaller models (e.g., Whisper Small achieves 33.6% WER at a 2:1 ratio), while larger models prefer transcription-only or staged training. The two-stage adaptation strategy proves most effective for high-capacity models, with Whisper Large-v3 reaching a headline WER of 27.2%. Training on isolated vocals outperforms polyphonic raw audio mixtures (33.4% WER), while artificial remixing and augmentation strategies consistently degrade performance.

## Code

- https://github.com/athena-ilsp/lyrics-transcription

## Applications

Speech and MIR engineers building music information retrieval systems, karaoke applications, or automated lyric synchronization tools for low-resource languages.

## Limitations

The intermediate read speech dataset used in stage one has controlled prosody acoustically distant from singing, and the evaluation is strictly bounded to the Greek language.

## Related

- (link related pages by id as the wiki grows)
