---
id: eljasiak26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2587
pdf: https://www.isca-archive.org/interspeech_2026/eljasiak26_interspeech.pdf
---

# Foundational speech models evaluation on multilingual dementia prediction

[PDF](https://www.isca-archive.org/interspeech_2026/eljasiak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/eljasiak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2587)

**TL;DR** — This paper evaluates multilingual foundational speech models for automated dementia detection, achieving an average F1 score of 0.854 on combined English datasets and 0.761 in a challenging multilingual setting.

## Problem

Early detection of dementia relies heavily on identifying subtle linguistic and acoustic speech markers, but most existing detection systems are restricted to monolingual settings and lack comprehensive evaluations across diverse languages. Establishing cross-lingual robustness and zero-shot transfer capabilities is crucial for scaling clinical speech screening to low-resource languages and diverse populations. Without systematic benchmarking of foundational models across multiple datasets, it remains unclear how well acoustic features generalize across different clinical tasks and languages.

## Method

The authors adopt a SUPERB-inspired pipeline consisting of frozen or fine-tuned foundational speech encoders (Wav2Vec 2.0, HuBERT, WavLM, Whisper) coupled with learned weighted mean layer aggregation and lightweight downstream classifiers (primarily an ECAPA-TDNN with hidden sizes of 16, 32, or 64). Data preprocessing utilizes timestamped transcripts or pyannote.audio for diarization, chunking audio into 6-to-30-second participant speech segments. Training uses the AdamW optimizer with exponential learning rate decay on combined corpora from DementiaBank (ADReSS, ADReSSo, ADReSSM, TAUKADIAL, Dem@Care, Ivanova) and the Polish DiagNeuro dataset, harmonizing all cognitive impairment labels into a binary dementia vs. healthy control task.

## Results

Evaluated across multiple corpora, the pipeline reaches a 0.761 F1 score in the broader multilingual setting and 0.854 F1 score across combined English datasets, occasionally outperforming prior task-specific state-of-the-art (e.g., 0.916 F1 on ADReSSo). The WavLM family consistently delivers top performance across languages and model scales. Adding linguistic diversity to the training mixture yields a clear cross-lingual performance boost, raising the Polish subset F1 score from 0.692 (bilingual EN-PL) to 0.840 (quadrilingual), while an English-Spanish training mixture achieves a 0.928 F1 on Polish test data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical engineers and digital health researchers building non-invasive, automated screening tools for neurodegenerative diseases and cognitive decline across multiple languages.

## Limitations

Zero-shot performance on completely unseen languages shows drops in effectiveness, indicating that cross-lingual transfer remains bounded by phonetic and linguistic divergences.

## Related

- (link related pages by id as the wiki grows)
