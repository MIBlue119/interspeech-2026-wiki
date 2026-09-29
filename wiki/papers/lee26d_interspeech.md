---
id: lee26d_interspeech
category: audio-understanding
labels: [self-supervised]
institutions: ["Sogang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-639
pdf: https://www.isca-archive.org/interspeech_2026/lee26d_interspeech.pdf
---

# SAM: A Mamba-2 State-Space Audio-Language Model

*Taehan Lee, Jaehan Jung, Hyukjun Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-639)

**Category:** `audio-understanding` · **Labels:** `self-supervised`

**TL;DR** — SAM is an audio-language model built on a Mamba-2 state-space backbone that integrates an EAT audio encoder and a 2-layer MLP connector. The 2.7B parameter variant achieves 21.1 mAP on AudioSet and 17.6 SPICE on AudioCaps, matching or outperforming larger 7B transformer-based models.

## Key contributions

- Introduces SAM, demonstrating that Mamba-2 state-space backbones can match or surpass 7B transformer-based audio-language models using fewer parameters.
- Proves that joint audio-encoder finetuning is essential, showing via tau-effective rank analysis that smaller SSMs adapt by producing lower-rank, more similar token representations.
- Compares spatial/temporal audio token compression strategies, discovering that SSMs benefit more from compact, information-rich token sequences than from excessively long sequences despite linear-time scaling.
- Unlocks audio reasoning capabilities by incorporating OpenReasonAQA (structured binary and multiple-choice question supervision), boosting MMAU-Sound accuracy from 22.8 to 56.77.

## Problem

Prior audio-language models rely heavily on Transformer-based language backbones, which suffer from quadratic computational scaling with sequence length due to the attention mechanism. While State Space Models (SSMs) like Mamba have emerged as efficient linear-time alternatives, applying them directly to multimodal audio understanding remains under-explored, with prior attempts like ssLALM using older Mamba-1 architectures and standard training pipelines. This paper addresses the gap by systematically investigating how SSM states interact with continuous audio encoder outputs, how sequence length and token compression affect state capacity, and how instruction-following data composition unlocks audio reasoning.

## Method

SAM comprises an EAT-base audio encoder (88M parameters, 12 ViT blocks, 512 output tokens of dim 768), a text encoder, a two-layer MLP connector, and a Mamba-2 LLM backbone available in 130M, 780M, and 2.7B scales. The multimodal connector evaluates three designs: (a) concatenation, reshaping 512 tokens into a 64x8 time-frequency grid along the frequency axis to yield 64 tokens with 6144-dim embeddings; (b) time-major; and (c) frequency-major, incorporating separator tokens ("&&") to mark time/frequency boundaries. 

Models are trained using an auto-regressive next-token cross-entropy loss over ground-truth caption embeddings. Training follows a 4-stage curriculum on OpenAQA (1.9M closed-ended and 3.7M open-ended QA pairs), utilizing LoRA adapters applied to the in_proj and out_proj layers of each Mamba-2 block with rank r=8 or r=256 and alpha = 2r. FlashAttention-2 accelerates EAT self-attention layers, and training uses bfloat16 mixed precision on two NVIDIA RTX 4090 GPUs for 0.5 to 2 days.

## Experimental setup

Evaluated on zero-shot classification tasks (ESC-50, DCASE2017 Task 4, VocalSound, TUT-2017, Beijing Opera, VGGSound, FSD-50K) using CLAP text encoder cosine similarity, and audio captioning tasks (AudioCaps, Clotho) measuring SPICE with greedy decoding. Compared against LTU-7B, GAMA-7B, ssLALM-2.8B, and Gemma 3n models. Implemented in bfloat16 using Mamba-2 backbones (130M, 780M, 2.7B) pretrained on the Pile.

## Results

SAM-2.7B with r=256 LoRA achieves 21.1 mAP on AudioSet and 17.6 SPICE on AudioCaps, outperforming LTU-7B (18.7 SPICE) and GAMA-7B (19.2 mAP). On ESC-50, SAM-2.7B reaches 89.7% accuracy, surpassing ssLALM-2.8B (86.8%). In reasoning evaluations using the OpenReasonAQA dataset (SAM+OR-2.7B), MMAU-Sound accuracy jumps from 22.83 to 56.77, outperforming the Gemma 3n-4B baseline (50.27). 

Ablations demonstrate that uncompressed audio tokens (setups b and c) do not consistently outperform compressed representations (setup a), as longer sequences burden the recurrent state updates and exhibit lower tau-effective rank. Furthermore, freezing the audio encoder or using size-mismatched encoders degrades downstream performance, confirming that audio representations co-adapt to the SSM's specific integration capacity.

| System / Condition | ESC-50 (Acc) | DCASE (Mi-F1) | AudioSet (mAP) | AudioCaps (SPICE) |
|---|---|---|---|---|
| LTU-7B | 83.1 | 45.9 | 46.3 | 18.7 |
| GAMA-7B | 82.6 | 38.4 | 47.8 | 19.2 |
| ssLALM-2.8B | 86.8 | 47.9 | 47.7 | 19.4 |
| SAM-130M (r=256) | 83.3 | 47.3 | 46.7 | 19.9 |
| SAM-780M (r=256) | 87.7 | 47.7 | 48.8 | 21.1 |
| SAM-2.7B (r=256) | 89.7 | 48.7 | 49.2 | 21.1 |

## Limitations

The evaluation relies heavily on synthetic or curated instruction-following subsets (OpenReasonAQA) and standard benchmark tasks, which may not capture complex multi-speaker or noisy real-world acoustic scenarios. The exploration of uncompressed audio tokens indicates that Mamba-2's linear sequence length scaling cannot be trivially exploited without architectural modifications to handle recurrent state bottlenecks. Compute scale is limited to two RTX 4090 GPUs, restricting exploration beyond 2.7B parameters, and language coverage is constrained primarily to English benchmarks.

## Why read this

Researchers and engineers building efficient audio-language models should read this to understand how Mamba-2 backbones interact with continuous audio representations and why naive sequence-length scaling fails without proper token compression and joint encoder finetuning.

## Code

- https://github.com/sam-audio-language-model/sam

## Applications

Automated audio captioning, sound event detection, acoustic scene classification, and multimodal audio-language conversational assistants.

## Institutions / 機構

Sogang University

## Related

- (link related pages by id as the wiki grows)
