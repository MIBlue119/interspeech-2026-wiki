---
id: anand26_interspeech
category: paralinguistics-emotion
labels: [self-supervised, dataset-or-benchmark-release]
institutions: ["Adobe Research", "University of Maryland, College Park", "OpenAI"]
code: https://nishitanand.github.io/paralinguistic-understanding-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3015
pdf: https://www.isca-archive.org/interspeech_2026/anand26_interspeech.pdf
---

# ParA-LLM: A Unified Approach to Paralinguistic and Acoustic Speech Understanding

*Nishit Anand, Jiaqi Su, Ke Chen, Yunyun Wang, Dinesh Manocha, Ramani Duraiswami, Rithesh Kumar, Zeyu Jin*

[PDF](https://www.isca-archive.org/interspeech_2026/anand26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/anand26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3015)

**Category:** `paralinguistics-emotion` · **Labels:** `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — ParA-LLM is an Audio LLM trained with a two-stage curriculum on 1.2M simulated and annotated QA pairs to master 22 paralinguistic and acoustic characteristics, outperforming GPT-4o-Audio by 7.5% overall on the newly introduced ParA-Bench.

## Key contributions

- Defined a structured taxonomy of 22 objective and subjective paralinguistic characteristics spanning 10 acoustic properties, 7 speaker-intrinsic traits, and 5 utterance-level speech attributes.
- Curated a large-scale dataset of over 1.2M Audio-QA pairs via an acoustic simulation engine (mixing RIRs and environmental noise) and LLM-assisted generation.
- Developed ParA-LLM via a two-stage curriculum (atomic single-attribute followed by multi-attribute joint reasoning).
- Introduced ParA-Bench, a 6,000 multiple-choice question benchmark covering speaker-speech, acoustic, and mixed evaluation categories.

## Problem

While contemporary Audio LLMs (such as Qwen2-Audio, Voxtral, and GPT-4o-Audio) excel at verbal semantic tasks like transcription, they largely fail to understand paralinguistic dimensions such as acoustic conditions, speaker traits, and expressive variations. Humans achieve 78% accuracy on paralinguistic benchmarks like ParA-Bench, whereas frontier models score only around 36%. Specialized models only classify isolated attributes and lack free-form compositional reasoning over multiple interacting characteristics simultaneously.

## Method

ParA-LLM is initialized from Qwen2-Audio-7B-Instruct and trained using LoRA (rank 128, alpha 256, dropout 0.1) applied to the audio encoder, multimodal projector, and LLM backbone. The training pipeline uses a two-stage curriculum: Stage 1 trains on 688K atomic single-attribute QA pairs (built from 306K unique samples) for 1 epoch at a learning rate of 5e-5, while Stage 2 continues on 513K multi-attribute QA pairs (from 217K samples) for 1 epoch at 4e-5.

The training data is synthesized by augmenting clean speech from EARS, Emilia, Expresso, and VoxCeleb with 15 reverb types (via MIT IR Survey and EchoThief RIRs), 21 noise types (via TAU and urban sound datasets), and post-production effects (clipping, compression, overdrive). Characteristics are mapped along objective signal metrics (e.g., DRR, RT60, SNR, STOI) and consistent natural-language labels for speaker timbre, accent, nasality, and emotion. Inference supports free-form, multi-attribute question answering over audio inputs.

## Experimental setup

Evaluated on ParA-Bench (6,000 multiple-choice questions across speaker-speech, acoustic, and mixed domains), MMAU-Pro Speech, and MMAR Speech. Compared against baselines including Qwen2-Audio, Voxtral-24B, Audio Flamingo 3, Mellow, R1-AQA, Qwen2.5-Omni (3B/7B), and GPT-4o-Audio. Training utilized 8 A100 GPUs with a global batch size of 128 using the AdamW optimizer and cosine learning rate scheduling.

## Results

ParA-LLM achieves an overall ParA-Bench accuracy of 43.53%, surpassing Voxtral (38.80%) by 4.73% and GPT-4o-Audio (36.03%) by 7.50%. It scores highest in speaker-speech (55.85%) and mixed categories (39.95%), though GPT-4o-Audio retains the lead in the purely acoustic category (41.85% vs ParA-LLM's 34.80%). On broader evaluation sets, the two-stage curriculum boosts MMAR Speech performance from 35.37% (baseline) to 42.86% (Stage 2).

| Model | Speaker-Speech | Acoustic | Mixed | Overall |
| --- | --- | --- | --- | --- |
| Qwen2 Audio | 34.80 | 23.45 | 25.90 | 28.05 |
| Voxtral | 51.95 | 29.20 | 35.25 | 38.80 |
| GPT-4o-Audio | 32.00 | 41.85 | 34.25 | 36.03 |
| ParA-LLM (Ours) | 55.85 | 34.80 | 39.95 | 43.53 |

## Limitations

The evaluation relies on synthetic simulation mixtures for acoustic conditions which may not fully capture every real-world acoustic anomaly. The benchmark and dataset distribution are currently English-centric or drawn from standard corpora, and model performance drops on pure acoustic-only attribute queries compared to proprietary frontier systems like GPT-4o-Audio.

## Why read this

Speech and ML engineers working on expressive speech synthesis, acoustic editing, or fine-grained audio reasoning should read this to understand how curriculum learning and structured taxonomies can systematically bridge the paralinguistic capability gap in Audio LLMs.

## Code

- https://nishitanand.github.io/paralinguistic-understanding-llm

## Applications

Scalable automatic metadata annotation for speech corpora, fine-grained attribute control for text-to-speech (TTS) systems, and acoustic space captioning for text-conditioned room impulse response generation (Text2IR).

## Institutions / 機構

Adobe Research, University of Maryland, College Park, OpenAI

## Related

- (link related pages by id as the wiki grows)
