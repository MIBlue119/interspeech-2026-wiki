---
id: hu26b_interspeech
category: speech-coding
labels: [self-supervised, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-494
pdf: https://www.isca-archive.org/interspeech_2026/hu26b_interspeech.pdf
---

# OmniCodec: Low Frame Rate Universal Audio Codec with Semantic–Acoustic Disentanglement

*Jingbin Hu, Haoyu Zhang, Dake Guo, Qirui Zhan, Wenhao Li, Huakang Chen, Guobin Ma, Hanke Xie, Chengyou Wang, Pengyuan Xie, Chuan Xie, Qiang Zhang, Lei Xie*

[PDF](https://www.isca-archive.org/interspeech_2026/hu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-494)

**Category:** `speech-coding` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — OmniCodec is a universal neural audio codec operating at low frame rates (12.5 Hz / 6.25 Hz) that achieves semantic-acoustic disentanglement across speech, music, and general sound by leveraging a pre-trained understanding model's audio encoder and a self-guidance training strategy.

## Key contributions

- Replaces unsupervised models (e.g., WavLM) with the supervised Qwen3-Omni-AuT-Encoder to provide robust, cross-domain semantic representations for the codec's semantic branch.
- Proposes a hierarchical multi-codebook design with explicit semantic-acoustic decoupling via adapter layers (subtracting quantified semantic hidden features from acoustic latents and recombining them).
- Introduces a self-guidance loss to handle quantization error by forcing the decoder to produce consistent outputs for both continuous pre-quantized latents and discrete tokens, boosting codebook utilization.
- Achieves pure causality and low frame rates (12.5 Hz and 6.25 Hz), supporting fully streaming and real-time fast inference across speech, music, and general sound domains.

## Problem

Existing neural audio codecs prioritize high-fidelity reconstruction at extreme frame rates and bitrates, leading to multi-codebook structures that lack structural semantic alignment and are poorly suited for Large Language Model (LLM) generation tasks. Conversely, single-codebook or semantic-distilled codecs often struggle with low-frame-rate reconstruction quality across diverse, multi-domain audio (speech, music, and general sound). Prior attempts either lack unified cross-domain handling, rely on high frame rates incompatible with LLM scaling, or fail to decouple semantic properties from fine acoustic details.

## Method

OmniCodec features a dual-branch architecture consisting of a semantic branch and an acoustic branch. The acoustic encoder and decoder use SEANet with streaming convolutions, combined with a causal Transformer operating with a purely causal receptive field. The semantic branch processes audio via the pre-trained Qwen3-Omni-AuT-Encoder (which compresses 16 kHz audio down to 12.5 Hz), using vector quantization (VQ) with an exponential moving average (EMA) codebook update, followed by an adapter linear layer. The acoustic branch uses residual vector quantization (RVQ) with 8 to 32 stages. Disentanglement is achieved by subtracting the quantified semantic hidden features from the acoustic hidden features and subsequently adding the quantized acoustic hidden features back.

The training objective combines multi-scale mel reconstruction loss (weighted 15.0), semantic representation reconstruction loss, VQ commitment loss, self-guidance loss (weighted 0.1), adversarial losses (using multi-scale STFT, MPD, MSD, MRD, and a WavLM-based discriminator), and feature matching loss. The self-guidance loss enforces similarity between decoder outputs driven by continuous pre-quantized latents and those driven by discrete tokens, thereby maximizing codebook utilization.

## Experimental setup

Trained on ~160,000 hours of data: 95K hours of Emilia and LibriTTS for speech, ~60K hours of in-house data for music, and an 800-hour filtered AudioSet subset for general sound. Evaluated on LibriSpeech test-clean (speech), GTZAN testset (music), and an AudioSet eval subset (general sound). Baselines include WavTokenizer, UniCodec, AUV, X-codec, and Mimi. Metrics include PESQ (WB/NB), STOI, Mel distance, MCD, N-MOS, S-MOS, Audiobox Aesthetics, and LLM perplexity (PPL0, PPL mean). Implemented across 4 A100 GPUs with a global batch size of 24, AdamW optimizer (peak LR 1e-4, 2.5K warmup, 500K cosine decay steps), totaling ~134M parameters.

## Results

OmniCodec-32L achieves superior performance on LibriSpeech test-clean with a PESQ-WB of 3.02, STOI of 0.96, Mel distance of 0.75, MCD of 2.54, and N-MOS of 3.63, outperforming Mimi-16L and single-codebook models like UniCodec across multiple domains at competitive bitrates. Even at an extremely low frame rate of 6.25 Hz (OmniCodec-F-32L), it outperforms the 75 Hz UniCodec model on STOI, Mel distance, and MCD. Ablation studies demonstrate that removing the self-guidance loss drops codebook utilization from 0.982 to 0.974, while dropping the semantic branch severely degrades downstream LLM perplexity from ~10.02 to 18.44.

| Model | Bitrate (bps) | Frame Rate (Hz) | PESQ-WB (Speech) | STOI (Speech) | Mel dis. (Speech) | MCD (Speech) |
|---|---|---|---|---|---|---|
| WavTokenizer | 480 | 480 | 1.88 | 0.87 | 0.97 | 4.79 |
| UniCodec | 1050 | 75 | 2.65 | 0.92 | 0.79 | 3.46 |
| X-codec-8L | 4000 | 50x8 | 2.96 | 0.93 | 0.79 | 3.35 |
| Mimi-16L | 2200 | 12.5x16 | 2.88 | 0.94 | 1.12 | 3.93 |
| OmniCodec-16L | 2200 | 12.5x16 | 2.76 | 0.94 | 0.81 | 3.05 |
| OmniCodec-32L | 4400 | 12.5x32 | 3.02 | 0.96 | 0.75 | 2.54 |

## Limitations

While OmniCodec excels in music and general sound semantic representation, its perplexity (PPL) in the speech domain lags behind models specifically distilled using WavLM due to differences in semantic architecture and training data proportions. The study relies heavily on an in-house music dataset, and fine-tuning specifically for speech (OmniCodec-8L-FT) trades away music and sound modeling capacity.

## Why read this

Speech and ML researchers building audio LLMs or streaming generative models should read this to see how supervised understanding-model encoders can replace self-supervised distillations for universal, low-bitrate semantic-acoustic decoupling.

## Code

- https://github.com/ASLP-lab/OmniCodec

## Applications

Streaming speech-to-speech translation, universal audio generation via language models, real-time interactive voice assistants, and multi-domain audio compression.

## Institutions / 機構

Northwestern Polytechnical University, Shanghai Lingguang Zhaxian Technology

## Related

- (link related pages by id as the wiki grows)
