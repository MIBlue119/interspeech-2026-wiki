---
id: lopez26b_interspeech
category: asr
labels: [low-resource, dataset-or-benchmark-release]
institutions: ["Telefonica", "Universidad Autonoma de Madrid", "Brno University of Technology"]
code: https://github.com/ferugit/s-diverse
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2529
pdf: https://www.isca-archive.org/interspeech_2026/lopez26b_interspeech.pdf
---

# S-DiverSe: Spanish Diverse Speech

*Fernando López, Fernando Ibañez, Ana Martínez, Iván Alonso, Pablo Gómez, Santosh Kesiraju, Jordi Luque*

[PDF](https://www.isca-archive.org/interspeech_2026/lopez26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lopez26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2529)

**Category:** `asr` · **Labels:** `low-resource`, `dataset-or-benchmark-release`

**TL;DR** — The paper introduces S-DiverSe, a 3.2-hour in-the-wild Spanish speech corpus featuring 22 speakers with neurological conditions (ALS, Parkinson's, stroke), and demonstrates that simple text post-processing outperforms fine-tuning for out-of-domain pathological Spanish ASR.

## Key contributions

- Introduces S-DiverSe, the first open Spanish dataset of in-the-wild neurologically affected speech containing 444 annotated audio segments with sex, condition, and 5-point intelligibility metadata.
- Benchmarks four state-of-the-art ASR systems (Whisper-large-v3, Voxtral-Mini, omniASR CTC 1B v2, and ElevenLabs Scribe v2) across pathological corpora.
- Evaluates multiple ASR adaptation strategies, showing that heuristic text post-processing is more robust than parameter-updating methods for out-of-domain transfer.
- Releases annotations and video link resources to support future open research in pathological Spanish speech recognition.

## Problem

Automatic speech recognition models struggle significantly with dysarthric speech caused by neuromotor disorders like ALS, Parkinson's disease, and post-stroke conditions due to reduced articulation clarity, altered prosody, and variable intelligibility. While English has resources like UA-Speech, TORGO, and the Speech Accessibility Project, Spanish lacks diverse, publicly available in-the-wild corpora, as existing datasets (e.g., GITA, NeuroVoz) are limited to clinical settings, brief elicited utterances, or elderly demographics. This gap hinders the development of robust assistive and clinical tools for Spanish pathological speech.

## Method

The S-DiverSe dataset comprises 3.2 hours of human-transcribed speech from YouTube recordings of 22 speakers, split into 444 segments under 30 seconds on average. Audio was filtered by native Spanish linguistics graduates based on self-reported diagnoses and perceptual evidence of non-normative speech, using a 1-5 ordinal intelligibility scale (yielding a weighted Cohen's kappa IAA of 0.38). Adaptations are tested on Whisper-large-v3 (1.6B params) and Voxtral-Mini (4.7B params, integrating a Whisper encoder and Ministral-3B LLM via connector) using Full Fine-Tuning (FFT, lr=1e-5, 3 epochs), Encoder Fine-Tuning (EFT, lr=2e-5, 5 epochs), and LoRA variants (F-LoRA and E-LoRA, lr=3e-4, r=8, alpha=16, dropout=0.1, 10 epochs) on cross-domain data combinations (TORGO, NeuroVoz, and Spanish Common Voice).

Inference uses greedy decoding on two A100-SXM4-40GB GPUs with sliding-window lengths of 30-35 seconds and 5-second overlaps. Text post-processing (PP) applies three sequential heuristic steps to mitigate autoregressive hallucinations: removing internal character-level repetitions in words exceeding 15 characters, word-level deduplication, and phrase-level deduplication.

## Experimental setup

Evaluated on S-DiverSe (3.2 hours, 22 speakers), TORGO (13.68 hours, 15 speakers), and NeuroVoz (2.31 hours, 111 speakers), with Spanish Common Voice v24.0 (7.3 hours) used for language-balance tests. Baselines include Whisper-large-v3, Voxtral-Mini, omniASR CTC 1B v2, and ElevenLabs Scribe v2. The primary evaluation metric is Word Error Rate (WER) with normalized text, keeping filled pauses as regular tokens.

## Results

On the S-DiverSe baseline evaluation, ElevenLabs Scribe v2 achieves the lowest total WER of 20.69%, followed by omniASR CTC 1B v2 at 33.56%, Whisper-large-v3 at 36.43%, and Voxtral-Mini at 40.43%. Applying rule-based post-processing (PP) to open-weight models significantly improves S-DiverSe performance, reducing Whisper-large-v3's WER to 22.01% and Voxtral-Mini's to 23.73% without degrading in-domain TORGO performance.

Conversely, full fine-tuning and LoRA methods fail to generalize to out-of-domain S-DiverSe data: FFT+PP on TORGO and NeuroVoz causes Whisper-large-v3 to collapse to a catastrophic WER of 125.68% due to high insertion and substitution rates under domain shift. Adding clean read-speech from Common Voice fails to bridge the domain gap, confirming that lack of in-the-wild pathological data, rather than language imbalance, is the primary bottleneck.

| System & Condition | S-DiverSe (Total) | NeuroVoz | TORGO (Total) |
|---|---|---|---|
| Voxtral-Mini (None) | 40.43% | 6.75% | 25.15% |
| Whisper-large-v3 (None) | 36.43% | 19.03% | 20.86% |
| omniASR CTC 1B v2 (None) | 33.56% | 16.96% | 37.95% |
| Scribe v2 (None) | 20.69% | - | - |
| Whisper-large-v3 (PP) | 22.01% | 19.15% | 20.00% |
| Voxtral-Mini (FFT + PP, NV+TG) | 26.81% | 4.01% | 11.84% |

## Limitations

S-DiverSe relies on self-reported clinical diagnoses and is restricted to ASR evaluation rather than direct clinical diagnostic inference. The dataset is male-dominant (87.4%) and ALS-dominant (78.1%), reflecting in-the-wild availability rather than controlled demographic balancing. The total duration is modest (3.2 hours), and audio conditions include background noise and music which may confound acoustic evaluations.

## Why read this

Speech and ML researchers working on pathological speech or robust ASR adaptation should read this to understand why standard fine-tuning fails on in-the-wild domain shifts and why lightweight text post-processing offers a more resilient alternative.

## Code

- https://github.com/ferugit/s-diverse

## Applications

Development of assistive communication technologies, hands-free transcription interfaces, and robust automatic speech recognition systems for individuals with neuromotor and speech disorders.

## Institutions / 機構

Telefonica, Universidad Autonoma de Madrid, Brno University of Technology

**Funding / 經費:** European Union's Horizon 2020 RIA ELOQUENCE project, Ministry of Education, Youth and Sports of the Czech Republic, OP JAK project 'Linguistics, Artificial Intelligence and Language and Speech Technologies: from Research to Applications'

## Related

- (link related pages by id as the wiki grows)
