---
id: wen26b_interspeech
category: resources-evaluation
labels: [low-resource, dataset-or-benchmark-release]
institutions: ["South China Normal University", "Columbia University", "Sun Yat-sen University", "Guangzhou College of Commerce", "LMU Munich", "Munich Center for Machine Learning"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-289
pdf: https://www.isca-archive.org/interspeech_2026/wen26b_interspeech.pdf
---

# YUE-PUB-Speech: A Speech-based Pragmatic Understanding Benchmark for Cantonese

*Yajie Wen, Ziwei Gong, Chengyan Wu, Xiyun Gong, Yun Xue, Julia Hirschberg, Bolei Ma*

[PDF](https://www.isca-archive.org/interspeech_2026/wen26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wen26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-289)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `dataset-or-benchmark-release`

**TL;DR** — YUE-PUB-Speech is the first multimodal pragmatic speech dataset for Cantonese, containing 10.87 hours of paired text-audio across 1,680 dialogue instances. Experiments show that incorporating speech signals significantly boosts pragmatic reasoning accuracy, with openSMILE feature concatenation achieving a peak 77.62% average accuracy.

## Key contributions

- Introduces YUE-PUB-Speech, the first multimodal pragmatic dataset for Cantonese, bridging the gap between text-only pragmatics and spoken language processing.
- Translates and standardizes 1,680 dialogue instances from established English pragmatic benchmarks (PUB) into native Cantonese across 14 tasks and 3 core phenomena (implicature, presupposition, reference).
- Establishes comprehensive unimodal, feature-concatenation, and end-to-end audio-language model baselines using 5-fold cross-validation.
- Demonstrates that lightweight feature concatenation using handcrafted openSMILE acoustic features outperforms larger zero-shot audio-language models on implicature tasks.

## Problem

Most existing pragmatic benchmarks (such as PUB) are strictly text-only, leading to 'lexical dominance' where models rely solely on transcribed semantics while ignoring acoustic cues like intonation, stress, and timing that carry crucial speaker intent. Meanwhile, speech datasets focus primarily on low-level paralinguistics (emotion, prosody) rather than higher-order pragmatic inferences like conversational implicature, presuppositions, and reference resolution. This gap is especially critical in low-resource, culturally embedded languages like Cantonese, where lack of paired data hinders reliable prosody-pragmatics mapping and makes transfer from high-resource languages ineffective.

## Method

The dataset construction follows a three-stage pipeline: text data collection from existing PUB sources (CIRCA, GRICE, FigQA, FLUTE, IMPPRES), automated translation into Cantonese via Gemini followed by rigorous dual-stage human verification using native speakers and the Modern Cantonese Dictionary, and controlled audio recording in a sound-absorbing booth by 4 native speakers (2 male, 2 female) using professional microphones. The dataset organizes instances into a unified multiple-choice question-answering format across 14 tasks spanning implicature, presupposition, and reference.

Baseline experiments investigate three distinct paradigms: (1) Unimodal inference (zero-shot text, zero-shot Qwen2.5-Omni speech-only, and Qwen2.5-7B-Instruct fine-tuned with LoRA); (2) Text-audio feature concatenation, where acoustic representations from encoders like Whisper-small, wav2vec, HuBERT-chinese, and openSMILE are concatenated with text inputs and fine-tuned on Qwen2.5-7B-Instruct using 5-fold cross-validation; and (3) End-to-end zero-shot audio-language models (WavLLM, SALMONN, Qwen2.5-Omni, and Gemini-2.5-Pro). Training configurations utilized LoRA (rank 8, alpha 16, dropout 0.05) on 2 NVIDIA A6000 GPUs, evaluated using accuracy.

## Experimental setup

Evaluated on the YUE-PUB-Speech dataset comprising 1,680 dialogues (10.87 hours, 130,961 words). Evaluates baselines including Qwen2.5-7B-Instruct, Qwen2.5-Omni, SALMONN, WavLLM, Gemini-2.5-Pro, and speech encoders (openSMILE eGeMAPSv02, Whisper-small, wav2vec, HuBERT-based, HuBERT-Chinese). Metrics reported are accuracy across Implicature, Presupposition, and Reference tasks under 5-fold cross-validation.

## Results

Supervised fine-tuning (SFT) significantly improves text-only performance, raising Implicature accuracy from 55.64% (zero-shot) to 65.79%. Among feature concatenation methods using Qwen2.5-7B, openSMILE achieves the highest overall average accuracy of 77.62% (surpassing HuBERT-Chinese at 70.06% and wav2vec at 69.82%), and peaks at 80.33% on Implicature tasks, outperforming generalist audio-language models like Gemini-2.5-Pro (75.42% average). For reasoning-intensive categories like Reference, Gemini-2.5-Pro leads with 82.50% accuracy. Presupposition consistently proves to be the most challenging category across all models, with audio-only zero-shot scoring a low 37.50% and text SFT achieving 56.42%.

| System / Condition | Implicature | Presupposition | Reference | Average |
|---|---|---|---|---|
| Audio zero-shot (Qwen2.5-Omni) | 50.83 | 37.50 | 58.75 | 50.06 |
| Text zero-shot | 55.64 | 52.42 | 60.50 | 56.19 |
| Text SFT (Qwen2.5-7B) | 65.79 | 56.42 | 61.50 | 61.24 |
| Text + openSMILE Concat | 80.33 | 66.67 | 75.00 | 77.62 |
| Qwen2.5-omni (Zero-shot ALM) | 70.58 | 59.17 | 67.92 | 68.57 |
| Gemini-2.5-Pro (Zero-shot ALM) | 74.33 | 73.75 | 82.50 | 75.42 |

## Limitations

The dataset is currently limited to 1,680 instances (10.87 hours) recorded by only 4 speakers, which may restrict speaker diversity and stylistic variation. The evaluation relies primarily on relatively simple feature concatenation baselines and does not explore complex native multimodal fusion architectures. Scope is strictly bounded to Cantonese, leaving multilingual generalization untested.

## Why read this

Speech and ML researchers building spoken language understanding or audio-language models should read this to see how structured acoustic cues improve pragmatic reasoning in low-resource settings, and why lightweight handcrafted acoustic features (openSMILE) can outperform massive end-to-end ALMs on nuanced conversational tasks.

## Code

- https://huggingface.co/datasets/Multilingual-NLP/YUE-PUB-Speech

## Applications

Improving spoken dialogue systems, smart assistants, and interactive voice response (IVR) agents in low-resource languages by enabling accurate detection of speaker intent, implicature, and sarcasm from speech.

## Institutions / 機構

South China Normal University, Columbia University, Sun Yat-sen University, Guangzhou College of Commerce, LMU Munich, Munich Center for Machine Learning

**Funding / 經費:** National Science Foundation, Guangdong Basic and Applied Basic Research Foundation, National Natural Science Foundation of China, Characteristic Innovation Projects of Guangdong Colleges and Universities, Guangdong Provincial Key Laboratory

## Related

- (link related pages by id as the wiki grows)
