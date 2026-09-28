---
id: leal26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-450
pdf: https://www.isca-archive.org/interspeech_2026/leal26_interspeech.pdf
---

# Tarsila-ASR: A Multi-Domain Test Suite for Benchmarking Brazilian Portuguese Speech Recognition

*Sidney Leal, Ariadne Matos, Edresson Casanova, Frederico Gonçalves, Renato Moraes Silva, Arnaldo Cândido Jr, Sandra Aluísio*

[PDF](https://www.isca-archive.org/interspeech_2026/leal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/leal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-450)

**TL;DR** — Tarsila-ASR is a new 72-hour benchmark suite for spontaneous Brazilian Portuguese speech recognition that exposes severe degradation in off-the-shelf models, while fine-tuning on an aggregated 1,156-hour corpus achieves a new state-of-the-art WER of 15.40%.

## Key contributions

- Introduces Tarsila-ASR, a standardized 72.46-hour evaluation test suite spanning diverse accents, speaking styles, and acoustic conditions for Brazilian Portuguese spontaneous speech.
- Systematically benchmarks open-source zero-shot ASR architectures (Whisper-large-v3, Omnilingual-7B, MuPe-ASR) on spontaneous speech, uncovering major performance gaps.
- Constructs a unified 1,156-hour training corpus from public conversational data to adapt multiple model families, establishing new state-of-the-art transcription baselines.
- Releases all benchmark subsets, code scripts, hyperparameter settings, and model checkpoints on Hugging Face and GitHub.

## Problem

State-of-the-art Transformer-based ASR systems perform adequately on read speech but falter heavily under spontaneous conversational settings filled with disfluencies, fillers, hesitations, and truncations. For Brazilian Portuguese, existing resources have historically lacked standardized, diverse benchmarks covering regional accents across multiple states. Prior models like Wav2Vec 2.0 XLSR-53, Distil-Whisper, and standard Whisper fail to generalize across real-world variability because they are predominantly trained on clean or read datasets, making a unified test suite and targeted adaptation necessary.

## Method

The Tarsila-ASR benchmark was constructed by compiling test subsets from public Brazilian Portuguese corpora (including CORAA variants, Common Voice 17, MLS, MuPe Life Stories, NURC-SP, and TEDx), normalizing all audio to 16 kHz, and standardizing columns for text, duration, audio, source origin, and gender (estimated via voice-gender-classifier, resulting in 48% female and 52% male distribution across 62,094 samples).

To bridge the spontaneous speech performance gap, the authors fine-tuned several architectures on an aggregated training set of 1,156 hours (with 39 hours for validation): Distil-Whisper, Whisper (medium and large-v3), and Omnilingual-LLM (300M and 1B variants). Training runs utilized an NVIDIA H100 GPU with 80GB VRAM, scaling up to 750k steps for Distil-Whisper, 450k steps for Whisper-large-v3, and 15k steps for OmniASR-1B. Intermediate checkpoints frequently outperformed extended training runs due to overfitting, highlighting the necessity of validation-guided checkpoint selection.

Evaluation metrics went beyond traditional Word Error Rate (WER) and Character Error Rate (CER) to incorporate BERTScore for token-level contextual similarity, mDeBERTa-V3-base-backed SeMaScore for semantic preservation and hallucination sensitivity, and Real Time Factor (RTF) measured on both H100 and RTX 4070 hardware to quantify inference efficiency.

## Experimental setup

Evaluated on the 72.46-hour Tarsila-ASR test suite comprising 10 subsets (coraa-alip, coraa-coral, coraa-nurcrec, coraa-sp2010, coraa-tedx, cv17, mls, mupe, nurcsp, tedx). Compared against zero-shot baselines including MuPe-ASR, Whisper-large-v3, and Omnilingual-7B. Metrics include WER, CER, BERTScore, SeMaScore, and RTF.

## Results

Fine-tuned models substantially outperformed zero-shot variants, cutting mean WER from 33.03% (Whisper-large-v3 zero-shot) down to 15.40% for whisper-large3-ft-75k, which secured the best overall WER, CER (9.11%), and BERTScore (97.84%). For deployment efficiency, distil-whisper-ft-200k achieved a competitive WER of 16.52% while retaining a fast average RTF of 0.038. Omnilingual-LLM-1B-ft-9k achieved the highest SeMaScore (83.92), demonstrating strong semantic preservation despite minor lexical differences. Untuned large models like Whisper-large-v3 suffered high error rates on spontaneous subsets (e.g., 60.74% on coraa-alip and 45.19% on nurcsp), proving that zero-shot baselines struggle significantly without in-domain adaptation.

| System | WER (%) | CER (%) | BERTScore | SeMaScore | RTF Avg |
|---|---|---|---|---|---|
| Whisper-large-v3 (Zero-shot) | 32.40 | 24.57 | 94.73 | 71.48 | 0.163 |
| MuPe-ASR (Distil-Whisper) | 19.15 | 10.45 | 97.37 | 81.41 | 0.037 |
| omniASR-LLM-1B-ft-9k | 16.81 | 9.51 | 97.71 | 83.92 | 0.137 |
| distil-whisper-ft-200k | 16.52 | 9.22 | 97.69 | 83.36 | 0.038 |
| whisper-large3-ft-75k | 15.40 | 9.11 | 97.84 | 83.83 | 0.137 |

## Limitations

The benchmark is strictly scoped to Brazilian Portuguese, excluding European Portuguese due to major phonetic and lexical divergences. Transcript normalization inconsistencies remain a challenge across unified corpora, and fine-tuning exhibited vulnerability to overfitting on specific subsets when training steps exceeded optimal thresholds.

## Why read this

Speech and ML engineers building conversational AI or speech-to-speech systems for Brazilian Portuguese should read this to understand how spontaneous speech disfluencies degrade modern ASR models and how targeted fine-tuning bridges this gap.

## Code

- https://github.com/nilc-nlp/tarsila-asr

## Applications

Conversational AI, real-time speech-to-speech duplex models, automatic meeting summarization, voice chatbots, and call center customer service solutions.

## Related

- (link related pages by id as the wiki grows)
