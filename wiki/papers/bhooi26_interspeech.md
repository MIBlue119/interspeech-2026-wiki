---
id: bhooi26_interspeech
category: asr
labels: [self-supervised, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2229
pdf: https://www.isca-archive.org/interspeech_2026/bhooi26_interspeech.pdf
---

# Refining the Latent Bridge: Superior ASR Performance via Adapter-Only Alignment with Diffusion LLMs

*Puneet Singh Bhooi, Vinayak Abrol*

[PDF](https://www.isca-archive.org/interspeech_2026/bhooi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhooi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2229)

**Category:** `asr` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — The paper demonstrates that diffusion-based LLMs (dLLMs) coupled with frozen speech encoders via a strict adapter-only alignment significantly outperform autoregressive (AR) counterparts in ASR, achieving a 2.807% WER on LibriSpeech test-clean while improving throughput by 45%.

## Key contributions

- Validates a strict adapter-only alignment protocol keeping both speech encoder and LLM backbone completely frozen, avoiding costly full-parameter or partial updates.
- Proves that discrete diffusion LLMs (LLaDA) are far more resilient to the adapter bottleneck than autoregressive models (Llama-3), yielding a 54% relative WER improvement on LibriSpeech test-clean.
- Achieves a 12.3x Real-Time Factor (RTFx) via non-autoregressive block-wise iterative decoding with a low-confidence remasking strategy.
- Conducts architectural ablations showing that a deep normalized MLP with manual frame-stacking outperforms learnable convolutional temporal models in the non-autoregressive regime.

## Problem

Integrating speech encoders with large language models typically relies on autoregressive decoders that suffer from error propagation, drift when the backbone is frozen, and slow sequential inference latency. While adapter-based SLAM architectures attempt to bridge this gap, existing AR approaches degrade severely under parameter-efficient constraints. Furthermore, alternative non-autoregressive strategies either introduce heavy computational overheads like Q-Formers or lack robust global error correction mechanisms.

## Method

The architecture combines a frozen Whisper-Large-v3 speech encoder, a deep trainable MLP adapter (LinearLargeProjectorLN), and a frozen diffusion-based LLM (LLLaDA-8B). Raw audio is encoded into high-level representations, down-sampled, and reshaped using a manual frame-stacking factor kappa to form acoustic tokens. These tokens are processed via a 4-layer MLP containing Layer Normalization (LN) and SiLU activations, using dimensions mapping through 2048 and 1024 intermediate widths to match the dLLM's embedding space.

The dLLM performs iterative non-autoregressive decoding using discrete diffusion over a linear noise schedule with N=128 steps. Inference initializes the target sequence with N [MASK] tokens. Over K refinement steps, the model simultaneously predicts probability distributions for all masked positions, crystallizes high-confidence tokens, and re-masks remaining positions using a low-confidence strategy. This leverages bidirectional context for global error correction while completely bypassing sequential generation bottlenecks.

Models are optimized using the AdamW optimizer with a peak learning rate of 1e-4, linear warmup for the first 1000 steps, a batch size of 4, gradient accumulation over 2 steps (effective global batch size of 8), and trained for up to 20 epochs or 10^6 steps with SpecAugment applied to acoustic features.

## Experimental setup

Evaluated on the LibriSpeech 960h dataset across low-resource (100h clean/other splits) and full-resource settings, using Word Error Rate (WER%) and Real-Time Factor (RTFx) as metrics. Baselines include Llama-3-8B with autoregressive beam search (beam width 4) against the proposed LLaDA-8B diffusion setup. Implementation uses a single NVIDIA GPU with CUDA acceleration.

## Results

On the full LibriSpeech 960h split, LlaDA-8B achieves a 2.807% WER on test-clean (a 54% relative improvement over Llama-3-8B's 6.147%) and 5.286% on test-other (vs 8.526% for Llama-3). LlaDA maintains an average RTFx of 12.3x compared to Llama-3's 8.5x (a 45% throughput boost). In low-resource disjoint 100h training subsets (LS-100c and LS-100o), LlaDA shows substantially lower variance and better resilience to acoustic diversity, scoring 3.887% test-clean WER when trained on noisy 'other' subsets compared to Llama-3's 7.307%.

Ablations demonstrate that removing Layer Normalization degrades test-clean WER from 2.807% to 3.841%, replacing the MLP with a CNN adapter causes severe degradation (4.154% WER), and omitting SpecAugment moderately increases WER to 3.001%.

| System | Train Data | dev-clean WER | test-clean WER | RTFx (test-clean) |
|---|---|---|---|---|
| Llama-3-8B (AR) | 100h clean | 6.607% | 8.307% | 8.37 |
| LlaDA-8B (Diffusion) | 100h clean | 6.007% | 6.007% | 12.64 |
| Llama-3-8B (AR) | 960h total | 6.067% | 6.147% | 8.62 |
| LlaDA-8B (Diffusion) | 960h total | 2.852% | 2.807% | 12.74 |

## Limitations

The evaluation is restricted solely to the LibriSpeech dataset, leaving multilingual generalization, noisy real-world acoustic environments, and long-form speech transcription untested. The approach relies on fixed-length or heuristic block-wise denoising schedules that may require tuning for varying utterance lengths or streaming applications.

## Why read this

Researchers and engineers building speech-LLM systems will want to read this to see how non-autoregressive diffusion models can replace autoregressive decoders in adapter-only architectures, yielding both massive accuracy gains and faster inference without unfreezing backbones.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time automatic speech recognition, voice-controlled digital assistants, and low-resource speech transcription pipelines.

## Institutions / 機構

Indraprastha Institute of Information Technology Delhi

**Funding / 經費:** ANRF Core Research Grant, Government of India, Nebius Research Grant, Infosys Foundation, Infosys Centre for AI, IIITD

## Related

- (link related pages by id as the wiki grows)
