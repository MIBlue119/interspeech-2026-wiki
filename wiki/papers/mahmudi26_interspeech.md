---
id: mahmudi26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2781
pdf: https://www.isca-archive.org/interspeech_2026/mahmudi26_interspeech.pdf
---

# Easper: An Accessible ASR Pipeline for Language Documentation

[PDF](https://www.isca-archive.org/interspeech_2026/mahmudi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mahmudi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2781)

**TL;DR** — We present Easper, an open-source no-code workflow linking ELAN annotations to cloud-based ASR fine-tuning, and demonstrate that prioritizing lexical richness and phonetic repetition accelerates transcription quality gains in low-resource settings.

## Problem

Language documenters face a severe transcription bottleneck but often lack the technical expertise to fine-grain neural ASR foundation models like Whisper. Furthermore, projects suffer from a cold start problem regarding which audio sessions to transcribe first for seed data, with no empirical guidance on whether to prioritize acoustic cleanliness or linguistic richness.

## Method

Easper features a desktop application and dataset generator that processes ELAN (.eaf) files using pympi-ling to flag long segments (>30s) and overlapping speech, exporting 16 kHz WAVs and CSVs. It supports cloud-based full fine-tuning of Whisper-Small (244M) and XLS-R (300M) for 3 epochs per step with a learning rate of 1e-5 and batch size of 8. For offline inference, it integrates pyannote-audio or SpeechBrain for speaker diarisation and segmentation before writing transcriptions back into ELAN. It evaluates session-level data selection strategies using Signal-to-Noise Ratio (SNR), Speaker Overlap Rate (OVR), Type-Token Ratio (TyTo), and a Normalized Token-to-Type Ratio (ToTy) that measures word repetition per unique word adjusted by duration.

## Results

Evaluated on 3 Vanuatu languages (Bislama: 13h45m across 49 sessions; Nafsan: 14h50m across 32 sessions; Nguna: 1h01m across 7 sessions) using Character Error Rate (CER) trajectories. The results demonstrate that strategies prioritizing lexical richness and acoustic-phonetic repetition (ToTy and TyTo) yield faster improvements in transcription quality than prioritizing acoustic cleanliness (SNR) or minimal overlap.

## Code

- https://github.com/Aso-UniMelb/Easper

## Applications

Field linguists and community archivists seeking to automate the transcription of low-resource or endangered languages directly within ELAN.

## Limitations

Small corpus sizes in endangered language documentation can lead to high variance and spikes in learning curves due to domain shifts between recording sessions.

## Related

- (link related pages by id as the wiki grows)
