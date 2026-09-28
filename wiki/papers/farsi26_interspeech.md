---
id: farsi26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1516
pdf: https://www.isca-archive.org/interspeech_2026/farsi26_interspeech.pdf
---

# Preserving the Iranian Turkic Language: Community-Driven ASR Datasets and Benchmarking for South Azerbaijani

[PDF](https://www.isca-archive.org/interspeech_2026/farsi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/farsi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1516)

**TL;DR** — This paper introduces the first community-driven ASR datasets and evaluation benchmarks for South Azerbaijani, establishing strong baselines across eight models and showing that language-specific fine-tuning is crucial for this low-resource setting.

## Problem

South Azerbaijani is an extremely low-resource Turkic language spoken by over 15 million people in Iran, yet it lacks publicly available annotated speech datasets and pre-trained automatic speech recognition models. Compounding this, its Arabic-script writing system exhibits phonetic and orthographic ambiguities that make transcription particularly challenging compared to Latin-script varieties.

## Method

The authors introduce three resources: a Community dataset of over 25 hours from 14 speakers (7 female, 7 male) reading book excerpts, an External large-scale dataset of ~250,000 utterances (447.64 hours) transliterated from North Azerbaijani audio into South Azerbaijani Arabic script, and an AZB ASR GoldSet evaluation benchmark containing 17.49 hours across 3,021 utterances. They benchmark eight models, including Facebook's MMS-1B-all and various Whisper-family variants (Tiny, Base, Small) that were fine-tuned either on the community data alone, combined data, or via cross-lingual transfer using Persian, Arabic, Turkish, and North Azerbaijani checkpoints. Standard text normalization was applied to handle digits, symbols, and Unicode variations before training.

## Results

Training on the full combined dataset consistently improved performance over community-only training, and language-specific or cross-lingual fine-tuning proved essential. Among all evaluated models, MMS-1B-all fine-tuned on the Community dataset achieved the best performance on the GoldSet while exhibiting lower character error rates than Whisper models, which the authors attribute to its non-autoregressive CTC architecture. Error analysis identified Arabic script ambiguity, instability on very short utterances, and number transcription challenges as primary error sources.

## Code

- https://github.com/Kartalol/Kartalol-azb-asr

## Applications

Speech and machine learning engineers developing voice interfaces, transcription tools, or speech technology for underrepresented Turkic languages and specifically South Azerbaijani speakers.

## Limitations

Performance remains limited on very short utterances and external acoustic domains, and models struggle with orthographic ambiguities inherent in the Arabic script representation of the language.

## Related

- (link related pages by id as the wiki grows)
