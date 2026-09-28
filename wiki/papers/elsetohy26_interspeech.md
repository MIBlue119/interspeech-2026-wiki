---
id: elsetohy26_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2665
pdf: https://www.isca-archive.org/interspeech_2026/elsetohy26_interspeech.pdf
---

# ArFake: A Robust Framework for Multi-Dialect Arabic Speech Spoofing Detection Benchmark

[PDF](https://www.isca-archive.org/interspeech_2026/elsetohy26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/elsetohy26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2665)

**TL;DR** — ArFake is an end-to-end framework and multi-dialect Arabic speech deepfake benchmark comprising 54,413 utterances across eight dialects and four TTS generators, achieving up to 96% in-domain and 97% unseen generator accuracy.

## Problem

Audio deepfakes created by modern text-to-speech and voice-cloning models present severe security risks, but anti-spoofing research remains heavily concentrated on high-resource languages like English. Arabic—especially its diverse regional dialects characterized by data scarcity and complex morphology—lacks robust benchmarking resources, leaving Arabic-speaking communities vulnerable to synthetic speech manipulation.

## Method

The framework follows a five-phase pipeline spanning multi-generator synthesis using the Casablanca multi-dialect corpus, intelligibility measurement via ASR WER and human MOS, dataset construction, detector training, and robustness evaluation. The dataset mixes bona fide speech with synthetic samples from XTTS-v2, FishSpeech, and ArTST, while VITS is held out for cross-generator testing. Detectors utilize pretrained speech embedding models (HuBERT-base, Whisper-small, Whisper-large, wav2vec2.0) topped with a two-layer feed-forward classifier head, alongside a traditional MFCC-SVM baseline.

## Results

Evaluated on a 54,413-utterance dataset, Whisper-large achieves an in-domain EER of 4.88% (96.86% accuracy) on the combined test set. Under the Leave-One-Generator-Out (LOGO) protocol on unseen VITS-generated data, Whisper-small and Whisper-large attain 98.30% and 97.94% accuracy, respectively. Across Leave-One-Dialect-Out (LODO) evaluations, the detector maintains strong generalization, reaching peak accuracy of 93.51% on Moroccan and a lowest accuracy of 88.45% on Palestinian.

## Code

- https://huggingface.co

## Applications

Speech security engineers and developers building automated anti-spoofing systems, voice authentication pipelines, and deepfake detection tools for Arabic multi-dialect telephony and media platforms.

## Limitations

Some high-performing generator subsets exhibited easily exploitable synthesis artifacts that inflated detector scores rather than reflecting pure semantic deepfake detection.

## Related

- (link related pages by id as the wiki grows)
