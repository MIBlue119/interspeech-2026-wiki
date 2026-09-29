---
id: xie26b_interspeech
category: tts
labels: [efficient-on-device, streaming-real-time, generative-model]
institutions: ["Northwestern Polytechnical University", "Huawei Technologies"]
code: https://github.com/ASLP-lab/FlashTTS
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1692
pdf: https://www.isca-archive.org/interspeech_2026/xie26b_interspeech.pdf
---

# FlashTTS: Fast Streaming TTS with MTP Acceleration and X-pred Mean Flow Distillation

*Hanke Xie, Xiaming Ren, Dake Guo, Ruonan You, Wenhao Li, Jingbin Hu, Guobin Ma, Huakang Chen, Kejie Xu, Rui Huang, Weiguo Tan, Xianrong Wang, Lei Xie*

[PDF](https://www.isca-archive.org/interspeech_2026/xie26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xie26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1692)

**Category:** `tts` · **Labels:** `efficient-on-device`, `streaming-real-time`, `generative-model`

**TL;DR** — FlashTTS is a fast, low-latency streaming text-to-speech framework built on Qwen2.5-0.5B that eliminates sentence-level buffering using a lagged multi-track architecture and accelerates generation to 2 neural function evaluations (2-NFE) via parallel Multi-Token Prediction (MTP) and X-pred mean flow distillation, achieving a First-Packet Latency of 325ms.

## Key contributions

- A lagged multi-track input sequence scheme (speech, text, language tracks) that natively handles streaming text and speech inputs without requiring sentence-level buffering.
- Integration of parallel Multi-Token Prediction (MTP) modules (using Qwen2.5-style decoder layers) atop a frozen language model backbone to accelerate token throughput.
- An X-pred mean flow matching decoder with block-wise chunked attention that achieves high-fidelity token-to-mel generation in exactly 2 inference steps (2-NFE).
- Comprehensive empirical validation showing reduction of First-Packet Latency to 325ms while maintaining robust zero-shot voice cloning and multilingual intelligibility.

## Problem

Modern speech dialogue systems require text-to-speech models with ultra-low latency and native streaming inputs and outputs. Existing single-codebook LLM-based TTS methods rely on multi-stage pipelines lacking native streaming capabilities, suffering from high end-to-end latency due to slow autoregressive prediction and multi-step flow matching (such as CosyVoice2 requiring 10+ NFE steps). Prior interleaved generation strategies still require sentence-level text buffering or chunking, failing to address the fundamental autoregressive bottleneck that prevents real-time conversational responsiveness.

## Method

FlashTTS is structured around a two-stage training paradigm using Qwen2.5-0.5B (896 hidden size, 24 layers, 14 attention heads, 4864 FFN dim) as the backbone. Stage 1 trains the core generation pathway on parallel input tracks: a speech track initialized with speaker embeddings, a text track ingesting text tokens with padding tokens for alignment, and a continuous language track supplying language conditioning. This bypasses sentence buffering.

Stage 2 incorporates parallel Multi-Token Prediction (MTP) modules (N=3 or N=5) to predict multiple future tokens simultaneously. Each MTP module consists of a linear projection layer followed by a Qwen2.5-style decoder layer while keeping the backbone frozen. A verification operation using backbone probability distributions filters speculative tokens. For acoustic decoding, an X-pred Mean Flow model (a 16-layer Diffusion Transformer with 768 hidden dimension, 159.25M parameters) predicts clean mel-spectrograms directly, paired with a 50M-parameter HiFi-GAN 24kHz vocoder. A block-wise chunked attention mechanism supports real-time streaming output, and the system uses a distillation objective minimizing velocity discrepancies to enable high-fidelity synthesis in 2-NFE.

The training pipeline uses dynamic frame-based batch sizing (40,000 frames) on 8 A100 GPUs with AdamW (peak LR 1e-4, 20k warmup, cosine decay over 1M steps). Stage 2 trains MTP on 4 A100 GPUs (LR 5e-5) and distills the Mean Flow model on 8 RTX 4090 GPUs (batch size 2000, gradient accumulation 2, LR 7e-5).

## Experimental setup

Trained on approximately 300,000 hours of open-source speech data including Emilia, Emilia-Yodas, LibriHeavy, and WenetSpeech4TTS. Evaluated on the Seed-TTS and MiniMax multilingual test sets (mandarin, English, Japanese, Korean, French, German). Compared against baselines including CosyVoice2 (0.5B), Seed-TTS, MaskGCT, F5-TTS, Llasa-8B, and Spark-TTS. Metrics include Word/Character Error Rate (WER/CER evaluated via Paraformer-zh and Whisper-large-v3), Speaker Similarity (SIM via WavLM-large cosine distance), Comparative Mean Opinion Score (CMOS), Real-Time Factor (RTF), Tokens Per Second (TPS), First-Token Latency (FTL), and First-Packet Latency (FPL).

## Results

FlashTTS with MTP-3 (2-NFE) reduces First-Packet Latency (FPL) to 325ms and First-Token Latency (FTL) to 62ms on the MiniMax streaming test set, compared to 843ms FPL and 257ms FTL for CosyVoice2 (10-NFE). It achieves an RTF of 0.632 and a token throughput of 73 TPS. In objective multilingual evaluations, FlashTTS attains a Chinese WER of 1.08 and English WER of 3.02, competitive with or outperforming open-source counterparts.

Ablations demonstrate that removing X-pred or MTP severely drops the speed-up ratio from ~49% down to ~12.5%. Dropping the language identification conditioning module sharply increases WER from ~2.17 to 3.42. Aggressively scaling MTP to 5 branches yields diminishing speed returns and negative subjective CMOS scores, confirming MTP-3 with 2-NFE as the optimal operational tradeoff.

| Model Configuration | TPS ↑ | FTL (ms) ↓ | FPL (ms) ↓ | RTF ↓ | WER ↓ | SIM ↑ |
|---|---|---|---|---|---|---|
| CosyVoice2 (10-NFE) | 51 | 257 | 843 | 0.913 | 26.2 | 0.721 |
| FlashTTS Stage 1 (2-NFE) | 50 | 60 | 377 | 0.793 | 18.0 | 0.702 |
| FlashTTS MTP-3 (2-NFE) | 73 | 62 | 325 | 0.632 | 18.8 | 0.695 |
| FlashTTS MTP-3 (3-NFE) | 72 | 62 | 366 | 0.702 | 17.5 | 0.714 |
| FlashTTS MTP-5 (2-NFE) | 75 | 62 | 328 | 0.621 | 20.8 | 0.668 |

## Limitations

Speaker similarity (SIM) scores moderately trail heavily parameterized offline models like Seed-TTS, reflecting a trade-off between acoustic variance and ultra-low latency generation. The evaluation is primarily focused on six languages, and scaling MTP beyond 3 branches introduces instability and acoustic degradation. Additionally, speculative decoding and verification loops require careful tuning to prevent token collision during streaming execution.

## Why read this

Speech and ML engineers building real-time conversational dialogue systems should read this paper to learn how to combine lagged multi-track streaming, parallel multi-token prediction, and 2-NFE mean flow distillation to collapse end-to-end speech synthesis latency below 350ms.

## Code

- https://github.com/ASLP-lab/FlashTTS

## Applications

Real-time conversational speech agents, interactive voice response (IVR) systems, low-latency multilingual voice bots, and real-time speech-to-speech translation pipelines.

## Institutions / 機構

Northwestern Polytechnical University, Huawei Technologies

## Related

- (link related pages by id as the wiki grows)
