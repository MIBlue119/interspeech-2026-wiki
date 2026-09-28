---
id: takizawa26_interspeech
category: self-supervised-learning
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3002
pdf: https://www.isca-archive.org/interspeech_2026/takizawa26_interspeech.pdf
---

# Dissecting Sensitivity to Training Language in Self-Supervised Speech Learning Using Neural Audio Codec Tokens

[PDF](https://www.isca-archive.org/interspeech_2026/takizawa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/takizawa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3002)

**TL;DR** — This paper systematically investigates language sensitivity in codec-based self-supervised speech learning, revealing that downstream performance is largely insensitive to the neural audio codec training language but highly dependent on the self-supervised pre-training language.

## Problem

Neural audio codecs compress speech into discrete tokens that can be used to pre-train self-supervised learning (SSL) models, drastically reducing storage and computational costs. However, it remains unclear whether these codec-based SSL models are sensitive to language shifts, and whether retraining the underlying neural audio codec is necessary when moving to a new language. If codecs are language-sensitive, their cost-efficiency advantages would be significantly undermined.

## Method

The authors perform a controlled, staged evaluation decoupling neural audio codec (NAC) training languages from SSL pre-training languages across English, Japanese, and Chinese. They use Descript Audio Codec (DAC) trained on 1056 hours of various language combinations (EN+, JP, ZH, All) using 18 codebooks at 9 kbps, paired with HuBERT-based SSL models trained on 960 to 7173 hours of language-specific data. Downstream evaluation is conducted on automatic speech recognition (ASR) using Conformer architectures and speech emotion recognition (SER) following the SUPERB benchmark, measuring language sensitivity via coefficient of variation.

## Results

Downstream performance on NAC-reconstructed waveforms shows minimal variation across codec training languages (e.g., DAC achieves robust ASR and SER across EN+, JP, and ZH). Conversely, when varying the SSL pre-training language while keeping the codec fixed, downstream performance degrades significantly under language mismatch. Specifically, fixing the NAC to a multilingual setup while training HuBERT on English results in high error rates on non-English datasets, demonstrating that aligning the SSL pre-training language with the target language is critical.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers designing cost-efficient, scalable speech foundation models and deploying multilingual ASR or SER systems.

## Limitations

The study is restricted to three languages (English, Japanese, and Chinese) and evaluates specifically on ASR and SER downstream tasks.

## Related

- (link related pages by id as the wiki grows)
