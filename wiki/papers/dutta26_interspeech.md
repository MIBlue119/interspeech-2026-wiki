---
id: dutta26_interspeech
category: resources-evaluation
labels: [multilingual, dataset-or-benchmark-release]
institutions: ["Indian Institute of Technology Jodhpur", "EkStep Foundation"]
code: https://iab-rubric.org/resources/codes/spashta-audio-bench
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1777
pdf: https://www.isca-archive.org/interspeech_2026/dutta26_interspeech.pdf
---

# Spashta Audio-Bench: Unified ASR and TTS Evaluation Framework across Indian Languages

*Bikash Dutta, Siddhant Gahankari, Abhinav Kumar, Siddarth Modugu, Shalini Kapoor, Mayank Vatsa, Richa Singh*

[PDF](https://www.isca-archive.org/interspeech_2026/dutta26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dutta26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1777)

**Category:** `resources-evaluation` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — Spashta Audio-Bench is a modular, plug-and-play evaluation framework for ASR and TTS across 22 Indian languages and Indian-accented English that exposes critical divergences between model scale, naturalness, and linguistic intelligibility. Evaluating 10 public models across 7 corpora (644 hours), it demonstrates that parameter scaling does not guarantee cross-language robustness and that high-pMOS TTS models frequently fail objective intelligibility checks.

## Key contributions

- A modular, plug-and-play evaluation framework analogous to HuggingFace Evaluate that registers arbitrary ASR/TTS checkpoints and datasets without core pipeline modifications.
- A unified pipeline enforcing standard preprocessing (16 kHz mono audio, UTF-8 lowercased punctuation-stripped text normalization) across 7 diverse Indian speech corpora.
- Comprehensive baseline evaluation of 10 open-source ASR and TTS models, uncovering severe performance gaps across language families, resource levels, and acoustic domains.
- Introduction of TTS-ASR degradation (using IndicConformer as an oracle) as an objective, reproducible intelligibility metric alongside predicted MOS, FAD, and P.808.

## Problem

Speech evaluation for Indian languages has historically relied on fragmented, single-use scripts, disjoint datasets, and inconsistent preprocessing, making fair comparison and reproducibility nearly impossible. Prior benchmarks test isolated tasks or rely on subjective human scoring that fails to expose hidden intelligibility failures. India's rich linguistic landscape—spanning Indo-Aryan and Dravidian language families with complex morphology, agglutinative structures, and non-phonemic orthographies—demands a standardized, multi-metric infrastructure to reveal true model capabilities.

## Method

Spashta Audio-Bench is organized into four architectural layers: a Data Layer aggregating audio and transcript test sets; a Preprocessing Layer enforcing uniform audio formatting (16 kHz mono) and text normalization (UTF-8, lowercasing, punctuation stripping); a Model Layer supporting plug-and-play inference for arbitrary ASR or TTS checkpoints; and an Evaluation/Visualization Layer running a centralized scoring engine and interactive dashboard.

For ASR, the framework computes Word Error Rate (WER) and Character Error Rate (CER) via standard edit distance over normalized transcripts. For TTS, it combines objective intelligibility (TTS-ASR degradation computed via an IndicConformer oracle predicting target text from synthesized audio), acoustic realism via Fréchet Audio Distance (FAD using a VGGish encoder), and predicted perceptual quality using neural MOS estimators (DNSMOS and P.808).

The framework integrates 7 public datasets spanning 329,802 samples and 644.07 hours (IndicVoices, IndicVoices-R, IndicTTS, OpenSLR, RASA, Nirantar, and SVARAH) and evaluates 10 open-source models out-of-the-box without fine-tuning: ASR models (Vakyansh Conformer 95-120M, Vakyansh Wav2Vec2 95-120M, IndicConformer 600M CTC+RNNT, and AudioX North/South ~2B encoder-decoder) and TTS models (Indic Parler 0.9B decoder-only, Veena 3B LLaMA-based autoregressive, MMS-TTS VITS, Bark 1.1B generative transformer, and Kokoro 82M StyleTTS2). These models were selected to analyze structural inductive biases across architectures, parameter counts, and training distributions.

## Experimental setup

Evaluated across 7 corpora (IndicTTS, IndicVoices, IndicVoices-R, RASA, Nirantar, OpenSLR, SVARAH) containing up to 329,802 samples and 644.07 hours across 23 languages. Baseline systems comprise 5 ASR models (Vakyansh-C, Vakyansh-W2V, IndicConformer-600M, AudioX-N, AudioX-S) and 5 TTS models (Indic Parler, Veena, MMS-TTS, Bark, Kokoro) evaluated using public checkpoints without fine-tuning. Metrics include WER, CER, TTS-ASR WER/CER, FAD, predicted MOS (DNSMOS/P.808), and OVR.

## Results

IndicConformer achieves strong ASR performance on high-resource languages (e.g., IndicConformer WER is 31.58% on IndicTTS and 17.88% on SLR), but AudioX-S outperforms it on IndicTTS (26.74% WER) and AudioX-N leads on RASA (20.90% WER), showing domain sensitivity. Wav2Vec2 models degrade heavily on crowd-sourced data, exceeding 63% WER. For TTS, Veena achieves the lowest FAD on IndicTTS (3.52) but the highest TTS->ASR WER (53.79%), whereas MMS-TTS achieves the best intelligibility (36.14% TTS->ASR WER) despite lower perceptual scores. Low-resource Dravidian languages (Malayalam at 51.47% WER, Kannada at 47.70%) and Indo-Aryan long-tail languages (Maithili at 58.29%) exhibit high error rates, while Urdu achieves an outlier low WER of 9.38% due to high lexical overlap with Hindi and script normalization.

| System / Condition | ASR WER (%) (IndicTTS) | ASR WER (%) (RASA) | TTS->ASR WER (%) | TTS FAD (IndicTTS) |
|---|---|---|---|---|
| AudioX-North | 34.70 | 20.90 | -- | -- |
| AudioX-South | 26.74 | 32.53 | -- | -- |
| IndicConformer | 31.58 | 35.49 | -- | -- |
| Parler (TTS) | -- | -- | 42.76 | 7.71 |
| MMS-TTS (TTS) | -- | -- | 36.14 | 6.38 |
| Veena (TTS) | -- | -- | 53.79 | 3.52 |

## Limitations

Evaluations rely strictly on static public checkpoints without domain-specific fine-tuning or hyperparameter adjustments. Neural MOS predictors (DNSMOS and P.808) are uncalibrated for certain regional Indian phonologies, leading to divergences between predicted metrics and actual intelligibility. The framework is currently bound to 23 languages and text/audio formats present in the integrated corpora, leaving extremely rare dialects unrepresented.

## Why read this

Speech researchers and engineers building multilingual or low-resource speech systems should read this paper to understand why parameter scaling and single-metric evaluations fail in diverse linguistic regions. It provides a drop-in evaluation library that replaces fragmented scripts with standardized multi-metric scoring.

## Code

- https://iab-rubric.org/resources/codes/spashta-audio-bench

## Applications

Benchmarking and auditing multilingual ASR and TTS deployments for regional accessibility, telecommunications, and voice assistant applications across Indic languages.

## Institutions / 機構

Indian Institute of Technology Jodhpur, EkStep Foundation

**Funding / 經費:** EkStep Foundation, IndiaAI, Meta

## Related

- (link related pages by id as the wiki grows)
