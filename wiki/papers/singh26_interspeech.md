---
id: singh26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1501
pdf: https://www.isca-archive.org/interspeech_2026/singh26_interspeech.pdf
---

# Low-Burden Data Augmentation for Dysarthric ASR via Zero-Shot Voice Cloning

[PDF](https://www.isca-archive.org/interspeech_2026/singh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/singh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1501)

**TL;DR** — Zero-shot voice cloning using a single reference utterance per speaker can serve as an effective data augmentation strategy for dysarthric ASR, reducing Word Error Rate on the TORGO dataset from 31.62% to 26.00%.

## Problem

Automatic speech recognition models struggle with dysarthric speech due to severe data scarcity, clinical recording bottlenecks, and high inter- and intra-speaker variability. Collecting and transcribing large corpora of pathological speech is slow, expensive, and burdensome for patients who fatigue easily. While synthetic speech can expand training data, traditional text-to-speech or voice conversion methods require multi-utterance speaker enrollment or extensive fine-tuning, and often risk normalizing atypical timing and phonation cues.

## Method

The authors employ the 5-billion parameter Higgs Audio V2 zero-shot voice cloning model to generate synthetic dysarthric speech (TORGO-Synth) from a single 7.2-second reference audio utterance per speaker combined with out-of-domain text prompts from LibriSpeech. The Whisper-medium model (769M parameters) is then fine-tuned on real, cloned, or hybrid datasets using an effective batch size of 32, a learning rate of 5e-6, and weight decay of 0.01. Speaker verification embeddings via TitaNet and t-SNE projections are used to analyze speaker consistency, and a data scaling analysis is conducted to determine optimal synthetic data volumes.

## Results

Evaluated on held-out real speech from the TORGO dataset, the zero-shot baseline achieves 31.62% WER, whereas fine-tuning on clone data (Clone FT) achieves 26.00% WER, closely matching Real FT (24.44%) and Hybrid FT (25.12%). For moderate-severe speakers specifically, Clone and Hybrid fine-tuning outperform training exclusively on real data. In cross-corpus evaluation on a 500-utterance test subset of SAP-1102, Clone fine-tuning improves performance from 14.50% to 12.84% WER (an 11.45% relative improvement), demonstrating strong cross-corpus generalization.

## Code

- https://github.com/boson-ai/higgs-audio

## Applications

Speech engineers and clinical researchers building robust automated speech recognition systems and accessibility applications for individuals with motor speech impairments and neurological conditions.

## Limitations

The study relies on a relatively small base dataset of 8 speakers in TORGO, and certain speakers (such as M05) exhibit higher embedding dispersion and within-speaker variability that can degrade cloning fidelity.

## Related

- (link related pages by id as the wiki grows)
