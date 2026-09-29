---
id: zhang26ea_interspeech
category: paralinguistics-emotion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2364
pdf: https://www.isca-archive.org/interspeech_2026/zhang26ea_interspeech.pdf
---

# AcoustEmo: An Utterance-Aware Acoustic Q-Former for Open-Vocabulary Emotion Reasoning

*Liyun Zhang, Xuanmeng Sha, Shuqiong Wu, Fengkai Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26ea_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26ea_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2364)

**Category:** `paralinguistics-emotion`

**TL;DR** — AcoustEmo is a time-sensitive multimodal large language model that replaces global audio pooling with an utterance-aware acoustic Q-Former to capture local micro-prosody and temporal dynamics, achieving an average score of 67.55% on the EMER-Fine emotion reasoning benchmark.

## Key contributions

- Proposes a Utterance-Aware Acoustic Q-Former that extracts segment-level acoustic tokens via a timestamp-synchronized sliding window to capture local temporal dynamics and transient cues.
- Introduces a timestamp-synchronized acoustic sliding window mechanism mapping transcription time boundaries directly to discrete frame indices for dialogue context alignment.
- Employs a multi-scale fusion strategy combining local utterance-aware acoustic tokens with a parallel global acoustic token to preserve background context.
- Demonstrates state-of-the-art open-vocabulary emotion reasoning performance on the EMER-Fine dataset, outperforming previous audio-centric, video-centric, and emotion-specific baselines.

## Problem

Traditional Multimodal Large Language Models (such as Qwen-Audio, SALMONN, and Video-LLaMA) compress entire audio tracks into coarse global sequence tokens using global audio encoders. This global aggregation washes out fine-grained, transient acoustic signals like micro-prosody, sudden intonation shifts, breathing, and voice tremors that occur within specific utterances. Neglecting these local temporal dynamics limits the ability of MLLMs to perform nuanced, open-vocabulary emotion reasoning in complex conversational settings.

## Method

AcoustEmo processes visual, audio, and timestamped textual streams simultaneously. The visual modality utilizes a pre-trained Vision Transformer and Image Q-Former to extract visual tokens TV. For the acoustic branch, raw audio is encoded via a pre-trained encoder (ImageBind) into a frame-level sequence FA in R^(Lxf). A timestamp-synchronized sliding window maps utterance start and end times to discrete feature sequence indices, extracting local segments F_A^i. A set of learnable query tokens Q in R^(Kxd_model) (where K=32, d_model=768) interacts with each local segment through cross-attention in an Utterance-Aware Acoustic Q-Former, distilling 32 query tokens per utterance. Simultaneously, a parallel global Q-Former processes the entire audio feature FA to yield a global token T_A^global. The multi-scale acoustic tokens TA = [T_A^global; T_A^1; ...; T_A^N] along with visual tokens and instruction-aware prompt tokens T_Lq are concatenated and fed into a LLaMA-2 (7B) base language model.

The model is trained using standard causal language modeling loss via Low-Rank Adaptation (LoRA, r=32, alpha=32), freezing the backbone visual and acoustic encoders. Optimization is performed using AdamW with a base learning rate of 2e-5 (beta_1=0.9, beta_2=0.999, weight decay=0.05), a linear warmup for 5% of steps, and a cosine decay schedule. Training runs for 3 epochs on a single NVIDIA GPU with a maximum sequence length of 1024 tokens.

## Experimental setup

Evaluated on the test set of the Explainable Multimodal Emotion Recognition (EMER-Fine) benchmark, using Accuracy_S and Recall_S metrics based on semantic similarity of generated open-vocabulary labels to ground truth. Compared against audio-centric LLMs (Qwen-Audio, OneLLM, SECap, SALMONN), video-centric MLLMs (Otter, VideoChat, Video-LLaMA, Video-LLaVA, VideoChat2, LLaMA-VID, mPLUG-Owl, Video-ChatGPT, Chat-UniVi), and emotion-specific pipelines (AffectGPT, MicroEmo). Built on LLaMA-2 (7B) and trained for 3 epochs using a single NVIDIA GPU.

## Results

AcoustEmo achieves an overall average score of 67.55% on the EMER-Fine test set, outperforming the previous state-of-the-art emotion pipeline MicroEmo (66.21%) and AffectGPT (61.75%). Specifically, it obtains an Accuracy_S of 65.40% and a Recall_S of 70.15%, beating MicroEmo's Accuracy_S of 63.82% and Recall_S of 68.59%. 

Ablation studies confirm the necessity of each component: removing the Utterance-Aware Acoustic Q-Former drops the average score drastically to 61.20%, replacing the timestamp synchronization with a naive 2-second fixed-length sliding window reduces performance to 62.85%, and removing the parallel Global Acoustic Q-Former results in 64.10%. The model exhibits limitations when handling sarcastic utterances where acoustic tones contradict text semantics, or in low-SNR environments with heavy background noise overlapping speech boundaries.

| System / Condition | Avg | Acc_S | Rec_S |
|---|---|---|---|
| Qwen-Audio | 38.66 | 46.97 | 30.35 |
| SALMONN | 51.28 | 54.17 | 48.38 |
| AffectGPT | 61.75 | 62.03 | 61.46 |
| MicroEmo | 66.21 | 63.82 | 68.59 |
| AcoustEmo (Full) | 67.55 | 65.40 | 70.15 |
| EMER (Multi) [Oracle] | 79.31 | 80.91 | 77.70 |

## Limitations

The model struggles with sarcastic speech where acoustic tone and linguistic text directly contradict, sometimes getting misled by text when micro-prosodic cues are extremely subtle. Overlapping background noise in low-SNR dialogue scenarios introduces noisy tokens into the Q-Former segments and degrades performance. Evaluation is currently constrained to the EMER-Fine benchmark dataset.

## Why read this

Speech and ML researchers focusing on multimodal emotion recognition or affective computing will learn how to inject fine-grained paralinguistic and temporal dynamics into LLMs via timestamp-synchronized Q-Formers without requiring full-scale acoustic retraining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Empathetic conversational agents, mental health monitoring systems, and advanced human-computer interaction platforms requiring nuanced emotion perception.

## Institutions / 機構

University of Tokyo, University of Osaka

**Funding / 經費:** Japan Society for the Promotion of Science

## Related

- (link related pages by id as the wiki grows)
