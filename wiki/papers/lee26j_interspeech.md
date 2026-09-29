---
id: lee26j_interspeech
category: tts
labels: [efficient-on-device, streaming-real-time, generative-model]
institutions: ["Korea Advanced Institute of Science and Technology", "Sungkyunkwan University"]
code: https://onemeee.github.io/wand-tts/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-943
pdf: https://www.isca-archive.org/interspeech_2026/lee26j_interspeech.pdf
---

# WAND: Windowed Attention and Knowledge Distillation for Efficient Autoregressive Text-to-Speech Models

*Hanna Lee, Tan Dat Nguyen, Jaehoon Kang, Kyuhong Shim*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-943)

**Category:** `tts` · **Labels:** `efficient-on-device`, `streaming-real-time`, `generative-model`

**TL;DR** — WAND adapts pretrained autoregressive text-to-speech models to use constant-complexity windowed attention and knowledge distillation, achieving up to 66.2% KV cache reduction and length-invariant latency with negligible quality loss.

## Key contributions

- Proposed a dual-attention mechanism dividing self-attention into persistent global attention for conditioning tokens and local sliding-window attention for generated acoustic tokens.
- Designed a data-efficient adaptation recipe leveraging knowledge distillation from a full-attention teacher using only 53.8 hours of training data.
- Introduced a curriculum scheduling strategy with temperature-scaled soft masking to stabilize fine-tuning and progressively narrow the attention window.
- Demonstrated cross-architecture generalizability across three diverse AR-TTS models (CosyVoice 2, IndexTTS 1.5, SparkTTS) using distinct codecs and token rates.

## Problem

Decoder-only autoregressive text-to-speech models produce high-fidelity audio but suffer from quadratic scaling of compute and linear scaling of KV cache memory with sequence length. Prior work like layer-wise pruning fails to fix self-attention's underlying scaling limits, while alternative linear architectures or parallel decoding either degrade speech naturalness or leave memory bottlenecks unresolved. This prevents the deployment of LLM-based TTS in streaming or long-form real-time applications.

## Method

WAND bifurcates the transformer's attention mechanism into Global Attention over conditioning inputs (system prompts, target text, and reference audio) and Local Sliding-Window Attention over a fixed window W of recent acoustic history tokens (y_1 to y_{t-1}). This bounds memory and compute complexity to O(1) per step. To prevent quality degradation during this restriction, the model is fine-tuned using a hybrid distillation objective combining cross-entropy loss (L_CE) against ground-truth acoustic tokens and Skew Kullback-Leibler divergence (L_KL) matching the output probability distribution of the full-attention teacher model.

To ensure training stability, a curriculum scheduler progressively reduces the effective attention window from an initial size (e.g., W_start = 128) down to target W using a cosine schedule. Simultaneously, a temperature-controlled soft mask (tau) is applied to attention logits via log-scale interpolation, transitioning smoothly from partial attention to hard window truncation. Training uses the AdamW optimizer with a peak learning rate of 1e-5 and a cosine schedule for exactly one epoch on 53.8 hours of English speech.

## Experimental setup

Evaluated on the Seed-TTS-eval benchmark (test-en and test-zh subsets). Baselines include CosyVoice 2-0.5B (FSQ, 25 Hz), IndexTTS 1.5 (VQ, 25 Hz), and SparkTTS-0.5B (BiCodec, 50 Hz). Fine-tuning used the LibriTTS train-clean-100 subset (53.8 hours) on a single NVIDIA A100 MIG partition (20 GB). Metrics include Word Error Rate (WER via Whisper-large-v3), Character Error Rate (CER), speaker similarity (SSIM via WavLM x-vectors), UTMOS, and Naturalness Mean Opinion Score (NMOS).

## Results

On English evaluation (test-en), IndexTTS 1.5 with WAND (W=32) achieves a 66.2% reduction in KV cache size (from 38.44 MB to 13.01 MB) and lowers GFLOPs from 6.18 to 3.28, yielding a 1.89x speedup while reducing WER from 0.98 to 0.91 and maintaining SSIM at 94.4. CosyVoice 2 with WAND (W=32) reduces KV cache by 49.9% (10.48 MB to 5.25 MB) and improves WER from 1.94 to 1.72. SparkTTS with WAND (W=64) achieves a 60.5% KV cache reduction (18.09 MB to 7.15 MB) and 31.74 GFLOPs. On Mandarin test-zh (zero-shot cross-lingual transfer), CER degradation remains within 0.1% absolute across models.

Ablation studies show that removing distillation harms WER (rising to 3.40 for CosyVoice 2), and combining both L_CE and L_KL outperforms either single loss. Curriculum learning outperforms direct training from scratch, reducing IndexTTS 1.5 WER from 1.03 to 0.91.

| System | Attn. Mechanism | KV Cache (fp32) | Reduction | GFLOPs | Speedup | UTMOS | WER |\n|---|---|---|---|---|---|---|---|\n| CosyVoice 2-0.5B | Full (W=infinity) | 10.48 MB | - | 11.55 | - | 4.18 | 1.94 |\n| CosyVoice 2 + WAND | WAND (W=32) | 5.25 MB | 49.9% | 7.44 | 1.55x | 4.21 | 1.72 |\n| IndexTTS 1.5 | Full (W=infinity) | 38.44 MB | - | 6.18 | - | 3.97 | 0.98 |\n| IndexTTS 1.5 + WAND | WAND (W=32) | 13.01 MB | 66.2% | 3.28 | 1.89x | 3.98 | 0.91 |\n| SparkTTS-0.5B | Full (W=infinity) | 18.09 MB | - | 48.12 | - | 3.93 | 3.27 |\n| SparkTTS + WAND | WAND (W=64) | 7.15 MB | 60.5% | 31.74 | 1.51x | 3.93 | 3.11 |

## Limitations

Evaluated only on discrete-token LLM-based autoregressive TTS models, leaving continuous latent or non-autoregressive architectures unexplored. The fine-tuning data scale is restricted to English data, and longer-form text synthesis beyond standard benchmark durations requires assumption of unbounded scaling stability without explicit multi-minute audio evaluations.

## Why read this

Speech and ML engineers building real-time or streaming neural TTS systems will learn how to surgically decouple attention for constant-memory inference without retraining LLM backbones from scratch.

## Code

- https://onemeee.github.io/wand-tts/

## Applications

Real-time streaming text-to-speech, conversational voice assistants, and long-form audiobook generation on memory-constrained edge devices.

## Institutions / 機構

Korea Advanced Institute of Science and Technology, Sungkyunkwan University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- (link related pages by id as the wiki grows)
