---
id: yadav26b_interspeech
category: speech-llm-dialogue
labels: [streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2807
pdf: https://www.isca-archive.org/interspeech_2026/yadav26b_interspeech.pdf
---

# I''ll Keep an Ear Out: Teaching AudioLLMs Proactive Audio Assistance

*Amit Kumar Singh Yadav, Ritvik Shrivastava, Xuan Zhang, Seungwhan Moon, Shashank Jain, Pinar Donmez, Babak Damavandi*

[PDF](https://www.isca-archive.org/interspeech_2026/yadav26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yadav26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2807)

**Category:** `speech-llm-dialogue` · **Labels:** `streaming-real-time`

**TL;DR** — This paper introduces proactive audio assistance for AudioLLMs, enabling them to autonomously monitor audio streams and decide when to alert users based on a single natural-language intent. Using a new Interrupt and Silent Modeling (ISM) paradigm, the approach achieves 99.6% interrupt F1 on ESC-50 and robust zero-shot transfer to Epic-Sounds.

## Key contributions

- Formalizes proactive audio assistance for AudioLLMs through a four-state decision framework: onset interruption, sustained-relevance interruption, irrelevance silence, and history-aware de-duplication silence.
- Proposes Interrupt and Silent Modeling (ISM), a model-agnostic training paradigm that embeds proactive decisions directly into LLM decoding using two special tokens (<interrupt> and <silent>).
- Establishes proactive evaluation metrics and a streaming evaluation protocol for real-time assessment, achieving an average response latency of 3.5 seconds.
- Demonstrates near-perfect performance on ESC-50 (99.6% interrupt F1, 100% de-duplication recall) and robust zero-shot interrupt transfer on noisy Epic-Sounds kitchen data without architectural changes.

## Problem

Existing AudioLLMs operate purely reactively, requiring users to formulate an explicit query for every single acoustic event, which fails in continuous monitoring scenarios like assisting Deaf and Hard of Hearing (DHH) users. Conventional sound-monitoring classifiers track fixed classes without modeling interaction history or user intent, leading to notification fatigue from redundant alerts for ongoing sounds. Furthermore, proactive audio assistance requires temporal reasoning over streaming audio to causally detect onsets, distinguish first occurrences from continuations, handle noisy overlapping scenes, and suppress duplicates under real-time constraints.

## Method

The proposed Proactive Audio Large Language Model (PALLM) builds on Qwen2-Audio-7B, which pairs a Whisper-large-v3 audio encoder with a 7B-parameter language model. Audio is resampled to 16 kHz, converted to 128-dimensional mel-spectrograms (25 ms window, 10 ms hop), and passed through a stride-2 pooling layer to yield approximately 40 ms temporal resolution per token. User watch-out intents and conversation history are tokenized directly via Qwen2-Audio's text tokenizer without a separate text encoder. 

ISM extends the LLM vocabulary with two special tokens, <interrupt> and <silent>, casting proactive decisions into standard autoregressive decoding. Training proceeds in two stages: reactive supervised fine-tuning (SFT) for sound classification, followed by proactive SFT using LoRA (rank 8, alpha=32). Proactive SFT constructs training instances for four states: Type-1 Interrupt (I1, onset detection), Type-2 Interrupt (I2, sustained relevance without prior context), Type-1 Silent (S1, irrelevant audio suppression), and Type-2 Silent (S2, history-aware de-duplication). Silent instances are subsampled to balance total interrupt counts (NI = NS). 

During inference, the model maintains a rolling 5-second audio window and preserves conversation history to make token-by-token causal predictions. The key design choice of using special decoding tokens and LoRA makes ISM entirely model-agnostic, enabling direct transfer to other AudioLLMs like GAMA or MERaLiON without modifying their core architectures.

## Experimental setup

Experiments use ESC-50 (2,000 five-second clips across 50 classes) with standard 5-fold cross-validation, and Epic-Sounds (44 egocentric kitchen audio classes) for zero-shot evaluation. Baselines include Zero-Shot base Qwen2-Audio-7B and Reactive SFT (fine-tuned for classification only). Models are trained using AdamW (lr=5e-4, cosine schedule, 5% warmup, weight decay 0.1) for 10 epochs with an effective batch size of 384 across 6 NVIDIA H100 GPUs.

## Results

On ESC-50, PALLM with ISM achieves a headline interrupt F1 of 99.6%, with 99.4% interrupt precision, 99.7% silent precision, and 100.0% de-duplication recall (S2), massively outperforming Zero-Shot (74.1% F1, 0.2% S2 recall) and Reactive SFT (79.8% F1, 10.1% S2 recall). For reactive classification, PALLM matches specialized classifiers with 94.7% accuracy on ESC-50. 

On zero-shot Epic-Sounds transfer, PALLM achieves the highest interrupt F1 of 67.5 (vs. 66.9 Zero-Shot and 65.2 Reactive SFT), maintaining robust onset detection (96.7% RI1) without collapsing into over-triggering or over-suppression. Ablations show that adding Type-2 Interrupt (I2) training improves I2 recall by approximately 10 percentage points by providing supervision for windows containing entirely relevant audio without preceding context.

| System / Condition | Method | Interrupt Prec (PI) | Silent Prec (PS) | Interrupt F1 (FI) | Onset Recall (RI1) | Deduplicate Recall (RS2) |
|---|---|---|---|---|---|---|
| ESC-50 | Zero-Shot | 58.8 | 99.6 | 74.1 | 100.0 | 0.2 |
| ESC-50 | Reactive SFT | 67.2 | 90.1 | 79.8 | 98.1 | 10.1 |
| ESC-50 | PALLM (ISM) | 99.4 | 99.7 | 99.6 | 99.8 | 100.0 |
| Epic-Sounds | Zero-Shot | 50.8 | 69.7 | 66.9 | 98.3 | — |
| Epic-Sounds | Reactive SFT | 92.9 | 65.7 | 65.2 | 50.2 | — |
| Epic-Sounds | PALLM (ISM) | 51.9 | 71.9 | 67.5 | 96.7 | — |

## Limitations

The evaluation relies on clean clips (ESC-50) and zero-shot out-of-domain transfer (Epic-Sounds), where acoustic complexity leads to drops in sustained-relevance recall (I2 down to 41.2%) and silent recall for out-of-domain noise due to training data limitations rather than the ISM framework itself. De-duplication (S2) was not evaluated on Epic-Sounds because the dataset protocol lacks conversation history across samples. The streaming evaluation uses fixed-onset composite segments rather than fully randomized timing.

## Why read this

Researchers and engineers building conversational agents or assistive wearable tech will learn how to transform reactive AudioLLMs into autonomous, intent-aware monitors using a simple vocabulary extension and four-state training framework.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time wearable assistive devices for Deaf and Hard of Hearing (DHH) individuals, automated audio event monitors, and proactive smart-home notification systems.

## Institutions / 機構

Meta

## Related

- (link related pages by id as the wiki grows)
