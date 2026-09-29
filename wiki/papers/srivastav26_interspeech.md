---
id: srivastav26_interspeech
category: resources-evaluation
labels: [multilingual, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1902
pdf: https://www.isca-archive.org/interspeech_2026/srivastav26_interspeech.pdf
---

# Open ASR Leaderboard: Towards Reproducible and Transparent Multilingual and Long-Form Speech Recognition Evaluation

*Vaibhav Srivastav, Steven Zheng, Eric Bezzam, Eustache Le Bihan, Nithin Rao Koluguri, Piotr Żelasko, Somshubra Majumdar, Adel Moumen, Sanchit Gandhi*

[PDF](https://www.isca-archive.org/interspeech_2026/srivastav26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/srivastav26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1902)

**Category:** `resources-evaluation` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — The Open ASR Leaderboard is a comprehensive, reproducible benchmarking platform comparing 85+ open-source and proprietary speech recognition systems across 11 datasets for English short-form, multilingual, and long-form audio. It establishes standardized word error rate (WER) and inverse real-time factor (RTFx) metrics, revealing that Conformer-encoders paired with LLM-decoders achieve top accuracy while CTC and TDT decoders dominate inference speed.

## Key contributions

- An interactive, community-driven leaderboard standardizing evaluations across 86 models from 26 organizations using 11 diverse datasets.
- Unified evaluation pipelines integrating multiple open-source toolkits (ESPNet, NeMo, SpeechBrain, Transformers), custom model repos, and 7 commercial APIs.
- Dedicated evaluation tracks spanning short-form English, long-form transcription, and multilingual tasks (German, French, Italian, Spanish, Portuguese).
- Open-source evaluation scripts, dataset loaders, and standardized text normalization pipelines ensuring fully reproducible accuracy and throughput comparisons.

## Problem

Automatic speech recognition (ASR) research suffers from fragmented evaluation protocols, inconsistent text normalization, and an over-reliance on English short-form benchmarks. Developers face severe challenges in choosing appropriate baselines or determining whether models meet specific latency and domain requirements. Furthermore, prior evaluations fail to systematically account for architectural divergences like chunking strategies, context windows, and disfluency handling across disparate open-source and proprietary systems.

## Method

The benchmarking platform organizes models into distinct architectural categories based on their encoder and decoder combinations. Encoders span Conformer variants (e.g., FastConformer), native Whisper encoders, self-supervised representations (wav2vec2, HuBERT, data2vec), and custom configurations, while decoders range from standard Transformers and CTC to RNN-T, Token-and-Duration Transducers (TDT), and auto-regressive Large Language Models (LLMs). 

To ensure fair comparisons across systems that natively output varying levels of punctuation, casing, and disfluencies, the evaluation workflow forces a rigorous text normalization pipeline. This pipeline strips casing and punctuation, converts written-form numbers to digits, applies spelling standardization, and systematically removes filler words following Whisper's normalization conventions.

Inference efficiency is evaluated via inverse real-time factor (RTFx), calculated on standardized hardware (NVIDIA A100-SXM4-80GB GPU with CUDA 12.6) using batch sizes tuned for peak throughput. The decoupling of accuracy (WER) and computational efficiency (RTFx) highlights trade-offs between autoregressive LLM decoders (high accuracy, lower throughput) and non-autoregressive or hybrid connectionist decoders like TDT and CTC (exceptionally high throughput suitable for long-form pipelines).

## Experimental setup

Evaluations span 11 datasets totaling hundreds of hours of audio, including AMI, CoVoST-2, CORAAL, Earnings21/22, FLEURS, GigaSpeech, LibriSpeech (clean/other), MLS, SPGISpeech, and VoxPopuli. Models are compared against established open-source architectures (Whisper variants, NVIDIA Parakeet/Canary, Meta Omnilingual ASR, Distil-Whisper) and commercial APIs (AssemblyAI, ElevenLabs, Google, Speechmatics, Zoom). Performance is measured via Word Error Rate (WER) and Inverse Real-Time Factor (RTFx) on an NVIDIA A100-SXM4-80GB GPU.

## Results

On short-form English transcription, top average WERs are achieved by Conformer-based encoders with LLM decoders (e.g., Cohere Labs Transcribe at 5.84% WER, RTFx 525; IBM Granite Speech 4.0 1B at 5.87% WER, RTFx 280). In contrast, speed-optimized TDT and CTC models sacrifice some accuracy for massive throughput: NVIDIA Parakeet TDT 0.6B v2 achieves 6.44% WER with an RTFx of 3,386, while FastConformer CTC Large hits an RTFx of 6,399 at 9.57% WER. Fine-tuning Whisper encoders consistently outperforms vanilla Whisper Large v3 (e.g., Nyra Health CrisperWhisper at 7.17% WER vs Whisper Large v3 at 7.95%).

On long-form audio, closed-source systems lead the pack (ElevenLabs Scribe v2 at 9.05% WER), while open alternatives like Cohere Labs Transcribe reach 12.2% WER (418 RTFx) and NVIDIA Parakeet TDT 0.6B v3 reach 13.4% WER (1,000 RTFx). Multilingual benchmarks (DE, FR, IT, ES, PT) show ElevenLabs Scribe v2 leading at 2.67% average WER, with Mistral Voxtral Small 24B leading open models at 3.70% WER (42.0 RTFx). Broader language support generally correlates with a slight drop in English accuracy within model families.

| System | Open | Avg. WER (%) ↓ | RTFx ↑ | Size (B) | Encoder | Decoder |
|---|---|---|---|---|---|---|
| Cohere Labs Transcribe | Yes | 5.84 | 525 | 2.0 | FastConformer | Transformer |
| IBM Granite Speech 4.0 1B | Yes | 5.87 | 280 | 2.0 | Conformer | LLM |
| NVIDIA Parakeet TDT 0.6B v2 | Yes | 6.44 | 3386 | 0.6 | FastConformer | TDT |
| Whisper Large v3 | Yes | 7.95 | 146 | 2.0 | Whisper | Whisper |
| Meta Omnilingual ASR LLM 7B v2 | Yes | 8.71 | 66.0 | 7.8 | wav2vec2 | Transformer |
| FastConformer CTC Large | Yes | 9.57 | 6399 | 0.115 | FastConformer | CTC |

## Limitations

Absolute RTFx metrics are hardware-dependent and bound to the specific A100 setup utilized, though relative speed trends hold. While test-set contamination is mitigated by using diverse evaluation sets and non-commercial license holds (e.g., SPGISpeech, CORAAL), absolute prevention remains impossible. Furthermore, aggressive text normalization hides model capabilities regarding punctuation and disfluency preservation, and multilingual evaluations are currently restricted to five languages.

## Why read this

Speech engineers and researchers building or deploying ASR systems should read this to navigate the crowded landscape of open and closed models, grounding architectural selections in rigorous, standardized accuracy-efficiency trade-offs.

## Code

- https://github.com/huggingface/open_asr_leaderboard

## Applications

Production deployment of real-time or batch automatic speech recognition systems, meeting transcription, financial earnings call indexing, and multilingual translation pipelines.

## Institutions / 機構

Hugging Face, NVIDIA, University of Cambridge, Mistral AI, OpenAI

## Related

- (link related pages by id as the wiki grows)
